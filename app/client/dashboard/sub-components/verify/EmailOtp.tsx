"use client"
import { Button, FormControl } from "@mui/material";  // For Material-UI components
import { parsePhoneNumberFromString } from "libphonenumber-js";  // Phone number parsing
import Image from "next/image";  // For handling images
import { useEffect, useState } from "react";  // For managing component state
import PhoneInput from "react-phone-number-input";  // Phone input component
import "react-phone-number-input/style.css";  // Import phone input styles
import arrowRightIcon from "@/public/icons/arrow_right.svg";  // Import an icon
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser";
import { useRouter } from "next/router";
import { db } from "@/context/firebase";
import { doc, setDoc } from "firebase/firestore";
import { MuiOtpInput } from "mui-one-time-password-input";


const EmailOtpClient = ({verifyEmailData,setVerifyEmailData ,isEditEnable} : any) => {
  // State for phone number and error messages
  const [phoneNumber, setPhoneNumber] : any  = useState(
    JSON.parse(localStorage.getItem("stepFormData") || "")?.phone_number || ""
  );
  
  const { generateSnackbar }  : any = useSnackbar();

  


  // Handle form submission and extract country details
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();

 
    }
    catch(e){
      console.error(e);
    }
  };
  function handleBack(e){
    e.preventDefault();
    setOtp("");
    setOpenOtpBoxEmail(false);
  }

  const [otp, setOtp] = useState<string>("");
  
  const {verifyOtp,sendEmailOtp, setUserData,sendPhoneOtpWid}  : any  = useUserContext();
  let [openOtpBoxEmail, setOpenOtpBoxEmail] : any = useState(false);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) return alert("Enter valid OTP");
    
    try {
      let res : any  = await  verifyOtp({
        otp : otp,
        userId : verifyEmailData?.userId,
        userType : verifyEmailData?.userType, 
          type :  "not-auth"
      });

      console.log(res);
      if(res?.status !== 400 || res?.data?.status === "success"){
        generateSnackbar("Email Verified Successfully", "success");
        window.location.reload();
        setOtp("");
      }
      else{
        generateSnackbar(res.response?.data?.message || "Some error Occur, please Try Again.", "error");
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      generateSnackbar("Some error Occur, please Try Again.", "error");
    }
  };

  async function sendOtpEmail(){
    try{

      let res = await sendEmailOtp({
        userId : verifyEmailData?.userId,
        userType : verifyEmailData?.userType,
        email : verifyEmailData?.userEmail
      });

      if(res?.status !== 400 || res?.data?.status === "success"){
        setOtp("");
        setOpenOtpBoxEmail(true);
          generateSnackbar("OTP Sent.", "success");
        }
        else{
          generateSnackbar(res.response?.data?.message || "Some error Occur, please Try Again.", "error");
        }
    }
    catch(e){
      generateSnackbar("Some error Occur, please Try Again.", "error");
    }
  }

  return (
    <>
    <div className="w-[100vw] h-[100vh] flex z-10 justify-center items-center fixed">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <div style={{backgroundColor : "white",  borderRadius : "5px"}} className="p-[20px] lg:w-[40%] z-10 md:w-[45%] sm:w-[60%] w-[80%]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center max-w-[450px]">
        Let&apos;s verify your details
      </h1>
      <form className="w-full px-4 md:px-12" onSubmit={handleOtpSubmit}>
        <FormControl fullWidth>
          <label
            htmlFor="service"
            className="text-sm sm:text-lg font-bold mb-2 py-[5px]"
          >
            Enter Email Address
          </label>
          <input type="email" 
          placeholder="abc@gmail.com"
          value={verifyEmailData?.userEmail}
          onChange={(e : any)=>{
            setVerifyEmailData({...verifyEmailData, userEmail : e.target.value})
          }}
          disabled={!isEditEnable}
          className="[&_.PhoneInputCountry]:!p-3 h-[80px] [&_.PhoneInputCountry]:bg-gray-200 outline-none  [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
          />
        </FormControl>

          <div className="flex flex-row items-center justify-end">
            <span>Got your OTP ?</span>
            <Button
            variant="text"
            className="h-[50px] w-[130px] rounded-sm flex ml-[-20px]"
            onClick={()=>{
              setOpenOtpBoxEmail(true)
            }}
          >
            <span className="font-bold">Verify Otp</span>
          </Button>
          
          </div>

        <div className="mt-4 flex w-full justify-between">
          <div></div>
          <Button
            variant="contained"
            className="h-[50px] w-[130px] rounded-sm flex gap-2 mt-4"
            type="submit"
            onClick={sendOtpEmail}
          >
            <span className="font-bold">Send OTP</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
      </div>
    </div>



    {/* Verify Modal */}
    {
      openOtpBoxEmail &&
    <div className="w-[100vw] h-[100vh] flex z-10 justify-center items-center fixed">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <div style={{backgroundColor : "white",  borderRadius : "5px"}} className="p-[20px] lg:w-[40%] z-10 md:w-[45%] sm:w-[60%] w-[80%]">
      <h1 className="text-2xl font-bold text-center max-w-[450px] m-[5%]">
        Confirm Your Email Address
      </h1>
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
              onClick={sendOtpEmail}
              type="button"
              >
              Resend
              </button>
              <button
              className="text-secondary hover:text-main font-bold"
              onClick={handleBack}
              >
              Go Back
              </button>
              </div>
              </div>
              <div className="flex justify-end items-center">
              <Button
              variant="contained"
            className="h-[50px] w-[170px] rounded-sm flex gap-2 mt-4"
            type="submit"
            
            >
            <span className="font-bold">Confirm OTP</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
            </Button>
            </div>
            </form>
            </div>
            </div> 
    
          }
    </>
  );
};

export default EmailOtpClient;


