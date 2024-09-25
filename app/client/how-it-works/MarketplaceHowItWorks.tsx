import Image from 'next/image';
import React from 'react';

const MarketplaceHowItWorks = () => {
    return (
        <div className="container mx-auto max-w-7xl px-6 pt-12 pb-12">
            <div className="flex flex-wrap">
                {/* Image Section */}
                <div className="w-full md:w-1/2 mt-5">
                    <div className="relative w-full h-[360px] sm:h-[360px] md:h-[450px] lg:h-[490px]">
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
                        WHATWORKS FREELANCER MARKETPLACE
                    </p>
                    <h2 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold leading-[1.3] mt-3">
                        How does it work?
                    </h2>
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal leading-[23px] mt-3">
                        Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
                    </p>

                    {/* Steps */}
                    {[
                        {
                            title: 'Post a project or contest',
                            description:
                                'Simply post a project or contest for what you need done and receive competitive bids from freelancers within minutes.',
                        },
                        {
                            title: 'Choose the perfect freelancer',
                            description:
                                'Browse freelancer profiles. Chat in real-time. Compare proposals and select the best one. Award your project and your freelancer starts work.',
                        },
                        {
                            title: 'Pay when you’re satisfied',
                            description:
                                'Pay securely using our Milestone Payment system. Release payments when it has been completed and you\'re 100% satisfied.',
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