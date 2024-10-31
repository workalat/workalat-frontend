"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa6";
import Recaptcha from "./recaptcha";
import { loginWithGoogle, loginWithLinkedin } from "./action";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useTheme } from "@/context/navbar_theme";
import { Navbar } from "@/components/navbar/navbar";
import lockIcon from "@/public/icons/hide.svg";
import appleIcon from "@/public/icons/apple.svg";
import gmailIcon from "@/public/icons/gmail.svg";
import linkedInIcon from "@/public/icons/linkedin_logo.svg"
import { useUserContext } from '@/context/user_context';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from 'next/navigation';
import VerifyUser from "../middleware/VerifyUser";


const LoginPage = () => {
  const theme = useTheme();

  useEffect(() => {
    theme.toggleTheme();
  }, []);

  const [email, setEmail]   = useState("");
  const [password, setPassword]   = useState("");
  const [showPassword, setShowPassword]   = useState(false);
  const [rememberMe, setRememberMe]   = useState(false);
  const [loading, setLoading]   = useState(false);
  let [googleData, setGoogleData]   = useState({});
  let router   : any = useRouter();
  let [loading2, setLoading2]  =  useState(true);
  const [isHuman, setIsHuman] = useState<boolean>(false);

  
  const {signinProfessional, userData,continueWithGoogleProfessional, setUserId,setUType , setTempUserData,  tempUserData }  : any = useUserContext();
  
  const { generateSnackbar }  : any = useSnackbar();



  async function verify(){
    try{
      setLoading2(true);
      let token  : any = Cookies.get("token");
      let ver  : any = await VerifyUser(token, "client", false);
      if(ver?.status === "fail"){
        setLoading2(false);
      }
      else{
        if(ver?.registerAs === "professional"){
          router.push("/professional/dashboard")
        }
        else{
          router.push("/client/dashboard")
        }
      }
    }
    catch(e){
      // console.log(e);
    }
  };

  useEffect(() => {
    theme.toggleTheme();
    verify();
  
  }, []);






  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };


  async function handleContinueWithGoole(){
    try{
      if(Object.keys(googleData).length !== 0){
          let res  : any = await continueWithGoogleProfessional(googleData, "client");
      if(res?.data?.userStatus === "SUCCESS"){

        if(res?.data?.newAccount === true || res?.data?.newAccount ){
          // redirect
          generateSnackbar("Account Created Successfully", "success"); 
          Cookies.set("token", res?.data?.token, { secure: true, sameSite: 'None'}); 
          router.push("/client/dashboard")

        }
        else if(res?.data?.newAccount === false || !res.data?.newAccount ){
          generateSnackbar("Loggedin Successfully", "success"); 
          Cookies.set("token", res?.data?.token, { secure: true, sameSite: 'None'}); 
            let ver  : any = await VerifyUser(res.data?.token, "client");
            if(ver?.registerAs === "client"){
              router.push("/client/dashboard")
            }
            else{
              router.push("/professional/dashboard")
            }
        }
        else{
          generateSnackbar( res?.response?.data?.message ||  "Some error Occur, please Try Again.", "error"); 
        }
      }
      else if(res?.data?.userStatus === "PENDING"){
          setTempUserData({...tempUserData, userId: res?.data?.data[0]?.userId});
          setUserId({...userData, userId : res?.data?.data[0]?.userId});
          setUserId(res?.data?.data[0]?.userId);
          Cookies.set("userId", res?.data?.data[0]?.userId,  { secure: true, sameSite: 'None', expires: 10 });
          generateSnackbar("Please Verify OTP", "success");

        // redirect
        router.push("/login/verify-email");
      }
      else{
        generateSnackbar( res?.response?.data?.message.incluedes("Please use Another Email") ? "Please use Another Email" : "Some error Occur, please Try Again.", "error"); 
      }
    
      }
      else{
        generateSnackbar("please Try Again.", "error"); 
      }
    }
    catch(e){
      generateSnackbar("Some error Occur, please Try Again.", "error"); 
    }
    
  }


  const handleSubmit = async (event) => {
      try{event.preventDefault();

        // Basic validation
        if (email === "" || password === "") {
          return generateSnackbar("Please fill in all required fields.", "error");
        }
        setLoading(true);
        let res  : any = await signinProfessional({email, password, userType : "client"});
         
        setLoading(false);
    
        if(res?.status !== 400 || res?.response?.data?.status === "success"){
        if(res?.isTwoFactAuth === false || !res?.isTwoFactAuth) {
          generateSnackbar("Logged in successfully!", "success");
          let ver  : any = await VerifyUser(res?.response?.data?.token, res?.response?.data?.userType);
          if(ver?.registerAs === "client"){
            router.push("/client/dashboard");
          }
          else{
            router.push("/professional/onboard/phone");
          }
        }
        else{
          generateSnackbar("Please Verify OTP", "success");
          setTempUserData({
            ...tempUserData,
            userId : res.response?.data?.data[0]?.userId || Cookies.get("userId"),
            userEmail : res.response?.data?.data[0]?.userEmail || Cookies.get("userEmail"),
            userType : res.response?.data?.data[0]?.userType  || Cookies.get("userType"),
    
          })
          // redirect
          router.push("/login/verify-email");
        }
      }
      
      else{
        generateSnackbar((res.response?.data?.message.includes("Cannot read properties of null (reading 'length')")) ? "No Data Found." :  res.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
      }

      }
      catch(e){
        generateSnackbar("Some error Occur, please Try Again.", "error");
      }
  };




  return (
    <>
    {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
              <>
              <Navbar mode={theme.theme.type} />
      <div className="w-full min-h-[80svh] flex justify-center items-center mt-28 mb-10 px-6">
        <div className="w-full max-w-lg border border-main border-opacity-50 shadow-lg rounded-md sm:rounded-xl px-4 py-8 sm:p-8">
          <form className="space-y-4">
            <h1 className="font-bold text-2xl sm:text-3xl text-center">
              Login
            </h1>
            <div className="space-y-1">
              <p className="font-semibold sm:text-lg">Email</p>
              <TextField
                fullWidth
                type="email"
                value={email}
                className=" border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3"
                onChange={handleEmailChange}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold sm:text-lg">Password</p>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordToggle}>
                        <img src={lockIcon.src} alt="" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center sm:gap-1 -ml-1.5">
                <Checkbox
                  checked={rememberMe}
                  className="[&>input]:!outline-main [&>input]:!border-opacity-15 w-8 sm:w-auto"
                  onChange={handleRememberMeChange}
                />
                <p className="font-semibold text-sm sm:text-lg">Remember me</p>
              </div>
            </div>
            <div className="pb-5">
            <Recaptcha setIsHuman={setIsHuman}  />
          </div>
            <Button
              fullWidth
              variant="contained"
              className="bg-secondary capitalize shadow-none font-bold text-dark text-xl font-mono hover:bg-secondary"
              onClick={handleSubmit}
              type="submit"
              disabled={!isHuman}
            >
              Login
            </Button>
          </form>
          <Link
            href="/forgot-password"
            className="text-secondary hover:text-dark transition-colors text-sm sm:text-base mt-2 w-full flex justify-end"
            onClick={setUType("client")}
          >
            Forgot password?
          </Link>
          <div className="relative !mt-4">
            <hr className="border-dark border-opacity-50 absolute top-1/2 -translate-y-1/2 w-full" />
            <p className="relative w-14 mx-auto bg-white text-center text-fadedwhite">
              OR
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
          {/* <div className='flex justify-center items-center'>
              <GoogleLogin 
                onSuccess={(credentialResponse : any) => {
                    let decode = jwtDecode(credentialResponse.credential);
                    setGoogleData(decode);
                    handleContinueWithGoole();
                }}
                onError={() => {
                    // console.log('Login Failed');
                }}
                />
                </div> */}

                <Button
              onClick={() => {
                loginWithGoogle();
              }}
              disabled={!isHuman}
              href={""}
              style={{
                border: "1px solid main",
                color : "black"
              }}
              className="border border-main border-opacity-15 transition-colors hover:bg-secondary shadow-md flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={gmailIcon.src} alt="" />
              Continue with Google
            </Button>

          <Button
              onClick={() => {
                loginWithLinkedin();
              }}
              disabled={!isHuman}
              style={{
                border: "1px solid main",
                color : "black"
              }}
               className="border border-main border-opacity-15 transition-colors hover:bg-secondary shadow-md flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
              // className=" hover:bg-opacity-85 transition-colors text-white flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={linkedInIcon.src} alt="" />
              Continue with LinkedIn
            </Button>
          </div>
          <div className="text-sm text-center mt-10 font-bold">
            <p>
              Offering a service?{" "}
              <Link
                href={"/professional/signup"}
                className="text-main underline hover:text-opacity-80"
              >
                Join as a professional
              </Link>
            </p>
            <p>
              Looking for a service?{" "}
              <Link
                href={"/signup"}
                className="text-main underline hover:text-opacity-80"
              >
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Modal open={loading}>
        <Box className="w-full h-full flex justify-center items-center">
          <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
            <img src="/images/loader.gif" alt="Loading..." className="w-60" />
            <h1 className="text-center font-bold text-xl ml-2">Logging In...</h1>
          </Box>
        </Box>
      </Modal>
              </>
            )
    }
      
    </>
  );
};

export default LoginPage;
