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

import { useSnackbar } from "@/context/snackbar_context";
import gmailIcon from "@/public/icons/gmail.svg";
import linkedInIcon from "@/public/icons/linkedin_logo.svg";
import { useTheme } from '@/context/navbar_theme';

const ProfessionalSignupForm = () => {

  // router
  const router = useRouter();

  // Theme
  const theme = useTheme();

  useEffect(() => {
    theme.toggleTheme();
  }, []);

  // Alert
  const { generateSnackbar } = useSnackbar();
  
  // Form Inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
      return generateSnackbar("Please fill in all required fields.", "error");
    }
    
    if (password !== confirmPassword) {
      return generateSnackbar("Passwords do not match.", "error");
    }

    // Handle form submission
    generateSnackbar("Account created successfully!", "success");

    // Reset form inputs
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // redirect
    router.push("/professional/signup/verify-email");
  };

  return (
    <>
      <div className="w-full min-h-[80svh] flex justify-center items-center mt-28 mb-10 px-6">
        <div className="w-full max-w-lg border border-main border-opacity-50 shadow-lg rounded-md sm:rounded-xl px-4 py-8 sm:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl text-center">Create Account</h1>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Full Name</p>
              <TextField
                fullWidth
                value={fullName}
                className=" border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3 [&_input]:!py-2"
                onChange={handleFullNameChange}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Email</p>
              <TextField
                fullWidth
                type="email"
                value={email}
                className=" border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&_input]:!p-3 [&_input]:!py-2"
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
            <div className="space-y-1">
              <p className="font-semibold text-sm">Re-enter Password</p>
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                value={confirmPassword}
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
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <Button
              fullWidth
              type='submit'
              variant="contained"
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
            <Link
              href={"/"}
              className="border border-main border-opacity-30 transition-colors hover:bg-secondary shadow-md flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={gmailIcon.src} alt="" />
              Continue with Google
            </Link>
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
              Already have an account?{" "}
              <Link href={"/professional/login"} className="text-main underline hover:text-opacity-80">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalSignupForm;
