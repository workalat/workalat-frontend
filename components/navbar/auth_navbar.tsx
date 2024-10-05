"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { fontSans } from "@/config/fonts";
import logo_dark from "@/public/logo_dark.png";
import logoutIcon from "@/public/icons/logout.svg";
import settingsIcon from "@/public/icons/settings.svg";
import notificationsIcon from "@/public/icons/notifications.svg";
import switchIcon from "@/public/icons/switch.svg";
import arrowDownWhiteIcon from "@/public/icons/arrow_down_white.svg";
import testimonial3Img from "@/public/images/testimonial3.png";
import businessIcon from "@/public/icons/business.svg";

const AuthNavbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState(false);


  const avatarDropdownMenu = [
    {
      key: "dashboard",
      icon: "/icons/dashboard.png",
      text: "Dashboard",
      href: "/client/dashboard"
    },
    {
      key: "projects",
      icon: businessIcon,
      text: "My Projects",
      href: "/my-projects",
    },
    {
      key: "notifications",
      icon: notificationsIcon,
      text: "Notifications",
      href: "/notifications",
    },
    {
      key: "switch",
      icon: switchIcon,
      text: `${pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? "Switch to Seller" : "Switch to Client"}`,
      href: `${pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/") ? "/professional/dashboard" : "/client/dashboard"}`,
    },
    {
      key: "settings",
      icon: settingsIcon,
      text: "Settings",
      href: "/settings",
    },
    {
      key: "logout",
      icon: logoutIcon,
      text: "Logout",
      href: "/logout",
    },
  ];


  return (
    <Navbar
      className="bg-main border-b border-white border-opacity-20"
      position="sticky"
      maxWidth="xl"
    >
      <NavbarBrand className="overflow-hidden">
        <Link href="/" className="flex justify-start text-white items-center gap-1 overflow-hidden">
          <Image alt="WhatWorks" className="min-w-24 w-52" src={logo_dark} />
          {/* <span className={clsx("font-semibold font-sans", fontSans.variable)}>
            WhatWorks
          </span> */}
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <NavbarItem className="hidden md:inline text-white">
          <Link href="/client/my-projects">My Projects</Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer ml-6 flex gap-2 text-white items-center" onClick={() => setOpenDropdown(!openDropdown)}>
          <Avatar src={testimonial3Img.src} className="w-8 h-8" />
          <span className="text-sm sm:text-base">Anita Maika</span>
          <Image
            src={arrowDownWhiteIcon}
            alt="arrow down"
            className={`w-3 h-3 transition-transform ${openDropdown ? "transform rotate-0" : "transform rotate-180"}`}
          />
        </NavbarItem>
        <Box>
          {openDropdown && (
            <Box className="absolute right-0 top-14 bg-white border border-dark border-opacity-20 shadow-lg rounded-md px-4 py-2">
              {avatarDropdownMenu.map((menu) => (
                <Link key={menu.key} href={menu.href} className={menu.key==="projects" ? "md:hidden":""}>
                  <Box
                    className={`flex items-center gap-4 p-2 px-3 ${menu.key === "logout" ? "" : "border-b"} border-dark border-opacity-20 hover:!bg-fadedwhite hover:!bg-opacity-20 hover:rounded-lg`}
                  >
                    <div className="p-2 bg-main rounded-md">
                      <Image width={500} height={500} className="w-5" src={menu.icon} alt={menu.text} />
                    </div>
                    <span
                      className={
                        menu.key === "logout" ? " !text-red font-semibold" : ""
                      }
                    >
                      {menu.text}
                    </span>
                  </Box>
                </Link>
              ))}
            </Box>
          )}
        </Box>
      </NavbarContent>
    </Navbar>
  );
};

export default AuthNavbar;
