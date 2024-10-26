"use client";
import React, { useEffect, useState } from "react";
import { Button, MobileStepper, Modal } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import closeIcon from "@/public/icons/close.svg";

import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import Step5 from "./components/step5";
import Step6 from "./components/step6";
import Step7 from "./components/step7";
import PhoneOtp from "./components/phoneOtp";
import VerifyOTP from "./components/verifyOtp";
import Done from "./components/done";
import Step8 from "./components/step8";
import Requirements from "./components/requirements";
import SetupAccount from "./components/setupaccount";
import EmailOTP from "./components/emailOTP";
import UploadPicture from "./components/upload-pic";
import { useRouter } from "next/navigation";

type formDataType = {
  service: string;
  location: string;
  service_subtype: {
    two_piece: boolean;
    three_piece: boolean;
    curtains: boolean;
    dress: boolean;
    jackets: boolean;
    shirt: boolean;
    duvet: boolean;
    trousers: boolean;
    [key: string]: boolean;
  };
  no_of_items: string;
  additional_service: string;
  frequency: string;
  budget: string;
  summary: {
    title: string;
    description: string;
    file: File | null;
  };
  phone_number: string;
};

const initialFormData: formDataType = {
  service: "",
  location: "",
  service_subtype: {
    two_piece: false,
    three_piece: false,
    curtains: false,
    dress: false,
    jackets: false,
    shirt: false,
    duvet: false,
    trousers: false,
  },
  no_of_items: "",
  additional_service: "",
  frequency: "",
  budget: "",
  summary: {
    title: "",
    description: "",
    file: null,
  },
  phone_number: "",
};
const PlaceRequestModal = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const getInitialStep = () => {
        return 0;
      };
    
      const getInitialFormData = () => {
        if (typeof window !== "undefined") {
          const stepFormDataItem = localStorage.getItem("stepFormData");
          
          return stepFormDataItem ? JSON.parse(stepFormDataItem) : initialFormData;
        }
        
        return initialFormData;
      };
    
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepFormData, setStepFormData] =
    useState<formDataType>(getInitialFormData());
      let router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeStep", JSON.stringify(activeStep));
    }
  }, [activeStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stepFormData", JSON.stringify(stepFormData));
    }
  }, [stepFormData]);

  const handleNext = () => {
    // if (activeStep === 8) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (newData: Partial<formDataType>) => {
    setStepFormData((prevData) => {
      const updatedData = { ...prevData, ...newData };

      if (typeof window !== "undefined") {
        localStorage.setItem("stepFormData", JSON.stringify(updatedData));
      }

      return updatedData;
    });
  };

  const renderStep = (step: number) => {
    if (step === 0)
      return <Step1 handleNext={handleNext} updateFormData={updateFormData} Router={useRouter} />;
    if (step === 1)
      return (
        <Step2
          handleNext={handleNext}
          updateFormData={updateFormData}
          handlePrev={handleBack}
        />
      );
    // if (step === 2)
    //   return (
    //     <Step3
    //       handleNext={handleNext}
    //       updateFormData={updateFormData}
    //       handlePrev={handleBack}
    //     />
    //   );
    // if (step === 3)
    //   return (
    //     <Step4
    //       handleNext={handleNext}
    //       updateFormData={updateFormData}
    //       handlePrev={handleBack}
    //     />
    //   );
    if (step === 2)
      return (
        <Step5
          handleNext={handleNext}
          updateFormData={updateFormData}
          handlePrev={handleBack}
        />
      );
    if (step === 3)
      return (
        <Step6
          handleNext={handleNext}
          updateFormData={updateFormData}
          handlePrev={handleBack}
        />
      );
    if (step === 4)
      return (
        <Step7
          handleNext={handleNext}
          updateFormData={updateFormData}
          handlePrev={handleBack}
        />
      );
    // if (step === 7)
    //   return (
    //     <Step8
    //       handleNext={handleNext}
    //       updateFormData={updateFormData}
    //       handlePrev={handleBack}
    //     />
    //   );
    if (step === 5)
      return (
        <Requirements
          handleNext={handleNext}
          handlePrev={handleBack}
        />
      );
    if (step === 6)
      return (
        <PhoneOtp
          handleNext={handleNext}
          updateFormData={updateFormData}
          handlePrev={handleBack}
        />
      );
    if (step === 7)
      return <VerifyOTP handleNext={handleNext} handlePrev={handleBack} />;
    if (step === 8)
      // Setup Account
    return <SetupAccount handleNext={handleNext} handlePrev={handleBack} />;
    if (step === 9)
      // Email OTP
      return <EmailOTP handleNext={handleNext} handlePrev={handleBack} Router={useRouter} />;
    if (step === 10)
      // Upload Picture
      return <UploadPicture handleNext={handleNext} handlePrev={handleBack}  />;
    if (step === 11) return <Done activeStep={setActiveStep} close={onClose} />;
  };

  return (
    <Modal open={open} className="w-full h-full flex justify-center items-center" onClose={()=>{onClose(); setActiveStep(0); router.refresh();}}>
      <div
        className={`bg-white text-main w-full max-w-xl py-10 ${activeStep === 8 || activeStep === 9 ? "pt-10" : "pt-20"} rounded-lg flex flex-col justify-center items-center gap-6 relative mx-4 sm:mx-0`}
      >
        {activeStep !== 9 && activeStep !== 10 && (
          <Button className="absolute top-2 right-0 sm:top-6 sm:right-6 z-50" onClick={()=>{onClose(); router.refresh();}} >
            <Image src={closeIcon} alt="Close" title="close" className="w-6 sm:w-auto" />
          </Button>
        )}
        {activeStep !== 0 &&
          activeStep !== 8 &&
          activeStep !== 9 &&
          activeStep !== 10 &&
          activeStep !== 11 &&
          activeStep !== 12 &&
          activeStep !== 13 && (
            <MobileStepper
              variant="progress"
              steps={14}
              position="static"
              activeStep={activeStep}
              sx={{ background: "transparent", flexGrow: 1 }}
              nextButton={false}
              backButton={false}
              className="absolute top-4 md:top-6 left-1/2 -translate-x-1/4 [&>*]:!bg-main [&>*]:!bg-opacity-20 [&>*]:!h-[7px] [&>*>*]:!bg-main [&>*>*]:!h-[7px] [&>*]:rounded-full [&>*>*]:rounded-full w-[400px] md:w-[700px]"
            />
          )}
        {renderStep(activeStep)}
      </div>
    </Modal>
  );
};

export default PlaceRequestModal;
