"use client";
import { Avatar, Box, Modal } from "@mui/material";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import arrowDownWhiteIcon from "@/public/icons/arrow_down_white.svg";
import businessIcon from "@/public/icons/business.svg";
import logoutIcon from "@/public/icons/logout.svg";
import notificationsIcon from "@/public/icons/notifications.svg";
import settingsIcon from "@/public/icons/settings.svg";
import switchIcon from "@/public/icons/switch.svg";
import testimonial3Img from "@/public/images/testimonial3.png";
import logo_dark from "@/public/logo_dark.png";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "../middleware/VerifyUser";
import { useUserContext } from "@/context/user_context";
import { Navbar as NavMain} from "@/components/navbar/navbar";

const AuthNavbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState(false);
  let [userData,setUserData] : any = useState({});
  const { generateSnackbar } = useSnackbar();
  let { intoProfessoinal, intoClient,logout} : any = useUserContext();
  let [loadingMessage, setLoadingMessage]: any = useState("");

  const avatarDropdownMenu = [
   
    {
      key: "notifications",
      icon: notificationsIcon,
      text: "Notifications",
      href: `/${userData?.userType}/account_settings/notifications`,
    },
  ];

  let [loading2, setLoading2]  : any  = useState(true);
  let [loading, setLoading]  : any  = useState(false);
  let router  : any  = useRouter();
  
  async function handleIntoProfessional(){
    try{
      setLoading(true)
      setLoadingMessage(`Switching to ${(userData?.userType === "client") ?"Professional" :"Client"}...`)
      let changeToProfessional : any = await intoProfessoinal({userId : userData?.userId});
      console.log(changeToProfessional)
      
      if(changeToProfessional?.status !== 400 || changeToProfessional?.data?.status === "success"){
        generateSnackbar(changeToProfessional?.data?.message , "success");
        Cookies.set("token", changeToProfessional?.data?.data[0]?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", (userData?.userType === "client") ? "professional" : "client", { secure: true, sameSite: 'None',expires: 30 });
        setLoading(false);
        router.push("/professional/dashboard");
    }
    else{
        setLoading(false);
        generateSnackbar(changeToProfessional?.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
    }
      
    }
    catch(e){
      console.log(e);
      generateSnackbar("Some Error Occur, Please try again", "error")
    }
  }
  
  async function handleIntoClient(){
    try{
      setLoading(true)
      setLoadingMessage(`Switching to ${(userData.userType === "client") ?"Professional" :"Client"}...`)
      let changeToClient : any = await intoClient({userId : userData.userId});
      
      if(changeToClient.status !== 400 || changeToClient.data?.status === "success"){
        generateSnackbar(changeToClient.data?.message , "success");
        Cookies.set("token", changeToClient.data?.data[0]?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", (userData.userType === "client") ? "professional" : "client", { secure: true, sameSite: 'None',expires: 30 });
        setLoading(false);
        router.push("/client/dashboard");
    }
    else{
        generateSnackbar(changeToClient.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
        setLoading(false);
    }
      
    }
    catch(e){
      // console.log(e);
      generateSnackbar("Some Error Occur, Please try again", "error")
    }
  }


  useEffect(() => {
    async function verify(){
      try{
        const token  : any = Cookies.get("token");
        const userType  : any = Cookies.get("userType");
        const pathSegment  : any = pathname.split("/")[1];
        const typeToVerify  : any = pathSegment || userType;
  
        if (!token || !typeToVerify) {
          console.log("No token");
          setLoading2(false);
          return;
        }
  
  
        let ver : any= await VerifyUser(token, typeToVerify);
        if(ver?.status === "success"){
          setUserData(ver);
          setLoading2(false);

        }
        else{
          setLoading2(false);
        }
      }
      catch(e){
        setLoading2(false);
      }
    };
    verify();
  }, []);

  async function handleLogout(){
    try{
      setLoading(true)
      setLoadingMessage("Logging out...")
      let token : any = Cookies.get("token")
      if(!token){
          router.push("/")
      }
      else{
        let log : any = await logout({
          token: token,
          userType : userData.userType
        });
      
      if(log?.status !== 400 || log?.data?.status === "success"){
        generateSnackbar("Logged Out Successfully." , "success");
        Cookies.remove("token");
        setLoading(false);
        router.push("/");
    }
    else{
        generateSnackbar(log.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
    }
      }
      
    }
    catch(e){
      // console.log(e);
      generateSnackbar("Some Error Occur, Please try again", "error")
    }
  }


  return (
    <>
    {
      loading2 ? (
        <> 
        </>
    )
    :(
      <>
      {
        userData?.userId
        ?
        <>
         <Navbar
      className="bg-main border-b border-white border-opacity-20"
      position="sticky"
      maxWidth="xl"
    >
      <NavbarBrand>
        <Link
          href="/"
          className="flex justify-start text-white items-center gap-1"
        >
          <Image alt="WhatWorks" className="min-w-24 w-28" src={logo_dark} />
          {/* <span className={clsx("font-semibold font-sans", fontSans.variable)}>
            WhatWorks
          </span> */}
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <NavbarItem className="hidden md:inline text-white">
          <Link href={(userData?.userType ==="client") ? "/client/my-projects" : "/professional/my-responses/"}>My Projects</Link>
        </NavbarItem>
        
        <NavbarItem>
          <Link
            key={avatarDropdownMenu[0].key}
            href={avatarDropdownMenu[0].href}
            className="min-w-5"
          >
            <Box
              className={`flex items-center gap-4 -mr-6 sm:mr-0 ${avatarDropdownMenu[0].key === "logout" ? "" : "border-b"} border-dark border-opacity-20  hover:rounded-lg`}
            >
              <div className="p-2 bg-main rounded-md">
                <Image
                  width={500}
                  height={500}
                  className="w-5 min-w-4"
                  src={avatarDropdownMenu[0].icon}
                  alt={avatarDropdownMenu[0].text}
                />
              </div>
            </Box>
          </Link>
        </NavbarItem>

        <NavbarItem 
          className="cursor-pointer ml-6 flex gap-2 text-white items-center"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <img src={userData?.userPicture} className="w-8 h-8 rounded-[100%]" alt=""/>
          <span className="text-sm sm:text-base">
            <span className="capitalize">{userData.userName}</span>
            {/* <span className="hidden sm:inline">Maika</span> */}
          </span>
          <Image
            src={arrowDownWhiteIcon}
            alt="arrow down"
            className={`w-3 h-3 transition-transform ${openDropdown ? "transform rotate-0" : "transform rotate-180"}`}
          />
        </NavbarItem>
        <Box>
          {openDropdown && (
            <Box className="absolute right-0 top-14 bg-white border border-dark border-opacity-20 shadow-lg rounded-md px-4 py-2">
                   <Link
                  href={`/${userData.userType}/dashboard`}
                >
                  <Box
                    className={`flex items-center gap-4 p-2 px-3  border-b border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image
                        width={500}
                        height={500}
                        className="w-5"
                        src={"/icons/dashboard.png"}
                        alt={"Dashboard"}
                      />
                    </div>
                    <span
                    >
                      Dashboard
                    </span>
                  </Box>
                </Link>
                <Link
                  href={`/${userData?.userType}/account_settings/notifications`}
                >
                  <Box
                    className={`flex items-center gap-4 p-2 px-3 border-b border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image
                        width={500}
                        height={500}
                        className="w-5"
                        src={notificationsIcon}
                        alt={"Dashboard"}
                      />
                    </div>
                    <span
                    >
                      Notifications
                    </span>
                  </Box>
                </Link>
                <Link
                href={""}
                  onClick={()=>{{pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? handleIntoProfessional() : handleIntoClient();}}}
                >
                  <Box
                    className={`flex items-center gap-4 p-2 px-3  border-b border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image
                        width={500}
                        height={500}
                        className="w-5"
                        src={notificationsIcon}
                        alt={"Dashboard"}
                      />
                    </div>
                    <span
                    >
                      {pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? "Switch to Seller" : "Switch to Client"}
                    </span>
                  </Box>
                </Link>
                <Link
                  href={`/${userData?.userType}/account_settings/notifications`}
                >
                  <Box
                    className={`flex items-center gap-4 p-2 px-3 border-b  border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image
                        width={500}
                        height={500}
                        className="w-5"
                        src={settingsIcon}
                        alt={"Settings"}
                      />
                    </div>
                    <span
                    >
                      Settings
                    </span>
                  </Box>
                </Link>

                <Link
                href={""}
                onClick={handleLogout}
                >
                  <Box
                  onClick={handleLogout}
                    className={`flex items-center gap-4 p-2 px-3    border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image
                        width={500}
                        height={500}
                        className="w-5"
                        src={notificationsIcon}
                        alt={"Dashboard"}
                      />
                    </div>
                    <span className="text-red font-bold"
                    >
                     Logout
                    </span>
                  </Box>
                </Link>
            </Box>
          )}
        </Box>
      </NavbarContent>
    </Navbar>
    <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60"  />
                <h1 className="text-center font-bold text-xl ml-2">{loadingMessage}</h1>
              </Box>
            </Box>
          </Modal>
      </>
        :
        <> 
        
          <NavMain mode="light" />
        </>
      }
    </>
    )
    }
    </>
  );
};

export default AuthNavbar;
