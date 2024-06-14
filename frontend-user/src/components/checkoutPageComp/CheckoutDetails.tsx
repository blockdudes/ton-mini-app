import { ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { User } from "../../contracts/tact_TonFoodMiniApp";
import { CategorySelector } from "./CategorySelector";

export const CheckoutDetails = ({
  data,
  setData,
  category,
  setCategory,
}: {
  data: User;
  setData: (user: User) => void;
  category: bigint;
  setCategory: (category: bigint) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-primary text-xl font-bold">
        Enter Your Billing Details
      </h1>
      <CategorySelector
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />
      <Input
        type="text"
        label="Name"
        color="deep-orange"
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
      {category == 2n && (
        <Input
          type="text"
          label="Location"
          color="deep-orange"
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
      )}
      <Input
        type="text"
        label="Phone Number"
        color="deep-orange"
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
