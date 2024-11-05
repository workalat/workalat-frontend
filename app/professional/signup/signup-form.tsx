"use client";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 
import { GoogleLogin } from '@react-oauth/google';
import Recaptcha from "./recaptcha";
import {jwtDecode} from "jwt-decode"; 

import { loginWithGoogle, loginWithLinkedin } from "./action";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField 
} from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useSnackbar } from "@/context/snackbar_context";
import gmailIcon from "@/public/icons/gmail.svg";
import linkedInIcon from "@/public/icons/linkedin_logo.svg";
import { useTheme } from '@/context/navbar_theme';
import { db } from '@/context/firebase';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const ProfessionalSignupForm = () => {
  let { setSignupProfessional, signupProfessional, professionalSignupFunction, setUserId, continueWithGoogleProfessional } : any  = useUserContext();

  // loading
  const [loading, setLoading] : any  = useState(false);

  
  
  const { data: session } = useSession();
  const user = session?.user;


  // loading
  const [loading2, setLoading2] : any  = useState(false);


  // router
  const router : any  = useRouter();

  // Theme
  const theme : any  = useTheme();
  const [isHuman, setIsHuman] = useState<boolean>(false);

  // Alert
  const { generateSnackbar } : any  = useSnackbar();
  
  useEffect(() => {
    theme.toggleTheme();
    async function verify(){
      try{
        setLoading2(true);
        let token : any  = Cookies.get("token");
        let ver  : any  = await VerifyUser(token, "professional");
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
        generateSnackbar("Some Error Occur, Please try again", "error");
      }
    };
    verify();
  }, []);

  
  // Form Inputs
  const [showPassword, setShowPassword] : any  = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] : any  = useState(false);
  let [googleData, setGoogleData] : any  = useState({});
  
  const hasRun = useRef(false);


  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  function handleInput(e: any) {
    let name = e.target.name;
    let value = e.target.value;

    setSignupProfessional({
      ...signupProfessional,
      [name]: value
    })
  }


  
  const handleSubmit = async (event: any ) => {
    try {
      event.preventDefault();

      // Validate form inputs
      if (signupProfessional?.fullName === "" || signupProfessional?.email === "" || signupProfessional?.password === "" || signupProfessional?.confirmPassword === "") {
        return generateSnackbar("Please fill in all required fields.", "error");
      }

      if (signupProfessional?.password !== signupProfessional?.confirmPassword) {
        return generateSnackbar("Passwords do not match.", "error");
      }

      setLoading(true);
      let res : any  = await professionalSignupFunction(signupProfessional);

      setLoading(false);
      if (res?.status !== 400 || res?.response?.data?.status === "success") {
        // Handle form submission
        generateSnackbar(res.response?.data?.message || res.data?.message, "success");
          // Add a new document in collection "cities"
          await setDoc(doc(db, "usersChats", res.data?.data[0]?.userId), {
            chats : [],
          });

        setUserId(res.data?.data[0]?.userId);

        // redirect
        router.push("/professional/signup/verify-email");

      }
      else {
        return generateSnackbar(res.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
      }
    }
    catch (e : any ) {
      // console.log(e);
      return generateSnackbar(e?.message || "Some Error occurs, please try again in a few minutes", "error");
    }
  };


  async function loginUserGoogle() {
    try {
      let data: any = user;

      if (
        data?.image !== undefined ||
        data?.image?.includes("https://lh3.googleusercontent.com")
      ) {
        let d: any = {
          userFullName: data?.name,
          email: data?.email,
          userPictureLink: data?.image,
          userType : "professional"
        };

        console.log(d);

        const response: any = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/signinGoogle`,
          d
        );
        if (response?.status !== 400 || response?.data?.status === "success") {
          const customToken = response?.data?.token; // Retrieve your custom token
          generateSnackbar(response?.data?.message, "success");
          if (response?.data?.userType === "client") {
            Cookies.set("token", customToken, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            Cookies.set("userType", response?.data?.userType, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            router.push("/client/dashboard");
          } else {
            Cookies.set("token", customToken, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            Cookies.set("userType", response?.data?.userType, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            router.push("/professional/onboard/phone");
          }
        } else {
          generateSnackbar(
            response?.response?.data?.message ||
              "Some Error Occur, Please Try Again.",
            "error"
          );
        }
      } else {
        let d: any = {
          userFullName: data?.name,
          email: data?.email,
          userType : "professional"
        };

        const response: any = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/signinLinkedin`,
          d 
        );
        if (response?.status !== 400 || response?.data?.status === "success") {
          const customToken = response?.data?.token; // Retrieve your custom token
          generateSnackbar(response?.data?.message, "success");
          if (response?.data?.userType === "client") {
            Cookies.set("token", customToken, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            Cookies.set("userType", response?.data?.userType, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            router.push("/client/dashboard");
          } else {
            Cookies.set("token", customToken, {
              secure: true,
              sameSite: "None",
              expires: 30, 
            });
            Cookies.set("userType", response?.data?.userType, {
              secure: true,
              sameSite: "None",
              expires: 30,
            });
            router.push("/professional/onboard/phone");
          }
        } else {
          generateSnackbar(
            response?.response?.data?.message ||
              "Some Error Occur, Please Try Again.",
            "error"
          );
        }
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (user !== undefined) {
      if (hasRun.current) return;
      hasRun.current = true;
      loginUserGoogle();
    }
  }, [user]);




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
              <div className="w-full min-h-[80svh] flex justify-center items-center mt-28 mb-10 px-6">
        <div className="w-full max-w-lg border border-main border-opacity-50 shadow-lg rounded-md sm:rounded-xl px-4 py-8 sm:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl text-center">Create Account</h1>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Full Name</p>
              <TextField
                fullWidth
                name='fullName'
                value={signupProfessional.fullName}
                className=" border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3 [&_input]:!py-2"
                onChange={handleInput}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Email</p>
              <TextField
                fullWidth
                 type="email"
                name='email'
                value={signupProfessional.email}
                className=" border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3 [&_input]:!py-2"
                onChange={handleInput}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Password</p>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                margin="normal"
                name='password'
                value={signupProfessional.password}
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
                onChange={handleInput}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Re-enter Password</p>
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                name='confirmPassword'
                value={signupProfessional.confirmPassword}
                className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-2"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowConfirmPasswordToggle}>
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleInput}
              />
            </div>
            
            <Recaptcha setIsHuman={setIsHuman}/>
            <Button
              fullWidth
              type='submit'
              variant="contained"
              disabled={!isHuman}
              className="bg-secondary capitalize shadow-none font-bold text-dark text-lg font-mono hover:bg-secondary"
            >
              Create Account
            </Button>
          </form>
          <div className="relative !mt-6">
            <hr className="border-dark border-opacity-50 absolute top-1/2 -translate-y-1/2 w-full" />
            <p className="relative w-14 mx-auto bg-white text-center text-fadedwhite">
              OR
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            {/* <Link
              href={"/"}
              className="border border-main border-opacity-30 transition-colors shadow-md flex font-semibold sm:text-lg rounded-md"
            > */}
              {/* <div className='flex justify-center items-center'>
              <GoogleLogin
                onSuccess={(credentialResponse : any ) => {
                    let decode = jwtDecode(credentialResponse.credential);
                    setGoogleData(decode);
                    handleContinueWithGoole();
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />
              </div> */}
            {/* <button 
            // onClick={handleLinkedInLogin }
              className="bg-main hover:bg-opacity-85 transition-colors text-white flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={linkedInIcon.src} alt="" />
              Continue with LinkedIn
            </button> */}

              
<Button
                  onClick={() => {
                    loginWithGoogle();
                  }}
                  disabled={!isHuman}
                  href={""}
                  style={{
                    border: "1px solid main",
                    color: "black",
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
                    color: "black",
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
              Already have an account?{" "}
              <Link href={"/professional/login"} className="text-main underline hover:text-opacity-80">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Modal open={loading}>
        <Box className="w-full h-full flex justify-center items-center">
          <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
            <img src="/images/loader.gif" alt="Loading..." className="w-60" />
            <h1 className="text-center font-bold text-xl ml-2">Wait, while we proceed your details...</h1>
          </Box>
        </Box>
      </Modal>
      </>
            )
      }
      
    </>
  );
};

export default ProfessionalSignupForm;
