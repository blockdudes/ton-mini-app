import "@stdlib/deploy"; // for Deployable trait
import "./structs.tact";
import "./messages.tact";

contract TonFoodMiniApp with Deployable {
    const MinTonForStorage: Int = ton("0.02");
    restaurant: map<Address, Restaurant>; // restaurantId -> Restaurant
    orders: map<Address, Array_Order>; // restaurantId -> Order
    userOrders: map<Address, Array_OrderRefs>; // userAddress -> OrderIds
    const Status_InQueue: Int = 0;
    const Status_Accepted: Int = 1;
    const Status_Delivered: Int = 2;
    const Status_Cancelled: Int = 3;
    const Status_Rejected: Int = 4;

    const OrderCategory_DineIn: Int = 0;
    const OrderCategory_TakeAway: Int = 1;
    const OrderCategory_Delivery: Int = 2;

    fun returnGas(_to: Address, _value: Int) {
          send(SendParameters{
              to: _to,
              value: context().value - _value - self.MinTonForStorage,
              mode: SendIgnoreErrors,
              body: "Gas refund".asComment()
          });
    }

    receive(msg: CreateRestaurant){
        require(msg.vendorDetails.walletAddress != newAddress(0, 0),
            "Invalid vendor address"
        );
        require(msg.vendorDetails.walletAddress == sender(), "Unauthorized");
        require(msg.vendorDetails.name != "", "Vendor name cannot be empty");
        require(msg.vendorDetails.phoneNumber != "", "Vendor phone number cannot be empty");
        require(msg.vendorDetails.location != "", "Vendor location cannot be empty");
        require(msg.restaurantName != "", "Restaurant name cannot be empty");
        require(msg.restaurantImageUrl != "", "Restaurant image url cannot be empty");
        require(msg.restaurantDescription != "", "Restaurant description cannot be empty");
        require(self.restaurant.get(sender()) == null, "Restaurant already exists");
        
        let _menuItems: Array_MenuItem = emptyArray_MenuItem();
        let _items: map<Int as uint16, Item> = msg.menuItems.Map;
        foreach (key, _item in _items) {
            let _menuItem: MenuItem = MenuItem{
                id: _menuItems.length,
                name: _item.name,
                description: _item.description,
                price: _item.price,
                imageUrl: _item.imageUrl,
                isDeleted: false
            };
            _menuItems.append(_menuItem);
        }
        
        let _restaurant: Restaurant = Restaurant{
            restaurantId: sender(),
            name: msg.restaurantName,
            imageUrl: msg.restaurantImageUrl,
            description: msg.restaurantDescription,
            vendorDetails: msg.vendorDetails,
            menu: _menuItems
        };
        self.restaurant.set(sender(), _restaurant);
        self.orders.set(sender(), emptyArray_Order());

        self.returnGas(sender(), 0);

        emit("Restaurant created".asComment());
    }

    receive(msg: CreateOrder){
        require(msg.items.length > 0, "Items cannot be empty");
        require(msg.userDetails.walletAddress != newAddress(0, 0),
            "Invalid user address"
        );
        require(msg.userDetails.walletAddress == sender(), "Unauthorized");
        require(msg.userDetails.name != "", "User name cannot be empty");
        require(msg.userDetails.phoneNumber != "", "User phone number cannot be empty");
        require(msg.category == self.OrderCategory_Delivery && msg.userDetails.location != "", "User location cannot be empty");
        require(msg.billingDetails.totalAmount != 0, "Total amount cannot be 0");
        require(context().value >= msg.billingDetails.totalAmount,
            "Insufficient funds"
        );
        require(msg.category <= 2 && msg.category >= 0, "Invalid category");

        let _order: Order = Order{
            orderId: self.orders.get(msg.restaurantId)!!.length,
            restaurantId: msg.restaurantId,
            items: msg.items,
            userDetails: msg.userDetails,
            billingDetails: msg.billingDetails,
            status: self.Status_InQueue,
            category: msg.category,
            createdAt: now()
        };
        if (self.orders.get(msg.restaurantId) == null) {
            self.orders.set(msg.restaurantId, emptyArray_Order());
        }
        let updatedOrders: Array_Order = self.orders.get(msg.restaurantId)!!;
        updatedOrders.append(_order);
        self.orders.set(msg.restaurantId, updatedOrders);
        if(self.userOrders.get(msg.userDetails.walletAddress) == null) {
            self.userOrders.set(msg.userDetails.walletAddress, emptyArray_OrderRefs());
        }
        let updatedUserOrders: Array_OrderRefs = self.userOrders.get(msg.userDetails.walletAddress)!!;
        let _orderRef: OrderRef = OrderRef{
            restaurantId: msg.restaurantId,
            orderId: _order.orderId
        };
        updatedUserOrders.append(_orderRef);
        self.userOrders.set(msg.userDetails.walletAddress, updatedUserOrders);

        self.returnGas(sender(), 0);

        emit("Order created".asComment());
    }

    fun updateOrderStatus(restaurantId: Address, orderId: Int, status: Int) {
        require(self.restaurant.get(restaurantId) != null, "Restaurant does not exist");
        require(self.orders.get(restaurantId) != null && self.orders.get(restaurantId)!!.Map.get(orderId) != null,
            "Order does not exist"
        );
        require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status != self.Status_Delivered,
            "Order has already been delivered"
        );
        require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status != self.Status_Cancelled,
            "Order has already been cancelled"
        );
        require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status != self.Status_Rejected,
            "Order has already been rejected"
        );
        require(sender() == restaurantId || (sender() == self.orders.get(restaurantId)!!.Map.get(orderId)!!.userDetails.walletAddress && status == self.Status_Cancelled),
            "Unauthorized"
        );

        if(status == self.Status_Cancelled) {
            require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status == self.Status_InQueue,
                "Order cannot be cancelled"
            );
        } else if(status == self.Status_Rejected) {
            require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status == self.Status_InQueue,
                "Order cannot be rejected"
            );
        } else if(status == self.Status_Delivered) {
            require(self.orders.get(restaurantId)!!.Map.get(orderId)!!.status == self.Status_Accepted,
                "Order cannot be delivered without being accepted"
            );
        }

        let updatedOrder: Order = self.orders.get(restaurantId)!!.Map.get(orderId)!!;
        updatedOrder.status = status;
        let updatedOrders: Array_Order = self.orders.get(restaurantId)!!;
        updatedOrders.Map.set(orderId, updatedOrder);
        self.orders.set(restaurantId, updatedOrders);
        if(status == self.Status_Accepted) {
            send(SendParameters{
                to: self.restaurant.get(restaurantId)!!.vendorDetails.walletAddress,
                value: updatedOrder.billingDetails.totalAmount,
                mode: SendIgnoreErrors,
                body: "Order accepted".asComment()
            });
        } else if(status == self.Status_Cancelled){
            send(SendParameters{
                to: updatedOrder.userDetails.walletAddress,
                value: updatedOrder.billingDetails.totalAmount,
                mode: SendIgnoreErrors,
                body: "Order cancelled".asComment()
            });
        } else if(status == self.Status_Rejected){
            send(SendParameters{
                to: updatedOrder.userDetails.walletAddress,
                value: updatedOrder.billingDetails.totalAmount,
                mode: SendIgnoreErrors,
                body: "Order rejected".asComment()
            });
        }

        self.returnGas(sender(), updatedOrder.billingDetails.totalAmount);
    }

    receive(msg: AcceptOrder){
        self.updateOrderStatus(msg.restaurantId, msg.orderId, self.Status_Accepted);

        self.returnGas(sender(), 0);

        emit("Order accepted".asComment());
    }

    receive(msg: DeliverOrder){
        self.updateOrderStatus(msg.restaurantId, msg.orderId, self.Status_Delivered);

        self.returnGas(sender(), 0);

        emit("Order delivered".asComment());
    }

    receive(msg: CancelOrder){ 
        self.updateOrderStatus(msg.restaurantId, msg.orderId, self.Status_Cancelled);

        self.returnGas(sender(), 0);

        emit("Order cancelled".asComment());
    }

    receive(msg: RejectOrder){
        self.updateOrderStatus(msg.restaurantId, msg.orderId, self.Status_Rejected);

        self.returnGas(sender(), 0);

        emit("Order rejected".asComment());
    }

    receive(msg: AddMenuItems){
        require(msg.items.length > 0, "Items cannot be empty");
        require(self.restaurant.get(msg.restaurantId) != null, "Restaurant does not exist");
        require(sender() == msg.restaurantId,
            "Unauthorized"
        );
        let updatedMenu: Array_MenuItem = self.restaurant.get(msg.restaurantId)!!.menu;
        let _items: map<Int as uint16, Item> = msg.items.Map;
        foreach (key, _item in _items) {
            let _menuItem: MenuItem = MenuItem{
                id: updatedMenu.length,
                name: _item.name,
                description: _item.description,
                price: _item.price,
                imageUrl: _item.imageUrl,
                isDeleted: false
            };
            updatedMenu.append(_menuItem);
        }
        let updatedRestaurant: Restaurant = self.restaurant.get(msg.restaurantId)!!;
        updatedRestaurant.menu = updatedMenu;
        self.restaurant.set(msg.restaurantId, updatedRestaurant);

        self.returnGas(sender(), 0);

        emit("Menu items added".asComment());
    }

    fun deleteItem(itemId: Int, updatedMenu: Array_MenuItem): Array_MenuItem {
        let j: Int = 0;
        while (j < updatedMenu.length) {
            let _menuItem: MenuItem = updatedMenu.getIdx(j);
            if (_menuItem.id == itemId) {
                _menuItem.isDeleted = true;
                updatedMenu.Map.set(j, _menuItem);
                return updatedMenu;
            }
            j += 1;
        }
        return updatedMenu;
    }

    receive(msg: DeleteMenuItems){
        require(msg.items.length > 0, "Items cannot be empty");
        require(self.restaurant.get(msg.restaurantId) != null, "Restaurant does not exist");
        require(sender() == msg.restaurantId,
            "Unauthorized"
        );
        let updatedMenu: Array_MenuItem = self.restaurant.get(msg.restaurantId)!!.menu;
        let _items: map<Int as uint16, Int as uint16> = msg.items.Map;
        foreach (key, id in _items) {
            updatedMenu = self.deleteItem(id, updatedMenu);
        }
        let updatedRestaurant: Restaurant = self.restaurant.get(msg.restaurantId)!!;
        updatedRestaurant.menu = updatedMenu;
        self.restaurant.set(msg.restaurantId, updatedRestaurant);

        self.returnGas(sender(), 0);

        emit("Menu items deleted".asComment());
    }

    receive(msg: UpdateRestaurantDetails){
        require(self.restaurant.get(msg.restaurantId) != null, "Restaurant does not exist");
        require(sender() == msg.restaurantId,
            "Unauthorized"
        );
        let updatedRestaurant: Restaurant = self.restaurant.get(msg.restaurantId)!!;
        if ((msg.restaurantName != null) && (msg.restaurantName != "")) {
            updatedRestaurant.name = msg.restaurantName!!;
        }
        if ((msg.restaurantImageUrl != null) && (msg.restaurantImageUrl != "")) {
            updatedRestaurant.imageUrl = msg.restaurantImageUrl!!;
        }
        if ((msg.restaurantDescription != null) && (msg.restaurantDescription != "")) {
            updatedRestaurant.description = msg.restaurantDescription!!;
        }
        if ((msg.vendorWalletAddress != null) && (msg.vendorWalletAddress != newAddress(0, 0))) {
            updatedRestaurant.vendorDetails.walletAddress = msg.vendorWalletAddress!!;
        }
        if ((msg.vendorName != null) && (msg.vendorName != "")) {
            updatedRestaurant.vendorDetails.name = msg.vendorName!!;
        }
        if ((msg.vendorPhoneNumber != null) && (msg.vendorPhoneNumber != "")) {
            updatedRestaurant.vendorDetails.phoneNumber = msg.vendorPhoneNumber!!;
        }
        if ((msg.vendorLocation != null) && (msg.vendorLocation != "")) {
            updatedRestaurant.vendorDetails.location = msg.vendorLocation!!;
        }
        self.restaurant.set(msg.restaurantId, updatedRestaurant);

        self.returnGas(sender(), 0);

        emit("Restaurant details updated".asComment());
    }

    fun getOrderByStatus(restaurantId: Address, status: Int): Array_Order {
        require(self.restaurant.get(restaurantId) != null, "Restaurant does not exist");
        let orders: map<Int as uint16, Order> = self.orders.get(restaurantId)!!.Map;
        let _orders: Array_Order = emptyArray_Order();
        foreach (key, value in orders){
            if(value.status == status) {
                _orders.append(value);
            }
        }
        return _orders;
    }
    
    get fun inQueueOrders(restaurantId: Address): Array_Order {
        return self.getOrderByStatus(restaurantId, self.Status_InQueue);
    }

    get fun acceptedOrders(restaurantId: Address): Array_Order {
        return self.getOrderByStatus(restaurantId, self.Status_Accepted);
    }

    get fun deliveredOrders(restaurantId: Address): Array_Order {
        return self.getOrderByStatus(restaurantId, self.Status_Delivered);
    }

    get fun cancelledOrders(restaurantId: Address): Array_Order {
        return self.getOrderByStatus(restaurantId, self.Status_Cancelled);
    }

    get fun rejectedOrders(restaurantId: Address): Array_Order {
        return self.getOrderByStatus(restaurantId, self.Status_Rejected);
    }

    get fun allOrders(restaurantId: Address): Array_Order {
        require(self.restaurant.get(restaurantId) != null, "Restaurant does not exist");
        return self.orders.get(restaurantId)!!;
    }

    get fun allUserOrders(userId: Address): Array_Order {
        require(self.userOrders.get(userId) != null, "User does not have any orders");
        let orderRefs: map<Int as uint16, OrderRef> = self.userOrders.get(userId)!!.Map;
        let _orders: Array_Order = emptyArray_Order();
        foreach(key, orderRef in orderRefs){
            let restaurantId: Address = orderRef.restaurantId;
            let orders: Array_Order = self.orders.get(restaurantId)!!;
            _orders.append(orders.Map.get(orderRef.orderId)!!);
        }
        return _orders;
    }

    get fun allRestaurants(): Array_Restaurant {
        let restaurant: map<Address, Restaurant> = self.restaurant;
        let _restaurants: Array_Restaurant = emptyArray_Restaurant();
        foreach (key, value in restaurant){
            _restaurants.append(value);
        }
        return _restaurants;
    }

    get fun restaurantById(restaurantId: Address): Array_Restaurant {
        let restaurant: map<Address, Restaurant> = self.restaurant;
        require(restaurant.get(restaurantId) != null, "Restaurant does not exist");
        let _restaurants: Array_Restaurant = emptyArray_Restaurant();
        _restaurants.append(restaurant.get(restaurantId)!!);
        return _restaurants;
    }

    get fun isVendorPresent(restaurantId: Address): Bool {
        let restaurant: map<Address, Restaurant> = self.restaurant;
        return restaurant.get(restaurantId) != null;
    }
}