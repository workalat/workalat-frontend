"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from '@/context/user_context';

import VerifyUser from "@/app/middleware/VerifyUser";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};


export default function VerifyEmail({oldEmail, newEmail}) {
    let { userId, verifyOtp, tempUserData,sendEmailOtp ,changeEmail} : any = useUserContext();
    let userType = "professional";
    let [data,setData]  : any  = useState({})

    // snackbar
    const { generateSnackbar }  : any  = useSnackbar();
    
    // router
    const router  : any  = useRouter();
    
    // otp
    const [otp, setOtp] = useState<string>("");

    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };

    
  useEffect(() => {
    async function verify(){
      try{
        let token  : any  = Cookies.get("token");
        let ver  : any  = await VerifyUser(token, "professional");
        if(ver?.status === "fail"){
            generateSnackbar("Please login again.", "error");
            router.push("/login");
            return;
        }
        else{
            setData(ver);
            if(ver.userId.length > 0) {
                let res  : any  = await sendEmailOtp({
                userId: ver.userId,
                userType: "professional",
                email: ver.userEmail,
              });
        
              if (res?.status !== 400 || res?.data?.status === "success") {
                return generateSnackbar("OTP sent successfully", "success");
              } else {
                generateSnackbar("Please login again.", "error");
              }
            } 
            else {
              generateSnackbar("No user Data Found, please login again.", "error"); 
        }
    }
      }
      catch(e){
        console.log(e);
      }
    };
    verify();
  }, []);

    const handleResend = async (e) => {
        try { 
            e.preventDefault();
            if(data?.userId?.length > 0) {

                let res  : any  = await sendEmailOtp({
                userId: data.userId,
                userType: "professional",
                email: data.userEmail,
              });
              if (res?.status !== 400 || res?.data?.status === "success") {
                return generateSnackbar("OTP resend successfully", "success");
              } else {
                generateSnackbar("Please login again.", "error");
              }
            } 
            else {
              generateSnackbar("No user Data Found, please login again.", "error");
              router.push("/login");
            }
            
        } catch (error) {
          generateSnackbar("An error occurred, please try again later.", "error");
        }
      };
   
    const handleOTPSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(userId);

        if(!data?.userId || data?.userId?.length === 0){
            generateSnackbar("Please Login Again.", "error");
            router.push("/professional/login");
        }
         

        // OTP validation
        if (otp.length !== 4) return generateSnackbar("Enter valid OTP", "error");
        
        // TODO: Implement OTP verification
        let res  : any  = await verifyOtp({otp,userId : data?.userId, userType})

        if(res?.status === 200 || res?.data?.status === "success"){
            let c  : any  = await changeEmail({
                userId : data.userId,
                 email : oldEmail,
                 newEmail : newEmail,
                 userType : data.userType
                });              
                if(c?.status !== 400 || c?.data?.status === "success"){
                    generateSnackbar(c?.data?.message ,"success");
                    router.refresh();
                }   
                else{
                    generateSnackbar(c?.response?.data?.message || "Some Error Occur, Please Try Again." ,"error")
                }
        }
        else{
            generateSnackbar("Invalid OTP" ,"error")
        }
    }

    return (
        <Modal open keepMounted>
            <Box sx={style} className="w-full max-w-xl flex flex-col justify-center items-center p-4 rounded-md md:p-8">
                <h1 className="text-2xl font-bold text-center max-w-[450px]">
                    Verify Email
                </h1>
                <p className="mb-4">
                    Kindly enter the OTP sent to email
                </p>
                <form className="flex flex-col gap-4 px-12" onSubmit={handleOTPSubmit} >
                    <MuiOtpInput
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        value={otp}
                        length={4}
                        className="[&_input]:h-8 [&>*>*]:!border-b-3 [&>*>*]:border-b-secondary [&>*]:shadow-medium font-bold text-xl"
                        onChange={handleChange}
                    />
                    <div className="flex justify-between items-center">
                        <p >Didn&apos;t receive a code?</p>
                        <div className="text-sm flex gap-3 items-center">
                            <button className="text-secondary hover:text-main font-bold" onClick={(e)=>{handleResend(e)}}>
                                Resend
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
                            <ArrowForwardIcon />
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
