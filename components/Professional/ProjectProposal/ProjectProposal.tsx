"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";

export default function ProjectProposal({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);

    return (
        <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"proposal"} data={dynamicData} />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="pb-12">
                    {
                        dynamicData?.proposal?.map((data: any, i: number) => (
                            <div className="p-4 my-2 shadow bg-[#F3F3F3]" key={i}>
                                <div className="w-full">
                                    <div className="flex">
                                        <img className="w-[60px] h-[60px] object-cover" src={data?.userDetails?.profilePhoto} alt="work alat" />

                                        <div className="px-2">
                                            <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{data?.userDetails?.user} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" /></span></h2>
                                            <div className="flex items-center gap-1">
                                                <div className="flex gap-1">
                                                    {
                                                        [...Array(data?.userDetails?.ratings)].map((_, i) => (
                                                            <FaStar key={i} className="size-[10px] text-amber-300" />
                                                        ))
                                                    }
                                                </div>
                                                <div className="capitalize flex items-center gap-0.5 px-2 text-[12px]"><img className="size-[13px]" src="/flag.png" alt="workalat" />
                                                    <p>{data?.userDetails?.location}</p>
                                                </div>

                                            </div>
                                            <p className="text-sm font-semibold capitalize">Project title: {dynamicData?.title}</p>
                                        </div>
                                    </div>
                                    <p className="leading-6 text-sm text-[#323C47] pt-3">{data?.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                
            </div>
        </div>
    )
}
