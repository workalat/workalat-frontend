"use client";
import Image from "next/image";
import { Box, Button, Modal, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";

import closeIcon from "@/public/icons/close.svg";
import arrowRight from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";

interface OTPModalProps {
  open: boolean;
  onClose: () => void;
}

const OTPModal = ({ open, onClose,userId, userType,phoneNo }) => {
  const [otp, setOtp] = useState("");
  let {verifyPhoneOtp,sendPhoneOtp } = useUserContext();
  let router = useRouter();
  
  // Alert
  const { generateSnackbar } = useSnackbar();


  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  async function handleverifytp(){
    try{
     let res = await verifyPhoneOtp(userId ,userType,otp);
      if(res?.status !== 400  || res?.data?.status === "success"){
        generateSnackbar("Phone Number Verified Successfully.", "success");
        router.push("/client/account_settings/security");
      }
      else{
        generateSnackbar(res?.response?.data?.message || "Please Try Again.", "error");
      }
    }
    catch(e){
      generateSnackbar("Some Error Occur, Please Try Again.", "error");
    }
  };

 
  const handleResend = async (e) => {
    try{ 
      e.preventDefault();
            let res = await sendPhoneOtp({
                userId : userId,
                userType    : userType,
                phoneNo : phoneNo
            });
        if(res.status !==400 || res.data?.status === "success"){
            
          generateSnackbar("OTP resent successfully", "success");
        }
        else{
            generateSnackbar("Please login again.", "error");
        }
    }
    catch(e){
        generateSnackbar("Please login again.", "error");
        // router.push("/login");
    }
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
            <a href="/" onClick={handleResend} className="text-secondary ml-2">
              Resend
            </a>
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className="gap-2 py-3 px-6 font-semibold w-full max-w-max mx-auto"
          onClick={handleverifytp}
        >
          Confirm
          <Image alt="Change password" src={arrowRight} />
        </Button>
      </Box>
    </Modal>
  );
};

export default OTPModal;
