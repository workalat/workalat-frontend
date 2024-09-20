'use client'

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type PropsData = {
    phoneNumber: string | number; // Handle both string and number types
}

export default function MaskedPhoneNumber({ phoneNumber }: PropsData) {
    const [isPhoneVisible, setIsPhoneVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsPhoneVisible(prev => !prev);
    };

    // Convert phoneNumber to string if it's a number
    const phoneNumberStr = typeof phoneNumber === 'number' ? phoneNumber.toString() : phoneNumber;

    // Mask the phone number except for the first and last digit
    const maskedPhoneNumber = phoneNumberStr.length > 4
        ? `${phoneNumberStr[0]}${'*'.repeat(phoneNumberStr.length - 2)}${phoneNumberStr[phoneNumberStr.length - 1]}`
        : phoneNumberStr;

    return (
        <div className="flex items-center gap-2">
            <p className="text-[15px]">
                {isPhoneVisible ? `+${phoneNumberStr}` : `+${maskedPhoneNumber}`}
            </p>
            <button onClick={handleToggleVisibility} aria-label={isPhoneVisible ? 'Hide phone number' : 'Show phone number'}>
                {isPhoneVisible ? <FaEyeSlash className="text-[15px] text-[#07242B]" /> : <FaEye className="text-[15px] text-[#07242B]" />}
            </button>
        </div>
    );
};
