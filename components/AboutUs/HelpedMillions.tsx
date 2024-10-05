"use client"
import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HelpedMillions = () => {
//   const [progress, setProgress] = useState(0);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const progressBar = document.getElementById("progressBar");

//       if (progressBar) {
//         const rect = progressBar.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

//         if (isVisible && !visible) {
//           setVisible(true);
//           animateProgressBar();
//         }
//       }
//     };

//     const animateProgressBar = () => {
//       const duration = 2000; // Duration in milliseconds
//       const target = 80; // Target progress value

//       const startTime = performance.now();

//       const update = (currentTime: number) => {
//         // Explicitly typing currentTime as number
//         const elapsed = currentTime - startTime;
//         const progressPercentage = Math.min(
//           (elapsed / duration) * target,
//           target
//         );

//         setProgress(progressPercentage);

//         if (progressPercentage < target) {
//           requestAnimationFrame(update);
//         }
//       };

//       requestAnimationFrame(update);
//     };

//     window.addEventListener("scroll", handleScroll);
//     // Initial check to handle cases where the progress bar is already in view
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [visible]);

const router = useRouter();

  return (
    <div className="pt-6 container mx-auto max-w-7xl px-6 mt-5 pb-5">
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 pr-[5%] mt-5">
          <h2 className="text-[26px] lg:text-[32px] sm:text-[26px] md:text-[30px] font-bold text-left">
            Founded with a vision to bridge the gap between independent
            professionals and businesses in need of expertise.
          </h2>
          <p className="text-[13px] sm:text-[13px] lg:text-[16px] font-normal leading-[18px] sm:leading-[20px] lg:leading-[22px] text-left mt-2">
            Our mission is to create a thriving ecosystem where service
            providers can grow their careers, and businesses can find the right
            talent, all under one roof.
          </p>
          <p className="text-[13px] sm:text-[13px] lg:text-[16px] font-normal leading-[18px] sm:leading-[20px] lg:leading-[22px] text-left mt-2">
            At WorkAlat, we believe finding the right professional for any task
            shouldn&apos;t be a hassle. Whether it&apos;s fixing something in your home,
            developing a marketing strategy for your business, or planning your
            dream event, our mission is simple: to connect you with skilled,
            reliable service providers who can bring your projects to life.
          </p>

          {/* <div className="text-[13px] sm:text-[13px] lg:text-[16px] font-bold leading-[22.97px] text-left mt-4 mb-3">
            Estimate increase
          </div> */}
          {/* <div
            className="w-full h-3 mb-2 bg-gray-200 rounded-full dark:bg-gray-700 relative"
            id="progressBar"
          >
            <div
              className="h-3 bg-[#FFBE00] rounded-full dark:bg-yellow-500"
              style={{ width: `${progress}%`, transition: "width 0s linear" }} // Remove transition for manual control
            />
            {visible && (
              <div
                className="absolute bottom-[25px] bg-black text-white px-[6px] py-[2px] rounded-md inline-block"
                style={{
                  left: `calc(${progress}% - 24px)`,
                  transition: "left 0s linear", // Remove transition for manual control
                }}
              >
                <span className="text-md ">{Math.round(progress)}%</span>
                <div className="absolute w-0 h-0 left-1/2 transform -translate-x-1/2 -bottom-2 border-x-[10px] border-x-transparent border-t-[10px] border-t-black" />
              </div>
            )}
          </div> */}
          {/* <p className="text-[13px] sm:text-[13px] lg:text-[16px] font-normal  text-left mt-3">
            *Based on general network data
          </p> */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-3">
            {/* <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={800}
                height={800}
                className="w-[72px] h-[72px] rounded-full object-cover"
              />
              <div className="ml-4 text-[14px] ">
                <h4 className="font-bold text-left">Anita Backer</h4>
                <p className="font-normal text-left">Executive Chairman</p>
              </div>
            </div> */}

            <Button variant="contained" size="large" className="py-4 px-16 font-bold" onClick={()=>router.push("/contact")}>
              More About Us
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-5">
          <div className="relative pl-4 w-full h-[360px] sm:h-[360px] lg:h-[450px]">
            <Image
              src="/images/howworks2.png"
              alt="Image description"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpedMillions;
