"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PressInquiriesCard = () => {
    return (
        <div className="pt-6 container mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap justify-center lg:justify-between gap-3 lg:gap-5 pb-12 pt-4">
                {/* Customer Support Card */}
                <div className="w-full sm:w-1/2 md:w-[300px] lg:w-[310px] xl:w-[380px] relative bg-[#F3F3F3] rounded-lg flex items-center overflow-hidden shadow-md">
                    <div className="px-5 py-10 z-10">
                        <h2 className="text-black font-semibold text-lg pb-2">Customer Support</h2>
                        <Link href="#" className="underline text-gray-600 hover:text-gray-800 transition-colors duration-200">Visit Help Center</Link>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 lg:w-[120px] w-[90px] h-full bg-[url('/images/shape.png')] bg-cover bg-no-repeat flex items-center justify-center">
                        <Image
                            className="w-[30px]"
                            width={1000}
                            height={1000}
                            src="/images/air-pod.png"
                            alt="Customer Support"
                        />
                    </div>
                </div>

                {/* Enterprise Solution Card */}
                <div className="w-full sm:w-1/2 md:w-[300px] lg:w-[310px] xl:w-[380px] relative bg-[#F3F3F3] rounded-lg flex items-center overflow-hidden shadow-md">
                    <div className="px-5 py-10 z-10">
                        <h2 className="text-black font-semibold text-lg pb-2">Enterprise Solution</h2>
                        <a href="tel:1241545444" className="underline text-gray-600 hover:text-gray-800 transition-colors duration-200">124.154.5444</a>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 lg:w-[120px] w-[90px] h-full bg-[url('/images/shape.png')] bg-cover bg-no-repeat flex items-center justify-center">
                        <Image
                            className="w-[30px]"
                            width={1000}
                            height={1000}
                            src="/images/cap-cut.png"
                            alt="Enterprise Solution"
                        />
                    </div>
                </div>

                {/* Press Inquiries Card */}
                <div className="w-full sm:w-1/2 md:w-[300px] lg:w-[310px] xl:w-[380px] relative bg-[#F3F3F3] rounded-lg flex items-center overflow-hidden shadow-md">
                    <div className="px-5 py-10 z-10">
                        <h2 className="text-black font-semibold text-lg pb-2">Press Inquiries</h2>
                        <a href="mailto:press@whatworks.com" className="underline text-gray-600 hover:text-gray-800 transition-colors duration-200">press@whatworks.com</a>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 lg:w-[120px] w-[90px] h-full bg-[url('/images/shape.png')] bg-cover bg-no-repeat flex items-center justify-center">
                        <Image
                            className="w-[30px]"
                            width={1000}
                            height={1000}
                            src="/images/persons.png"
                            alt="Press Inquiries"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PressInquiriesCard;