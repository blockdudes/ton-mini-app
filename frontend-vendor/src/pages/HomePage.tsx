import React from "react";
import { IoIosAddCircle } from "react-icons/io";

const HomePage = () => {
  const [isVendor, setIsVendor] = React.useState(false);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isVendor ? (
        <div>Welcome </div>
      ) : (
        <div className="w-32 h-32 border-4 flex flex-col justify-center items-center  shadow-lg rounded-md">
          <IoIosAddCircle size={30} color="green" className="cursor-pointer" />
          <h1 className="text-primary font-medium">Add your resturant</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
