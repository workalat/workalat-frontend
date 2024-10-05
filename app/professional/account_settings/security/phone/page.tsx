"use client";
import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "react-phone-number-input/style.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";

import OTPModal from "./otp_modal";

import arrowRight from "@/public/icons/arrow_right.svg";

const PhonePage = () => {
  const [otpModal, setOtpModal] = useState(false);
  const [value, setValue] = useState<string | undefined>();

  const handlePhoneNumberChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };

  return (
    <>
      <OTPModal open={otpModal} onClose={() => setOtpModal(false)} />
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={7}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Box className="flex flex-col gap-1">
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="GB"
                className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input]:border-b [&_input:hover]:border-dark [&_input]:p-2  [&_input:focus]:outline-secondary"
                value={value}
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
              onClick={() => setOtpModal(true)}
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
