import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Dictionary, toNano } from '@ton/core';
import {
    AcceptOrder,
    AddMenuItems,
    Array_Item,
    Array_ItemIds,
    Array_OrderItem,
    Array_Restaurant,
    BillingDetails,
    CancelOrder,
    CreateOrder,
    CreateRestaurant,
    DeleteMenuItems,
    DeliverOrder,
    Item,
    OrderItem,
    RejectOrder,
    Restaurant,
    TonFoodMiniApp,
    UpdateRestaurantDetails,
    User,
} from '../wrappers/TonFoodMiniApp';
import '@ton/test-utils';

describe('TonFoodMiniApp', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonFoodMiniApp: SandboxContract<TonFoodMiniApp>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonFoodMiniApp = blockchain.openContract(await TonFoodMiniApp.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonFoodMiniApp are ready to use
    });

    const addRestaurantWithMenu = async (
        tonFoodMiniApp: SandboxContract<TonFoodMiniApp>,
        deployer: SandboxContract<TreasuryContract>,
    ) => {
        const menuMap = Dictionary.empty<number, Item>();
        menuMap.set(0, {
            $$type: 'Item',
            name: 'Item 1',
            description: 'Description 1',
            price: toNano('0.15'),
            imageUrl: 'Image 1',
        } as Item);
        menuMap.set(1, {
            $$type: 'Item',
            name: 'Item 2',
            description: 'Description 2',
            price: toNano('0.25'),
            imageUrl: 'Image 2',
        } as Item);

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'CreateRestaurant',
                restaurantName: 'Restaurant 1',
                restaurantDescription: 'Description 1',
                restaurantImageUrl: 'Image 1',
                vendorDetails: {
                    $$type: 'User',
                    walletAddress: deployer.getSender().address,
                    name: 'Vendor 1',
                    phoneNumber: '1234567890',
                    location: 'Location 1',
                } as User,
                menuItems: {
                    $$type: 'Array_Item',
                    Map: menuMap,
                    length: BigInt(menuMap.size),
                } as Array_Item,
            } as CreateRestaurant,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });
        console.log(result.externals[0].body.asSlice().loadStringTail());
    };

    const createOrder = async () => {
        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CreateOrder',
                restaurantId: deployer.getSender().address,
                items: {
                    $$type: 'Array_OrderItem',
                    Map: Dictionary.empty<number, OrderItem>().set(0, {
                        $$type: 'OrderItem',
                        id: 0n,
                        quantity: 1n,
                    }),
                    length: 1n,
                } as Array_OrderItem,
                billingDetails: {
                    $$type: 'BillingDetails',
                    totalAmount: toNano('0.15'),
                } as BillingDetails,
                userDetails: {
                    $$type: 'User',
                    walletAddress: deployer.getSender().address,
                    name: 'User 1',
                    phoneNumber: '1234567890',
                    location: 'Location 1',
                } as User,
                category: 0n,
            } as CreateOrder,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        console.log(result.externals[0].body.asSlice().loadStringTail());
    };

    it('should add a new restaurant', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);

        const restaurants: Array_Restaurant = await tonFoodMiniApp.getAllRestaurants();
        expect(restaurants.length).toEqual(1n);
        const restaurant: Restaurant = restaurants.Map.values()[0];
        expect(restaurant).toMatchObject({
            $$type: 'Restaurant',
            name: 'Restaurant 1',
            description: 'Description 1',
            imageUrl: 'Image 1',
            vendorDetails: {
                $$type: 'User',
                name: 'Vendor 1',
                phoneNumber: '1234567890',
                location: 'Location 1',
            },
            menu: {
                $$type: 'Array_MenuItem',
                length: 2n,
            },
        });

        expect(restaurant.restaurantId).toEqualAddress(deployer.getSender().address);
        expect(restaurant.vendorDetails.walletAddress).toEqualAddress(deployer.getSender().address);
        expect(restaurant.menu.Map.values()[0].$$type).toBe('MenuItem');
        expect(restaurant.menu.Map.values()[0].name).toBe('Item 1');
        expect(restaurant.menu.Map.values()[0].description).toBe('Description 1');
        expect(restaurant.menu.Map.values()[0].price).toBe(toNano('0.15'));
        expect(restaurant.menu.Map.values()[0].imageUrl).toBe('Image 1');
        expect(restaurant.menu.Map.values()[1].$$type).toBe('MenuItem');
        expect(restaurant.menu.Map.values()[1].name).toBe('Item 2');
        expect(restaurant.menu.Map.values()[1].description).toBe('Description 2');
        expect(restaurant.menu.Map.values()[1].price).toBe(toNano('0.25'));
        expect(restaurant.menu.Map.values()[1].imageUrl).toBe('Image 2');
    });

    it('should create a new order', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);
        await createOrder();

        const orders = await tonFoodMiniApp.getAllOrders(deployer.getSender().address);
        expect(orders.length).toEqual(1n);
        expect(orders.Map.values()[0].restaurantId).toEqualAddress(deployer.getSender().address);
        expect(orders.Map.values()[0]).toMatchObject({
            $$type: 'Order',
            orderId: 0n,
            items: {
                $$type: 'Array_OrderItem',
                length: 1n,
            },
            billingDetails: {
                $$type: 'BillingDetails',
                totalAmount: toNano('0.15'),
            },
            userDetails: {
                $$type: 'User',
                name: 'User 1',
                phoneNumber: '1234567890',
                location: 'Location 1',
            },
            status: 0n,
        });
    });

    it('should update order status to accepted', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);
        await createOrder();

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'AcceptOrder',
                restaurantId: deployer.getSender().address,
                orderId: 0n,
            } as AcceptOrder,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        const orders = await tonFoodMiniApp.getAllOrders(deployer.getSender().address);
        expect(orders.length).toEqual(1n);
        expect(orders.Map.values()[0].status).toEqual(1n);
    });

    it('should update order status to deliver', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);
        await createOrder();

        const res = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'AcceptOrder',
                restaurantId: deployer.getSender().address,
                orderId: 0n,
            } as AcceptOrder,
        );

        expect(res.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeliverOrder',
                restaurantId: deployer.getSender().address,
                orderId: 0n,
            } as DeliverOrder,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        const orders = await tonFoodMiniApp.getAllOrders(deployer.getSender().address);
        expect(orders.length).toEqual(1n);
        expect(orders.Map.values()[0].status).toEqual(2n);
    });

    it('should update order status to cancelled', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);
        await createOrder();

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'CancelOrder',
                restaurantId: deployer.getSender().address,
                orderId: 0n,
            } as CancelOrder,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        const orders = await tonFoodMiniApp.getAllOrders(deployer.getSender().address);
        expect(orders.length).toEqual(1n);
        expect(orders.Map.values()[0].status).toEqual(3n);
    });

    it('should update order status to rejected', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);
        await createOrder();

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'RejectOrder',
                restaurantId: deployer.getSender().address,
                orderId: 0n,
            } as RejectOrder,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        const orders = await tonFoodMiniApp.getAllOrders(deployer.getSender().address);
        expect(orders.length).toEqual(1n);
        expect(orders.Map.values()[0].status).toEqual(4n);
    });

    it('should add new menu items', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);

        const menuMap = Dictionary.empty<number, Item>();
        menuMap.set(2, {
            $$type: 'Item',
            name: 'Item 3',
            description: 'Description 3',
            price: toNano('0.35'),
            imageUrl: 'Image 3',
        });
        menuMap.set(3, {
            $$type: 'Item',
            name: 'Item 4',
            description: 'Description 4',
            price: toNano('0.45'),
            imageUrl: 'Image 4',
        });

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'AddMenuItems',
                restaurantId: deployer.getSender().address,
                items: {
                    $$type: 'Array_Item',
                    Map: menuMap,
                    length: BigInt(menuMap.size),
                } as Array_Item,
            } as AddMenuItems,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        console.log(result.externals[0].body.asSlice().loadStringTail());

        const restaurants: Array_Restaurant = await tonFoodMiniApp.getAllRestaurants();
        expect(restaurants.length).toEqual(1n);
        const restaurant: Restaurant = restaurants.Map.values()[0];
        expect(restaurant.menu.Map.values()[2].$$type).toBe('MenuItem');
        expect(restaurant.menu.Map.values()[2].name).toBe('Item 3');
        expect(restaurant.menu.Map.values()[2].description).toBe('Description 3');
        expect(restaurant.menu.Map.values()[2].price).toBe(toNano('0.35'));
        expect(restaurant.menu.Map.values()[2].imageUrl).toBe('Image 3');
        expect(restaurant.menu.Map.values()[3].$$type).toBe('MenuItem');
        expect(restaurant.menu.Map.values()[3].name).toBe('Item 4');
        expect(restaurant.menu.Map.values()[3].description).toBe('Description 4');
        expect(restaurant.menu.Map.values()[3].price).toBe(toNano('0.45'));
        expect(restaurant.menu.Map.values()[3].imageUrl).toBe('Image 4');
    });

    it('should delete menu items', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'DeleteMenuItems',
                restaurantId: deployer.getSender().address,
                items: {
                    $$type: 'Array_ItemIds',
                    Map: Dictionary.empty<number, number>().set(0, 0),
                    length: 1n,
                } as Array_ItemIds,
            } as DeleteMenuItems,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        console.log(result.externals[0].body.asSlice().loadStringTail());

        const restaurants: Array_Restaurant = await tonFoodMiniApp.getAllRestaurants();
        expect(restaurants.length).toEqual(1n);
        const restaurant: Restaurant = restaurants.Map.values()[0];
        expect(restaurant.menu.Map.values()[0].isDeleted).toBeTruthy();
    });

    it('should update restaurant details', async () => {
        await addRestaurantWithMenu(tonFoodMiniApp, deployer);

        const result = await tonFoodMiniApp.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'UpdateRestaurantDetails',
                restaurantId: deployer.getSender().address,
                restaurantName: 'Restaurant Updated',
            } as UpdateRestaurantDetails,
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonFoodMiniApp.address,
            success: true,
        });

        console.log(result.externals[0].body.asSlice().loadStringTail());

        const restaurants: Array_Restaurant = await tonFoodMiniApp.getAllRestaurants();
        expect(restaurants.length).toEqual(1n);
        const restaurant: Restaurant = restaurants.Map.values()[0];
        expect(restaurant.name).toBe('Restaurant Updated');
    });
});
