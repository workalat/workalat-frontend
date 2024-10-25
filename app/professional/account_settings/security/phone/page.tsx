"use client";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "react-phone-number-input/style.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import Cookies from 'js-cookie';
import OTPModal from "./otp_modal";

import arrowRight from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import VerifyUser from "@/app/middleware/VerifyUser";

const PhonePage = () => {
  const [otpModal, setOtpModal] : any  = useState(false);
  const [value, setValue] : any  = useState<string | undefined>();

  
  let { getPhoneNo,phoneVerifyPage } : any  = useUserContext();
  let [userData, setUserData] : any  = useState({});
  let [phoneNo, setPhoneNo] : any  = useState("");
  let [phoneCountry, setPhoneCountry] : any  = useState("");

  // loading
  const [loading2, setLoading2] : any  = useState(true);

  
  // router
  const router : any  = useRouter();

   // Alert
   const { generateSnackbar } = useSnackbar();



  const handlePhoneNumberChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setPhoneNo(newValue);
    }
  };


  
  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token : any  = Cookies.get("token");
        let ver : any  = await VerifyUser(token, "professional");
        if(ver?.status === "success"){
          if(ver?.registerAs === "client"){
            router.push("/client/dashboard")
          }
          else{
            setUserData(ver);
            let phoneDet : any  = await getPhoneNo({userId : ver.userId, userType : "professional"});
            setPhoneNo(phoneDet?.data?.phoneNo)
            setPhoneCountry(phoneDet?.data?.countryCode)
            setLoading2(false);
          }
        }
        else{
          router.push("/"); 
        }
      }
      catch(e){
        console.log(e);
      }
    };
    verify();
  }, []); 


  async function handleSendOtp(){
    try{
      if(!phoneNo){
        return generateSnackbar("Please Enter Phone Number.", "error");
      }
     let res : any  = await phoneVerifyPage({
        userId : userData?.userId,
        userType : userData?.userType,
        phoneNo : phoneNo
     });
      if(res?.status !== 400  || res?.data?.status === "success"){
        generateSnackbar("OTP sent successfully", "success");
        setOtpModal(true)
      }
      else{
        generateSnackbar(res?.response?.data?.message || "Please Try Again.", "error");
      }
    }
    catch(e){
      console.log(e);
    }
  };






  return (
    <>
      <OTPModal open={otpModal} onClose={() => setOtpModal(false)} userId={userData?.userId} userType={userData?.userType} phoneNo={phoneNo} />
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={7}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Box className="flex flex-col gap-1">
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="GB"
                className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input]:border-b [&_input:hover]:border-dark [&_input]:p-2  [&_input:focus]:outline-secondary"
                value={phoneNo}
                onChange={handlePhoneNumberChange}
              />
              <Box className="flex justify-between items-center">
                <Typography className="text-gray-400 text-xs">
                  We will automatically send OTP. Please confirm your phone
                  number is correct.
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  className="hover:text-main"
                >
                  Change
                </Button>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={handleSendOtp}
            >
              Send OTP
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PhonePage;
