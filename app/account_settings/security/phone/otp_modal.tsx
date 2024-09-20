"use client";
import Image from "next/image";
import { Box, Button, Modal, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";

import closeIcon from "@/public/icons/close.svg";
import arrowRight from "@/public/icons/arrow_right.svg";

interface OTPModalProps {
  open: boolean;
  onClose: () => void;
}

const OTPModal = ({ open, onClose }: OTPModalProps) => {
  const [otp, setOtp] = useState("");

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  return (
    <Modal
      open={open}
      className="flex justify-center items-start mt-32"
      onClose={onClose}
    >
      <Box className="bg-white p-8 flex flex-col gap-6 rounded-lg mx-2 sm:mx-0">
        <Box className="flex justify-center items-start gap-8 border-b pb-4">
          <Box className="flex flex-col">
            <Typography className="text-2xl font-bold">Confirm OTP</Typography>
            <Typography className="text-sm text-gray-600">
              Kindly enter the OTP sent to the registered account number{" "}
            </Typography>
          </Box>
          <Image alt="Close" src={closeIcon} title="close" className="cursor-pointer" onClick={onClose} />
        </Box>
        <Box className="space-y-3">
          <MuiOtpInput
            length={4}
            className="max-w-sm mx-auto [&_input]:text-dark [&_input]:shadow-medium [&_input]:h-8"
            value={otp}
            onChange={handleChange}
          />
          <Typography className="font-bold text-sm text-center">
            If you didn&apos;t receive the code?
            <a href="/" className="text-secondary ml-2">
              Resend
            </a>
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className="gap-2 py-3 px-6 font-semibold w-full max-w-max mx-auto"
        >
          Confirm
          <Image alt="Change password" src={arrowRight} />
        </Button>
      </Box>
    </Modal>
  );
};

export default OTPModal;
