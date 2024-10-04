"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Link from "next/link";

import { useTheme } from "@/context/navbar_theme";
import { Navbar } from "@/components/navbar/navbar";
import lockIcon from "@/public/icons/hide.svg";
import appleIcon from "@/public/icons/apple.svg";
import gmailIcon from "@/public/icons/gmail.svg";

const LoginPage = () => {
  const theme = useTheme();

  useEffect(() => {
    theme.toggleTheme();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  return (
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
            <Button
              fullWidth
              variant="contained"
              className="bg-secondary capitalize shadow-none font-bold text-dark text-xl font-mono hover:bg-secondary"
            >
              Login
            </Button>
          </form>
          <Link
            href="/forgot-password"
            className="text-secondary hover:text-dark transition-colors text-sm sm:text-base mt-2 w-full flex justify-end"
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
            <Link
              href={"/"}
              className="bg-main hover:bg-opacity-85 transition-colors text-white flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={appleIcon.src} alt="" />
              Continue with Apple
            </Link>
            <Link
              href={"/"}
              className="border border-main border-opacity-15 transition-colors hover:bg-secondary shadow-md flex items-center justify-center py-3 font-semibold gap-2 sm:text-lg rounded-md"
            >
              <img src={gmailIcon.src} alt="" />
              Continue with Google
            </Link>
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
    </>
  );
};

export default LoginPage;
