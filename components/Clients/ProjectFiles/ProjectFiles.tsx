import { projectsData } from '@/utils/projectClientsData';
import React, { useState } from 'react'
import ProjectsHeader from '../ProjectsHeader/ProjectsHeader';
import { PiFilesLight, PiUploadFill } from 'react-icons/pi';
import { IoDocumentText } from 'react-icons/io5';
import { BsImages } from 'react-icons/bs';
import { BiSolidVideos } from 'react-icons/bi';

export default function ProjectFiles({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
    const [filterFiles, setFilterFiles] = useState<string>("all");
    return (
        <div>
            <div className="bg-white relative">
                {/* Left Image */}
                <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
                {/* Right Image */}
                <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

                {/* Content */}
                {/* header for dynamic pages */}
                <ProjectsHeader isActive={"files"} data={dynamicData} />
                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="h-full">
                        <div className="flex h-full items-stretch">
                            <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
                                <h4 className='font-bold text-lg text-[#E88B00] pt-2 pb-3'>Filter</h4>
                                <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
                                    <ul className="flex flex-col gap-2">
                                        <li>
                                            <button
                                                onClick={() => setFilterFiles('all')}
                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "all" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                            >
                                                <PiFilesLight size={20} /> All Files (0)
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setFilterFiles('doc')}
                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "doc" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                            >
                                                <IoDocumentText size={20} /> Documents (0)
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setFilterFiles('img')}
                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "img" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                            >
                                                <BsImages size={20} /> Images (0)
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setFilterFiles('video')}
                                                className={`flex items-center justify-center px-3 py-2 gap-1 ${filterFiles === "video" ? "bg-[#07242B80] text-white" : "text-black bg-transparent"} rounded-md shadow`}
                                            >
                                                <BiSolidVideos size={20} /> Videos (0)
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full">
                                <div className="flex py-2 justify-end">
                                    <label className='bg-main text-white text-sm px-3 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer'>
                                        <PiUploadFill size={17} /> Upload Files
                                        <input type="file" className='hidden' />
                                    </label>
                                </div>

                                <div className="p-3 border mb-5 h-[350px] border-dashed rounded-lg border-black/40">
                                    <div className="w-full h-full">
                                        <div className="overflow-x-auto">
                                            <table className='min-w-full'>
                                                <thead className='text-[#E88B00] font-semibold'>
                                                    <tr>
                                                        <th className='px-4 text-start'>Name</th>
                                                        <th className='px-4 text-start'>Size</th>
                                                        <th className='px-4 text-start'>Upload by</th>
                                                        <th className='px-4 text-start'>Date</th>
                                                        <th className='px-4 text-start'></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='flex items-center gap-2 px-4 py-2'>
                                                            <PiFilesLight size={20} />
                                                            sgfpsbvehvwcww_sept6.apk
                                                        </td>
                                                        <td className='px-4 py-2'>24 MB</td>
                                                        <td className='px-4 font-bold py-2'>Anita Backer</td>
                                                        <td className='px-4 py-2'>1 year ago</td>
                                                        <td className='px-4 py-2'>
                                                            <button className='px-4 py-1 text-black border border-black rounded-md bg-white'>Download</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
