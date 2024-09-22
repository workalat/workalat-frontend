'use client'
import { useState } from 'react';

interface PropsType {
    setVerified: any;
}

const VerificationCode = ({ setVerified }: PropsType) => {
    const [code, setCode] = useState<string[]>(['', '', '', '']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Update the verification status with the new code
            setVerified(newCode); // Use the updated `newCode`

            // Move to next input if current input has a value, else stay on current
            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newCode = [...code];
            if (code[index] !== '') {
                // Clear the current field if there's a value
                newCode[index] = '';
                setCode(newCode);

                // Update the verification status with the new code
                setVerified(newCode); // Use the updated `newCode`
            } else if (index > 0) {
                // Move to previous input if the current one is empty
                const prevInput = document.getElementById(`code-${index - 1}`);
                prevInput?.focus();
            }
        }
    };

    return (
        <div className="w-full md:w-9/12 mx-auto grid grid-cols-4 gap-3 px-6">
            {code.map((value, index) => (
                <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full h-12 text-center border-b-[4px] border-secondary rounded-md shadow-md outline-none ring-[1px] ring-black/30"
                />
            ))}
        </div>
    );
};

export default VerificationCode;
