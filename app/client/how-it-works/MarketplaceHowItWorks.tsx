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
                            src="/images/howworks.png"
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
                        Connect with top professionals
                    </p>
                    <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold leading-[1.3] mt-3">
                        How to get started?
                    </h2>

                    {/* Steps */}
                    {[
                        {
                            title: 'Post a job by telling us what you need',
                            description:
                                'Start by describing your project and the location, give us the details so we can connect you with the best service providers.',
                        },
                        {
                            title: 'Receive free quotes',
                            description:
                                'Once your request is submitted, WorkAlat will match you with qualified professionals in your area or from across the globe, depending on your preference.',
                        },
                        {
                            title: 'Compare and choose the best expert',
                            description:
                                `Now that you’ve received quotes, it’s time to compare. Use WorkAlat's simple comparison tools to evaluate service providers based on their price, experience, reviews, and ratings. Take your time to find the expert that perfectly matches your needs and award the project.`,
                        },
                        {
                            title: 'Get the job done',
                            description:
                                `After awarding the project, you can start collaborating to bring your project to life. Communicate directly through WorkAlat, agree on final details, and track progress. Your chosen professional will work closely with you to ensure everything meets your expectations.`,
                        },
                        {
                            title: 'Leave a review',
                            description:
                                `When your job is done, remember to leave a review on WorkAlat to help other customers find the best professionals.`,
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col mt-4 my-2"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-[9px] h-[9px] bg-[#FFBE00] rounded-full" />
                                {/* <p className="text-[#FFBE00]">{index+1}. </p> */}
                                <h3 className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-bold">
                                    {`Step ${index+1}: `}{item.title}
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