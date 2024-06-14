import React, { useContext, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import VendorDetailsPage from "./VendorDetailsPage";
import { AddYourRestModal } from "../components/homePageComp/AddYourRestModal";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address, Dictionary, toNano } from "@ton/core";
import {
  Array_Item,
  CreateRestaurant,
  Item,
  User,
} from "../contract/tact_TonFoodMiniApp";
import { GlobalContext } from "../context/Store";
// import { GlobalContext } from "../context/Store";

const HomePage = () => {
  const [isVendor, setIsVendor] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { foodMiniAppContract } = useFoodMiniAppContract();

  const { menuItem } = useContext(GlobalContext);
  const { sender } = useTonConnect();
  const Wallet = useTonWallet();
  console.log(Wallet);
  console.log(foodMiniAppContract);

  useEffect(() => {
    if (Wallet !== null) {
      const getIsVendor = async () => {
        const res = await foodMiniAppContract?.getIsVendorPresent(
          Address.parse(Wallet!.account.address)
        );
        setIsVendor(res || false);
        console.log(res);
      };

      getIsVendor();
    }
  }, [foodMiniAppContract]);

  useEffect(() => {
    if (Wallet !== null) {
      const getAllOrders = async () => {
        const walletAddress = Address.parse(Wallet!.account.address);
        console.log(walletAddress);
        const res = await foodMiniAppContract?.getAllOrders(walletAddress);
        console.log(res?.Map.values());
      };
      getAllOrders();
    }
  }, [foodMiniAppContract]);

  useEffect(() => {
    const getAllMenuItems = async () => {
      const walletAddress = Address.parse(Wallet!.account.address);
      const res = await foodMiniAppContract?.getRestaurantById(walletAddress);
      console.log(res?.Map.values()[0].menu.Map.values());
    };
    getAllMenuItems();
  }, [foodMiniAppContract]);

  const createResturant = async () => {
    if (!foodMiniAppContract) return;
    const res = await foodMiniAppContract.send(
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
          walletAddress: Address.parse(Wallet!.account.address),
        } as User,
        menuItems: {
          $$type: "Array_Item",
          Map: Dictionary.empty<number, Item>().set(0, {
            $$type: "Item",
            name: "Chicken Bucket",
            description: "5 pieces of chicken wings",
            price: toNano(0.05),
            imageUrl:
              "https://5.imimg.com/data5/YS/XY/CC/SELLER-97005120/chicken-bucket-with-lid-500x500.jpg",
          } as Item),
          length: 1n,
        } as Array_Item,
      } as CreateRestaurant
    );

    console.log(res);
  };

  console.log("menuItem", menuItem);

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
            price: menuItem?.price,
            imageUrl: menuItem?.imageUrl,
          } as Item),
          length: 1n,
        },
      }
    );
  };
  if (Wallet === null) return <div>Loading...</div>;
  return (
    <>
      {Wallet !== null ? (
        isVendor ? (
          <VendorDetailsPage addMenuItems={addMenuItems} />
        ) : (
          <>
            <AddYourRestModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              createResturant={createResturant}
            />
            <div
              className="flex min-h-screen justify-center items-center cursor-pointer"
              onClick={() => setOpenModal(!openModal)}
            >
              <div className="w-32 h-32 border-4 flex flex-col justify-center items-center  shadow-lg rounded-md">
                <IoIosAddCircle
                  size={30}
                  color="green"
                  className="cursor-pointer"
                />
                <h1 className="text-primary font-medium">Add your resturant</h1>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex min-h-screen justify-center items-center cursor-pointer">
          <TonConnectButton />
        </div>
      )}
    </>
  );
};

export default HomePage;
