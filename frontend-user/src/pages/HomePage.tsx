import ResturantCard from "../components/homePageComp/ResturantCard";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import { useEffect, useState } from "react";
import {
  Array_Item,
  Array_OrderItem,
  Array_Restaurant,
  BillingDetails,
  CreateOrder,
  CreateRestaurant,
  Item,
  OrderItem,
  User,
} from "../contracts/tact_TonFoodMiniApp";
import { Address, Dictionary, toNano } from "@ton/core";
import { useTonConnect } from "../hooks/useTonConnect";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Array_Restaurant>();
  const wallet = useTonWallet();
  const { sender } = useTonConnect();
  console.log(wallet);
  const { foodMiniAppContract } = useFoodMiniAppContract();
  console.log(foodMiniAppContract);

  useEffect(() => {
    async function getRestaurants() {
      if (!foodMiniAppContract) return;
      const _restaurants = await foodMiniAppContract.getAllRestaurants();
      console.log(_restaurants);
      setRestaurants(_restaurants);
    }
    getRestaurants();
  }, [foodMiniAppContract]);

  const createRestauarant = async () => {
    if (!foodMiniAppContract) return;
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "CreateRestaurant",
        restaurantName: "KFC",
        restaurantDescription: "Finger Licking Good",
        restaurantImageUrl:
          "https://images.pexels.com/photos/9195090/pexels-photo-9195090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        vendorDetails: {
          $$type: "User",
          name: "Mukesh",
          location: "Delhi",
          phoneNumber: "1234567890",
          walletAddress: Address.parse(wallet!.account.address),
        } as User,
        menuItems: {
          $$type: "Array_Item",
          Map: Dictionary.empty<number, Item>()
            .set(0, {
              $$type: "Item",
              name: "Chicken Bucket",
              description: "5 pieces of chicken wings",
              price: toNano(0.05),
              imageUrl:
                "https://5.imimg.com/data5/YS/XY/CC/SELLER-97005120/chicken-bucket-with-lid-500x500.jpg",
            } as Item)
            .set(1, {
              $$type: "Item",
              name: "Chicken Burger Meal",
              description: "Chicken Burger with fries and coke",
              price: toNano(0.045),
              imageUrl:
                "https://dukaan.b-cdn.net/700x700/webp/98570/4ea8eab6-24c0-4c0f-862a-1b2de1bd3945.png",
            } as Item),
          length: 2n,
        } as Array_Item,
      } as CreateRestaurant
    );
  };

  const createOrder = async () => {
    if (!foodMiniAppContract) return;
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "CreateOrder",
        restaurantId: Address.parse(wallet!.account.address),
        items: {
          $$type: "Array_OrderItem",
          Map: Dictionary.empty<number, OrderItem>()
            .set(0, {
              $$type: "OrderItem",
              id: 0n,
              quantity: 2n,
            })
            .set(1, {
              $$type: "OrderItem",
              id: 1n,
              quantity: 1n,
            }),
          length: 2n,
        } as Array_OrderItem,
        billingDetails: {
          $$type: "BillingDetails",
          totalAmount: toNano(0.15),
        } as BillingDetails,
        category: 0n,
        userDetails: {
          $$type: "User",
          name: "Pratham",
          location: "Delhi",
          phoneNumber: "8287572322",
          walletAddress: Address.parse(wallet!.account.address),
        } as User,
      } as CreateOrder
    );
  };

  return (
    <>
      <div className="w-full flex justify-end my-2">
        <TonConnectButton />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-primary text-xl mt-4 self-center font-bold">
          Best Resturants For You
        </h1>
        <button onClick={createRestauarant}>create restaurant</button>
        <button onClick={createOrder}>create order</button>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {restaurants?.Map.values().map((restaurant, index) => (
            <ResturantCard key={index} {...restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
