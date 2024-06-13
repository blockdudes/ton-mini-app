import ResturantCard from "../components/homePageComp/ResturantCard";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import { useEffect, useState } from "react";
import { Array_Restaurant } from "../contracts/tact_TonFoodMiniApp";

const HomePage = () => {
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
    <>
      <div className="w-full flex justify-center my-2">
        <TonConnectButton />
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
    </>
  );
};

export default HomePage;
