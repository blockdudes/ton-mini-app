import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { GlobalContext } from "../../context/Store";

export function AddYourRestModal({ openModal, setOpenModal }: any) {
  const { resturantDetails, setResturantDetails, createResturant } =
    React.useContext(GlobalContext);

  console.log("resturantDetails", resturantDetails);
  console.log("openModal", openModal);

  const addResturant = () => {
    createResturant();
    setOpenModal(false);
  };
  return (
    <>
      <Dialog
        size="sm"
        className="bg-tertiary"
        open={openModal}
        handler={() => setOpenModal(!openModal)}
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
          Enter your resturants details
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="h-[250px]  flex flex-col gap-3 overflow-scroll"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">
              Your Resturant Name
            </h1>
            <Input
              labelProps={{ className: "text-primary" }}
              value={resturantDetails.resturantName}
              label="Resturant name"
              size="lg"
              onChange={(e) =>
                setResturantDetails({
                  ...resturantDetails,
                  resturantName: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              Resturant Image URL
            </h1>
            <Input
              labelProps={{ className: "text-primary" }}
              label="Resturant Image URL"
              value={resturantDetails.resturantImageUrl}
              size="lg"
              onChange={(e) =>
                setResturantDetails({
                  ...resturantDetails,
                  resturantImageUrl: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              Your Resturant Description
            </h1>
            {/* <Input
              labelProps={{ className: "text-primary" }}
              label="Name"
              size="lg"
              onChange={(e) => console.log(e.target.value)}
            /> */}
            <Textarea
              labelProps={{ className: "text-primary" }}
              value={resturantDetails.resturantDescription}
              label="description"
              size="lg"
              onChange={(e) =>
                setResturantDetails({
                  ...resturantDetails,
                  resturantDescription: e.target.value,
                })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-medium text-xs">Vendor Name</h1>
              <Input
                value={resturantDetails.vendorName}
                labelProps={{ className: "text-primary" }}
                label="vendor name"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
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
                Vendor Location
              </h1>
              <Input
                value={resturantDetails.vendorLocation}
                labelProps={{ className: "text-primary" }}
                label="vendor location"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    vendorLocation: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <h1 className="text-primary font-medium text-xs">
                Vendor Contact Number
              </h1>
              <Input
                labelProps={{ className: "text-primary" }}
                value={resturantDetails.vendorNumber}
                label="contact number"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    vendorNumber: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-medium text-xs">
                Enter Food Name
              </h1>
              <Input
                labelProps={{ className: "text-primary" }}
                value={resturantDetails.menuName}
                label="food name"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    menuName: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-medium text-xs">
                Enter Food Image URL
              </h1>
              <Input
                labelProps={{ className: "text-primary" }}
                value={resturantDetails.menuImageUrl}
                label="image url"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    menuImageUrl: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-medium text-xs">
                Enter food price
              </h1>
              <Input
                labelProps={{ className: "text-primary" }}
                value={resturantDetails.menuPrice}
                label="price"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    menuPrice: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-medium text-xs">
                Enter food description
              </h1>
              <Input
                labelProps={{ className: "text-primary" }}
                value={resturantDetails.menuDescription}
                label="food description"
                size="lg"
                onChange={(e) =>
                  setResturantDetails({
                    ...resturantDetails,
                    menuDescription: e.target.value,
                  })
                }
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
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
              resturantDetails.menuName === "" ||
              resturantDetails.menuImageUrl === "" ||
              resturantDetails.menuPrice === "" ||
              resturantDetails.menuDescription === "" ||
              resturantDetails.vendorName === "" ||
              resturantDetails.vendorImageUrl === "" ||
              resturantDetails.vendorLocation === "" ||
              resturantDetails.vendorNumber === "" ||
              resturantDetails.restaurantName === "" ||
              resturantDetails.resturantDescription === "" ||
              resturantDetails.resturantImageUrl === "" ||
              resturantDetails.resturantLocation === ""
            }
            variant="gradient"
            size="sm"
            color="green"
            onClick={() => {
              addResturant();
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
