/* eslint-disable jsx-a11y/no-autofocus */
"use client"
import { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import Image from "next/image";
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from '@/context/user_context';

import VerifyUser from "@/app/middleware/VerifyUser";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { useRouter } from "next/router";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@/context/firebase";

interface VerifyOTPProps {
  handleNext: () => void;
  handlePrev: () => void;
  Router : () => void;
}

const EmailOTP = ({ handleNext, handlePrev , Router}: VerifyOTPProps) => {
  const [otp, setOtp] = useState<string>("");
  
    // snackbar
    const { generateSnackbar } : any  = useSnackbar();
    // let router = useRouter();

    //context
        let { userId, verifyOtpWoId, tempUserData,sendEmailOtpWid, userData, setUserData,clientDetailsAdd, setTempUserData } : any  = useUserContext();

         
  const { projectData, setProjectData } : any  = useUserContext();


  const handleResend = async (e) => {
    try { 
        e.preventDefault();
        let id : any = Cookies.get("userId");
        setOtp("");
        if(id?.length > 0) {

            let res : any  = await sendEmailOtpWid({
            userType: "client",
            email: tempUserData?.userEmail || Cookies.get("userEmail"),
          });
    
          if (res?.status !== 400 || res?.data?.status === "success") {
            setTempUserData({
              ...tempUserData,
              emailVerificationId : res?.data?.data[0]?.verificationId,
              userEmail : res?.data?.data[0]?.email,
              userType : "client",
            });
            return generateSnackbar("OTP resend successfully", "success");
          } else {
            generateSnackbar("Please login again.", "error");
          }
        } 
        else {
          generateSnackbar("No user Data Found, please login again.", "error");
        }
        
    } catch (error) {
      generateSnackbar("An error occurred, please try again later.", "error");
    }
  };

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit =async  (e: React.FormEvent<HTMLFormElement>) => {
   try{
    e.preventDefault();
    if (otp.length !== 4) return alert("Enter valid OTP");
    let verificationId = tempUserData?.emailVerificationId;

    let res : any  = await verifyOtpWoId({otp, verificationId, userType : "client" })
    console.log(res);
        if(res?.status === 200 || res?.response?.data?.status === "success"){
          console.log(tempUserData);
          let submitDetails : any  = await clientDetailsAdd({
            email: tempUserData?.userEmail,
            name: tempUserData?.userName,
            pass: tempUserData?.userPassword,
            phone : tempUserData?.userPhone,
            confirmPass : tempUserData?.userConfirmPassword,
            country : tempUserData?.country_code,
            countryCode : tempUserData?.country_calling_code,
            isPhoneVerify : tempUserData?.isPhoneVerify,
            isEmailVerify : res?.data?.emailVerify,
            userType : "client",
          });

          if(submitDetails?.status === 200 || submitDetails?.response?.data?.status === "success"){
            
    
          let clientId : any  = submitDetails?.data?.id || Cookies.get("userId") ;
          setUserData({
            ...userData,
            userId : submitDetails?.data?.id ,
            token : submitDetails?.data?.data[0]?.token
          });

            await setDoc(doc(db, "usersChats", submitDetails?.data?.id ), {
              chats : [],
            });
          
            setProjectData({...projectData, ["userId"] : submitDetails?.data?.id });
            Cookies.set("token", submitDetails?.data?.data[0]?.token,{ secure: true, sameSite: 'None'});
            Cookies.set("userId", submitDetails?.data?.id,{ secure: true, sameSite: 'None',});
            Cookies.set("userEmail", tempUserData?.userEmail ,{ secure: true, sameSite: 'None',});
            Cookies.set("userType", "client",{ secure: true, sameSite: 'None',});

            generateSnackbar( submitDetails?.data?.message ||  "Account Created Successfully.", "success")
            handleNext();

          }
          else{
            generateSnackbar(submitDetails?.response?.data?.message || "Some error occur, please Try Again." ,"error")
          }
        }
        else{
            // OTP verification failed
            generateSnackbar(res?.response?.data?.message || "Some error occur, please Try Again." ,"error")
        }

   }
   catch(e){
    // console.log(e);
    generateSnackbar("Some error occur, please Try Again." ,"error")
   }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center max-w-[450px]">
        Verify Email
      </h1>
      <p className="mb-2 -mt-4 mx-2 text-center text-pretty">
        Kindly enter the OTP sent to your email
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
            <button className="text-secondary hover:text-main font-bold" onClick={handleResend}>
              Resend
            </button>
            <button
              className="text-secondary hover:text-main font-bold"
              onClick={handlePrev}
            >
              Change Email
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

export default EmailOTP;
