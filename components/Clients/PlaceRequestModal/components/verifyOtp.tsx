"use client"
import { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import Image from "next/image";
import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
// import { verifyOtp, resendOtp } from "@/services/otpService"; // Example API service

interface VerifyOTPProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const VerifyOTP = ({ handleNext, handlePrev }: VerifyOTPProps) => {
  const [otp, setOtp] = useState<string>("");
  
  const {tempUserData, setTempUserData,verifyPhoneOtp,userData, setUserData,sendPhoneOtp}  : any  = useUserContext();
  const { generateSnackbar }  : any  = useSnackbar();

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

       
  const { projectData, setProjectData }  : any  = useUserContext();
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) return alert("Enter valid OTP");
    
    try {
      console.log(otp);
      let userId = tempUserData.userId || Cookies.get("userId");
      let res : any  = await  verifyPhoneOtp(userId, "client", otp);


      if(res?.status !== 400 || res?.data?.status === "success"){
        Cookies.set("userId",res?.data?.userId ,{ secure: true, sameSite: 'None', expires: 30 });
        Cookies.set("token",res?.data?.token ,{ secure: true, sameSite: 'None', expires: 30 });

        setUserData({...userData, userId : res.data?.userId, token : res.data?.token});
        generateSnackbar("Number Verified Successfully.", "success");
        handleNext();
      }
      else{
        generateSnackbar(res.response?.data?.message || "Some error Occur, please Try Again.", "error");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    let userId = tempUserData?.userId || Cookies.get("userId");
    let phoneNo = tempUserData?.userPhone || Cookies.get("userPhone");
          try {
            let res = await sendPhoneOtp({
              userId : userId,
              userType    : "client",
              phoneNo : phoneNo
          });
          // console.log(res);

      if(res.status !==400 || res.data?.status === "success"){
          return generateSnackbar("OTP resent successfully", "success");
      }
      else{
          generateSnackbar("Some error occur, please Try Again.", "error");
      }
    } 
    catch (error) {
      console.error("Error resending OTP", error);
      generateSnackbar("Failed to resend OTP. Please try again.", "error")
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center max-w-[450px]">
        Confirm phone number
      </h1>
      <p className="mb-2 -mt-4 mx-2 text-center text-pretty">
        Kindly enter the OTP sent to{" "}
        {JSON.parse(localStorage.getItem("stepFormData") || "")?.phone_number || ""}
      </p>
      <form className="flex flex-col gap-4 px-4 md:px-12" onSubmit={handleSubmit}>
        <MuiOtpInput
          autoFocus
          value={otp}
          length={4}
          className="[&_input]:h-8 [&>*>*]:!border-b-3 [&>*>*]:border-b-secondary [&>*]:shadow-medium font-bold text-xl"
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <p className="text-xs md:text-lg">Didn&apos;t receive a code?</p>
          <div className="text-xs sm:text-sm flex gap-2 sm:gap-3 items-center">
            <button
              className="text-secondary hover:text-main font-bold"
              onClick={handleResendOtp}
              type="button"
            >
              Resend
            </button>
            <button
              className="text-secondary hover:text-main font-bold"
              onClick={handlePrev}
            >
              Change number
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            variant="contained"
            className="h-[50px] w-[130px] rounded-sm flex gap-2 mt-4"
            type="submit"
          >
            <span className="font-bold">Confirm</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default VerifyOTP;
