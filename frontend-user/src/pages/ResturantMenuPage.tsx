import { useEffect, useState } from "react";
import MenuItemsCard from "../components/resturantMenuPageComp/MenuItemsCard";
import { IoArrowBackCircle } from "react-icons/io5";
import { Restaurant } from "../contracts/tact_TonFoodMiniApp";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import { Address } from "@ton/core";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

const ResturantMenuPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const resturantId = window.location.pathname.split("/menu/")[1];
  const { foodMiniAppContract } = useFoodMiniAppContract();

  useEffect(() => {
    async function getRestaurants() {
      if (!foodMiniAppContract) return;
      const _restaurant = await foodMiniAppContract.getRestaurantById(
        Address.parse(resturantId)
      );
      setRestaurant(_restaurant.Map.values()[0]);
    }
    getRestaurants();
  }, [foodMiniAppContract]);

  if (restaurant === undefined)
    return (
      <div className="h-screen w-screen flex justify-center items-center text-xl text-primary">
        Loading...
      </div>
    );

  return (
    <div className="h-screen w-full flex flex-col pt-2 overflow-scroll">
      <div className="max-h-64 items-center flex flex-col">
        <div className="min-h-10 max-h-28 sm:max-h-16 aspect-square rounded-full border-4 ">
          <img
            src={restaurant.imageUrl}
            alt="logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-secondary font-bold text-sm md:text-lg lg:text-lg xl:text-lg">
          KFC
        </h1>
        <h1 className="text-secondary font-bold text-sm md:text-lg lg:text-lg xl:text-lg">
          {restaurant.vendorDetails.location}
        </h1>
        <h1 className="text-primary font-bold text-sm md:text-lg lg:text-lg xl:text-lg line-clamp-3">
          {restaurant.description}
        </h1>
      </div>
      <div className="w-full flex flex-col gap-3 p-2">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            {state === true && (
              <IoArrowBackCircle
                size={26}
                onClick={() => window.history.back()}
                className="cursor-pointer"
              />
            )}
            <h1 className="text-primary text-xl font-bold">Explore our menu</h1>
          </div>
          {state !== true && (
            <button
              className="absolute right-4 top-4"
              onClick={() => navigate(`/recent-orders/${resturantId}`)}
            >
              <FaHistory size={25} />
            </button>
          )}
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {restaurant.menu.Map.values().map((item, index) => (
            <MenuItemsCard
              key={index}
              restaurant={restaurant}
              menuItem={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResturantMenuPage;
