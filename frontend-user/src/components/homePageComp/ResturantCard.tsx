import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../contracts/tact_TonFoodMiniApp";

const ResturantCard = (restaurant: Restaurant) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-32 h-32 shadow-xl border-4 rounded-md cursor-pointer"
      onClick={() =>
        navigate(`/menu/${restaurant.restaurantId}`, { state: true })
      }
    >
      <div className="w-full h-[75%]">
        <img
          src={restaurant.imageUrl}
          alt="rest-img"
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className="bg-secondary h-[25%] flex justify-center items-center rounded-b-md">
        <h1 className="text-sm text-tertiary truncate">{restaurant.name}</h1>
      </div>
    </div>
  );
};

export default ResturantCard;
