import Image from 'next/image';
import React from 'react';

const MarketplaceHowItWorks = () => {
    return (
        <div className="container mx-auto max-w-7xl px-6 pt-12 pb-12">
            <div className="flex flex-wrap">
                {/* Image Section */}
                <div className="w-full md:w-1/2 mt-5">
                    <div className="relative w-full h-[360px] sm:h-[360px] md:h-full">
                        <Image
                            src="/images/howworks2.png"
                            alt="Image description"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 px-12 mt-5">
                    <p className="text-[16px] font-normal leading-[23px] text-left text-gray-700">
                    Connect with top professionals on WorkAlat
                    </p>
                    <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold leading-[1.3] mt-3">
                    How to get started
                    </h2>

                    {/* Steps */}
                    {[
                        {
                            title: 'Step 1: Create your free profile',
                            description:
                            `Get started by signing up and creating a professional profile that highlights your skills, services, and experience.`
                        },
                        {
                            title: 'Step 2: Receive job leads tailored to your expertise',
                            description:
                            `Once your profile is set up, WorkAlat will start matching you with relevant job opportunities based on your skills, location, and services offered. You’ll be notified when new projects are posted that align with what you do, so you can focus on the work that suits you best.`
                        },
                        {
                            title: 'Step 3: Send quotes & communicate directly with clients',
                            description:
                            `When a job opportunity catches your eye, you can easily send a personalized quote to the client. Be clear about your pricing, timeline, and approach so clients can see why you’re the right fit. You can communicate directly with potential clients to clarify details, answer questions, and build a strong connection before they hire you.`,
                        },
                        {
                            title: 'Step 4: Win jobs and build your reputation',
                            description:
                            `Once a client selects your quote, you can begin working on the project. Deliver exceptional service, and once the job is complete, ask your client for a review. Positive feedback will help boost your profile and attract more clients in the future. The better your ratings and reviews, the higher you’ll rank in search results.`,
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col mt-4 lg:mt-6 sm:mt-5"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-[9px] h-[9px] bg-[#FFBE00] rounded-full"></div>
                                <h3 className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-bold">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] leading-[22px] mt-2 ml-[15px]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceHowItWorks;