"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import arrowRight from "@/public/icons/arrow_right.svg";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser";


const GetProfessionalPhone = () => {
    let [loading, setLoading] : any =  useState(true);

    // snackbar
    const { generateSnackbar }  : any  = useSnackbar();
    
    //Context 
    let { verifyToken, userData, sendPhoneOtp, setTempUserData, tempUserData }  : any  = useUserContext();
    // router
    const router  : any  = useRouter();

    const [value, setValue]  : any  = useState<string | undefined>();

    useEffect(()=>{
        async function getAllVerificationDone(){ 
            setLoading(true);
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
                        else{
                            setLoading(false);
                        }
                    }
                    else{
                      if(ver?.userType === "professional"){
                        router.push("/professional/dashboard")
                      }
                      else{
                        router.push("/client/dashboard")
                      }
                    }
                  }
                  else{
                    router.push("/professional/login");
                  }
            }
            catch(e){
                router.push("/professional/login");
            }
        };
        getAllVerificationDone();
    }, [])

    const handlePhoneNumberChange = (newValue?: string) => {
        if (newValue !== undefined) {
            setValue(newValue);
        }
    };

    const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();

        if (!value) {
            return generateSnackbar("Enter valid phone number", "error");
        }
        let token  : any  = Cookies.get("token") || userData.token;
        if(token || token?.length>0) { 
            let verifyUser  : any  = await verifyToken(token, "professional",true );
            if(verifyUser?.status !== 400 || verifyUser?.data?.status === "success"){
                setTempUserData({...tempUserData, userPhone : value});
                let res  : any  = await sendPhoneOtp({
                    userId : verifyUser.data.userId,
                    userType    : verifyUser.data.userType,
                    phoneNo : value
                });
                if(res?.data?.status === "success" && res?.data?.userStatus === "PENDING"){
                    generateSnackbar("OTP sent, You'll shortly recieve a call on your Phone No.", "success");
                    router.push("/professional/onboard/phone/verify");
                }
                else{
                    return generateSnackbar("Some Error Occur, Please Try Again!", "error")
                }

            }
            else{
                router.push("/professional/login");
                return generateSnackbar("Please login again", "error")
            }
        }
        else{
            router.push("/professional/login");
            return generateSnackbar("Please login again", "error")
        }
        }
        catch(e){
            // console.log(e);
        }
    }

    const goBack = () => {
        return router.push("/professional/dashboard");
    }

    return (
        <>
        {
            loading ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :
            (
                <Box className="h-full w-full flex justify-center items-center px-6" >
                <Box className="rounded-xl border border-dark border-opacity-30 px-4 py-4 pb-6 md:px-8 md:py-8 md:pb-10 space-y-4 bg-white shadow-md max-w-xl" component={"form"} onSubmit={handlePhoneSubmit}>
                    <Typography className="font-bold text-2xl text-center mb-4">Let&apos; get your details</Typography>
                    <Box className="flex flex-col gap-1" >
                        <label className="font-bold mb-1" htmlFor="phone-input">Enter phone number</label>
                        <PhoneInput
                            international
                            id="phone-input"
                            countryCallingCodeEditable={false}
                            defaultCountry="GB"
                            className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
                            value={value}
                            onChange={handlePhoneNumberChange}
                        />
                        <Box className="flex justify-between items-center">
                            <Typography className="text-gray-400 text-xs">
                                We will automatically send OTP. Please confirm your phone
                                number is correct.
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="flex justify-between">
                        <Button
                            variant="outlined"
                            color="secondary"
                            className="gap-2 py-3 px-6 font-semibold"
                            onClick={goBack}
                        >
                            <Image alt="" src={arrowRight} className="rotate-180" />
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="gap-2 py-3 px-6 font-semibold"
                            type="submit"
                        >
                            Confirm
                            <Image alt="" src={arrowRight} />
                        </Button>
                    </Box>
                </Box>
            </Box>
            )
        }
            
        </>
    );
};

export default GetProfessionalPhone;
