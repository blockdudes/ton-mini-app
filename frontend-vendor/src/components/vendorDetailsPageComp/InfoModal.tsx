import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function InfoModal({ openModal, setOpenModal }: any) {
  const handleOpen = () => setOpenModal(!openModal);

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
          Steps to create your Resturant bot
        </DialogHeader>
        <DialogBody
          className="h-[250px] text-primary flex flex-col gap-3 overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p className="text-xs">1. Open BotFather:</p>
          <p className="text-xs ml-2">
            <li>Search for "BotFather" in Telegram and start a chat.</li>
          </p>
          <p className="text-xs">2. Access Your Bots:</p>
          <p className="text-xs ml-2">
            <li>Send the command /mybots to BotFather.</li>
          </p>
          <p className="text-xs ml-2">
            <li>Select your bot from the list.</li>
          </p>
          <p className="text-xs">3. Navigate to Bot Settings:</p>
          <p className="text-xs ml-2">
            <li>Click on Bot Settings.</li>
          </p>
          <p className="text-xs">4. Configure Menu Button:</p>
          <p className="text-xs ml-2">
            <li>Select Menu Button.</li>
          </p>
          <p className="text-xs ml-2">
            <li>Click on Configure Menu Button.</li>
          </p>
          <p className="text-xs">5. Send URL:</p>
          <p className="text-xs ml-2">
            <li>Enter your mini app URL when prompted.</li>
          </p>
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
        </DialogFooter>
      </Dialog>
    </>
  );
}
