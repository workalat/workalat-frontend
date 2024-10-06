import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Button, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { FaUserEdit } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

import projectsIcon from "@/public/icons/projects.svg";
import responsesIcon from "@/public/icons/responses.svg";
import settingsIcon from "@/public/icons/settings_white.svg";

interface SideNavProps {
  isClientDashboard: boolean;
  setIsClientDashboard: (value: boolean) => void;
}

const SideNav = ({ isClientDashboard, setIsClientDashboard }: SideNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathname === "/client/dashboard" ||
      pathname.startsWith("/client/dashboard")
    ) {
      setIsClientDashboard(true);
    } else if (
      pathname === "/professional/dashboard" ||
      pathname.startsWith("/professional/dashboard")
    ) {
      setIsClientDashboard(false);
    }
  }, [pathname]);

  return (
    <Box className="w-full md:w-80 bg-main text-white h-full md:h-max p-6 flex flex-col lg:ml-3 md:rounded-lg">
      {isClientDashboard ? (
        <Box className="flex items-center mb-5 mt-2">
          <Box className="flex items-center pr-4 border-r border-gray-600">
            <Image
              src="/images/profile.png"
              alt="Anita Maika"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Box>
          <Box className="ml-4 flex-grow">
            <Typography className="font-semibold text-lg flex gap-2 items-center">
              Anita Maika{" "}
              <span onClick={() => router.push("/profile")} className="border border-white rounded-full h-7 w-7 flex items-center justify-center">
                <FaUserEdit />
              </span>
            </Typography>
            <Typography className="text-secondary hover:text-secondary-light text-xs">
              United Kingdom
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box className="flex items-center mb-5 mt-2">
          <Box className="flex items-center pr-4 border-r border-gray-600">
            <Image
              src="/images/profile.png"
              alt="Anita Maika"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Box>
          <Box className="ml-4 flex-grow">
            <Typography className="font-semibold text-lg flex gap-2 items-center">
              Anita Maika{" "}
              <span onClick={() => router.push("/profile")} className="border border-white rounded-full h-7 w-7 flex items-center justify-center">
                <FaUserEdit />
              </span>
            </Typography>
            <Box className="flex justify-between text-secondary mt-2 items-center">
              <Typography className="text-white">Alat Pro</Typography>

              <Divider
                flexItem
                orientation="vertical"
                variant="middle"
                className="border-slate-400"
              />
              <button className="py-1" onClick={
                () => router.push("/membership")
              }>Manage</button>
            </Box>
          </Box>
        </Box>
      )}
      <Box className="border-b border-gray-300 mb-8" />

      <Box className="flex-grow space-y-4">
        <Link
          href={`${isClientDashboard ? "/client/dashboard" : "/professional/dashboard"}`}
          className="bg-white text-main rounded-md p-3 flex items-center"
        >
          <DashboardIcon className="mr-3" />
          <Typography>Dashboard</Typography>
        </Link>

        <Box className="flex justify-between text-secondary mt-3">
          <Button
            onClick={() => {
              setIsClientDashboard(false);
              router.push("/professional/dashboard");
            }}
          >
            Professional
          </Button>
          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
            className="border-white"
          />
          <Button
            onClick={() => {
              setIsClientDashboard(true);
              router.push("/client/dashboard");
            }}
          >
            Client
          </Button>
        </Box>
        <Box className="border-b border-white !mt-1" />
        {[
          { icon: <Image src={projectsIcon} alt="" />, text: "Leads", href: "/leads" },
          {
            icon: <Image src={responsesIcon} alt="" />,
            text: isClientDashboard ? "Post new project" : "My Responses",
            href: isClientDashboard ? "/client/place-request" : "/professional/my-responses",
          },
          {
            icon: <Image src={settingsIcon} alt="" />,
            text: "Settings",
            href: isClientDashboard ? "/client/account_settings" : "/professional/account_settings",
          },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href || `/${item.text.toLowerCase().replace(" ", "-")}`}
            className="flex items-center p-3 hover:bg-gray-700 rounded-md"
          >
            {item.icon}
            <Typography className="ml-3">{item.text}</Typography>
          </Link>
        ))}
        {!isClientDashboard && (
          <Link href="/wallet">
            <Box className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-md mt-2 -ml-0.5">
              <Box className="flex items-center">
                <AccountBalanceWalletIcon />
                <Typography className="ml-3">Wallet (23 Credits)</Typography>
              </Box>
              <Button
                size="small"
                className="text-secondary hover:text-secondary-light pl-3 "
              >
                Manage
              </Button>
            </Box>
          </Link>
        )}
        {[
          {
            icon: <ConfirmationNumberIcon />,
            text: "Support Tickets",
            routePath: `${isClientDashboard ? "client/dashboard/support-tickets" : "professional/dashboard/support-tickets"}`,
          },
          { icon: <HelpIcon />, text: "Help" },
        ].map((item, index) => (
          <Link
            key={index}
            href={`/${item?.routePath ? item.routePath : item.text.toLowerCase().replace(" ", "-")}`}
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md`}
          >
            {item.icon}
            <Typography className="ml-3">{item.text}</Typography>
          </Link>
        ))}
      </Box>

      <Link
        href="/logout"
        className="flex items-center p-3 hover:bg-gray-700 rounded-md mt-4"
      >
        <ExitToAppIcon />
        <Typography className="ml-3">Logout</Typography>
      </Link>
    </Box>
  );
};

export default SideNav;
