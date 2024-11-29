"use client";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, Box, Modal } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
 
import { fontSans } from "@/config/fonts";
import logo_dark from "@/public/logo_dark.png";
import logoutIcon from "@/public/icons/logout.svg";
import settingsIcon from "@/public/icons/settings.svg";
import notificationsIcon from "@/public/icons/notifications.svg";
import switchIcon from "@/public/icons/switch.svg";
import testimonial3Img from "@/public/images/testimonial3.png";
import businessIcon from "@/public/icons/business.svg";
import { TiArrowSortedUp } from "react-icons/ti";
import { FaBell } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from "js-cookie";


const AdminNavbar = () => {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = React.useState(false);

    const avatarDropdownMenu = [
        {
            key: "dashboard",
            icon: "/icons/dashboard.png",
            text: "Dashboard",
            href: "/admin"
        },
        // {
        //     key: "projects",
        //     icon: businessIcon,
        //     text: "My Projects",
        //     href: "/my-projects",
        // },
        // {
        //     key: "notifications",
        //     icon: notificationsIcon,
        //     text: "Notifications",
        //     href: "/notifications",
        // },
        // {
        //     key: "switch",
        //     icon: switchIcon,
        //     text: `${pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? "Switch to Seller" : "Switch to Client"}`,
        //     href: `${pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? "/professional/dashboard" : "/client/dashboard"}`,
        // },
        // {
        //     key: "settings",
        //     icon: settingsIcon,
        //     text: "Settings",
        //     href: "/settings",
        // },
        {
            key: "logout",
            icon: logoutIcon,
            text: "Logout",
            href: "/logout",
        },
    ];


  // BACKEND INTEGRATION
  const {
    logoutAdmin,
    verifyAdmin,
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [loading, setLoading]  : any  = useState(false);
  let [adminsData, setAdminsData]: any = useState([]);
  const { generateSnackbar }: any = useSnackbar();
  let [loadingMessage, setLoadingMessage]: any = useState("");


  let router = useRouter();
    
  useEffect(() => {
    async function verify() {
      try {
        setLoading2(true);
        let adminToken: any = Cookies.get("adminToken");

        if (adminToken !== undefined) {
          let res: any = await verifyAdmin({ adminToken });
          console.log(res);
          if (
            res?.status === 200 ||
            res?.data?.status === "success" ||
            res?.data?.data?.verify === true
          ) {
            // getData();
            setAdminsData(res?.data?.data);
            setLoading2(false);
          } else {
            router.push("/admin-login");
          }
        } else {
          router.push("/admin-login");
        }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Something went wrong, please Try Again.", "error");
      }
    }
    verify();
  }, []);


  
  async function handleLogout(){
    try{
      setLoading(true)
      setLoadingMessage("Logging out...")
      let token : any = Cookies.get("adminToken")
      if(!token){
          router.push("/")
      }
      else{
        let log : any = await logoutAdmin({
          token: token,
        });
      
      if(log?.status !== 400 || log?.data?.status === "success"){
       
        router.push("/admin");
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
                 <Navbar
            className="bg-main border-b border-dark border-opacity-20"
            position="sticky"
            maxWidth="full"
        >
            <NavbarBrand>
                <Link href="/" className="flex justify-start items-center gap-1">
                    <Image width={1000} height={1000} alt="WhatWorks" className="w-8 md:w-11" src={logo_dark} />
                    <span className={clsx("font-semibold font-sans text-white", fontSans.variable)}>
                        WhatWorks
                    </span>
                </Link>
            </NavbarBrand>
            <NavbarContent as="div" justify="end">
                <NavbarItem className="cursor-pointer ml-6 flex gap-2 items-center" onClick={() => setOpenDropdown(!openDropdown)}>
                    <FaBell className="size-4 text-white" />
                    <span className="text-sm text-white sm:text-base px-2 capitalize">{adminsData?.name}</span>
                    {/* <Avatar src={testimonial3Img.src} className="w-8 h-8" /> */}
                    <img src={adminsData?.picture} className="w-8 h-8 rounded-[100%]" alt=""/>
                    <TiArrowSortedUp className={`size-5 text-secondary transition-transform ${openDropdown ? "transform rotate-0" : "transform rotate-180"}`} />
                </NavbarItem>
                <Box>
                    {openDropdown && (
                        <Box className="absolute right-0 top-14 bg-white border border-dark border-opacity-20 shadow-lg rounded-md px-4 py-2">
                            
                            {/* Dashboard  */}
                                <Link key={"dashboard"} href={"/admin"} >
                                    <Box
                                        className={`flex items-center gap-4 p-2 px-3 border-b border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                                    >
                                        <div className="p-2 bg-main rounded-md">
                                            <Image className="w-5" width={1000} height={1000} src={"/icons/dashboard.png"} alt={"Dashboard"} />
                                        </div>
                                        <span
                                        >
                                            {"Dashboard"}
                                        </span>
                                    </Box>
                                </Link>

                                {/* Logout  */}

                                <Link key={"logout"} onClick={handleLogout} href={""}>
                                    <Box
                                        className={`flex items-center gap-4 p-2 px-3  border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                                    >
                                        <div className="p-2 bg-main rounded-md">
                                            <Image className="w-5" width={1000} height={1000} src={logoutIcon} alt={"Logout"} />
                                        </div>
                                        <span
                                            className={
                                                 " !text-red font-semibold" 
                                            }
                                        >
                                            Logout
                                        </span>
                                    </Box>
                                </Link>
                           
                           
                        </Box>
                    )}
                </Box>
            </NavbarContent>

            <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60"  />
                <h1 className="text-center font-bold text-xl ml-2">{loadingMessage}</h1>
              </Box>
            </Box>
          </Modal>
        </Navbar>
                </>
            )
        }
        </>
       
    );
};

export default AdminNavbar;
