import React from "react";
import { AccordionCheckout } from "../components/checkoutPageComp/AccordionCheckout";
import { IoArrowBackCircle } from "react-icons/io5";
import { ModalComp } from "../components/checkoutPageComp/ModalComp";

const CheckoutPage = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 px-2">
      <div className="flex items-center gap-2">
        <IoArrowBackCircle
          size={26}
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <h1 className="text-primary text-xl font-bold">Checkout</h1>
      </div>
      <div className=" p-2 rounded-md border-4">
        <div className="flex gap-2">
          <img
            className="w-30 h-24 rounded-md"
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div>
            <h1 className="text-primary font-bold">Order #1234545</h1>
            <h1 className="text-primary"> Perfect lunch from KFC</h1>
            <h1 className="text-secondary font-bold">KFC</h1>
          </div>
        </div>
      </div>
      <div className=" p-2 rounded-md border-4">
        <div className="flex  font-bold justify-between">
          <h1>
            Hot Dog <span>x 1</span>
          </h1>
          <h1>₹200</h1>
        </div>
        <div className="flex  font-bold justify-between">
          <h1>Free Delivery</h1>
          <h1>₹0</h1>
        </div>
        <div className="flex  font-bold justify-between">
          <h1>Total</h1>
          <h1>₹0</h1>
        </div>
      </div>
      <div className=" p-2 rounded-md border-4">
        <AccordionCheckout />
      </div>
    </div>
  );
};

export default CheckoutPage;
