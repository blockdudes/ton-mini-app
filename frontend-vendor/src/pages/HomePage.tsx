import React, { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import VendorDetailsPage from "./VendorDetailsPage";
import { AddYourRestModal } from "../components/homePageComp/AddYourRestModal";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";

import { Address } from "@ton/core";

// import { GlobalContext } from "../context/Store";

const HomePage = () => {
  const [isVendor, setIsVendor] = React.useState<boolean>();
  const [openModal, setOpenModal] = React.useState(false);
  const { foodMiniAppContract } = useFoodMiniAppContract();

  const Wallet = useTonWallet();
  console.log(Wallet);
  console.log(foodMiniAppContract);

  useEffect(() => {
    if (Wallet !== null) {
      const getIsVendor = async () => {
        const res = await foodMiniAppContract?.getIsVendorPresent(
          Address.parse(Wallet!.account.address)
        );
        setIsVendor(res || false);
        console.log(res);
      };

      getIsVendor();
    }
  }, [foodMiniAppContract]);

  return (
    <>
      {Wallet != undefined ? (
        isVendor ? (
          <VendorDetailsPage />
        ) : (
          <>
            <AddYourRestModal
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <div
              className="flex min-h-screen justify-center items-center cursor-pointer"
              onClick={() => setOpenModal(!openModal)}
            >
              <div className="w-32 h-32 border-4 flex flex-col justify-center items-center  shadow-lg rounded-md">
                <IoIosAddCircle
                  size={30}
                  color="green"
                  className="cursor-pointer"
                />
                <h1 className="text-primary font-medium text-xs text-center">
                  Add your resturant
                </h1>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex min-h-screen justify-center items-center cursor-pointer">
          <TonConnectButton />
        </div>
      )}
    </>
  );
};

export default HomePage;
