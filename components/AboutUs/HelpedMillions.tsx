'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa6";

const HelpedMillions = () => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                const rect = progressBar.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                if (isVisible && !visible) {
                    setVisible(true);
                    animateProgressBar();
                }
            }
        };

        const animateProgressBar = () => {
            const duration = 2000; // Duration in milliseconds
            const target = 80; // Target progress value

            const startTime = performance.now();

            const update = (currentTime: number) => { // Explicitly typing currentTime as number
                const elapsed = currentTime - startTime;
                const progressPercentage = Math.min((elapsed / duration) * target, target);
                setProgress(progressPercentage);

                if (progressPercentage < target) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check to handle cases where the progress bar is already in view
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visible]);

    return (
        <div className="pt-6 container mx-auto max-w-7xl px-6 mt-5 pb-5">
            <div className="flex flex-wrap items-center justify-between">
                <div className="w-full md:w-1/2 pr-[5%] mt-5">
                    <h2 className="text-[26px] lg:text-[32px] sm:text-[26px] md:text-[30px] font-bold text-left">
                        We've helped make millions of connections between startups and job seekers on our platform over the last 10 years.
                    </h2>
                    <p className="text-[13px] sm:text-[13px] lg:text-[16px] font-normal leading-[18px] sm:leading-[20px] lg:leading-[22px] text-left mt-2">
                        Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
                    </p>

                    <div className="text-[13px] sm:text-[13px] lg:text-[16px] font-bold leading-[22.97px] text-left mt-4 mb-3">
                        Estimate increase
                    </div>
                    <div className="w-full h-3 mb-2 bg-gray-200 rounded-full dark:bg-gray-700 relative" id="progressBar">
                        <div
                            className="h-3 bg-[#FFBE00] rounded-full dark:bg-yellow-500"
                            style={{ width: `${progress}%`, transition: 'width 0s linear' }} // Remove transition for manual control
                        ></div>
                        {visible && (
                            <div
                                className="absolute bottom-[25px] bg-black text-white px-[6px] py-[2px] rounded-md inline-block"
                                style={{
                                    left: `calc(${progress}% - 24px)`,
                                    transition: 'left 0s linear' // Remove transition for manual control
                                }}
                            >
                                <span className="text-md ">{Math.round(progress)}%</span>
                                <div className="absolute w-0 h-0 left-1/2 transform -translate-x-1/2 -bottom-2 border-x-[10px] border-x-transparent border-t-[10px] border-t-black"></div>
                            </div>
                        )}
                    </div>
                    <p className="text-[13px] sm:text-[13px] lg:text-[16px] font-normal  text-left mt-3">
                        *Based on general network data
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-3">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Image
                                src="/images/profile.png"
                                alt="Profile"
                                width={800}
                                height={800}
                                className="w-[72px] h-[72px] rounded-full object-cover"
                            />
                            <div className="ml-4 text-[14px] ">
                                <h4 className="font-bold text-left">
                                    Anita Backer
                                </h4>
                                <p className="font-normal text-left">
                                    Executive Chairman
                                </p>
                            </div>
                        </div>

                        <div className="w-[200px] cursor-pointer rounded-[5px] sm:w-[240px] lg:w-[267px] h-[45px] sm:h-[50px] lg:h-[55px] bg-[#FFBE00]  text-[#242424] text-[14px] sm:text-[15px] lg:text-[15px] font-bold leading-[18px] sm:leading-[19px] lg:leading-[19.14px] flex items-center justify-center space-x-2 group">
                            <span>More About Us</span>
                            {/* Arrow with hover animation */}
                            <FaArrowRight />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-5">
                    <div className="relative pl-4 w-full h-[360px] sm:h-[360px] lg:h-[450px]">
                        <Image
                            src="/images/about-img1.png"
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
