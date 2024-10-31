"use client";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Button,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { useTheme } from '@/context/navbar_theme';
import { useSnackbar } from "@/context/snackbar_context";
import linkedInIcon from "@/public/icons/linkedin_logo.svg"
import gmailIcon from "@/public/icons/gmail.svg"
import { useUserContext } from '@/context/user_context';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';
import VerifyUser from '@/app/middleware/VerifyUser';
import { Router } from 'next/router';

  
const LoginPage = () => {
  // user context
  const {signinProfessional, userData,continueWithGoogleProfessional, setUType }  : any = useUserContext();
  let [loading, setLoading]  : any =  useState(true);
    
  // router
  const router = useRouter();

  // Theme
  const theme = useTheme();
  
  useEffect(() => {
    theme.toggleTheme();
    async function verify(){
      try{
        setLoading(true);
        let token : any = Cookies.get("token");
        let ver   : any = await VerifyUser(token, "professional", true);
        // console.log(ver);
        if(ver?.status === "fail"){
          setLoading(false);
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
        console.log(e);
      }
    };
    verify();
  }, []);

  // Alert
  const { generateSnackbar } = useSnackbar();

  // Form Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let [googleData, setGoogleData] = useState({});
  let [userId, setUserId] = useState("");


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (email === "" || password === "") {
      return generateSnackbar("Please fill in all required fields.", "error");
    }

    let res  : any = await signinProfessional({email, password, userType : "professional"});
    console.log(res);

    if(res.isTwoFactAuth === false || !res.isTwoFactAuth) {
      
    if(res.status !== 400 || res.response.data?.status === "success"){
      generateSnackbar("Logged in successfully!", "success");
      
      // Redirect after successful login
      router.push("/professional/onboard/phone");
    }
    else{
      generateSnackbar(res.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
    }
    }
    else{
      generateSnackbar("Please Verify OTP", "success");

      // redirect
      router.push("/professional/login/verify-email");
    }
  };

  async function handleContinueWithGoole(){
    try{
      console.log(googleData)
      if(Object.keys(googleData).length !== 0){
          let res  : any = await continueWithGoogleProfessional(googleData, "professional");
          console.log(res);
          if(res?.data?.userStatus === "SUCCESS"){
        if(res.data?.newAccount === true || res.data?.newAccount ){
          // redirect
          generateSnackbar("Account Created Successfully", "success"); 
          Cookies.set("token", res.data?.token, { secure: true, sameSite: 'None'}); 
          router.push("/professional/onboard/formpage")

        }
        else if(res.data?.newAccount === false || !res.data?.newAccount ){
          generateSnackbar("Loggedin Successfully", "success"); 
          Cookies.set("token", res.data?.token, { secure: true, sameSite: 'None'}); 
          router.push("/professional/onboard/formpage")
        }
        else{
          generateSnackbar("Some error Occur, please Try Again.", "error"); 
        }

      }
      else if(res?.data?.userStatus === "PENDING"){
          setUserId(res?.data?.data[0]?.userId);
          Cookies.set("userId", res?.data?.data[0]?.userId);
          generateSnackbar("Please Verify OTP", "success");

        // redirect
        router.push("/professional/login/verify-email");
      }
      else{
        generateSnackbar("Some error Occur, please Try Again.", "error"); 
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


  return (
    <>
    {
            loading ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
              <div className="w-full min-h-[80vh] flex justify-center items-center mt-24 mb-10 px-6">
        <div className="w-full max-w-lg border border-main border-opacity-50 shadow-lg rounded-md sm:rounded-xl px-4 py-8 sm:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl text-center">Log In</h1>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Email</p>
              <TextField
                fullWidth
                type="email"
                value={email}
                className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3 [&_input]:!py-2"
                onChange={handleEmailChange}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Password</p>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-2"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordToggle}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handlePasswordChange}
              />
            </div>
            <Button
              fullWidth
              type='submit'
              variant="contained"
              className="bg-secondary capitalize shadow-none font-bold text-dark text-lg font-mono hover:bg-secondary"
            >
              Log In
            </Button>
          </form>
          <Link
            href="/forgot-password"
            className="text-secondary hover:text-dark transition-colors text-sm sm:text-base mt-2 w-full flex justify-end"
            onClick={setUType("professional")}
          >
            Forgot password?
          </Link>
          <div className="relative !mt-6">
            <hr className="border-dark border-opacity-50 absolute top-1/2 -translate-y-1/2 w-full" />
            <p className="relative w-14 mx-auto bg-white text-center text-fadedwhite">
              OR
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            {/* <Link
              href={"/"}
              className="border border-main border-opacity-30 transition-colors hover:bg-secondary shadow-md flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={gmailIcon.src} alt="" />
              Continue with Google
            </Link> */}
           <div className='flex justify-center items-center'>
              <GoogleLogin 
                onSuccess={(credentialResponse : any) => {
                    let decode = jwtDecode(credentialResponse.credential);
                    setGoogleData(decode);
                    handleContinueWithGoole();
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />
                </div>
            <Link
              href={"/"}
              className="bg-main hover:bg-opacity-85 transition-colors text-white flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={linkedInIcon.src} alt="" />
              Continue with LinkedIn
            </Link>
          </div>
          <div className="text-sm text-center mt-10 font-bold">
            <p>
              Don&apos;t have an account?{" "}
              <Link href={"/professional/signup"} className="text-main underline hover:text-opacity-80">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
            )
            }
      
    </>
  );
};

export default LoginPage;
