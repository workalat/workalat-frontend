'use client'
import ReCAPTCHA from "react-google-recaptcha";
import './login.css'
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";



    //Integration work
import Cookies from "js-cookie";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user_context";
import Recaptcha from "@/app/login/recaptcha";
import { Button } from "@mui/material";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    let [admin, setAdmin] = useState({
        email: "",
        password : ""
    })

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };


    //Integration work
    
    const { generateSnackbar }: any = useSnackbar();
    let [loading2, setLoading2] = useState(true);
    const [isHuman, setIsHuman] = useState<boolean>(false);
    const {loginAdmin, verifyAdmin}: any = useUserContext();

    let router = useRouter();

    useEffect(()=>{
        async function verify(){
            try{
                setLoading2(true);
                let adminToken : any = Cookies.get("adminToken");
                
                if(adminToken !== undefined){
                    let res : any = await verifyAdmin({adminToken});

                    if(res?.status === 200 || res?.data?.status === "success" || res?.data?.data?.verify === true){
                        router.push("/admin");
                    }   
                    else{
                        setLoading2(false);
                    }
                }
                else{
                    setLoading2(false);
                }
            }
            catch(e){
                // console.log(e);
                generateSnackbar("Something went wrong, please Try Again.", "success");   
            }
        };
        verify();
    }, [])

    async function handleSubmit(e){
        try{
            e.preventDefault();
            let res = await loginAdmin(admin);

            if(res?.data?.status === "success" || res?.status === 200){
                Cookies.set("adminToken", res?.data?.token, { secure: true, sameSite: 'None'});
                generateSnackbar("Loggedin Successfully", "success");   
                router.push("/admin");
            }
            else{
                generateSnackbar(res?.response?.data?.message || "Something went wrong, please Try Again.", "error");   
            }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Something went wrong, please Try Again.", "error");   
        }
    }


    return (

        <>
        
               {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                  <div className="loader m-auto" />
                </div>
              ) : (
                <> 
                <div className="w-full h-[80vh] flex items-center justify-center">
            <div className="w-full md:w-[600px] p-4 border rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-semibold">Login</h1>
                <form className="w-full pt-5">
                    <div className="py-2">
                        <label htmlFor="email" className="block text-xl font-semibold">Email</label>
                        <input type="email" 
                            value={admin.email}
                            onChange={(e)=>{setAdmin({...admin, email: e.target.value})}} required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" placeholder="Email" />
                    </div>
                    <div className="py-2 relative">
                        <label htmlFor="password" className="block text-xl font-semibold">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggling between "password" and "text"
                            required
                            className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2 pr-10"
                            placeholder="Enter password here"
                            value={admin.password}
                            onChange={(e)=>{setAdmin({...admin, password: e.target.value})}}
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
                        
                        <Recaptcha setIsHuman={setIsHuman} />
                        {/* <ReCAPTCHA
                            className="w-full captcha"
                            sitekey="Your client site key"
                        /> */}
                    </div>
                    <div className="py-2">
                        {/* <button type="submit" 
                        disabled={!isHuman} className="w-full py-2 px-3  text-black font-semibold bg-[#FFBE00]">Login</button> */}

                <Button
                  fullWidth
                  variant="contained"
                  className="bg-secondary capitalize shadow-none font-bold text-dark text-xl font-mono hover:bg-secondary"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!isHuman}
                >
                  Login
                </Button>
                
                    </div>
                </form>
            </div>
        </div>                
                </>
              )
        }
        </>
        
    )
}
