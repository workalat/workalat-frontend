"use client"
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { FaArrowRight } from "react-icons/fa6";
import ClientProfessionalTab from "./ClientProfessionalTab";
import { PiDeviceMobile, PiMedal } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { TbCrown } from "react-icons/tb";
import { GrChatOption } from "react-icons/gr";
import MarketplaceHowItWorks from "./MarketplaceHowItWorks";
import { useRouter } from "next/navigation";

export default function HowItWorksPage() {
  
  const router = useRouter();

  const redirectToProfessional = () => {
    router.push("/professional");
  }
  
  return (
    <>
      <div className="container mx-auto max-w-7xl px-6 mt-12">
        <Box className="sticky top-[65px] pt-7 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
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
            className="text-3xl invisible text-transparent font-bold text-center"
          >
            How It Works
          </Typography>
        </Box>

        <div className="w-full bg-[url('/images/how-it-works-professional.png')] py-20 px-5 rounded-md overflow-hidden mt-5 bg-black/40 bg-blend-multiply">
          <h1 className="text-5xl font-bold mb-4 text-white">How it works</h1>
          <p className="text-lg text-white pb-5">
            At WorkAlat, we help you grow your business by connecting you with
            clients<br/> actively looking for your expertise.
          </p>
          <button className="px-8 py-2 font-semibold bg-[#FFBE00] text-[#242424] rounded-md flex items-center justify-center gap-2"
          onClick={redirectToProfessional}>
            <span>Get Started</span>
            <FaArrowRight className="size-3" />
          </button>
        </div>

        <ClientProfessionalTab />
        <hr className="border-t border-gray-300 my-4" />

        <div className="w-full flex flex-col justify-center items-center pt-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Grow your business with WorkAlat today
            </h1>
            <p className="text-lg  mb-4 text-balance">
              Whether you're a freelancer, contractor, or small business owner,
              our platform gives you the opportunity to showcase your skills and
              receive real, verified leads.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#07242B] py-12 w-full mb-3">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col items-start text-white rounded-lg  p-6">
              <div className="w-[68px] h-[61px] bg-white rounded-md flex items-center justify-center mb-4">
                <PiMedal className="text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold leading-[23px] md:leading-[25px] mb-2">
                Access to Verified Clients
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                We connect you with real, actively searching clients,
                eliminating the hassle of chasing leads.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-start text-white rounded-lg  p-6">
              <div className="w-[68px] h-[61px] bg-white rounded-md flex items-center justify-center mb-4">
                <CiSearch className="text-black text-2xl md:text-3xl lg:text-4xl" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold leading-[23px] md:leading-[25px] mb-2">
                Boost your online presence
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                Stand out and attract more clients with a polished online
                presence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-start text-white rounded-lg  p-6">
              <div className="w-[68px] h-[61px] bg-white rounded-md flex items-center justify-center mb-4">
                <TbCrown className="text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold leading-[23px] md:leading-[25px] mb-2">
                Grow your reputation
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                Earn reviews and ratings from satisfied clients, boosting your
                credibility and helping you stand out in a competitive market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MarketplaceHowItWorks />

      <div className="w-full bg-[#07242B] py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center flex-col gap-8">
            {/* Left Section */}
            <div className="w-full mt-4">
              <h2 className="text-[#FFFFFF] text-center text-xl md:text-3xl font-bold leading-[38px]">
              Grow your business with WorkAlat today!
              </h2>
              <p className="font-space-grotesk text-center text-[16px] font-normal leading-[23px] text-[#FFFFFF] mt-4 max-w-4xl mx-auto">
              Ready to expand your client base and win more jobs? WorkAlat helps you connect with clients and grow your reputation.
              </p>
            </div>
            <Button
              variant="contained"
              size="large"
              className="font-semibold px-8 py-4"
              href="/professional"
            >
              Become a professional <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-start pb-9 bg-[#07242B]">
        <div className="w-full h-[10px] bg-yellow-400" />
      </div>
    </>
  );
}
