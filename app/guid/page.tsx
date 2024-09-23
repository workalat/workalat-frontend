import AuthNavbar from "@/components/navbar/auth_navbar";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import ReferralBenifits from "@/components/Guid/ReferralBenefits";
import HowWorks from "@/components/Guid/HowWorks";
import FreelancerBenefits from "@/components/Guid/FreelancerBenefits";

export default function GuidPage() {
    return (
        <div>
            <AuthNavbar />
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
                    <Link
                        href="/dashboard"
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
                        HOW TO GET HIRED
                    </Typography>
                </Box>
            </div>
            <FreelancerBenefits />
            <ReferralBenifits />
            <HowWorks />
        </div>
    )
}
