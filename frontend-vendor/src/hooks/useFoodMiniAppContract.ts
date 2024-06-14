
import {  TonFoodMiniApp } from '../contract/tact_TonFoodMiniApp';
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';

const CONTRACT_ADDRESS = 'EQDvDTXfqYCWDsmJKBkT8Ufar0oDSFNAUgioT7RcppFXaS91';

export function useFoodMiniAppContract() {
  const client = useTonClient();
  

  const foodMiniAppContract = useAsyncInitialize(async () => {
    if (!client){
      console.log("no client");
      return;
    }
    const contract = TonFoodMiniApp.fromAddress(
        Address.parse(CONTRACT_ADDRESS)
    )
    return client.open(contract) as OpenedContract<TonFoodMiniApp>;
  }, [client]);
  
  

  return {
    foodMiniAppContract, 
  };
}
