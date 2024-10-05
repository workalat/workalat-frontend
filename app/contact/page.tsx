import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import GetInTouch from "@/components/Contact/GetInTouch";
import Map from "@/components/Contact/Map";
import PressInquiriesCard from "@/components/Contact/PressInquiriesCard";
import AuthNavbar from "@/components/navbar/auth_navbar";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";

export default function ContactPage() {
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
          <Typography
            gutterBottom
            className="font-bold text-center pb-10"
          ></Typography>
        </Box>
      </div>
      <Map />
      <GetInTouch />
      <div className="flex items-center justify-center text-3xl px-3 font-bold">
        Reach out anytime
      </div>
      <PressInquiriesCard />
    </div>
  );
}
