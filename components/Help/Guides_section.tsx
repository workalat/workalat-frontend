"use client"; // Mark component as client-side

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation in app directory

const Guides_section = () => {
  const router = useRouter(); // Initialize router

  // Function to handle the click and navigate to /categories
  const handleClick = () => {
    router.push("/guide"); // Navigate to /guide_screen
  };

  // Array of custom text values
  const guideTexts = [
    "How to post a job",
    "How to receive quotes",
    "Selecting qualified professionals",
    "Managing my projects",
    "How do I create profile?",
    "Finding a job on WorkAlat",
    "Winning a project",
    "Building a reputation",
  ];

  return (
    <div className="relative bg-[#EEEEEE] mt-2 pb-20">
      {/* Second div (Images) */}
      <div className="pt-6 container mx-auto max-w-7xl px-6">
        {/* First div (yellow) */}
        <div className="bg-yellow-500 flex items-center w-full mx-auto px-8 py-5 rounded-md -mt-14 mb-5">
          <span className="text-black text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold">
            Guides
          </span>
        </div>

        <h2 className="text-2xl font-bold">For Clients</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-[2.1%] sm:gap-y-[2.1%] md:gap-y-[2.3%] lg:gap-y-[2.5%] xl:gap-y-[2.7%] gap-x-[3%] sm:gap-x-[3%] md:gap-x-[4%] lg:gap-x-[5%] xl:gap-x-[6%]">
          {guideTexts.slice(0, 4).map((text, index) => (
            <div
              key={index}
              className={`flex flex-col items-center pl-4 mt-4`}
              onClick={handleClick}
            >
              {" "}
              {/* Add onClick */}
              <div className="relative w-full max-w-[235px]">
                <Image
                  src={`/images/guides${index + 1}.png`} // Replace with actual paths
                  alt={`Image ${index + 1}`}
                  width={235}
                  height={235}
                  className="w-full h-auto object-cover cursor-pointer" // Add cursor pointer
                />
              </div>
              <button className="px-[14%] lg:text-xs text-[8px] md:text-[10px] sm:text-[8px] py-[10%] bg-[#07242B] text-white whitespace-nowrap min-w-[100%] rounded-md mt-2 sm:w-auto cursor-pointer">
                {text}
              </button>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-8">For Professionals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-[2.1%] sm:gap-y-[2.1%] md:gap-y-[2.3%] lg:gap-y-[2.5%] xl:gap-y-[2.7%] gap-x-[3%] sm:gap-x-[3%] md:gap-x-[4%] lg:gap-x-[5%] xl:gap-x-[6%]">
          {guideTexts.slice(4, guideTexts.length).map((text, index) => (
            <div
              key={index}
              className={`flex flex-col items-center pl-4 mt-4`}
              onClick={handleClick}
            >
              {" "}
              {/* Add onClick */}
              <div className="relative w-full max-w-[235px]">
                <Image
                  src={`/images/guides${index + 5}.png`} // Replace with actual paths
                  alt={`Image ${index + 1}`}
                  width={235}
                  height={235}
                  className="w-full h-auto object-cover cursor-pointer" // Add cursor pointer
                />
              </div>
              <button className="px-[14%] lg:text-xs text-[8px] md:text-[10px] sm:text-[8px] py-[10%] bg-[#07242B] text-white whitespace-nowrap min-w-[100%] rounded-md mt-2 sm:w-auto cursor-pointer">
                {text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides_section;
