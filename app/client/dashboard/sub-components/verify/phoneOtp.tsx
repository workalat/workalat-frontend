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


const PhoneOtpClient = ({verifyEmailData, setVerifyEmailData, isEditEnable}) => {
  // State for phone number and error messages
  const [error, setError] : any  = useState("");
  
  
  const { sendPhoneOtp,  verifyPhoneOtp} : any  = useUserContext();
  const { generateSnackbar }  : any = useSnackbar();





  // Handle form submission and extract country details
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();

      console.log(verifyEmailData);

    }
    catch(e){
      console.error(e);
    }
  };
  function handleBack(e){
    e.preventDefault();
    // handlePrev();
  }


  const [otp, setOtp] = useState<string>("");
    
    
    let [openOtpBoxPhone, setOpenOtpBoxPhone] : any = useState(false);
  
    const handleChange = (newValue: string) => {
      setOtp(newValue);
    };
  
         
   
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (otp.length !== 4) return generateSnackbar("Enter valid OTP.", "error");
      
      try {
        console.log(otp, verifyEmailData);
        let res = await verifyPhoneOtp(
          verifyEmailData?.userId,
          verifyEmailData?.userType,
           otp,
        );
        
        if(res.status !==400 || res.data?.status === "success"){
          generateSnackbar("Phone Number Verified Successfully", "success");
          window.location.reload();
          setOtp("");
        }
        else{
            generateSnackbar(res?.response?.data?.message || "Some error occur, please Try Again.", "error");
        }
        
      } catch (error) {
        // console.error("Error verifying OTP", error);
        generateSnackbar("Failed to verify OTP. Please try again.", "error");
      }
    };
  
  
  

    async function sendOtpPhone(){
      try{
         
      let res : any  = await  sendPhoneOtp({
        userId : verifyEmailData?.userId,
        userType : verifyEmailData?.userType,
        phoneNo : verifyEmailData?.userEmail
      });
      console.log(res);
      if(res.status !==400 || res.data?.status === "success"){
        generateSnackbar("You'll shortly recieve a call on your Phone.", "success");
        setOpenOtpBoxPhone(true)
      }
      else{
          generateSnackbar(res?.response?.data?.message || "Some error occur, please Try Again.", "error");
      }

      }
      catch(e){
        generateSnackbar("Some error occur, please Try Again.", "error");
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
            className="text-sm sm:text-lg font-bold mb-2"
          >
            Enter phone number
          </label>
          <PhoneInput
            international
            id="phone-input"
            countryCallingCodeEditable={false}
            defaultCountry="GB"  // Default country (you can modify)
            className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
            // value={verifyEmailData?.userEmail}
            value={verifyEmailData?.userEmail}
            onChange={(e : any)=>{
              setVerifyEmailData({...verifyEmailData, userEmail : e})
            }}
          />
          <p className="text-red">{error}</p> {/* Error message */}
        </FormControl>

          <div className="flex flex-row items-center justify-end">
            <span>Got your OTP ?</span>
            <Button
            variant="text"
            className="h-[50px] w-[130px] rounded-sm flex ml-[-20px]"
            onClick={()=>{
              setOpenOtpBoxPhone(true)
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
            onClick={sendOtpPhone}
          >
            <span className="font-bold">Send OTP</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
      </div>
    </div>
      


      {
        openOtpBoxPhone &&
          <div className="w-[100vw] h-[100vh] flex z-10 justify-center items-center fixed">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
            <div style={{backgroundColor : "white",  borderRadius : "5px"}} className="p-[20px] lg:w-[40%] z-10 md:w-[45%] sm:w-[60%] w-[80%]">
             <h1 className="text-2xl font-bold text-center max-w-[450px] m-[5%]">
               Confirm phone number
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
                     onClick={sendOtpPhone}
                     type="button"
                   >
                     Resend
                   </button>
                    <button
                     className="text-secondary hover:text-main font-bold"
                     onClick={()=>{
                      setOpenOtpBoxPhone(false)
                    }}
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
             </div>
           </div>
      }
    </>
  );
};

export default PhoneOtpClient;


