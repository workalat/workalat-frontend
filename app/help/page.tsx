"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import AuthNavbar from "@/components/navbar/auth_navbar";
import Announce_section from "@/components/Help/Announce_section";
import FAQ from "@/components/Help/FAQ";
import FAQAnnouncementGuideTabs from "@/components/Help/FAQAnnouncementGuideTabs";
import Guides_section from "@/components/Help/Guides_section";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";

export default function HelpPage() {
  const guidesRef = useRef<HTMLDivElement | null>(null);
  const announcementsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToSection = (section: string) => {
    const offset = 100; // Adjust the offset value as needed

    if (section === "Guides" && guidesRef.current) {
      const guidesPosition =
        guidesRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
        
      window.scrollTo({
        top: guidesPosition,
        behavior: "smooth",
      });
    } else if (section === "Announcements" && announcementsRef.current) {
      const announcementsPosition =
        announcementsRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
        
      window.scrollTo({
        top: announcementsPosition,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div>
      <AuthNavbar />
      <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
        <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
          <Link
            href="/client/dashboard"
            className="flex gap-2 absolute left-0 font-bold"
          >
            <Image
              src={arrowRightSm}
              alt="Back to dashboard"
              className="rotate-180"
            />
            <span>
              Back <span className="hidden md:inline-flex">to dashboard</span>
            </span>
          </Link>
          <Typography gutterBottom className="text-3xl font-bold text-center">
            Help
          </Typography>
        </Box>
        <FAQAnnouncementGuideTabs onTabClick={handleScrollToSection} />
        <FAQ />
      </div>
      {/* Guide section with ref */}
      <div ref={guidesRef}>
        <Guides_section />
      </div>
      {/* Announcements section with ref */}
      <div ref={announcementsRef}>
        <Announce_section />
      </div>
    </div>
  );
}
