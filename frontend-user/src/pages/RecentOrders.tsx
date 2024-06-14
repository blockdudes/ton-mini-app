import { useEffect, useState } from "react";
import { useFoodMiniAppContract } from "../hooks/useFoodAppContract";
import {
  Array_Order,
  Array_Restaurant,
  CancelOrder,
  Order,
} from "../contracts/tact_TonFoodMiniApp";
import { TonConnectError, useTonWallet } from "@tonconnect/ui-react";
import { Address, Dictionary, fromNano, toNano } from "@ton/core";
import { IoArrowBackCircle } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { useTonConnect } from "../hooks/useTonConnect";

const RecentOrders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<Array_Restaurant>();
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [orders, setOrders] = useState<Array_Order>();
  const { foodMiniAppContract } = useFoodMiniAppContract();
  const wallet = useTonWallet();
  const { sender } = useTonConnect();

  const getOrders = async () => {
    if (!foodMiniAppContract) return;
    if (!wallet) return;
    setIsLoading(true);
    try {
      const _orders = await foodMiniAppContract.getAllUserOrders(
        Address.parse(wallet.account.address)
      );
      setOrders(_orders);
    } catch (e) {
      setOrders({
        $$type: "Array_Order",
        Map: Dictionary.empty<number, Order>(),
        length: 0n,
      } as Array_Order);
    }
    const _restaurants = await foodMiniAppContract.getAllRestaurants();
    setRestaurants(_restaurants);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [foodMiniAppContract, wallet]);

  const cancelOrder = async (orderId: bigint, restaurantId: Address) => {
    if (!foodMiniAppContract) return;
    if (!sender) return;
    setIsLoading(true);
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.2),
      },
      {
        $$type: "CancelOrder",
        orderId: orderId,
        restaurantId: restaurantId,
      } as CancelOrder
    );
    await getOrders();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (isLoading)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-lg text-primary">
        Loading...
      </div>
    );

  return (
    <div className="h-screen w-full px-2 py-4">
      <div className="w-full flex gap-2">
        <IoArrowBackCircle
          size={26}
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <h1 className="text-primary text-xl self-center font-bold">
          Recent Orders
        </h1>
        <button
          className="absolute right-4 top-4"
          onClick={() => window.location.reload()}
        >
          <LuRefreshCw size={25} />
        </button>
      </div>
      {orders == null || orders?.Map.values().length > 0 ? (
        <div className="flex flex-col-reverse pt-4 gap-2">
          {orders?.Map.values().map((order, index) => {
            const selectedRestaurant = restaurants?.Map.values().find((item) =>
              item.restaurantId.equals(order.restaurantId)
            );

            return (
              <div
                key={index}
                className="h-24 relative overflow-clip w-full border border-secondary bg-white rounded-3xl"
                onClick={() =>
                  order.status == 0n &&
                  setClickedIndex(clickedIndex == index ? -1 : index)
                }
              >
                <div className="flex items-center gap-3 px-4 py-2 ">
                  <div className="absolute top-0 right-0 bg-secondary text-white px-2 py-1 rounded-bl-3xl">
                    {order.status == 0n
                      ? "In Queue"
                      : order.status == 1n
                      ? "Accepted"
                      : order.status == 2n
                      ? "Delivered"
                      : order.status == 3n
                      ? "Cancelled"
                      : order.status == 4n
                      ? "Rejected"
                      : "Unknown"}
                  </div>
                  <img
                    src={selectedRestaurant?.imageUrl}
                    className="w-20 aspect-square rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-secondary font-bold">
                      {selectedRestaurant?.name}
                    </h1>
                    <div className="text-primary font-bold text-xs">
                      {order.items.Map.values()
                        .slice(0, 2)
                        .map((item) => {
                          const selectedItem =
                            selectedRestaurant?.menu.Map.values().find(
                              (menu) => menu.id == item.id
                            );
                          return (
                            <h1 className="flex items-center">
                              <span className="line-clamp-1 truncate max-w-full mr-1">
                                {selectedItem?.name}
                              </span>
                              <span className="whitespace-nowrap">
                                x {item.quantity.toString()}
                              </span>
                            </h1>
                          );
                        })}
                      <h1>
                        Total: {fromNano(order.billingDetails.totalAmount)} ton
                      </h1>
                    </div>
                  </div>
                </div>
                {order.status == 0n && clickedIndex == index && (
                  <div className="absolute top-0 h-full w-full backdrop-blur-sm flex flex-col justify-center items-center">
                    <div
                      className="bg-secondary text-white px-4 py-2 rounded-3xl"
                      onClick={() =>
                        cancelOrder(order.orderId, order.restaurantId)
                      }
                    >
                      Cancel Order
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[90%] w-full flex justify-center items-center text-xl font-semibold text-primary">
          No orders found
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
