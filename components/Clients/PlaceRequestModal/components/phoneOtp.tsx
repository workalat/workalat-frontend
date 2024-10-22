"use client"
import { Button, FormControl } from "@mui/material";  // For Material-UI components
import { parsePhoneNumberFromString } from "libphonenumber-js";  // Phone number parsing
import Image from "next/image";  // For handling images
import { useEffect, useState } from "react";  // For managing component state
import PhoneInput from "react-phone-number-input";  // Phone input component
import "react-phone-number-input/style.css";  // Import phone input styles
import arrowRightIcon from "@/public/icons/arrow_right.svg";  // Import an icon
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser";
import { useRouter } from "next/router";

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
  // State for phone number and error messages
  const [phoneNumber, setPhoneNumber] = useState(
    JSON.parse(localStorage.getItem("stepFormData") || "")?.phone_number || ""
  );
  const [error, setError] = useState("");
  
  
  const { clientSignup, tempUserData, setTempUserData, setProjectData, projectData} = useUserContext();
  let [loading, setLoading]=  useState(true); 
  const { generateSnackbar } = useSnackbar();



  // Handle phone number change
  const handlePhoneNumChange = (e: string | undefined) => {
    setPhoneNumber(e || ""); // Set the phone number from input
    const phoneNumberObject = parsePhoneNumberFromString(e || "", "PK");  // Default country code (replace "PK" if necessary)

    // Validate the phone number
    if (!phoneNumberObject || !phoneNumberObject.isValid()) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
  };

        


  // Handle form submission and extract country details
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();

    // Parse the phone number
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber || "", "GB");  // Replace "GB" with your preferred default country

    if (!phoneNumberObject || !phoneNumberObject.isValid()) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Extract country and calling code
    const countryCode = phoneNumberObject.country;  // Example: 'GB'
    const countryCallingCode = phoneNumberObject.countryCallingCode;  // Example: '+44'


    // Update the form data
    updateFormData({
      phone_number: phoneNumber,
      country_code: countryCode,
      country_calling_code: `+${countryCallingCode}`,
    });
    let res =  await clientSignup({phoneNo : phoneNumber, country : countryCode, countryCode:countryCallingCode  });
    console.log(res);

    if(res.status !== 400 || res.data?.status === 'success'){
      setTempUserData({...tempUserData, userId : res.data?.data?.userId, userPhone : phoneNumber,});
      
      Cookies.set("userId", res.data?.data?.userId ,{ secure: true, sameSite: 'None', expires: 10 });
      Cookies.set("userPhone",phoneNumber ,{ secure: true, sameSite: 'None', expires: 10 });
      generateSnackbar("OTP sent successfully.", "success");
      setProjectData({...projectData, ["userId"] : res.data?.data?.userId});
      handleNext();

    }
    else{
      generateSnackbar("This number is already associated with another Account, please use another number", "error");
    }


    }
    catch(e){
      console.error(e);
    }
  };
  function handleBack(e){
    e.preventDefault();
    handlePrev();
  }

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center max-w-[450px]">
        Let&apos;s get your details
      </h1>
      <form className="w-full px-4 md:px-12" onSubmit={handleOtpSubmit}>
        <FormControl fullWidth>
          <label
            htmlFor="service"
            className="text-sm sm:text-lg font-bold mb-2"
          >
            Enter phone number
          </label>
          <PhoneInput
            international
            id="phone-input"
            countryCallingCodeEditable={false}
            defaultCountry="GB"  // Default country (you can modify)
            className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumChange(e)}  // Handle input changes
          />
          <p className="text-red">{error}</p> {/* Error message */}
        </FormControl>

          <div className="flex flex-row items-center justify-end">
            <span>Got your OTP ?</span>
            <Button
            variant="text"
            className="h-[50px] w-[130px] rounded-sm flex ml-[-20px]"
            onClick={()=>{handleNext()}}
          >
            <span className="font-bold">Verify Otp</span>
          </Button>
          
          </div>

        <div className="mt-4 flex w-full justify-between">
          <Button
            variant="outlined"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            color="secondary"
          >
            <Image
              src={arrowRightIcon}
              alt="Arrow right"
              className="rotate-180"
              onClick={handleBack}
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


