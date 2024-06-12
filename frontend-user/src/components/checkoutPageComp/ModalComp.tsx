import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

export function ModalComp({ openModal, setOpenModal }) {
  const handleOpen = () => setOpenModal(!openModal);

  return (
    <>
      <Dialog className="bg-tertiary" open={openModal} handler={handleOpen}>
        <DialogHeader className="text-primary font-bold font-caveat ">
          Change your Something
        </DialogHeader>
        <DialogBody>
          <Input
            label="Name"
            size="lg"
            onChange={(e) => console.log(e.target.value)}
          />
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
