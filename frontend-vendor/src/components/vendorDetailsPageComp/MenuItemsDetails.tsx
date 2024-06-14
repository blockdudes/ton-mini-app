import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { AddFoodItemModal } from "./AddFoodItemModal";
import { GlobalContext } from "../../context/Store";
import { Address, Dictionary, fromNano, toNano } from "@ton/core";
import { useFoodMiniAppContract } from "../../hooks/useFoodMiniAppContract";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useTonWallet } from "@tonconnect/ui-react";
import { MenuItem } from "../../contract/tact_TonFoodMiniApp";

const MenuItemsDetails = ({ addMenuItems }: any) => {
  const [openModal, setOpenModal] = React.useState(false);
  const { allMenuItems } = useContext(GlobalContext);
  const { sender } = useTonConnect();
  const Wallet = useTonWallet();
  const { foodMiniAppContract }: any = useFoodMiniAppContract();
  const TABLE_HEAD = ["Name ", "Description ", "Price", ""];

  const TABLE_ROWS = [
    {
      name: "Burger",
      description: "Wed 5:00pm",
      price: "$1,000",
    },
    {
      name: "french Fries",
      description: "Wed 5:00pm",
      price: "$1,000",
    },
    {
      name: "pizza",
      description: "Wed 5:00pm",
      price: "$1,000",
    },
  ];
  const handleDeleteItem = async (id: BigInt): Promise<void> => {
    await foodMiniAppContract.send(
      sender,
      {
        value: toNano(0.5),
      },
      {
        $$type: "DeleteMenuItems",
        restaurantId: Address.parse(Wallet!.account.address),
        items: {
          $$type: "Array_ItemIds",
          Map: Dictionary.empty<number, number>().set(0, Number(id)),
          length: 1n,
        },
      }
    );
  };

  console.log("allMenuItems", allMenuItems);
  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <AddFoodItemModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        addMenuItems={addMenuItems}
      />
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none text-center flex items-center justify-around"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h1 className="font-bold text-lg">Manage your Resturants Menu</h1>
        <Tooltip content="Add Food Item">
          <button onClick={() => setOpenModal(!openModal)}>
            <IoAddCircle size={25} color="green" />
          </button>
        </Tooltip>
      </CardHeader>
      <CardBody
        className="overflow-scroll  px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-secondary/50 p-4"
                >
                  <Typography
                    color="blue-gray"
                    className="font-bold  text-lg font-caveat leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allMenuItems?.map(
              (
                { name, description, price, id, isDeleted }: MenuItem,
                index: number
              ) => {
                const isLast = index === allMenuItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";
                return (
                  <tr
                    key={name}
                    className={`cursor-pointer ${isDeleted && "hidden"}`}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold font-caveat"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold font-caveat"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold font-coveat"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {Number(fromNano(price))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <MdDeleteOutline onClick={() => handleDeleteItem(id)} />
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default MenuItemsDetails;
