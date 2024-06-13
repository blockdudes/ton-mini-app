import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { fromNano } from "@ton/core";
import { CiShoppingCart } from "react-icons/ci";

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full px-2">
      <div className="h-[10%] flex items-center pt-4 gap-2">
        <IoArrowBackCircle
          size={26}
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <h1 className="text-primary text-xl font-bold">Your Orders</h1>
      </div>
      {cart.items.length > 0 ? (
        <div className="w-full h-[90%] flex flex-col justify-between pb-4 ">
          <div className="flex flex-col mt-4 gap-2">
            {cart.items.map((item, index) => (
              <div key={index} className="flex justify-between p-2 rounded-md">
                <div className="flex gap-2">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.imageUrl}
                    alt="Product Image"
                  />
                  <div className="flex flex-col">
                    <h1>{item.name}</h1>
                    <h1 className="text-secondary font-bold">
                      Quantity: {Number(item.quantity)}x
                    </h1>
                  </div>
                </div>
                <div className="w-16 flex flex-col items-end">
                  <h1 className="text-primary font-bold">
                    {(
                      Number(item.quantity) * Number(fromNano(item.price))
                    ).toFixed(2)}{" "}
                    ton
                  </h1>
                  <div className="w-full flex justify-evenly items-center border border-secondary rounded-full gap-2 px-2">
                    <button
                      className="font-bold"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <h1 className="font-bold text-sm">
                      {Number(item.quantity)}
                    </h1>
                    <button
                      className="font-bold"
                      onClick={() => addToCart(cart.restaurant, item)}
                    >
                      +
                    </button>
                  </div>
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
      ) : (
        <div className="h-[90%] w-full flex flex-col justify-center items-center text-xl font-semibold">
          <CiShoppingCart size={50} />
          No items in cart
        </div>
      )}
    </div>
  );
};

export default CartPage;
