import { useEffect, useState } from "react";
import MenuItemsCard from "../components/resturantMenuPageComp/MenuItemsCard";
import { IoArrowBackCircle } from "react-icons/io5";
import { Restaurant } from "../contracts/tact_TonFoodMiniApp";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import { Address } from "@ton/core";
import { useLocation } from "react-router-dom";

const ResturantMenuPage = () => {
  const { state } = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const resturantId = window.location.pathname.split("/menu/")[1];
  const { foodMiniAppContract } = useFoodMiniAppContract();
  console.log(foodMiniAppContract);

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
      <div className="h-screen w-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="w-full flex flex-col pt-2">
      <div className="h-[30%] items-center flex flex-col">
        <div className="w-20 h-20 sm:w-24 sm:h-24  rounded-full border-4 ">
          <img
            src={restaurant.imageUrl}
            alt="logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-primary font-caveat font-bold sm:text-lg">KFC</h1>
        <h1 className="text-primary font-caveat font-bold sm:text-lg">
          {restaurant.vendorDetails.location}
        </h1>
        <h1 className="text-secondary  font-bold sm:text-lg">
          {restaurant.description}
        </h1>
      </div>
      <div className="h-[70%] w-full flex flex-col gap-3 mt-12 p-2">
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
