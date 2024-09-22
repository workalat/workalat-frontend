'use client'
import AuthNavbar from "@/components/navbar/auth_navbar";
import Link from "next/link";
import { useState } from "react";
import VerificationCode from "./VerificationCode";

export default function ForgetPassword() {
    const [isVerification, setIsVerification] = useState(false);
    const [verified, setVerified] = useState("");
    const [newPass, setPass] = useState(false);

    const handleSendCode = (e: any) => {
        e.preventDefault();
        setIsVerification(true);
    }

    const handleVerify = (e: any) => {
        e.preventDefault();
        if (verified == "1,2,3,4") {
            setPass(true);
        }
    }

    return (
        <>
            <AuthNavbar />
            <div className="w-full h-[80vh] flex items-center justify-center">
                {
                    !isVerification ?
                        <div className="w-full md:w-[500px] p-4 border rounded-lg shadow-lg">
                            <h1 className="text-center text-3xl font-semibold">Forgot Password</h1>
                            <form onSubmit={handleSendCode} className="w-full pt-5">
                                <div className="py-2">
                                    <label htmlFor="email" className="block text-xl font-semibold">Email</label>
                                    <input type="email" required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" placeholder="Email" />
                                </div>
                                <div className="py-2">
                                    <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]">Send reset password instructions</button>
                                </div>
                                <div className="py-2">
                                    <div className="flex justify-center gap-2 pt-5">
                                        <p className="text-[15px] font-semibold">Already Have Account ?</p>
                                        <Link className="text-[15px] font-semibold underline underline-offset-4" href="/login">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        : newPass ?
                            <div className="w-full md:w-[500px] p-4 border rounded-lg shadow-lg">
                                <h1 className="text-center text-3xl font-semibold">Enter New Password</h1>
                                <form className="w-full pt-5">
                                    <div className="py-2">
                                        <label htmlFor="newPass" className="block text-xl font-semibold">Choose a password</label>
                                        <input type="password" required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" />
                                    </div>
                                    <div className="py-2">
                                        <label htmlFor="confirm" className="block text-xl font-semibold">Re-enter password</label>
                                        <input type="password" required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" />
                                    </div>
                                    <div className="py-2">
                                        <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]">Confirm</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="w-full md:w-[550px] p-4 border rounded-lg shadow-lg">
                                <h1 className="text-center text-2xl font-semibold">Enter Security code to reset password</h1>
                                <p className="text-center text-lg pt-2">Insert the security code sent to your email in order to proceed with the password reset.</p>
                                <form onSubmit={handleVerify} className="w-full pt-5">
                                    <div className="py-2 overflow-hidden">
                                        <VerificationCode setVerified={setVerified} />
                                        <div className="flex mx-auto justify-between w-full md:w-9/12 px-6 pt-2">
                                            <p className="text-xs">Didn't receive a code?</p>
                                            <button className="text-xs text-secondary font-semibold items-center">Request a new code</button>
                                        </div>
                                    </div>
                                    <div className="pb-2 pt-5">
                                        <button type="submit" className="w-full py-2 rounded-md px-3 text-black font-semibold bg-[#FFBE00]">Submit</button>
                                    </div>
                                </form>
                            </div>

                }

            </div>
        </>
    )
}
