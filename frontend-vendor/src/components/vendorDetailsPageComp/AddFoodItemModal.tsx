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

export function AddFoodItemModal({
  openModal,
  setOpenModal,
  addMenuItems,
}: any) {
  const handleOpen = () => setOpenModal(!openModal);
  const { menuItem, setMenuItem } = useContext(GlobalContext);

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
          className="text-primary font-bold text-lg border-b-4 shadow-lg  font-caveat "
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
            <h1 className="text-primary font-medium font-caveat">
              Your Food Name
            </h1>
            <Input
              value={menuItem.name}
              labelProps={{ className: "text-primary font-caveat" }}
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
            <h1 className="text-primary font-caveat font-medium">
              Your Food Image Url
            </h1>
            <Input
              value={menuItem.imageUrl}
              labelProps={{ className: "text-primary font-caveat" }}
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
            <h1 className="text-primary font-medium font-caveat">
              Your Resturant Description
            </h1>

            <Textarea
              labelProps={{ className: "text-primary font-caveat" }}
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
            <h1 className="text-primary font-caveat font-medium">
              Your Food Price
            </h1>
            <Input
              labelProps={{ className: "text-primary font-caveat" }}
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
            <span className="font-caveat">Cancel</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            color="green"
            onClick={() => addMenuItems()}
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
