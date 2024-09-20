"use client";
import { Box, Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSnackbar } from "@/context/snackbar_context";
import arrowRight from "@/public/icons/arrow_right.svg";

const PhoneOTPVerify = () => {

    // router
    const router = useRouter();

    // snackbar
    const { generateSnackbar } = useSnackbar();
    
    // otp
    const [otp, setOtp] = useState("");

    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };

    const handleResend = () => {
        // TODO: Implement resend
        return generateSnackbar("OTP resent successfully", "success");
    };

    const handleOTPSubmit = (value: string) => {
        // OTP validation
        if (value.length !== 4) return generateSnackbar("Enter valid OTP", "error");
        
        // TODO: Implement OTP verification

        // OTP verification failed
        // generateSnackbar("Invalid OTP", "error")
        
        // OTP verification success
        generateSnackbar("Phone verified.", "success")
        router.push("/professional/onboard/formpage");
    }

    return (
        <Box className="h-full w-full flex justify-center items-center">
            <Box className="bg-white p-8 flex flex-col gap-4 rounded-lg mx-2 sm:mx-0 border border-dark border-opacity-30 shadow-md">
                <Box className="flex justify-center items-start gap-8 pb-4">
                    <Box className="flex flex-col">
                        <Typography className="text-2xl font-bold text-center">Confirm OTP</Typography>
                        <Typography className="text-sm text-gray-600 text-center">
                            Kindly enter the OTP sent to the registered phone number{" "}
                        </Typography>
                    </Box>
                </Box>
                <Box className="space-y-3">
                    <MuiOtpInput
                        length={4}
                        className="max-w-sm mx-auto [&_input]:text-dark [&_input]:shadow-medium [&_input]:h-8 [&>*>*>*]:!border-b-4 [&>*>*>*]:!border-b-secondary"
                        value={otp}
                        onChange={handleChange}
                        onComplete={handleOTPSubmit}
                    />
                    <Typography className="font-bold text-sm text-center flex justify-between items-center">
                        Didn&apos;t receive the code?
                        <span className="flex items-center">
                            <Button variant="text" className="hover:text-main ml-2" onClick={handleResend}>
                                Resend
                            </Button>
                            <Link href="/professional/onboard/phone" className="text-secondary hover:text-main ml-2">
                                Change Number
                            </Link>
                        </span>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    className="gap-2 py-3 px-6 font-semibold w-full max-w-max mx-auto"
                >
                    Confirm
                    <Image alt="Change password" src={arrowRight} />
                </Button>
            </Box>
        </Box>
    );
};

export default PhoneOTPVerify;
