"use client";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "./action";

interface Props {
  setIsHuman: (isHuman: boolean) => void;
}

const Recaptcha  : any  = ({ setIsHuman }) => {
    
    const handleCheck = async (token: string | null) => {
        if (!token) {
          setIsHuman(false);
          return;
        }
    
        const response = await verifyRecaptcha(token);
        setIsHuman(response as boolean);
      };

  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={handleCheck}
      />
    </div>
  );
};

export default Recaptcha;
