'use client'

import Link from "next/link"
import { MdShare } from "react-icons/md"

export default function ProjectsHeader({ data, isActive }: any) {
    return (
        <div className="w-full border-b border-black/50">
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="flex items-center">
                    <div className="w-auto flex-grow">
                        <h3 className="text-lg lg:text-2xl font-bold text-black">Project Title: {data?.title}</h3>

                        <div className="flex flex-wrap pt-5">
                            <Link className={`${isActive == "details" ? "border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/details/${data?.projectId}`}>Details</Link>
                            <Link className={`${isActive == "proposal" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/proposal/${data?.projectId}`}>Proposals</Link>
                            <Link className={`${isActive == "files" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/files/${data?.projectId}`}>Files</Link>
                            <Link className={`${isActive == "tasklist" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/tasklist/${data?.projectId}`}>Tasklists</Link>
                            <Link className={`${isActive == "reviews" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-md lg:text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/reviews/${data?.projectId}`}>Reviews</Link>
                            {/* <Link className={`${isActive == "reviews" ? "border-b-2 border-[#E88B00]" : "border-b-2"} py-2 px-3 text-[#E88B00] text-xl font-semibold transition-all duration-300 block border-b-2 hover:border-[#E88B00]`} href={`/professional/my-responses/reviews/${data?.projectId}`}>Reviews</Link> */}
                        </div>
                    </div>
                    <div className="w-5">
                        <button><MdShare className="size-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
