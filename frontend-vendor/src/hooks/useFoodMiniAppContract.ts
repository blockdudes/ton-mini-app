
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
        Address.parse('EQAGNqYUM5Bj4rkhqlZfy4gCkxtT6QVJRI5hIUfecXt6b_HP')
    )
    return client.open(contract) as OpenedContract<TonFoodMiniApp>;
  }, [client]);
  
  

  return {
    foodMiniAppContract, 
  };
}
