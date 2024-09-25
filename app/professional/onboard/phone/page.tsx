"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import arrowRight from "@/public/icons/arrow_right.svg";
import { useSnackbar } from "@/context/snackbar_context";

const GetProfessionalPhone = () => {
    // router
    const router = useRouter();

    // snackbar
    const { generateSnackbar } = useSnackbar();

    const [value, setValue] = useState<string | undefined>();

    const handlePhoneNumberChange = (newValue?: string) => {
        if (newValue !== undefined) {
            setValue(newValue);
        }
    };

    const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // phone validation
        if (!value) {
            return generateSnackbar("Enter valid phone number", "error");
        }

        // TODO: Implement OTP send

        // OTP send failed
        // generateSnackbar("Failed to send OTP", "error")

        // OTP send success
        generateSnackbar("OTP sent", "success")

        // navigate to OTP verification
        router.push("/professional/onboard/phone/verify");
    }

    const goBack = () => {
        return router.push("/dashboard");
    }

    return (
        <>
            <Box className="h-full w-full flex justify-center items-center px-6" >
                <Box className="rounded-xl border border-dark border-opacity-30 px-4 py-4 pb-6 md:px-8 md:py-8 md:pb-10 space-y-4 bg-white shadow-md max-w-xl" component={"form"} onSubmit={handlePhoneSubmit}>
                    <Typography className="font-bold text-2xl text-center mb-4">Let&apos; get your details</Typography>
                    <Box className="flex flex-col gap-1" >
                        <label className="font-bold mb-1" htmlFor="phone-input">Enter phone number</label>
                        <PhoneInput
                            international
                            id="phone-input"
                            countryCallingCodeEditable={false}
                            defaultCountry="GB"
                            className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input:hover]:border-dark [&_input]:p-2  [&:has(input:focus)]:border-secondary [&_input:focus]:outline-none border px-4 py-2 rounded-md border-b-4 border-b-secondary shadow-md"
                            value={value}
                            onChange={handlePhoneNumberChange}
                        />
                        <Box className="flex justify-between items-center">
                            <Typography className="text-gray-400 text-xs">
                                We will automatically send OTP. Please confirm your phone
                                number is correct.
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="flex justify-between">
                        <Button
                            variant="outlined"
                            color="secondary"
                            className="gap-2 py-3 px-6 font-semibold"
                            onClick={goBack}
                        >
                            <Image alt="" src={arrowRight} className="rotate-180" />
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="gap-2 py-3 px-6 font-semibold"
                            type="submit"
                        >
                            Confirm
                            <Image alt="" src={arrowRight} />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default GetProfessionalPhone;
