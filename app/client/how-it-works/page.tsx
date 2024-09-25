import { Box, Typography } from "@mui/material";
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

export default function HowItWorksPage() {
  return (
    <>
      <div className="container mx-auto max-w-7xl px-6 pt-3">
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
          <Typography gutterBottom className="text-3xl invisible text-transparent font-bold text-center">
            How It Works
          </Typography>
        </Box>

        <div className="w-full bg-[url('/images/working.png')] py-20 px-5 rounded-md overflow-hidden mt-5 bg-black/40 bg-blend-multiply">
          <h1 className="text-5xl font-bold mb-4 text-white">
            How can freelancers help<br />your business?
          </h1>
          <p className="text-lg text-white pb-5">
            The possibilities are endless. We have expert freelancers who<br /> work in every technical, professional, and creative field<br /> imaginable.
          </p>
          <button
            className="px-8 py-2 font-semibold bg-[#FFBE00] text-[#242424] rounded-md flex items-center justify-center gap-2"
          >
            <span>Post a project</span>
            <FaArrowRight className="size-3" />
          </button>
        </div>

        <ClientProfessionalTab />
        <hr className="border-t border-gray-300 my-4" />

        <div className="w-full flex flex-col justify-center items-center pt-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Choose from endless possibilities.
            </h1>
            <p className="text-lg  mb-4">
              Get anything done, exactly how you want it. Turn that spark of an idea into reality.
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
                Flexible payment terms
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                Pay your freelancers a fixed price or by the hour. All secured by the Milestone Payments system.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-start text-white rounded-lg  p-6">
              <div className="w-[68px] h-[61px] bg-white rounded-md flex items-center justify-center mb-4">
                <CiSearch className="text-black text-2xl md:text-3xl lg:text-4xl" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold leading-[23px] md:leading-[25px] mb-2">
                Flexible payment terms
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                Pay your freelancers a fixed price or by the hour. All secured by the Milestone Payments system.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-start text-white rounded-lg  p-6">
              <div className="w-[68px] h-[61px] bg-white rounded-md flex items-center justify-center mb-4">
                <TbCrown className="text-black text-2xl sm:text-2xl md:text-3xl lg:text-4xl" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold leading-[23px] md:leading-[25px] mb-2">
                Flexible payment terms
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[18px] md:leading-[19px] text-justify">
                Pay your freelancers a fixed price or by the hour. All secured by the Milestone Payments system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MarketplaceHowItWorks />

      <div className="w-full bg-[#07242B] py-12">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Title */}
          <p className="text-[#FFFFFF] text-[10px] sm:text-[10px] md:text-[13px] lg:text-[15px] font-normal text-left">
            WHAT WE DO
          </p>

          <div className="flex flex-wrap">
            {/* Left Section */}
            <div className="w-full md:w-8/12 mt-4">
              <h2 className="text-[#FFFFFF] text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-[38px] text-left">
                Be in control. Keep in contact.
              </h2>
              <p className="font-space-grotesk text-[16px] font-normal leading-[23px] text-left text-[#FFFFFF] mt-4">
                Use our collaboration tools to work efficiently with your freelancer. Share files,
                <br className="hidden md:block" /> chat in real-time, monitor progress, and so much more.
              </p>

              {/* Feature Cards */}
              <div className="flex flex-wrap gap-3 mt-6">
                {/* Live Chat */}
                <div className="w-full md:w-[calc(50%-0.75rem)] p-6 rounded-lg">
                  <div className="text-[#FFC119] text-3xl mb-4">
                    <GrChatOption className="text-2xl md:text-3xl" />
                  </div>
                  <h3 className="text-[#FFFFFF] text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-[38px] text-left">
                    Live chat
                  </h3>
                  <p className="font-space-grotesk text-[16px] text-[#FFFFFF] font-normal leading-[23px] text-left mt-2">
                    You can live chat with your freelancers to ask questions, share feedback, and get constant updates on the progress of your work.
                  </p>
                </div>

                {/* Mobile App */}
                <div className="w-full md:w-[calc(50%-0.75rem)] p-6 rounded-lg">
                  <div className="text-[#FFC119] text-3xl mb-4">
                    <PiDeviceMobile className="text-2xl md:text-3xl" />
                  </div>
                  <h3 className="text-[#FFFFFF] text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-[38px] text-left">
                    Mobile App
                  </h3>
                  <p className="font-space-grotesk text-[16px] text-[#FFFFFF] font-normal leading-[23px] text-left mt-2">
                    Manage your project at the touch of your fingertips. The mobile app makes on-the-go collaboration a breeze.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="w-full md:w-4/12 px-4 mt-5 mb-5">
              <div className="relative w-full h-[334px]">
                <Image
                  src="/images/mobile.png"
                  alt="Image description"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start pb-9 bg-[#07242B]">
        <div className="w-full h-[10px] bg-yellow-400"></div>
      </div>
    </>
  );
}
