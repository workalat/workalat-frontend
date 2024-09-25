"use client"
import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import AuthNavbar from "@/components/navbar/auth_navbar";

export default function LeadsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthNavbar />
      <main className="w-full max-w-screen-xl mx-auto mt-8 px-6">
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
            Leads
          </Typography>
        </Box>
        {children}
      </main>
    </>
  );
}
