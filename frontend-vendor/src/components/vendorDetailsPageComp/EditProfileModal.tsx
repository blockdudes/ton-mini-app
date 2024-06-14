import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { GlobalContext } from "../../context/Store";
import { useContext } from "react";

export function EditProfileModal({ openModal, setOpenModal }: any) {
  const handleOpen = () => setOpenModal(!openModal);
  const { newProfileDetails, setNewProfileDetails, updateProfile } =
    useContext(GlobalContext);

  return (
    <>
      <Dialog
        size="sm"
        className="bg-tertiary"
        open={openModal}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          className="text-primary font-bold text-sm border-b-4 shadow-lg  "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Update your profile
        </DialogHeader>
        <DialogBody
          className="h-[250px] flex flex-col gap-3 overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              New resturant Name
            </h1>
            <Input
              value={newProfileDetails.restaurantName}
              labelProps={{ className: "text-primary" }}
              label="Resturant name"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  restaurantName: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">
              New Resturant Image url
            </h1>
            <Input
              value={newProfileDetails.restaurantImageUrl}
              labelProps={{ className: "text-primary" }}
              label="image url"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  restaurantImageUrl: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">
              New Resturant Description
            </h1>
            <Input
              value={newProfileDetails.restaurantDescription}
              labelProps={{ className: "text-primary" }}
              label="restaurant description"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  restaurantDescription: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              New Vendor Name
            </h1>

            <Input
              labelProps={{ className: "text-primary" }}
              value={newProfileDetails.vendorName}
              label="vendor name"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  vendorName: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              New Vendor Image url
            </h1>
            <Input
              value={newProfileDetails.vendorImageUrl}
              labelProps={{ className: "text-primary" }}
              label="vendor image url"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  vendorImageUrl: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              New Vendor Phone Number
            </h1>
            <Input
              value={newProfileDetails.vendorPhoneNumber}
              labelProps={{ className: "text-primary" }}
              label="vendor phone number"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  vendorPhoneNumber: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              New Vendor location
            </h1>
            <Input
              value={newProfileDetails.vendorLocation}
              labelProps={{ className: "text-primary" }}
              label="vendor location"
              size="lg"
              onChange={(e) =>
                setNewProfileDetails({
                  ...newProfileDetails,
                  vendorLocation: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={() => setOpenModal(false)}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={
              newProfileDetails.vendorName === "" ||
              newProfileDetails.vendorImageUrl === "" ||
              newProfileDetails.vendorPhoneNumber === "" ||
              newProfileDetails.vendorLocation === "" ||
              newProfileDetails.vendorDescription === "" ||
              newProfileDetails.restaurantName === "" ||
              newProfileDetails.restaurantImageUrl === "" ||
              newProfileDetails.restaurantDescription === ""
            }
            variant="gradient"
            size="sm"
            color="green"
            onClick={() => {
              updateProfile();
              setOpenModal(false);
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
