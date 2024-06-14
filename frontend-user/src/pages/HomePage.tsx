import ResturantCard from "../components/homePageComp/ResturantCard";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import { useEffect, useState } from "react";
import { Array_Restaurant } from "../contracts/tact_TonFoodMiniApp";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Array_Restaurant>();
  const { foodMiniAppContract } = useFoodMiniAppContract();

  useEffect(() => {
    async function getRestaurants() {
      if (!foodMiniAppContract) return;
      const _restaurants = await foodMiniAppContract.getAllRestaurants();
      console.log(_restaurants);
      setRestaurants(_restaurants);
    }
    getRestaurants();
  }, [foodMiniAppContract]);

  return (
    <div className="h-screen w-full">
      <div className="w-full flex justify-center py-2">
        <TonConnectButton />
        <button
          className="absolute right-4 top-4"
          onClick={() => navigate("/recent-orders")}
        >
          <FaHistory size={25} />
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-primary text-xl mt-4 self-center font-bold">
          Best Resturants For You
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {restaurants?.Map.values().map((restaurant, index) => (
            <ResturantCard key={index} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
