"use client"
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import CompanyOverview from "@/components/AboutUs/CompanyOverview";
import HelpedMillions from "@/components/AboutUs/HelpedMillions";
import Hero from "@/components/AboutUs/Hero";
import OurValue from "@/components/AboutUs/OurValue";
import PressInquiriesCard from "@/components/Contact/PressInquiriesCard";
import AuthNavbar from "@/components/navbar/auth_navbar";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { FaArrowRight } from "react-icons/fa6";
import PlaceRequestModal from "@/components/Clients/PlaceRequestModal/PlaceRequestModal";
import { useState } from "react";

export default function AboutPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            className="text-3xl font-bold text-center text-transparent invisible"
          >
            About Us
          </Typography>
        </Box>
      </div>
      <Hero />
      <HelpedMillions />
      <PressInquiriesCard />
      <CompanyOverview />
      <OurValue />
      <section className="bg-secondary w-full py-16 flex flex-col justify-center items-center gap-8 mt-12">
        <h2 className="text-2xl lg:text-5xl font-bold">Ready to post a project?</h2>
        <p className="text-center text-pretty max-w-4xl text-lg">
          With WorkAlat, it&apos;s as easy as posting your request, receiving quotes,
          and choosing the best professional.<br/> Let&apos;s make your next project{" "}
        </p>
        <Button variant="contained" color="secondary" size="large" className="py-4 px-12" onClick={openModal}>
            Post a project
            <FaArrowRight className="ml-2" />
        </Button>
      </section>
      <PlaceRequestModal open={isModalOpen} onClose={closeModal} />
      {/* <OurTeam /> */}
    </div>
  );
}
