import { createContext, useState } from "react";
import { useFoodMiniAppContract } from "../hooks/useFoodMiniAppContract";

export const GlobalContext = createContext<any>(null);

const GlobalStateProvider = ({ children }: any) => {
  const [allOrders, setAllOrders] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [orderBasedOnId, setOrderBasedOnId] = useState();
  const { foodMiniAppContract } = useFoodMiniAppContract();
  const [resturantDetails, setResturantDetails] = useState({
    resturantName: "",
    resturantDescription: "",
    resturantImageUrl: "",
    vendorName: "",
    vendorLocation: "",
    vendorNumber: "",
    menuName: "",
    menuPrice: "",
    menuDescription: "",
    menuImageUrl: "",
  });
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [resturantById, setResturantById] = useState({});
  console.log("foodMiniAppContract", foodMiniAppContract);
  return (
    <GlobalContext.Provider
      value={{
        allOrders,
        setAllOrders,
        allMenuItems,
        setAllMenuItems,
        orderBasedOnId,
        setOrderBasedOnId,
        foodMiniAppContract,
        resturantDetails,
        setResturantDetails,
        resturantById,
        setResturantById,
        menuItem,
        setMenuItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
