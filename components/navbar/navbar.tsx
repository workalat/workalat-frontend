"use client";
import { useEffect, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Dropdown from "./dropdown";

import logo_dark from "@/public/logo_dark.png";
import logo_light from "@/public/logo_light.png";
import user_icon from "@/public/icons/user.svg";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";


export const Navbar = ({ mode = "light" }: { mode: "light" | "dark" }) => {
  const [currentMode, setCurrentMode] = useState(mode);

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

  const pathname = usePathname().replace(/\//g, "");

  return (
    <NextUINavbar
      className={`border-b ${currentMode === "light" ? "border-dark !bg-white !bg-opacity-70" : "border-white"} border-opacity-10 pt-4 backdrop-blur-0 bg-transparent fixed top-0 z-50`}
      maxWidth="xl"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {currentMode === "light" ? (
              <Image alt="WhatWorks" className="min-w-24 w-36" src={logo_light} />
            ) : (
              <Image alt="WhatWorks" className="min-w-24 w-52" src={logo_dark} />
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

      <NavbarMenu className="!bg-white bg-opacity-5 mt-4">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="text-black" href="#" size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <NextLink
              href={"/login"}
              className={pathname === "login" ? "hidden" : ""}
            >
              Login
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
  );
};
