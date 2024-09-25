'use client'

import { projectsData } from "@/utils/projectClientsData";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { IoIosStar } from "react-icons/io";
import { IoArrowForwardSharp, IoGift } from "react-icons/io5";
import Link from "next/link";

export default function Reviews({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);

    // demo reviews data
    const reviewsDataDemo = [
        {
            id: 1,
            name: "Anita Backer",
            rate: 5,
            userType: "professional",
            comment: "Wonderful service delivery.",
            location: "united kingdom",
            img: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-city-with-arms-crossed_23-2148767033.jpg"
        },
        {
            id: 2,
            name: "Anita Backer",
            rate: 4,
            userType: "professional",
            comment: "Wonderful service delivery.",
            location: "united kingdom",
            img: "https://img.freepik.com/free-photo/smiley-businesswoman-posing-city-with-arms-crossed_23-2148767033.jpg"
        },
    ]

    return (
        <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"reviews"} data={dynamicData} />
            <div className="relative z-10 container mx-auto max-w-7xl px-6">
                <div className="w-full flex flex-col-reverse sm:flex-row justify-start">
                    <div className="w-full sm:w-auto flex-grow border-e border-black/20">
                        {
                            reviewsDataDemo?.map((data: any, i: number) => (
                                <div key={i} className="py-3 px-2 border-b border-black/20">
                                    <div className="w-full border-b border-black/20 flex gap-3 pb-5">
                                        <img className="w-16 h-16 object-cover" src={data?.img} alt="work alat" />
                                        <div>
                                            <h5 className="font-bold text-sm">{data?.name}</h5>
                                            <h5 className="text-xs capitalize">{data?.location}</h5>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <h4><b>Review from {data?.name}</b> ({data?.userType})</h4>

                                        <div className="flex gap-2 items-center">
                                            {
                                                [...Array(data?.rate)].map((_, i) => (
                                                    <IoIosStar key={i} className="text-amber-400 size-4" />
                                                ))
                                            }
                                            <p className="text-xs">{parseFloat(data?.rate).toFixed(1)}</p>
                                        </div>
                                        <h4 className="font-bold text-md pt-8">{dynamicData?.title}</h4>
                                        <p className="text-xs">{data?.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-full sm:w-[300px] p-3">
                        <div className="w-full bg-[#F3F3F3] rounded-md p-4 text-center">
                            <h4 className="text-lg font-bold text-center pb-2">Refer and Earn</h4>
                            <p className="text-sm text-center pb-2">If you love WorkAlat.com, tell your friends! Friends who signed up via your referral link below gets £10 GBP from us to try WorkAlat.
                                You will also get £10 GBP once they spend £20 GBP on a project.</p>
                            
                            <div className="flex justify-center pt-4 pb-2">
                                <IoGift className="size-16 text-amber-400" />
                            </div>
                            <Link href="/refer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-secondary font-semibold mx-auto text-center mt-2 w-full">Refer Now <IoArrowForwardSharp className="size-4" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
