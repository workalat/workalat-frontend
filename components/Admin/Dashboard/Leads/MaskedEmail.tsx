'use client'

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type PropsData = {
    email: string; // Expecting email as a string
}

export default function MaskedEmail({ email }: PropsData) {
    const [isEmailVisible, setIsEmailVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsEmailVisible(prev => !prev);
    };

    const maskEmail = (email: string) => {
        const [localPart, domain] = email.split('@');
        const maskedLocalPart = localPart.length > 2
            ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`
            : localPart;
        const [domainName, domainExt] = domain.split('.');
        const maskedDomainName = domainName.length > 2
            ? `${domainName[0]}${'*'.repeat(domainName.length - 2)}${domainName[domainName.length - 1]}`
            : domainName;

        return `${maskedLocalPart}@${maskedDomainName}.${domainExt}`;
    };

    return (
        <div className="flex items-center gap-2">
            <p className="text-[15px]">
                {isEmailVisible ? email : maskEmail(email)}
            </p>
            <button onClick={handleToggleVisibility} aria-label={isEmailVisible ? 'Hide email' : 'Show email'}>
                {isEmailVisible ? <FaEyeSlash className="text-[15px] text-[#07242B]" /> : <FaEye className="text-[15px] text-[#07242B]" />}
            </button>
        </div>
    );
};
