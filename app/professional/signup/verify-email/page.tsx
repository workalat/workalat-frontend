"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useSnackbar } from "@/context/snackbar_context";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};


export default function VerifyEmail() {

    // snackbar
    const { generateSnackbar } = useSnackbar();
    
    // router
    const router = useRouter();
    
    // otp
    const [otp, setOtp] = useState<string>("");

    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };

    const handleModalClose = () => {
        router.back()
    };

    const handleOTPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // OTP validation
        if (otp.length !== 4) return generateSnackbar("Enter valid OTP", "error");
        
        // TODO: Implement OTP verification

        // OTP verification failed
        generateSnackbar("Invalid OTP", "error")
        
        // OTP verification success
        generateSnackbar("Email verified. Login to continue.", "success")
        router.push("/professional/login");
    }

    return (
        <Modal open keepMounted onClose={handleModalClose}>
            <Box sx={style} className="w-full max-w-xl flex flex-col justify-center items-center p-4 rounded-md md:p-8">
                <h1 className="text-2xl font-bold text-center max-w-[450px]">
                    Verify Email
                </h1>
                <p className="mb-4">
                    Kindly enter the OTP sent to email
                </p>
                <form className="flex flex-col gap-4 px-12" onSubmit={handleOTPSubmit} >
                    <MuiOtpInput
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        value={otp}
                        length={4}
                        className="[&_input]:h-8 [&>*>*]:!border-b-3 [&>*>*]:border-b-secondary [&>*]:shadow-medium font-bold text-xl"
                        onChange={handleChange}
                    />
                    <div className="flex justify-between items-center">
                        <p >Didn&apos;t receive a code?</p>
                        <div className="text-sm flex gap-3 items-center">
                            <button className="text-secondary hover:text-main font-bold">
                                Resend
                            </button>
                            <button
                                className="text-secondary hover:text-main font-bold"
                            >
                                Change email
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
                            <ArrowForwardIcon />
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
