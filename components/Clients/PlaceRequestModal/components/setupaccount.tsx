"use client";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface SetupAccountProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function SetupAccount({
  handleNext,
  handlePrev,
}: SetupAccountProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center max-w-[450px] -mt-8">
        Let&apos;s setup your account
      </h1>
      <form
        className="flex flex-col gap-4 px-4 md:px-8 w-full [&_label]:font-semibold"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <label>Your name</label>
          <OutlinedInput
            fullWidth
            required
            id="outlined-adornment-amount"
            placeholder="Please enter your name"
            className="border-b-4 border-b-secondary"
          />
        </FormControl>
        <FormControl>
          <label>Enter your email</label>
          <OutlinedInput
            fullWidth
            required
            id="outlined-adornment-amount"
            placeholder="Enter your email"
            className="border-b-4 border-b-secondary"
          />
        </FormControl>
        <FormControl>
          <label>Choose your password</label>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            margin="normal"
            className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-3"
            InputProps={{
              placeholder: "•••••••••••",
              className: "border-b-4 border-b-secondary",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordToggle}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <label>Re-enter password</label>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            margin="normal"
            className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-3 border-b-4 border-b-secondary"
            InputProps={{
              placeholder: "•••••••••••",
              className: "border-b-4 border-b-secondary",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordToggle}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Box className="flex justify-between items-center flex-wrap gap-y-2">
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            className="flex gap-2"
            onClick={handlePrev}
          >
            <FaArrowLeft />
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            type="submit"
            className="flex gap-2 "
          >
            Confirm
            <FaArrowRight />
          </Button>
        </Box>
      </form>
    </>
  );
}
