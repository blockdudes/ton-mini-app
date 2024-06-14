import React, { useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";
import VendorDetailsPage from "./VendorDetailsPage";
import { AddYourRestModal } from "../components/homePageComp/AddYourRestModal";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { IoReload } from "react-icons/io5";
import { GlobalContext } from "../context/Store";

// import { GlobalContext } from "../context/Store";

const HomePage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const { isVendor } = useContext(GlobalContext);

  const Wallet = useTonWallet();

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
              className={` flex flex-col gap-2 min-h-screen justify-center items-center cursor-pointer`}
              onClick={() => setOpenModal(!openModal)}
            >
              <IoReload onClick={() => window.location.reload()} />
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
