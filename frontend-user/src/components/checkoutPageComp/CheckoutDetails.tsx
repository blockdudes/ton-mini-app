import { ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { User } from "../../contracts/tact_TonFoodMiniApp";

export const CheckoutDetails = ({
  data,
  setData,
}: {
  data: User;
  setData: (user: User) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-xl font-bold">
        Enter Your Billing Details
      </h1>
      <Input
        type="text"
        label="Name"
        placeholder="Enter your name"
        className="w-full border rounded p-2"
        value={data.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          let updatedUser = data;
          updatedUser.name = e.target.value;
          setData(updatedUser);
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <Input
        type="text"
        label="Location"
        placeholder="Enter your address"
        className="w-full border rounded p-2"
        value={data.location}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          let updatedUser = data;
          updatedUser.location = e.target.value;
          setData(updatedUser);
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <Input
        type="text"
        label="Phone Number"
        placeholder="Enter your phone number"
        className="w-full border rounded p-2"
        value={data.phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          let updatedUser = data;
          updatedUser.phoneNumber = e.target.value;
          setData(updatedUser);
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
