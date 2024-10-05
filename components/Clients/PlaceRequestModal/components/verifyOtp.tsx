/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";

interface VerifyOTPProps {
  handleNext: () => void;
  handlePrev: () => void;
}

const VerifyOTP = ({ handleNext, handlePrev }: VerifyOTPProps) => {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) return alert("Enter valid OTP");
    handleNext();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center max-w-[450px]">
        Confirm phone number
      </h1>
      <p className="mb-2 -mt-4">
        Kindly enter the OTP sent to{" "}
        {JSON.parse(localStorage.getItem("stepFormData") || "")?.phone_number || ""}
      </p>
      <form className="flex flex-col gap-4 px-12" onSubmit={handleSubmit}>
        <MuiOtpInput
          autoFocus
          value={otp}
          length={4}
          className="[&_input]:h-8 [&>*>*]:!border-b-3 [&>*>*]:border-b-secondary [&>*]:shadow-medium font-bold text-xl"
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <p className="text-lg">Didn&apos;t receive a code?</p>
          <div className="text-sm flex gap-3 items-center">
            <button className="text-secondary hover:text-main font-bold">
              Resend
            </button>
            <button
              className="text-secondary hover:text-main font-bold"
              onClick={handlePrev}
            >
              Change number
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
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default VerifyOTP;
