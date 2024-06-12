import { FaCartArrowDown } from "react-icons/fa6";

const MenuItemsCard = () => {
  return (
    <div className="w-28 sm:w-32 md:w-36 h-full   shadow-xl border-4  rounded-md">
      <div className="w-full h-[40%] shadow-lg">
        <img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="rest-img"
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className=" h-[60%] flex flex-col  justify-between p-1 rounded-b-md">
        <div className="flex justify-between">
          <h1 className="text-sm text-primary">Burger</h1>
          <h1 className="text-sm text-primary font-bold">₹200</h1>
        </div>
        <div className="flex justify-between items-center">
          <button className="text-2xl font-bold">-</button>
          <h1 className="font-bold">1</h1>
          <button className="text-2xl font-bold">+</button>
        </div>
        <button className="bg-secondary py-1 flex justify-center text-tertiary font-bold rounded">
          <FaCartArrowDown />
        </button>
      </div>
    </div>
  );
};

export default MenuItemsCard;
