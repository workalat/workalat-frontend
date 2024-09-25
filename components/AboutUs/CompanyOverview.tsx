import Image from 'next/image';
import React from 'react';

const CompanyOverview = () => {
    return (
        <div className="pt-6 container mx-auto max-w-7xl px-4 md:px-6 pb-12 mt-6">
            <div className="flex flex-wrap lg:gap-8">
                <div className="w-full md:w-[48%] mt-5">
                    <div className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[490px]">
                        <Image
                            src='/images/howworks.png'
                            alt="Image description"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full md:w-[48%] px-4 lg:px-10 mt-5">
                    <p className="text-sm md:text-[16px] font-normal text-gray-600">
                        #EXPLORE PRO SERVICES
                    </p>
                    <h2 className="text-xl sm:text-[28px] md:text-[30px] lg:text-[32px] font-bold text-left mt-3">
                        There's a lot more to come, and we're excited to share it with you.
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div className="flex items-start">
                            <div className="w-[10px] h-[10px] bg-[#FFBE00] rounded-full mt-1"></div>
                            <div className="ml-3">
                                <h3 className="text-lg font-bold">Our Mission</h3>
                                <p className="text-base text-gray-700 mt-1">
                                    To bring Employers and Freelancers together from around the globe to get work done.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-[10px] h-[10px] bg-[#FFBE00] rounded-full mt-1"></div>
                            <div className="ml-3">
                                <h3 className="text-lg font-bold">Our Vision</h3>
                                <p className="text-base text-gray-700 mt-1">
                                    To help build a better world that's interconnected for prosperity and wired for peace.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-[10px] h-[10px] bg-[#FFBE00] rounded-full mt-1"></div>
                            <div className="ml-3">
                                <h3 className="text-lg font-bold">Our Proposition</h3>
                                <p className="text-base text-gray-700 mt-1">
                                    Connect, collaborate, and get work done in a safe and flexible online environment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyOverview;
