import { useContext } from "react";
import { GlobalContext } from "../../context/Store";

const EditProfile = () => {
  const { resturantById } = useContext(GlobalContext);
  console.log("resturantById", resturantById);
  return (
    <div className="w-full">
      <div className=" p-2 rounded-md border-4">
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Name:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.name}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">location:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.name}
          </h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-primary font-bold">Contact Number:</h1>
          <h1 className="text-primary">
            {resturantById[0].vendorDetails.phoneNumber}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
