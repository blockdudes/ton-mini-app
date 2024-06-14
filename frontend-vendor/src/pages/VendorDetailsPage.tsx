import React, { useContext, useEffect } from "react";
import { AllOrdersTable } from "../components/vendorDetailsPageComp/AllOrdersTable";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import MenuItemsDetails from "../components/vendorDetailsPageComp/MenuItemsDetails";
import EditProfile from "../components/vendorDetailsPageComp/EditProfile";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";
import { GlobalContext } from "../context/Store";

const VendorDetailsPage = ({ addMenuItems }: any) => {
  const [activeTab, setActiveTab] = React.useState("manageOrders");
  const Wallet = useTonWallet();
  const { foodMiniAppContract } = useFoodMiniAppContract();
  const { setAllOrders, setAllMenuItems, setResturantById, resturantById } =
    useContext(GlobalContext);

  useEffect(() => {
    if (Wallet !== null) {
      const getAllOrders = async () => {
        const walletAddress = Address.parse(Wallet!.account.address);
        console.log(walletAddress);
        const res = await foodMiniAppContract?.getAllOrders(walletAddress);
        setAllOrders(res?.Map.values());
      };
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
  if (!resturantById) return <div>Loading...</div>;
  return (
    <div className="flex flex-col pt-2">
      <div className="self-end p-2">
        <TonConnectButton />
      </div>
      {/* resturant info */}
      <div className="h-[30%] items-center flex flex-col">
        <div className="w-20 h-20 sm:w-24 sm:h-24  rounded-full border-4 ">
          <img
            src={resturantById[0]?.imageUrl}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className="text-primary  font-caveat font-bold sm:text-lg">
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
                className="font-caveat font-bold"
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
            <MenuItemsDetails addMenuItems={addMenuItems} />
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
