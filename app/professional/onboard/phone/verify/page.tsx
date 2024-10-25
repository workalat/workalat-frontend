"use client";
import { Box, Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSnackbar } from "@/context/snackbar_context";
import arrowRight from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import VerifyUser from "@/app/middleware/VerifyUser";
import Cookies from 'js-cookie';

const PhoneOTPVerify = () => {
    //Context 
    let {userData, verifyPhoneOtp, tempUserData, sendPhoneOtp}  : any  = useUserContext();

    useEffect(()=>{
        async function getAllVerificationDone(){
            try{
                let token  : any  = Cookies.get("token");
                let ver  : any  = await VerifyUser(token, "professional");
                if(ver?.status === "success"){
                    if(ver?.userType === "professional" && ver?.isRegistrationComplete !== true){
                        if(ver?.isPhoneVerify || ver?.isPhoneVerify===true){
                            if(ver?.isRegistrationComplete === true){
                                router.push("/leads")
                            }
                            else{
                                router.push("/professional/onboard/formpage")
                            }
                        }
                    }
                    else{
                      if(ver?.userType === "professional"){
                        router.push("/leads")
                      }
                      else{
                        router.push("/client/dashboard")
                      }
                    }
                  }
                  else{
                    router.push("/login");
                  }
            }
            catch(e){
                router.push("/login");
            }
        };
        getAllVerificationDone();
    }, [])

    // router
    const router  : any  = useRouter();

    // snackbar
    const { generateSnackbar }  : any  = useSnackbar();
    
    // otp
    const [otp, setOtp]  : any  = useState("");

    const handleChange  : any  = (newValue: string) => {
        setOtp(newValue);
    };

    const handleResend  : any  = async () => {
        try{ 
            
        let token  : any  = Cookies.get("token");
        let ver  : any  = await VerifyUser(token, "professional");

        if(ver?.status === "success" || ver?.status !== 400){
                        
        // TODO: Implement resend
                // console.log(tempUserData);
                let res = await sendPhoneOtp({
                    userId : ver.userId,
                    userType    : ver.userType,
                    phoneNo : tempUserData.userPhone
                });

            if(res.status !==400 || res.data?.status === "success"){
                
                return generateSnackbar("OTP resent successfully", "success");
            }
            else{
                generateSnackbar("Please login again.", "error");
            }
        }
        else{
            generateSnackbar("No user Data Found, please login again.", "error");
            router.push("/login");
        }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Please login again.", "error");
            router.push("/login");
        }
    };

    const handleOTPSubmit =async (value:  any ) => {
        // OTP validation
        // if (otp.length >= 4) return generateSnackbar("Enter valid OTP", "error");
        
        // TODO: Implement OTP verification
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "professional");
        // console.log("REsnsasldkn")
        // console.log(ver);
        if(ver.status === "success" || ver.status !== 400){
            let verifyOtp = await verifyPhoneOtp(ver.userId, ver.userType , otp);
            // OTP verification success
            generateSnackbar("Phone verified.", "success")

            if(verifyOtp.status !==400 || verifyOtp.data?.status === "success"){
                router.push("/professional/onboard/formpage");
            }
            else{
                generateSnackbar(verifyOtp.response?.data?.message || "Click on Re-send OTP", "error");
            }
        }
        else{
            generateSnackbar("No user Data Found, please login again.", "error");
            router.push("/login");
        }
    }

    return (
        <Box className="h-full w-full flex justify-center items-center">
            <Box className="bg-white p-8 flex flex-col gap-4 rounded-lg mx-2 sm:mx-0 border border-dark border-opacity-30 shadow-md">
                <Box className="flex justify-center items-start gap-8 pb-4">
                    <Box className="flex flex-col">
                        <Typography className="text-2xl font-bold text-center">Confirm OTP</Typography>
                        <Typography className="text-sm text-gray-600 text-center">
                            Kindly enter the OTP sent to the registered phone number{" "}
                        </Typography>
                    </Box>
                </Box>
                <Box className="space-y-3">
                    <MuiOtpInput
                        length={4}
                        className="max-w-sm mx-auto [&_input]:text-dark [&_input]:shadow-medium [&_input]:h-8 [&>*>*>*]:!border-b-4 [&>*>*>*]:!border-b-secondary"
                        value={otp}
                        onChange={handleChange}
                        // onComplete={handleOTPSubmit}
                    />
                    <Typography className="font-bold text-sm text-center flex justify-between items-center">
                        Didn&apos;t receive the code?
                        <span className="flex items-center">
                            <Button variant="text" className="hover:text-main ml-2" onClick={handleResend}>
                                Resend
                            </Button>
                            <Link href="/professional/onboard/phone" className="text-secondary hover:text-main ml-2">
                                Change Number
                            </Link>
                        </span>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    className="gap-2 py-3 px-6 font-semibold w-full max-w-max mx-auto"
                    onClick={handleOTPSubmit}
                >
                    Confirm
                    <Image alt="Change password" src={arrowRight} />
                </Button>
            </Box>
        </Box>
    );
};

export default PhoneOTPVerify;
