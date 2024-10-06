"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";

import SideNav from "../../../components/sideNav";

import ProfileWidget from "./sub-components/profileWidget";
import VerificationWidget from "./sub-components/verificationWidget";
import LeadsSetting from "./sub-components/leadsSetting";
import OfferWidget from "./sub-components/offerWidget";
import LeadsNotifier from "./sub-components/leadsNotifier";
import Help from "./sub-components/help";
import ResponseNotifier from "./sub-components/responseNotifier";

import theme from "@/config/theme.js";
import { formatDateTime } from "@/utils/helper";

const Page = () => {
  const [isClientDashboard, setIsClientDashboard] = useState<boolean>(false);
  const pathname = usePathname();

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const [currentTime, setCurrentTime] = useState<string>(
    formatDateTime(new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/")) {
      setIsClientDashboard(true);
    } else if (pathname === "/professional/dashboard" || pathname.startsWith("/professional/dashboard/")) {
      setIsClientDashboard(false);
    }
  }, [pathname]);



  return (
    <ThemeProvider theme={theme}>
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          className="bg-main text-white p-2 rounded-full shadow-lg"
          onClick={toggleSideNav}
        >
          <MenuIcon />
        </button>
      </div>
      <div
        className={`fixed inset-0 z-40 transform ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <SideNav key={"side-mobile"} isClientDashboard={isClientDashboard} setIsClientDashboard={setIsClientDashboard} />
      </div>
      <section className="w-full max-w-[1250px] mx-auto bg-[url('/images/bg_pattern_5.svg')] bg-left-top bg-no-repeat py-4 mb-6 flex flex-col md:flex-row">
        <section className="md:max-w-[400px] md:block hidden">
          <SideNav key={"side-desktop"} isClientDashboard={isClientDashboard} setIsClientDashboard={setIsClientDashboard} />
        </section>
        <section className="w-full px-4 overflow-hidden h-full">
          <div className="w-full flex items-center justify-between mt-8 flex-col md:flex-row">
            <p className="text-lg font-bold">Overview</p>
            <p className="text-md font-bold">{currentTime}</p>
          </div>
          <div className="w-full h-[0.5px] bg-gray-400 mt-4" />
          <section className="w-full flex flex-col md:flex-row gap-3 mt-6 justify-between">
            <ProfileWidget isClientDashboard={isClientDashboard} />
            <VerificationWidget />
          </section>
          <section
            className={`w-full flex flex-col md:flex-row ${isClientDashboard ? "justify-end" : "justify-between"} gap-3 mt-8`}
          >
            {!isClientDashboard && (
              <div>
                <LeadsSetting />
              </div>
            )}
            <div className="max-w-xl w-full">
              {isClientDashboard ? (
                <Help />
              ) : (
                <div>
                  <OfferWidget />
                  <div className="flex flex-col md:flex-row gap-2 mt-6 w-full">
                    <LeadsNotifier />
                    <ResponseNotifier />
                  </div>
                  <Help />
                </div>
              )}
            </div>
          </section>
        </section>
      </section>
    </ThemeProvider>
  );
};

export default Page;
