"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import Image from "next/image"; 
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import VerifyUser from "../middleware/VerifyUser";
import { useCallback, useEffect, useRef, useState } from "react";
import AuthNavbar from "@/components/navbar/auth_navbar"
import Dropdown from "./dropdown";

import { siteConfig } from "@/config/site";
import user_icon from "@/public/icons/user.svg";
import logo_dark from "@/public/logo_dark.png";
import logo_light from "@/public/logo_light.png";




export const Navbar = ({ mode = "dark" }: { mode: "light" | "dark" }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  
// Cache for storing verification results
const verificationCache = new Map();



  // Ref to store the last verification time and abort controller
  const lastVerificationRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  let path= usePathname();

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => { 
      if (window.scrollY > 100) {
        setCurrentMode("light");
      } else {
        setCurrentMode(mode); // Reset to original mode if scrollY <= 100
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode]);


  

  let [loading2, setLoading2]  : any  = useState(true);
  let [loading, setLoading]  : any  = useState(false);
  let router  : any  = useRouter();
  let [userData,setUserData]  : any  = useState({});

  const pathname = usePathname().replace(/\//g, "");


  useEffect(() => {
    const verifyUsers = async () => {
      try {
        const token  : any  = Cookies.get("token");
        const userType  : any  = Cookies.get("userType");
        const pathSegment  : any  = pathname.split("/")[1];
        const typeToVerify  : any  = userType ||   pathSegment;
  
        if (!token || !typeToVerify) {
          setLoading2(false);
          return;
        }
  
        const cacheKey = `${token}-${typeToVerify}`;
        const cachedResult = verificationCache.get(cacheKey);
        if (cachedResult) {
          const { data, timestamp } = cachedResult;
          const fiveMinutes = 5 * 60 * 1000;
          if (Date.now() - timestamp < fiveMinutes) {
            setUserData(data);
            setLoading2(false);
            return;
          }
        }
  
        const response : any  = await VerifyUser(token, typeToVerify);
        if (response?.status === "success") {
          verificationCache.set(cacheKey, { data: response, timestamp: Date.now() });
          setUserData(response);
          setLoading2(false);
        } else {
          // Optionally, handle failed verification
          setLoading2(false);
        }
      } catch (error) {
        setLoading2(false);
      }
    };
  
    verifyUsers();
  
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [pathname, Cookies.get("token"), Cookies.get("userType")]); // Include necessary dependencies
  




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
        <AuthNavbar />
        </>
        :
        <>
         <NextUINavbar
    className={`border-b ${currentMode === "light" ? "border-dark !bg-white !bg-opacity-70" : "border-white"} border-opacity-10 pt-4 backdrop-blur-0 bg-transparent fixed top-0 z-50`}
    maxWidth="xl"
  > 
    <NavbarContent className="basis-1/5 sm:basis-full items-center self-center" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          {currentMode === "light" ? (
            <Image alt="WhatWorks" className="min-w-24 w-32" src={logo_light} />
          ) : (
            <Image alt="WhatWorks" className="min-w-24 w-28 -mt-2" src={logo_dark} />
          )}
          {/* <p
            className={clsx(
              "font-semibold font-sans md:border-r pr-5 leading-[32px]",
              fontSans.variable,
              currentMode === "light"
                ? "text-black"
                : "text-white border-white border-opacity-10"
            )}
          >
            WhatWorks
          </p> */}
        </NextLink>
      </NavbarBrand>
      <ul className="hidden lg:flex gap-6 justify-start ml-2">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} className="group relative">
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium gap-3",
                currentMode === "light" ? "text-black" : "text-white"
              )}
              color="foreground"
              href={item.href}
            >
              {item.icon && (
                <Image
                  alt=""
                  className=""
                  height={15}
                  src={currentMode === "light" ? item.icon_dark : item.icon}
                  width={15}
                />
              )}
              {item.label}
            </NextLink>
            {item.isDropdown && <Dropdown className="invisible group-hover:opacity-100 group-hover:visible" />}
          </NavbarItem>
        ))}
      </ul>
    </NavbarContent>
    <NavbarContent
      className="hidden md:flex basis-1/5 sm:basis-full !gap-10"
      justify="end"
    >
      <NavbarItem
        className={`hidden md:flex ${currentMode === "light" ? "text-black" : "text-white"}`}
      >
        <NextLink
          href={siteConfig.links.login}
          className={pathname === "login" ? "hidden" : ""}
        >
          Login
        </NextLink>
      </NavbarItem>
      <NavbarItem className="hidden md:flex items-center gap-3 font-semibold">
        <Button
          as={Link}
          className="text-sm font-normal text-default-600 bg-secondary"
          href={siteConfig.links.serviceProviderSignup}
          startContent={<img alt="" src={user_icon.src} />}
          variant="flat"
        >
          Join as a service provider
        </Button>
        <NextLink
          className={`${currentMode === "light" ? "text-black" : "text-white"}`}
          href={"/help"}
        >
          ?
        </NextLink>
      </NavbarItem>
    </NavbarContent>

    <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
      <NavbarMenuToggle
        className={currentMode === "dark" ? "text-white" : "text-black"}
      />
    </NavbarContent>

    {/* MOBILE MENU */}
    <NavbarMenu className="!bg-white bg-opacity-5 mt-4 !z-50">
      <div className="mx-4 mt-2 flex flex-col gap-2">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="text-black" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <NextLink
            href={"/login"}
            className={pathname === "login" ? "hidden" : ""}
          >
            Logins
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-secondary"
            href={siteConfig.links.serviceProviderSignup}
            startContent={<img alt="" src={user_icon.src} />}
            variant="flat"
          >
            Join as a service provider
          </Button>
        </NavbarMenuItem>
      </div>
    </NavbarMenu>
  </NextUINavbar>
        </>
      }   
      </>

      
   
    )
  }

    
    
    </>

  );
};
