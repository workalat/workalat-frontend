import Image from 'next/image';
import React from 'react';
import { FaArrowRight } from "react-icons/fa6";

const HowWorks = () => {
    return (
        <div className='pt-6 container mx-auto max-w-7xl px-6'>
            <div className="flex flex-col md:flex-row justify-center gap-x-10 py-5">
                <div className="w-[300px] sm:w-[300px] md:w-[406px] lg:w-[406px]">
                    <Image src="/images/chat_pic.png" alt="Descriptive Alt Text" width={500} height={300} />
                </div>
                <div className="flex-1 py-4 text-gray-700 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-[18px]" style={{ wordSpacing: '1px', lineHeight: '1.4' }}>
                    <h1 className="text-[36px] lg:text-[40px] sm:text-[36px] md:text-[38px] font-bold mb-[5%]">How does it work?</h1>
                    <h2 className='font-bold'>1. Post a project or contest</h2>
                    <span>Simply post a project or contest for what you need done and receive <br /> competitive bids from freelancers within minutes.</span>

                    <h2 className=' font-bold mt-[3%]'>2. Choose the perfect freelancer</h2>
                    <span>Browse freelancer profiles. Chat in real-time. Compare proposals <br /> select the best one. Award your project and your freelancer starts work.</span>

                    <h2 className='font-bold mt-[3%]'>3. Pay when you&apos;re satisfied</h2>
                    <span>Pay securely using our Milestone Payment system. Release payments when <br /> it has been completed and you&apos;re 100% satisfied.</span>
                    <br />
                    <button
                        className="bg-[#FFBE00] font-bold  text-md text-black px-6 py-3 mt-4 rounded  transition duration-300 group"
                    >
                        <span>Get Started</span>
                        <FaArrowRight className="inline ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowWorks;
