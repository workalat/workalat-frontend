import { Button, FormControl, OutlinedInput } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import arrowRightIcon from "@/public/icons/arrow_right.svg";

interface PhoneOtpProps {
  handleNext: () => void;
  handlePrev: () => void;
  updateFormData: (data: any) => void;
}

const PhoneOtp = ({
  handleNext,
  handlePrev,
  updateFormData,
}: PhoneOtpProps) => {
  const [phoneNumber, setPhoneNumber] = useState(
    JSON.parse(localStorage.getItem("stepFormData") || "" )?.phone_number || ""
  );
  const [error, setError] = useState("");

  const handlePhoneNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    const phoneNumberObject = parsePhoneNumberFromString(e.target.value, "PK");

    if (!phoneNumberObject || !phoneNumberObject.isValid()) {
      setError("Please enter a valid phone number.");

      return;
    }
    setError("");
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateFormData({ phone_number: phoneNumber });
    handleNext();
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center max-w-[450px]">
        Let&apos;s get your details
      </h1>
      <form className="w-full px-12" onSubmit={handleOtpSubmit}>
        <FormControl fullWidth>
          <label htmlFor="service" className="sm:text-lg font-bold mb-2">
            Enter phone number
          </label>
          <OutlinedInput
            required
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            id="service"
            className="rounded-md shadow-medium border-b-3 border-b-secondary"
            error={!!error}
            onChange={handlePhoneNumChange}
          />
          <p className="text-red">{error}</p>
        </FormControl>
        <div className="mt-4 flex w-full justify-between">
          <Button
            variant="outlined"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            color="secondary"
            onClick={handlePrev}
          >
            <Image
              src={arrowRightIcon}
              alt="Arrow right"
              className="rotate-180"
            />
            <span className="font-bold">Back</span>
          </Button>
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

export default PhoneOtp;
