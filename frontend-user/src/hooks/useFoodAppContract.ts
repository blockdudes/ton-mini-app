import { TonFoodMiniApp } from "../contracts/tact_TonFoodMiniApp";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

export function useFoodMiniAppContract() {
  const client = useTonClient();

  const foodMiniAppContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = TonFoodMiniApp.fromAddress(
      Address.parse("EQD5miTsSVLaL8R-oed20JD4arUApeVT3sjG6_Fq4GSGauto")
    );
    const openedContract = client.open(
      contract
    ) as OpenedContract<TonFoodMiniApp>;
    return openedContract;
  }, [client]);

  return {
    foodMiniAppContract,
  };
}
