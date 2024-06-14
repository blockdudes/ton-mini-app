import { useContext, useState } from "react";
import { GlobalContext } from "../../context/Store";
import { Button } from "@material-tailwind/react";
import { EditProfileModal } from "./EditProfileModal";

const EditProfile = () => {
  const { resturantById } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  console.log("resturantById", resturantById);
  return (
    <div className="w-full ">
      <EditProfileModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className=" flex flex-col gap-4 p-2 rounded-md border-4 text-sm">
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Name:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.name}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">location:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.location}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Contact Number:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.phoneNumber}
          </h1>
        </div>
        <div>
          <Button
            size="sm"
            onClick={() => setOpenModal(true)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Update Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
