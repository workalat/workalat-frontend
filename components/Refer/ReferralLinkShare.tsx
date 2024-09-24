'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa6';
import { ImLinkedin } from 'react-icons/im';
import { RiInstagramFill } from 'react-icons/ri';

const ReferralLinkShare = () => {
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
        <div className="p-4 relative">
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

            <h1 className="font-bold text-center text-xl md:text-2xl lg:text-3xl mb-4">
                Share your referral link
            </h1>
            <div className="flex flex-col items-center w-full">
                <div className='relative inline-block w-full md:w-[70%] lg:w-[55%] xl:w-[55%]'>
                    <div className='flex w-full items-center justify-between px-2 py-2 border border-black rounded-md shadow-xl space-x-4 md:space-x-6'>
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
                    </div>

                    {/* Popup Notification */}
                    {isCopied && (
                        <div
                            style={{
                                position: 'absolute', // This makes it float on top of the button
                                top: '-40px', // Adjust this value to place the popup above the button
                                left: '50%', // Align horizontally to the button
                                transform: 'translateX(-50%)', // Center the pop-up
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

                <div className="flex flex-col items-center w-full mt-4 pb-6">
                    <h2 className="text-sm md:text-md lg:text-lg mb-4">Or share via</h2>
                    <div className="flex flex-wrap justify-center space-x-4">
                        <Link href="#" className="text-[#425994] text-2xl hover:text-[#003d79] transition-colors">
                            <FaFacebookF />
                        </Link>
                        <Link href="#" className="text-[#6DABE9] text-2xl hover:text-[#4a8ad8] transition-colors">
                            <FaTwitter />
                        </Link>
                        <Link href="#" className="text-[#FF4853] text-2xl hover:text-[#c8102e] transition-colors">
                            <RiInstagramFill />
                        </Link>
                        <Link href="#" className="text-[#2D7AF1] text-2xl hover:text-[#0056b3] transition-colors">
                            <ImLinkedin />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralLinkShare;
