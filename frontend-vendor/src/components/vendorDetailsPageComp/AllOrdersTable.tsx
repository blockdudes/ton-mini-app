import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../../context/Store";
import { formatUnixTimestamp, getStatus } from "../../utils/helperFunctions";
import { Order } from "../../contract/tact_TonFoodMiniApp";

const TABLE_HEAD = ["Order ID ", "Order Date", "Status"];

const TABLE_ROWS = [
  {
    order_id: "123445656",
    date: "Wed 5:00pm",
    amount: "$1,000",
    status: "INQUEUE",
  },
  {
    order_id: "1235466",
    date: "Wed 5:00pm",
    amount: "$1,000",
    status: "ACCEPTED",
  },
  {
    order_id: "1234234",
    date: "Wed 5:00pm",
    amount: "$1,000",
    status: "DELIVERED",
  },
  {
    order_id: "12345234",
    date: "Wed 5:00pm",
    amount: "$1,000",
    status: "REJECTED",
  },
  {
    order_id: "123453",
    date: "Wed 5:00pm",
    amount: "$1,000",
    status: "CANCELLED",
  },
];

export function AllOrdersTable() {
  const navigate = useNavigate();
  const { allOrders } = useContext(GlobalContext);

  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none text-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h1 className="font-bold text-lg">Manage your Orders</h1>
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
                    className="font-bold text-lg  font-caveat leading-none opacity-70"
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
            {allOrders?.map(
              ({ orderId, createdAt, status }: Order, index: any) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";
                return (
                  <tr
                    key={orderId}
                    className="cursor-pointer "
                    onClick={() => navigate(`/manageOrder/${orderId}`)}
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
                          #{Number(orderId)}
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
                        {formatUnixTimestamp(Number(createdAt))}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold font-coveat"
                    >
                      {console.log(items.Map.values())}
                    </Typography>
                  </td> */}
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          className="font-caveat"
                          size="sm"
                          variant="ghost"
                          value={getStatus(status)}
                        />
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
}
