'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { ImLinkedin } from 'react-icons/im';
import Link from 'next/link';

const ReferralBonus = () => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyLink = () => {
        const link = "https://www.bark.com/sellers/create/?trk_referrer=referral-id-3553741&trk_s=link";

        // Copy the link to clipboard
        navigator.clipboard.writeText(link).then(() => {
            // Show the copied message
            setIsCopied(true);

            // Hide the message after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <div className='flex flex-col lg:flex-row py-[2%]'>
            {/* Add animation styles in a <style> tag */}
            <style>{`
                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                .animate-fadeInOut {
                    animation: fadeInOut 2s ease-in-out;
                }
            `}</style>

            <div className='text w-full lg:w-[65%] mb-4 lg:mb-0 text-center lg:text-left'>
                <h2 className="text-[30px] sm:text-[30px] md:text-[35px] lg:text-[50px] leading-tight xl:text-[52px] font-semibold text-gray-900 mb-2">
                    Refer a friend <br /> and get 2 free<br /> responses
                </h2>
                <p className="text-gray-700 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-[18px] mb-4">
                    If you know someone who would benefit from Bark - refer them <br /> and you&apos;ll each get 2 free responses once they purchase their <br /> starter pack.
                </p>

                {/* Link and Copy Button */}
                <div className='relative flex w-full sm:w-full md:w-[97%] lg:w-[88%] xl:w-[88%] items-center justify-between px-2 py-2 border border-black rounded-md shadow-xl space-x-4 md:space-x-6'>
                    <div className='text-start px-4 text-xs flex-grow'>
                        <a href="https://www.bark.com/sellers/create/?trk_referrer=referral-id-3553741&trk_s=link" className='underline'>
                            https://www.bark.com/sellers/create/?trk_referrer=referral-id-3553741&trk_s=link
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-[1px] h-[50px] bg-gray-400'></div>
                    </div>
                    <div
                        className='text-center bg-[#FFBE00] rounded-md px-2 sm:px-2 md:px-4 lg:px-6 py-1 sm:py-1 md:py-2 lg:py-3 text-white font-semibold text-base md:text-lg cursor-pointer'
                        onClick={handleCopyLink}
                    >
                        Copy
                    </div>

                    {/* Popup Notification */}
                    {isCopied && (
                        <div
                            style={{
                                position: 'absolute', // Position it relative to the Copy button container
                                top: '-40px', // Adjust this value to place the popup above the button
                                left: '50%', // Align horizontally to the button
                                transform: 'translateX(-50%)', // Center the popup
                                padding: '10px 15px',
                                backgroundColor: 'green',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                zIndex: 1000,
                                animation: 'fadeInOut 2s ease-in-out',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Link copied to clipboard!
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-stretch space-x-2 w-auto mt-4">
                    <h2 className="text-lg">Or share via</h2>
                    <div className="flex items-center space-x-3">
                        <Link href="#" className="text-[#425994] text-2xl">
                            <FaFacebookF />
                        </Link>
                        <Link href="#" className="text-[#6DABE9] text-2xl">
                            <FaTwitter />
                        </Link>
                        <Link href="#" className="text-[#FF4853] text-2xl">
                            <RiInstagramFill />
                        </Link>
                        <Link href="#" className="text-[#2D7AF1] text-2xl">
                            <ImLinkedin />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <div className='pic w-full lg:w-[35%] flex justify-center'>
                <Image width={1000} height={1000} src="/images/howworks2.png" alt="Happy freelancers working" className="w-full h-auto max-w-[430px] rounded-lg shadow-sm" />
            </div>
        </div>
    );
}

export default ReferralBonus;
