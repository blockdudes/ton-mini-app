import React, { ReactNode, createContext, useContext, useState } from "react";
import { Address, Dictionary, OpenedContract, Sender, toNano } from "@ton/core";
import {
  CreateOrder,
  MenuItem,
  OrderItem,
  Restaurant,
  TonFoodMiniApp,
  User,
} from "../contracts/tact_TonFoodMiniApp";

export type FoodItem = MenuItem & {
  quantity: bigint;
};

export type Cart = {
  restaurant: Restaurant;
  items: FoodItem[];
  userDetails: User;
  category: bigint;
};

export type CartContextType = {
  cart: Cart;
  setCategory: (category: bigint) => void;
  setUserInfo: (user: User) => void;
  addToCart: (restaurant: Restaurant, item: MenuItem) => void;
  removeFromCart: (item: MenuItem) => void;
  createOrder: (
    foodMiniAppContract: OpenedContract<TonFoodMiniApp>,
    sender: Sender
  ) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const zeroAddress = Address.parse(
  "0:0000000000000000000000000000000000000000000000000000000000000000"
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initState: Cart = {
    restaurant: {
      $$type: "Restaurant",
      restaurantId: zeroAddress,
      name: "",
      imageUrl: "",
      description: "",
      vendorDetails: {
        $$type: "User",
        walletAddress: zeroAddress,
        name: "",
        phoneNumber: "",
        location: "",
      },
      menu: {
        $$type: "Array_MenuItem",
        Map: Dictionary.empty<number, MenuItem>(),
        length: 0n,
      },
    },
    items: [],
    userDetails: {
      $$type: "User",
      name: "",
      location: "",
      phoneNumber: "",
      walletAddress: zeroAddress,
    },
    category: 0n,
  };
  const [cart, setCart] = useState<Cart>(initState);

  const setCategory = (category: bigint) => {
    let updatedCart: Cart = { ...cart };
    updatedCart.category = category;
    setCart(updatedCart);
  };

  const setUserInfo = (user: User) => {
    let updatedCart: Cart = { ...cart };
    updatedCart.userDetails = user;
    setCart(updatedCart);
  };

  const addToCart = (restaurant: Restaurant, item: MenuItem) => {
    let updatedCart: Cart = { ...cart };
    if (cart.restaurant.restaurantId !== restaurant.restaurantId) {
      updatedCart = initState;
      updatedCart.restaurant = restaurant;
    }
    const index = updatedCart.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      updatedCart.items[index].quantity += 1n;
    } else {
      let _foodItem: FoodItem = {
        ...item,
        quantity: 1n,
      };
      updatedCart.items.push(_foodItem);
    }
    setCart(updatedCart);
  };

  const removeFromCart = (item: MenuItem) => {
    let updatedCart: Cart = { ...cart };
    const index = updatedCart.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      updatedCart.items[index].quantity -= 1n;
      if (updatedCart.items[index].quantity === 0n) {
        updatedCart.items = updatedCart.items.filter((i) => i.id !== item.id);
      }
      if (updatedCart.items.length === 0) {
        updatedCart = initState;
      }
      setCart(updatedCart);
    }
  };

  const createOrder = async (
    foodMiniAppContract: OpenedContract<TonFoodMiniApp>,
    sender: Sender
  ) => {
    let totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0n
    );
    const orderItems: Dictionary<number, OrderItem> = Dictionary.empty<
      number,
      OrderItem
    >();
    const order: CreateOrder = {
      $$type: "CreateOrder",
      restaurantId: cart.restaurant.restaurantId,
      items: {
        $$type: "Array_OrderItem",
        Map: orderItems,
        length: BigInt(orderItems.size),
      },
      userDetails: {
        $$type: "User",
        walletAddress: cart.userDetails.walletAddress,
        name: cart.userDetails.name,
        phoneNumber: cart.userDetails.phoneNumber,
        location: cart.userDetails.location,
      },
      billingDetails: {
        $$type: "BillingDetails",
        totalAmount: totalPrice,
      },
      category: cart.category,
    };
    console.log(JSON.stringify(order));

    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      order
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCategory,
        setUserInfo,
        addToCart,
        removeFromCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
