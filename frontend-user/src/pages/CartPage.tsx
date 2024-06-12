import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-4 px-2">
      <div className="flex items-center gap-2">
        <IoArrowBackCircle
          size={26}
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <h1 className="text-primary text-xl font-bold">Your Orders</h1>
      </div>
      <div className="flex flex-col mt-4 gap-2 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <div className=" flex justify-between p-2 rounded-md">
            <div className="flex gap-2">
              <img
                className="w-12 h-12 rounded-full"
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <div className="flex flex-col">
                <h1>Burger</h1>
                <h1 className="text-secondary font-bold">Quantity: 1x</h1>
              </div>
            </div>
            <div>
              <h1 className="text-primary font-bold">200 ton</h1>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-green-600 w-full p-2 rounded-md text-tertiary font-bold"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;
