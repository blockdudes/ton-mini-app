import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { ModalComp } from "./ModalComp";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCheckout() {
  const [open, setOpen] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <ModalComp openModal={openModal} setOpenModal={setOpenModal} />
        <AccordionHeader
          className="font-caveat text-primary font-bold"
          onClick={() => handleOpen(1)}
        >
          Shipping Information
        </AccordionHeader>
        <AccordionBody className="font-caveat text-primary/50 text-lg font-semibold">
          <div className="w-full flex justify-between">
            <h1>D-77-A, AbulFazal Enclave New Delhi</h1>
            <button
              className="text-secondary"
              onClick={() => setOpenModal(!openModal)}
            >
              Edit
            </button>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="font-bold font-caveat text-primary"
        >
          Name
        </AccordionHeader>
        <AccordionBody className="font-caveat text-primary/50 text-lg font-semibold">
          <div className="w-full flex justify-between">
            <h1>Darab</h1>
            <button
              className="text-secondary"
              onClick={() => setOpenModal(!openModal)}
            >
              Edit
            </button>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="font-bold font-caveat text-primary"
        >
          Contact Number
        </AccordionHeader>
        <AccordionBody className="font-caveat text-primary/50 text-lg font-semibold">
          <div className="w-full flex justify-between">
            <h1>9821255433</h1>
            <button
              className="text-secondary"
              onClick={() => setOpenModal(!openModal)}
            >
              Edit
            </button>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}
