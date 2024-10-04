import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import AuthNavbar from "@/components/navbar/auth_navbar";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
// import ReferralBenifits from "@/components/Guid/ReferralBenefits";
import HowWorks from "@/components/Guid/HowWorks";
import FreelancerBenefits from "@/components/Guid/FreelancerBenefits";

export default function GuidPage() {
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
            &nbsp;
          </Typography>
        </Box>
      </div>
      <div className="text-main bg-secondary w-full py-4 text-center text-2xl font-bold">
        GUIDES
      </div>
      <FreelancerBenefits />
      {/* <ReferralBenifits /> */}
      <HowWorks />
      <div className="flex justify-center items-center w-full mb-16">
        <Button variant="contained" color="primary" size="large" className="px-12 py-4 font-semibold w-full sm:w-auto" >
          Get Started
          <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
