'use client'

import Link from "next/link"
import { MdShare } from "react-icons/md"

export default function ProjectsHeader({ data, isActive, params }: any) {
    console.log(data);
    return (
        <div className="w-full border-b border-black/50">
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="flex items-end sm:items-center">
                    <div className="w-auto flex-grow">
                        <h3 className="text-lg lg:text-2xl font-bold text-black capitalize">Project Title: {data?.serviceTitle}</h3>

                        <div className="flex pt-5 overflow-x-auto max-w-[90vw]">
                            <Link className={`${isActive == "details" ? "border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/details/${data?._id}`}>Details</Link>
                            <Link className={`${isActive == "proposal" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/proposal/${data?._id}`}>Proposals</Link>
                            <Link className={`${isActive == "files" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/files/${data?._id}`}>Files</Link>
                            <Link className={`${isActive == "tasklist" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/tasklist/${data?._id}`}>Tasklists</Link>
                            <Link className={`${isActive == "reviews" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/reviews/${data?._id}`}>Reviews</Link>
                            {/* <Link className={`${isActive == "reviews" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/client/my-projects/reviews/${data?.projectId}`}>Reviews</Link> */}
                        </div>
                    </div>
                    {/* <div className="w-5 pb-2 sm:pb-0">
                        <button><MdShare className="size-5" /></button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
