import { Button } from "@material-tailwind/react";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 bg-tertiary">
      <div className="w-14 aspect-square rounded-full bg-primary flex justify-center items-center">
        <MdDone size={40} color="white" />
      </div>
      <h1 className="text-2xl font-bold">Order Placed</h1>
      <p className="mx-16 text-center">
        Check transaction status from the connected wallet
      </p>
      <Button
        className="w-1/2"
        color="orange"
        ripple={true}
        onClick={() => navigate("/")}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Okay
      </Button>
    </div>
  );
};

export default OrderPlaced;
