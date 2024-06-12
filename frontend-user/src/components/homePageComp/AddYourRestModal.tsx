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

export function AddYourRestModal({ openModal, setOpenModal }) {
  const handleOpen = () => setOpenModal(!openModal);

  return (
    <>
      <Dialog
        size="sm"
        className="bg-tertiary"
        open={openModal}
        handler={handleOpen}
      >
        <DialogHeader className="text-primary font-bold text-lg border-b-4 shadow-lg  font-caveat ">
          Enter your resturants details
        </DialogHeader>
        <DialogBody className="h-[250px] flex flex-col gap-3 overflow-scroll">
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-medium font-caveat">
              Your Resturant Name
            </h1>
            <Input
              labelProps={{ className: "text-primary font-caveat" }}
              label="Name"
              size="lg"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-primary font-caveat font-medium">
              Resturant Image URL
            </h1>
            <Input
              labelProps={{ className: "text-primary font-caveat" }}
              label="Name"
              size="lg"
              onChange={(e) => console.log(e.target.value)}
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
              label="description"
              size="lg"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleOpen}
            className="mr-1"
          >
            <span className="font-caveat">Cancel</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            color="green"
            onClick={handleOpen}
          >
            <span className="font-caveat">Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
