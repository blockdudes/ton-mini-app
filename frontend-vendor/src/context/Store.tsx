import { createContext, useState } from "react";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address, Dictionary, toNano } from "@ton/core";
import { useTonWallet } from "@tonconnect/ui-react";
import {
  Array_Item,
  CreateRestaurant,
  Item,
  User,
} from "../contract/tact_TonFoodMiniApp";
import { useNavigate } from "react-router";

export const GlobalContext = createContext<any>(null);

const GlobalStateProvider = ({ children }: any) => {
  const { sender } = useTonConnect();
  const navigate = useNavigate();
  const Wallet = useTonWallet();
  const [allOrders, setAllOrders] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [orderBasedOnId, setOrderBasedOnId] = useState();
  const { foodMiniAppContract } = useFoodMiniAppContract();
  const [resturantDetails, setResturantDetails] = useState({
    resturantName: "",
    resturantDescription: "",
    resturantImageUrl: "",
    vendorName: "",
    vendorLocation: "",
    vendorNumber: "",
    menuName: "",
    menuPrice: "",
    menuDescription: "",
    menuImageUrl: "",
  });
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [newProfileDetails, setNewProfileDetails] = useState({
    restaurantName: "",
    restaurantImageUrl: "",
    restaurantDescription: "",
    vendorName: "",
    vendorImageUrl: "",
    vendorPhoneNumber: "",
    vendorLocation: "",
  });
  const [resturantById, setResturantById] = useState({});
  console.log("foodMiniAppContract", foodMiniAppContract);

  const createResturant = async () => {
    if (!foodMiniAppContract) return;
    const res = await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },

      {
        $$type: "CreateRestaurant",
        restaurantName: resturantDetails?.resturantName,
        restaurantDescription: resturantDetails?.resturantDescription,
        restaurantImageUrl: resturantDetails?.resturantImageUrl,
        vendorDetails: {
          $$type: "User",
          name: resturantDetails?.vendorName,
          location: resturantDetails?.vendorLocation,
          phoneNumber: resturantDetails?.vendorNumber,
          walletAddress: Address.parse(Wallet!.account.address),
        } as User,
        menuItems: {
          $$type: "Array_Item",
          Map: Dictionary.empty<number, Item>().set(0, {
            $$type: "Item",
            name: resturantDetails?.menuName,
            description: resturantDetails?.menuDescription,
            price: toNano(resturantDetails?.menuPrice),
            imageUrl: resturantDetails?.menuImageUrl,
          } as Item),
          length: 1n,
        } as Array_Item,
      } as CreateRestaurant
    );
    navigate("/");

    console.log(res);
  };

  const addMenuItems = async () => {
    if (!foodMiniAppContract) return;

    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "AddMenuItems",
        restaurantId: Address.parse(Wallet!.account.address),
        items: {
          $$type: "Array_Item",
          Map: Dictionary.empty<number, Item>().set(0, {
            $$type: "Item",
            name: menuItem?.name,
            description: menuItem?.description,
            price: toNano(menuItem?.price),
            imageUrl: menuItem?.imageUrl,
          } as Item),
          length: 1n,
        },
      }
    );
    navigate("/");
  };

  const updateProfile = async () => {
    if (!foodMiniAppContract) return;

    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "UpdateRestaurantDetails",
        restaurantId: Address.parse(Wallet!.account.address),
        restaurantName: newProfileDetails?.restaurantName,
        restaurantImageUrl: newProfileDetails?.restaurantImageUrl,
        restaurantDescription: newProfileDetails?.restaurantDescription,
        vendorWalletAddress: Address.parse(Wallet!.account.address),
        vendorName: newProfileDetails?.vendorName,
        vendorImageUrl: newProfileDetails?.vendorImageUrl,
        vendorPhoneNumber: newProfileDetails?.vendorPhoneNumber,
        vendorLocation: newProfileDetails?.vendorLocation,
      }
    );
    navigate("/");
  };
  return (
    <GlobalContext.Provider
      value={{
        allOrders,
        setAllOrders,
        allMenuItems,
        setAllMenuItems,
        orderBasedOnId,
        setOrderBasedOnId,
        foodMiniAppContract,
        resturantDetails,
        setResturantDetails,
        resturantById,
        setResturantById,
        menuItem,
        setMenuItem,
        createResturant,
        addMenuItems,
        newProfileDetails,
        setNewProfileDetails,
        updateProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
