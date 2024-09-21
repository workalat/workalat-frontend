'use client'

import { projectHistory } from "@/utils/projectClientsData"

export default function ProjectHistory() {
    return (
        <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="pb-12">
                    <h1 className="text-2xl font-bold text-[#07242B]">Project History</h1>

                    <div className="w-full pt-5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="py-2 border-b border-black/20">
                                    <tr>
                                        <th className="p-4 text-left">Project title</th>
                                        <th className="p-4 text-left">Award status</th>
                                        <th className="p-4 text-left">Date posted</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-left">Amount</th>
                                        <th className="p-4 text-left">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectHistory.map((data, i) => (
                                        <tr key={data?.id} className={`border-b border-black/20 ${i % 2 == 0 && "bg-white"}`}>
                                            <td className="p-4">
                                                <p className="text-[15px] font-semibold capitalize">{data?.projectTitle}</p>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-gray-500 text-[15px] capitalize">{data?.award}</p>
                                            </td>
                                            <td className="p-4 text-[15px] capitalize">{data?.date}</td>
                                            <td className="p-4 text-[15px] capitalize">{data?.status}</td>
                                            <td className={`p-4 text-[15px] capitalize`}>{data?.amount}</td>
                                            <td className="p-4">
                                                <button className="bg-transparent border-2 border-[#FFBE00] text-black px-4 py-2 font-semibold rounded flex justify-center items-center gap-2 text-[15px]">Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
