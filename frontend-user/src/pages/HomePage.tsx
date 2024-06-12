import React from "react";
import { AddYourRestModal } from "../components/homePageComp/AddYourRestModal";
import ResturantCard from "../components/homePageComp/ResturantCard";
import { IoIosAddCircle } from "react-icons/io";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";

const HomePage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const wallet = useTonWallet();
  console.log(wallet);
  const { foodMiniAppContract } = useFoodMiniAppContract();
  console.log(foodMiniAppContract);

  const createResturant = async () => {
    const res = await foodMiniAppContract;
  };

  const resturants = [
    {
      name: "KFC",
      image:
        "https://images.pexels.com/photos/9195090/pexels-photo-9195090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "McDonalds",
      image:
        "https://images.pexels.com/photos/15776303/pexels-photo-15776303/free-photo-of-people-eating-in-mcdonalds-restaurant.jpeg",
    },
    {
      name: "Burger King",
      image:
        "https://images.pexels.com/photos/14534749/pexels-photo-14534749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Pizza Hut",
      image:
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Subway",
      image:
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <>
      <TonConnectButton />
      <div className="flex flex-col items-center gap-4">
        <AddYourRestModal openModal={openModal} setOpenModal={setOpenModal} />
        <h1 className="text-primary text-xl mt-4 self-center font-bold">
          Best Resturants For You
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          <div
            className="w-32 h-32 border-4 flex flex-col justify-center items-center  shadow-lg rounded-md"
            onClick={() => setOpenModal(!openModal)}
          >
            <IoIosAddCircle
              size={30}
              color="green"
              className="cursor-pointer"
            />
            <h1 className="text-primary font-medium">Add your resturant</h1>
          </div>
          {resturants.map((item, index) => (
            <ResturantCard key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
