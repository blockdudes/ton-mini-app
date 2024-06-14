import { Option, Select } from "@material-tailwind/react";
import { Address, fromNano, toNano } from "@ton/core";
import { useTonWallet } from "@tonconnect/ui-react";
import { useContext, useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useParams } from "react-router";
import { GlobalContext } from "../context/Store";
import {
  formatUnixTimestamp,
  getOrderType,
  getStatus,
} from "../utils/helperFunctions";
import { Order } from "../contract/tact_TonFoodMiniApp";
import { useTonConnect } from "../hooks/useTonConnect";

const status = ["InQueue", "Accepted", "Delivered", "Cancelled", "Rejected"];

const ManageOrdersPage = () => {
  const { orderId } = useParams();
  const [updatedStatus, setUpdatedStatus] = useState("InQueue");
  const Wallet = useTonWallet();
  const { sender } = useTonConnect();
  const {
    orderBasedOnId,
    setOrderBasedOnId,
    foodMiniAppContract,
    allMenuItems,
    setAllMenuItems,
  } = useContext(GlobalContext);
  console.log("wallet address", Wallet);
  console.log("foodMiniAppContract", foodMiniAppContract);
  console.log("orderId", orderId);

  useEffect(() => {
    console.log("Inside useEffect", orderId);
    const getOrderBasedOnOrderId = async () => {
      if (!foodMiniAppContract) {
        console.log("no foodMiniAppContract");
        return;
      }
      if (!orderId) {
        console.log("no orderId");
        return;
      }
      if (!Wallet) {
        console.log("no Wallet");
        return;
      }
      const walletAddress = Address.parse(Wallet!.account.address);
      console.log("wallet", walletAddress);
      const res = await foodMiniAppContract?.getAllOrders(walletAddress);
      console.log("allOrders--->", res?.Map.values());
      const foundOrder = res?.Map.values().find(
        (order: Order) => order.orderId == BigInt(orderId)
      );
      setOrderBasedOnId(foundOrder);
      console.log("foundOrder", foundOrder);
    };
    getOrderBasedOnOrderId();
  }, [foodMiniAppContract, Wallet, orderId]);

  console.log("orderBasedOnId", orderBasedOnId);
  console.log("updatedStatus", updatedStatus);
  console.log("allMenuItems", allMenuItems);

  const acceptOrder = async (id: BigInt) => {
    if (!foodMiniAppContract) return;

    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "AcceptOrder",
        restaurantId: Address.parse(Wallet!.account.address),
        orderId: id,
      }
    );
  };

  const deliverOrder = async (id: BigInt) => {
    if (!foodMiniAppContract) return;
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "DeliverOrder",
        restaurantId: Address.parse(Wallet!.account.address),
        orderId: id,
      }
    );
  };

  const cancelOrder = async (id: BigInt) => {
    if (!foodMiniAppContract) return;
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "CancelOrder",
        restaurantId: Address.parse(Wallet!.account.address),
        orderId: id,
      }
    );
  };

  const rejectOrder = async (id: BigInt) => {
    if (!foodMiniAppContract) return;
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "RejectOrder",
        restaurantId: Address.parse(Wallet!.account.address),
        orderId: id,
      }
    );
  };

  useEffect(() => {
    const getAllMenuItems = async () => {
      const walletAddress = Address.parse(Wallet!.account.address);
      const res = await foodMiniAppContract?.getRestaurantById(walletAddress);
      setAllMenuItems(res?.Map.values()[0].menu.Map.values());
    };
    getAllMenuItems();
  }, [foodMiniAppContract]);

  useEffect(() => {
    if (updatedStatus === "Accepted") {
      acceptOrder(orderBasedOnId?.orderId);
    }
    if (updatedStatus === "Delivered") {
      deliverOrder(orderBasedOnId?.orderId);
    }
    if (updatedStatus === "Cancelled") {
      cancelOrder(orderBasedOnId?.orderId);
    }
    if (updatedStatus === "Rejected") {
      rejectOrder(orderBasedOnId?.orderId);
    }
  }, [updatedStatus]);

  const filterOrdersFromAllMenuItems = () => {
    console.log("allMenuItems", allMenuItems);
    console.log("orderBasedOnId", orderBasedOnId);

    //filter object from allMenuItems based on all OrderIds that is present in orderBasedOnId array of object

    const filteredMenuItems = allMenuItems.filter((item) => {
      console.log("item", item);
      return orderBasedOnId.items.Map.values()?.includes(item.id);
    });
    console.log("filteredMenuItems", filteredMenuItems);
    return filteredMenuItems;
  };

  if (!orderBasedOnId || orderBasedOnId === undefined)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="pt-4 flex flex-col gap-4 px-2">
      <div className="flex items-center gap-2">
        <IoArrowBackCircle
          size={26}
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <h1 className="text-primary text-xl font-bold">Order Details</h1>
      </div>
      <div className=" p-2 rounded-md border-4">
        <div className="flex gap-2">
          <img
            className="w-30 h-24 rounded-md"
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div>
            <h1 className="text-primary font-bold">
              Order #{Number(orderBasedOnId?.orderId)}
            </h1>
            <h1 className="text-primary">
              {formatUnixTimestamp(Number(orderBasedOnId?.createdAt))}
            </h1>
            <h1 className="text-secondary font-bold">
              Delivery Address: {orderBasedOnId?.userDetails.location}
            </h1>
          </div>
        </div>
      </div>
      <div className=" p-2 rounded-md border-4">
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Order Status:</h1>
          <h1 className="text-primary">{getStatus(orderBasedOnId?.status)}</h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Order Type:</h1>
          <h1 className="text-primary">
            {getOrderType(orderBasedOnId?.category)}
          </h1>
        </div>
        {/* <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Payment Method:</h1>
          <h1 className="text-primary">Cash on delivery</h1>
        </div> */}
      </div>
      <div className=" p-2 rounded-md border-4">
        <div className="flex  font-bold justify-between">
          {filterOrdersFromAllMenuItems()}
          <h1>
            <span>x 1</span>
          </h1>
          <h1>₹200</h1>
        </div>
        <div className="flex  font-bold justify-between">
          <h1>Free Delivery</h1>
          <h1>₹0</h1>
        </div>
        <div className="flex  font-bold justify-between">
          <h1>Total</h1>
          <h1>{fromNano(orderBasedOnId?.billingDetails.totalAmount)}</h1>
        </div>
      </div>
      <div className=" p-2 flex flex-col gap-4 rounded-md border-4">
        <h1 className="text-primary font-bold">Change order Status</h1>
        <Select
          label="Order Status"
          value={getStatus(orderBasedOnId?.status)}
          className="font-caveat"
          onChange={(value) => setUpdatedStatus(value)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {status?.map((status, index) => (
            <Option key={index} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>
      <div className=" p-2 flex flex-col gap-4 rounded-md border-4">
        <h1 className="text-primary font-bold">Customer Info</h1>
        <div className="flex  gap-2">
          <h1 className="text-primary ">Name:</h1>
          <h1 className="text-primary">
            {orderBasedOnId?.userDetails.name || "..."}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary">Contact:</h1>
          <h1 className="text-primary">
            {orderBasedOnId?.userDetails.phoneNumber || "..."}
          </h1>
        </div>
      </div>
      <div className=" p-2 flex flex-col gap-4 rounded-md border-4">
        <h1 className="text-primary font-bold">Delivery Info</h1>
        <div className="flex  gap-2">
          <h1 className="text-primary ">Name:</h1>
          <h1 className="text-primary">
            {orderBasedOnId?.userDetails.name || "..."}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary">Contact:</h1>
          <h1 className="text-primary">
            {orderBasedOnId?.userDetails.phoneNumber || "..."}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary">Delivery Locations:</h1>
          <h1 className="text-primary">
            {orderBasedOnId?.userDetails.location}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ManageOrdersPage;