
import {  TonFoodMiniApp } from '../contract/tact_TonFoodMiniApp';
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';

export function useFoodMiniAppContract() {
  const client = useTonClient();
  

  const foodMiniAppContract = useAsyncInitialize(async () => {
    if (!client){
      console.log("no client");
      return;
    }
    const contract = TonFoodMiniApp.fromAddress(
        Address.parse('EQAlBM85xkcm5xpT3ezun8Hoj2NURW2Y7Ec5FbEFjKGK7ip8')
    )
    return client.open(contract) as OpenedContract<TonFoodMiniApp>;
  }, [client]);
  
  

  return {
    foodMiniAppContract, 
  };
}
