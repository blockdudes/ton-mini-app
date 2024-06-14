import React, { useContext, useEffect } from "react";
import { AllOrdersTable } from "../components/vendorDetailsPageComp/AllOrdersTable";
import { Spinner, Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import MenuItemsDetails from "../components/vendorDetailsPageComp/MenuItemsDetails";
import EditProfile from "../components/vendorDetailsPageComp/EditProfile";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";
import { GlobalContext } from "../context/Store";
import { FaInfoCircle } from "react-icons/fa";
import { InfoModal } from "../components/vendorDetailsPageComp/InfoModal";

const VendorDetailsPage = () => {
  const [activeTab, setActiveTab] = React.useState("manageOrders");
  const [openModal, setOpenModal] = React.useState(false);
  const Wallet = useTonWallet();
  const { foodMiniAppContract } = useFoodMiniAppContract();
  const { setAllOrders, setAllMenuItems, setResturantById, resturantById } =
    useContext(GlobalContext);

  const getAllOrders = async () => {
    const walletAddress = Address.parse(Wallet!.account.address);
    console.log(walletAddress);
    const res = await foodMiniAppContract?.getAllOrders(walletAddress);
    setAllOrders(res?.Map.values());
  };

  useEffect(() => {
    if (Wallet !== null) {
      getAllOrders();
    }
  }, [foodMiniAppContract, activeTab]);

  useEffect(() => {
    const getAllMenuItems = async () => {
      const walletAddress = Address.parse(Wallet!.account.address);
      const res = await foodMiniAppContract?.getRestaurantById(walletAddress);
      setAllMenuItems(res?.Map.values()[0].menu.Map.values());
      setResturantById(res?.Map.values());
    };
    getAllMenuItems();
  }, [foodMiniAppContract, activeTab]);

  const data = [
    {
      label: "Manage Orders",
      value: "manageOrders",
    },
    {
      label: "Menu Items",
      value: "menuItems",
    },
    {
      label: "Edit Profile",
      value: "editProfile",
    },
  ];
  if (!resturantById)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Spinner
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  return (
    <div className="flex w-full flex-col pt-2">
      <InfoModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className=" w-full flex justify-between">
        <TonConnectButton />
        <FaInfoCircle
          className="cursor-pointer"
          onClick={() => setOpenModal(!openModal)}
        />
      </div>
      {/* resturant info */}
      <div className="h-[30%] items-center flex flex-col">
        <div className="w-20 h-20 sm:w-24 sm:h-24  rounded-full border-4 ">
          <img
            src={resturantById[0]?.imageUrl}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-primary  font-bold sm:text-lg">
          {resturantById[0]?.name}
        </h1>

        <h1 className="text-secondary  font-bold sm:text-lg">
          *** {resturantById[0]?.description} ***
        </h1>
      </div>

      {/* menu */}
      <div className="h-[70%] flex   flex-col gap-3 mt-12 p-2">
        <Tabs value="manageOrders">
          <TabsHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {data.map(({ label, value }) => (
              <Tab
                onClick={() => setActiveTab(value)}
                className="font-bold text-xs"
                key={value}
                value={value}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        {activeTab === "manageOrders" && (
          <div className="flex items-center gap-2">
            <AllOrdersTable />
          </div>
        )}
        {activeTab === "menuItems" && (
          <div className="flex items-center gap-2">
            <MenuItemsDetails />
          </div>
        )}
        {activeTab === "editProfile" && (
          <div className="flex items-center gap-2">
            <EditProfile />
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5  gap-3"></div>
      </div>
    </div>
  );
};

export default VendorDetailsPage;
