"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import { Box, Button, Modal, TextField } from "@mui/material";
import Image from "next/image";

interface pointsData {
  points: string;
  price: string;
}

export default function BuyPoints({
  open,
  setOpen,
  data,
  setSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: pointsData;
  setSuccess: (success: boolean) => void;
}) {
  // form data
  const handlePurchase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    setSuccess(true);
  };

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="bg-white w-full max-w-2xl rounded-md p-6">
          <Box className="flex justify-between items-center p-2 border-b border-b-main border-opacity-30">
            <h1 className="font-bold text-2xl">Buy Points</h1>
            <Image src="/icons/close.svg" alt="Close" height={24} width={24} />
          </Box>
          <p className="pl-2 pt-2 font-semibold">
            {data.points} {"("}
            {data.price}
            {")"}
          </p>
          <form onSubmit={handlePurchase}>
            {/* Create Credit Card Form Here */}
            <TextField
              id="outlined-basic"
              label="Card Number"
              variant="outlined"
              className="w-full mt-4"
            />
            <TextField
              id="outlined-basic"
              label="Card Holder Name"
              variant="outlined"
              className="w-full mt-4"
            />
            <Box className="flex flex-wrap gap-4 md:flex-nowrap">
              <TextField
                id="outlined-basic"
                label="Expiry Date"
                variant="outlined"
                className="w-full mt-4"
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                className="w-full mt-4"
              />
            </Box>
            <Button variant="contained" type="submit" className="w-full mt-4">
              Buy Points
              <ArrowForward className="ml-2 w-5" />
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
