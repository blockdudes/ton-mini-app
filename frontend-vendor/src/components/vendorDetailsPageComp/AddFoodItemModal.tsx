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
import { useContext } from "react";

export function AddFoodItemModal({ openModal, setOpenModal }: any) {
  const handleOpen = () => setOpenModal(!openModal);
  const { menuItem, setMenuItem, addMenuItems } = useContext(GlobalContext);

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
          Enter your food item details
        </DialogHeader>
        <DialogBody
          className="h-[250px] flex flex-col gap-3 overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">Your Food Name</h1>
            <Input
              value={menuItem.name}
              labelProps={{ className: "text-primary" }}
              label="Name"
              size="lg"
              onChange={(e) =>
                setMenuItem({ ...menuItem, name: e.target.value })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">
              Your Food Image Url
            </h1>
            <Input
              value={menuItem.imageUrl}
              labelProps={{ className: "text-primary" }}
              label="image url"
              size="lg"
              onChange={(e) =>
                setMenuItem({ ...menuItem, imageUrl: e.target.value })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-xs font-medium">
              Your food Description
            </h1>

            <Textarea
              labelProps={{ className: "text-primary" }}
              value={menuItem.description}
              label="description"
              size="lg"
              onChange={(e) =>
                setMenuItem({ ...menuItem, description: e.target.value })
              }
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium text-xs">
              Your Food Price
            </h1>
            <Input
              labelProps={{ className: "text-primary" }}
              label="price"
              size="lg"
              onChange={(e) =>
                setMenuItem({ ...menuItem, price: e.target.value })
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
              menuItem.name === "" ||
              menuItem.imageUrl === "" ||
              menuItem.description === "" ||
              menuItem.price === ""
            }
            variant="gradient"
            size="sm"
            color="green"
            onClick={() => {
              addMenuItems();
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
