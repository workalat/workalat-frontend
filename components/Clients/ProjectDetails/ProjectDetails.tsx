"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

export default function ProjectDetails({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);

    return (
        <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"details"} data={dynamicData} />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="pb-12">
                    <div className="flex flex-col-reverse lg:flex-row justify-between gap-3">
                        <div className="w-full lg:w-2/3 xl:w-3/4 border border-black/20 px-3 py-5">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-bold text-[#E88B00]">Details</h4>
                                <h4 className="text-xl font-bold text-[#E88B00]">£{dynamicData?.price}</h4>
                            </div>
                            <p className="text-md leading-[1.4] py-3">{dynamicData?.description?.secondViewDesc}</p>
                            <p className="text-black text-md font-bold pb-4">Project overview:</p>
                            <ul className="px-2">
                                {
                                    dynamicData?.overviews?.map((overview: string, i: number) => (
                                        <li className="flex items-center gap-2 leading-8" key={i}><GoDotFill className="size-[12px]" /> {overview}</li>
                                    ))
                                }
                            </ul>
                            <p className="text-lg px-2 py-3 font-bold text-[#E88B00]">Project ID: {dynamicData?.projectId}</p>
                        </div>
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                            <div className="w-full m-2 bg-[#F3F3F3] rounded-md p-6">
                                <h5>Discuss the project details with <span className="capitalize font-bold">{dynamicData?.userDetails?.user}</span></h5>

                                <div className="flex pt-3 items-center">
                                    <img className="w-12 h-12 object-cover" src={dynamicData?.userDetails?.profilePhoto} alt="work alat" />
                                    <div className="px-2">
                                        <p className="text-sm font-bold capitalize">{dynamicData?.userDetails?.user}</p>
                                        <button className="text-sm text-black px-3 rounded-md mt-1 py-1 font-semibold bg-[#FFBE00]">Chat</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 px-2 w-full">
                                <Link className="text-[15px] flex items-center justify-center px-[10px] py-3 text-black gap-1 bg-[#FFBE00] rounded-md" href={`/client/my-projects/`}><IoArrowBackSharp className="size-[15px] text-black" /> My Projects</Link>
                                <Link className="text-[15px] flex items-center justify-center px-[10px] py-3 text-white gap-1 bg-[#07242B] rounded-md" href={`/client/my-projects/proposal/${dynamicData?.projectId}`}>View Proposals <IoArrowForwardSharp className="size-[15px] text-white" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
