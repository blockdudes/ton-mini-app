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

export function AddYourRestModal({
  openModal,
  setOpenModal,
  createResturant,
}: any) {
  const { resturantDetails, setResturantDetails } =
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
          className="text-primary font-bold text-lg border-b-4 shadow-lg  font-caveat "
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
          className="h-[250px] flex flex-col gap-3 overflow-scroll"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium font-caveat">
              Your Resturant Name
            </h1>
            <Input
              labelProps={{ className: "text-primary font-caveat" }}
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
            <h1 className="text-primary font-caveat font-medium">
              Resturant Image URL
            </h1>
            <Input
              labelProps={{ className: "text-primary font-caveat" }}
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
            <h1 className="text-primary font-medium font-caveat">
              Your Resturant Description
            </h1>
            {/* <Input
              labelProps={{ className: "text-primary font-caveat" }}
              label="Name"
              size="lg"
              onChange={(e) => console.log(e.target.value)}
            /> */}
            <Textarea
              labelProps={{ className: "text-primary font-caveat" }}
              value={resturantDetails.restaurantDescription}
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
              <h1 className="text-primary font-caveat font-medium">
                Vendor Name
              </h1>
              <Input
                value={resturantDetails.vendorName}
                labelProps={{ className: "text-primary font-caveat" }}
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
              <h1 className="text-primary font-caveat font-medium">
                Vendor Location
              </h1>
              <Input
                value={resturantDetails.vendorLocation}
                labelProps={{ className: "text-primary font-caveat" }}
                label="Name"
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
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-caveat font-medium">
                Vendor Contact Number
              </h1>
              <Input
                labelProps={{ className: "text-primary font-caveat" }}
                value={resturantDetails.vendorContactNumber}
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
              <h1 className="text-primary font-caveat font-medium">
                Enter Food Name
              </h1>
              <Input
                labelProps={{ className: "text-primary font-caveat" }}
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
              <h1 className="text-primary font-caveat font-medium">
                Enter Food Image URL
              </h1>
              <Input
                labelProps={{ className: "text-primary font-caveat" }}
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
              <h1 className="text-primary font-caveat font-medium">
                Enter food price
              </h1>
              <Input
                labelProps={{ className: "text-primary font-caveat" }}
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
              <h1 className="text-primary font-caveat font-medium">
                Enter food description
              </h1>
              <Input
                labelProps={{ className: "text-primary font-caveat" }}
                value={resturantDetails.menuDescription}
                label="price"
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
            <span className="font-caveat">Cancel</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            color="green"
            onClick={() => addResturant()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span className="font-caveat">Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
