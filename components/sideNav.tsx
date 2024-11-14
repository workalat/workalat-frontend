"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Button, Divider, Modal } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { FaUserEdit } from "react-icons/fa";
import Chip from '@mui/material/Chip';
import { usePathname } from "next/navigation";

import projectsIcon from "@/public/icons/projects.svg";
import responsesIcon from "@/public/icons/responses.svg";
import settingsIcon from "@/public/icons/settings_white.svg";

import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useSnackbar } from "@/context/snackbar_context";
import { setMinutes } from "date-fns";


interface SideNavProps {
  isClientDashboard: boolean;
  setIsClientDashboard: (value: boolean) => void;
}

const SideNav = ({ isClientDashboard, setIsClientDashboard }: any) => {
  const pathname : any = usePathname();
  
  // 
  let [loading, setLoading] : any =useState(false);
  const [loading2, setLoading2] : any = useState(true);
  let [loadingMessage, setLoadingMessage] : any = useState("");
  let router : any = useRouter();
  let [userData,setUserData] : any = useState({});
  const { generateSnackbar } : any = useSnackbar();
  let { intoProfessoinal, intoClient,logout} : any = useUserContext();
  let [uType, setUType] = useState(Cookies.get("userType"));
  
 
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
  

  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token: any  = Cookies.get("token");
        let ver : any = await VerifyUser(token, window.location.pathname.split("/")[1]);
        if(ver?.status === "success"){
          setUserData(ver);
          if(ver?.registerAs === "professional"){
            // router.push("/professional/dashboard")
            setLoading2(false);
          }
          else{
            // router.push("/client/dashboard")
            setLoading2(false);
          }
        }
        else{ 
          // router.push("/"); 
        }
      }
      catch(e){
        generateSnackbar("Some Error Occur, Please try again", "error")
      }
    };
    verify();
  }, []);


  async function handleIntoProfessional(){
    try{
      setLoading(true)
      setLoadingMessage(`Switching to ${(userData.userType === "client") ?"Professional" :"Client"}...`)
      let changeToProfessional : any = await intoProfessoinal({userId : userData.userId});
      
      if(changeToProfessional?.status !== 400 || changeToProfessional?.data?.status === "success"){
        generateSnackbar(changeToProfessional?.data?.message , "success");
        Cookies.set("token", changeToProfessional?.data?.data[0]?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", (userData?.userType === "client") ? "professional" : "client", { secure: true, sameSite: 'None',expires: 30 });
        setLoading(false);
        setIsClientDashboard(false);
        router.push("/professional/dashboard");
    }
    else{
      setLoading(false);
        generateSnackbar(changeToProfessional.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
    }
      
    }
    catch(e){
      // console.log(e);
      generateSnackbar("Some Error Occur, Please try again", "error")
    }
  }
  
  async function handleIntoClient(){
    try{
      setLoading(true)
      setLoadingMessage(`Switching to ${(userData.userType === "client") ?"Professional" :"Client"}...`)
      let changeToClient : any = await intoClient({userId : userData.userId});
      
      if(changeToClient?.status !== 400 || changeToClient?.data?.status === "success"){
        generateSnackbar(changeToClient?.data?.message , "success");
        Cookies.set("token", changeToClient?.data?.data[0]?.token, { secure: true, sameSite: 'None',expires: 30 });
        Cookies.set("userType", (userData?.userType === "client") ? "professional" : "client", { secure: true, sameSite: 'None',expires: 30 });
        setLoading(false);
        setIsClientDashboard(true);
        router.push("/client/dashboard");
    }
    else{
      setLoading(false);
        generateSnackbar(changeToClient?.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
    }
      
    }
    catch(e){
      // console.log(e);
      generateSnackbar("Some Error Occur, Please try again", "error")
    }
  }

  

  async function handleLogout(){
    try{
      setLoading(true)
      setLoadingMessage("Logging out...")
      let token = Cookies.get("token")
      if(!token){
          router.push("/")
      }
      else{
        let log : any = await logout({
          token: token,
          userType : userData.userType
        });
      // console.log(changeToProfessional)
      
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
    {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
              <>
               <Box className="w-full md:w-80 bg-main text-white h-full md:h-max p-6 flex flex-col lg:ml-3 md:rounded-lg">
      {isClientDashboard ? (
        <Box className="flex items-center mb-5 mt-2">
          <Box className="flex items-center pr-4 border-r border-gray-600">
            <img
              src={userData.userPicture}
              alt="User Avatar"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Box>
          <Box className="ml-4 flex-grow">
            <Typography className="font-semibold text-lg flex gap-2 items-center capitalize">
            {userData?.companyName.length>0 ? userData?.companyName : userData?.userName } {" "} 
              <span
                onClick={() => router.push("/profile")}
                className="border border-white rounded-full h-7 w-7 flex items-center justify-center"
              >
                <FaUserEdit />
              </span>
            </Typography>
            {/* <Typography className="text-secondary hover:text-secondary-light text-xs">
              United Kingdom
              
            </Typography> */}
          </Box>
        </Box>
      ) : (
        <Box className="flex items-center mb-5 mt-2">
          <Box className="flex items-center pr-4 border-r border-gray-600">
            <img
              src={userData.userPicture}
              alt="User Avatar"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Box>
          <Box className="ml-4 flex-grow">
            <Typography className="font-semibold text-lg flex gap-2 items-center capitalize">
            {userData?.companyName.length>0 ? userData?.companyName : userData?.userName } {" "} 
              <span
                onClick={() => router.push("/profile")}
                className="border border-white rounded-full h-7 w-7 flex items-center justify-center"
              >
                <FaUserEdit /> 
              </span>
            </Typography>
            <Box className="flex justify-between gap-1 text-secondary mt-2 items-center">
              {
                userData?.membershipStatus === "active"

                ?
                <>
                <Chip
                className={"bg-secondary"}
                  label={
                    <Box display="flex" alignItems="center">
                      <span className="text-[.95rem]">Pro</span>
                      <img src="/pro.png" alt="Loading..." className="w-[25px] h-[25px] ml-1" />
                    </Box>
                  }
                  variant="outlined"
                  sx={{ width: "100%", display: "flex" }}
                />
                <Divider
                flexItem
                orientation="vertical"
                variant="middle"
                className="border-slate-400"
              />
                <button
                  className="py-1"
                  onClick={() => router.push("/membership/manage")}
                >
                  Manage
                </button>
                
                </>
                :
                <>
                
                <Typography className="text-white">Alat Pro</Typography>
                <Divider
                flexItem
                orientation="vertical"
                variant="middle"
                className="border-slate-400"
              />
                <button
                  className="py-1"
                  onClick={() => router.push("/membership/manage")}
                >
                  Manage
                </button>
                
                </>
              }

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

        <Box className="flex justify-end items-end text-secondary mt-3">
          {
            (userData.userType === "client")
            ?
            <Button
            onClick={() => {
              // setIsClientDashboard(false);
              // router.push("/professional/dashboard");
              handleIntoProfessional();
            }}
          >
            Switch to Professional
          </Button>
            :

            <Button
              onClick={() => {
                // setIsClientDashboard(true);
                // router.push("/client/dashboard");
                handleIntoClient()
              }}
            >
              Switch to Client
            </Button>
          }
          {/* <Button
            onClick={() => {
              // setIsClientDashboard(false);
              // router.push("/professional/dashboard");
              handleIntoProfessional();
            }}
          >
            Professional
          </Button> */}
          {/* <Divider
            flexItem
            orientation="vertical"
            variant="middle"
            className="border-white"
          /> */}
          {/* <Button
            onClick={() => {
              // setIsClientDashboard(true);
              // router.push("/client/dashboard");
              handleIntoClient()
            }}
          >
            Client
          </Button> */}
        </Box>
        <Box className="border-b border-white !mt-1" />
        {[
          { 
            icon: <Image src={projectsIcon} alt="" />,
            text: isClientDashboard ? "My Projects" : "Leads",
            href: isClientDashboard ? "/client/my-projects" : "/leads",
          },
          {
            icon: <Image src={responsesIcon} alt="" />,
            text: isClientDashboard ? "Post new project" : "My Responses",
            href: isClientDashboard
              ? "/"
              : "/professional/my-responses",
          },
          {
            icon: <Image src={settingsIcon} alt="" />,
            text: "Settings",
            href: isClientDashboard
              ? "/client/account_settings"
              : "/professional/account_settings",
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
                <Typography className="ml-3">Wallet ({userData?.bidPoints}) Points</Typography>
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
        href="/"
        className="flex items-center p-3 hover:bg-gray-700 rounded-md mt-4"
        onClick={handleLogout}
      >
        <ExitToAppIcon />
        <Typography className="ml-3">Logout</Typography>
      </Link>
    </Box> 
          <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">{loadingMessage}</h1>
              </Box>
            </Box>
          </Modal>
              </>
            ) 
          }
    </>
   
  );
};

export default SideNav;
