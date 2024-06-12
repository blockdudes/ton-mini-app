import React from "react";
import MenuItemsCard from "../components/resturantMenuPageComp/MenuItemsCard";
import { IoArrowBackCircle } from "react-icons/io5";

const ResturantMenuPage = () => {
  return (
    <div className="flex flex-col pt-2">
      {/* resturant info */}
      <div className="h-[30%] items-center flex flex-col">
        <div className="w-20 h-20 sm:w-24 sm:h-24  rounded-full border-4 ">
          <img
            src="https://images.pexels.com/photos/9195090/pexels-photo-9195090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-primary  font-caveat font-bold sm:text-lg">KFC</h1>
        <h1 className="text-primary font-caveat font-bold sm:text-lg">
          D-77-A, Cannaught Place,New Delhi
        </h1>
        <h1 className="text-secondary  font-bold sm:text-lg">
          *** Delight in every bite ***
        </h1>
      </div>
      {/* menu */}
      <div className="h-[70%] flex   flex-col gap-3 mt-12 p-2">
        <div className="flex items-center gap-2">
          <IoArrowBackCircle
            size={26}
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          <h1 className="text-primary text-xl font-bold">Explore our menu</h1>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5  gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <MenuItemsCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResturantMenuPage;
