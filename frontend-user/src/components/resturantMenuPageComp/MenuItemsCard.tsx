import { FaCartArrowDown } from "react-icons/fa6";
import { MenuItem } from "../../contracts/tact_TonFoodMiniApp";
import { fromNano } from "@ton/core";
import { useState } from "react";

const MenuItemsCard = ({ menuItem }: { menuItem: MenuItem }) => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className="w-full h-full flex flex-col shadow-xl border-4 rounded-md">
      <div className="w-full aspect-square">
        <img
          src={menuItem.imageUrl}
          alt="rest-img"
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between p-1 rounded-b-md">
        <div>
          <h1 className="font-semibold text-primary">{menuItem.name}</h1>
          <h1 className="text-sm font-semibold text-secondary line-clamp-2">
            {menuItem.description}
          </h1>
        </div>
        <div className="w-full flex flex-col py-1 text-tertiary font-bold">
          <h1 className="w-full flex justify-end text-sm text-primary font-bold">
            {fromNano(menuItem.price)} ton
          </h1>
          {quantity > 0 ? (
            <div className="h-10 w-full flex justify-evenly items-center bg-secondary rounded">
              <button
                className="text-2xl font-bold"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h1 className="font-bold">{quantity}</h1>
              <button
                className="text-2xl font-bold"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="h-10 w-full bg-secondary flex items-center justify-center rounded"
              onClick={() => setQuantity(1)}
            >
              <FaCartArrowDown />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemsCard;
