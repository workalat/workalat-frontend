'use client'
import ReCAPTCHA from "react-google-recaptcha";
import './login.css'
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="w-full h-[80vh] flex items-center justify-center">
            <div className="w-full md:w-[600px] p-4 border rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-semibold">Login</h1>
                <form className="w-full pt-5">
                    <div className="py-2">
                        <label htmlFor="email" className="block text-xl font-semibold">Email</label>
                        <input type="email" required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" placeholder="Email" />
                    </div>
                    <div className="py-2 relative">
                        <label htmlFor="password" className="block text-xl font-semibold">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggling between "password" and "text"
                            required
                            className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2 pr-10"
                            placeholder="Enter password here"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-[35px] bottom-0 right-3 flex items-center text-gray-600"
                        >
                            {showPassword ? <BsEyeSlashFill /> : < BsEyeFill />}
                        </button>
                    </div>
                    <div className="py-2">
                        <div className="flex items-center gap-2">
                            <input className="shadow-md w-4 h-4" type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-lg">Remember Me</label>
                        </div>
                    </div>
                    <div className="py-2 captcha-parent">
                        <ReCAPTCHA
                            className="w-full captcha"
                            sitekey="Your client site key"
                        />
                    </div>
                    <div className="py-2">
                        <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
