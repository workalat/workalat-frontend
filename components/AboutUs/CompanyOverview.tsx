import Image from 'next/image';
import React from 'react';

const CompanyOverview = () => {
    return (
        <div className="pt-6 container mx-auto max-w-7xl px-4 md:px-6 pb-12 mt-6">
            <div className="flex flex-wrap lg:gap-8">
                <div className="w-full md:w-[48%] mt-5">
                    <div className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[490px]">
                        <Image
                            src='/images/Artificial Intelligence.png'
                            alt="Image description"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full md:w-[48%] px-4 lg:px-10 mt-5">
                    <p className="text-sm md:text-[16px] font-normal text-gray-600">
                    #UK FREELANCE PLATFORM
                    </p>
                    <h2 className="text-xl leading-tight font-bold text-left mt-3">
                    WorkAlat serves as a dynamic marketplace where clients and service providers come together. Our platform caters for a wide range of industries, from home repairs and personal care to digital marketing and creative services. Whether you're a client in need of assistance or a freelancer looking to grow your business, WorkAlat provides a seamless, easy-to-use platform for both.
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div className="flex items-start">
                            <div className="min-w-2.5 h-2.5 bg-[#FFBE00] rounded-full mt-2" />
                            <div className="ml-3">
                                <h3 className="text-lg font-bold">Our Vision</h3>
                                <p className="text-base text-gray-700 mt-1">
                                WorkAlat serves as a dynamic marketplace where clients and service providers come together. Our platform caters for a wide range of industries, from home repairs and personal care to digital marketing and creative services. Whether you're a client in need of assistance or a freelancer looking to grow your business, WorkAlat provides a seamless, easy-to-use platform for both.
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
