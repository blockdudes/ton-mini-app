import { useEffect, useState } from "react";
import {
  Array_Restaurant,
  TonFoodMiniApp,
} from "../contracts/tact_TonFoodMiniApp";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

export function useFoodMiniAppContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | Array_Restaurant>();

  const foodMiniAppContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = TonFoodMiniApp.fromAddress(
      Address.parse("EQD70c_q04lsCxbxnPxldtv46zdqBjo4V4GxG1LPvotkjyh5")
    );
    const openedContract = client.open(
      contract
    ) as OpenedContract<TonFoodMiniApp>;
    return openedContract;
  }, [client]);

  // useEffect(() => {
  //   async function getValue() {
  //     if (!foodMiniAppContract) return;
  //     setVal(null);
  //     const val = await foodMiniAppContract.getAllRestaurants();
  //     setVal(val);
  //   }
  //   getValue();
  // }, [foodMiniAppContract]);

  return {
    foodMiniAppContract,
  };
}
