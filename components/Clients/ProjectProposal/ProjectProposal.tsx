"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { useState } from "react";
import { AiFillCloseSquare, AiOutlineClose } from "react-icons/ai";
import { IoCheckmarkSharp, IoFilter } from "react-icons/io5";
import Link from "next/link";
import AwardModal from "./AwardModal/AwardModal";
import { BsCurrencyPound } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import CompositionLoader from "@/utils/CompositionLoader";
import { IoMdArrowForward } from "react-icons/io";

export default function ProjectProposal({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);

    const [selectedRating, setSelectedRating] = useState(0);

    const handleSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleDeselectAll = () => {
        setSelectedRating(0);
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>();
    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const [awardSending, setAwardSending] = useState<boolean>(false);
    const [awardSent, setAwardSent] = useState<boolean>(false);

    const awardHandler = (e: any) => {
        e.preventDefault();
        setAwardSending(true);

        // Simulate sending message for 2 seconds for demo but it will dynamically with backend in real time
        setTimeout(() => {
            setAwardSending(false);
            setAwardSent(true);
        }, 2000); // 2 seconds i set as demo for now
    };

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
                            <div className="flex items-end gap-2 flex-col lg:flex-row p-4 my-2 shadow bg-[#F3F3F3]" key={i}>
                                <div className="w-full lg:w-3/4">
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
                                <div className="w-full lg:w-1/4">
                                    <div className="flex justify-center gap-2">
                                        <Link href="/client/chat" className="px-3 py-1 rounded-md font-semibold text-black bg-[#FFBE00]">Chat</Link>
                                        <button onClick={() => openModal(data)} className="px-3 py-1 rounded-md font-semibold text-white bg-[#07242B]">Award</button>
                                    </div>

                                    <div className="flex items-center justify-center pt-3 space-x-4">
                                        {/* Close Button */}
                                        <button
                                            onClick={handleDeselectAll}
                                            className="p-1 bg-gray-900 text-white rounded-md"
                                        >
                                            <AiOutlineClose size={12} />
                                        </button>

                                        {/* Rating Checkboxes */}
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => handleSelect(num)}
                                                    className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${selectedRating >= num ? 'bg-green-500' : 'bg-[#ACACAC]'
                                                        }`}
                                                >
                                                    <IoCheckmarkSharp className="size-[15px] text-white" />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Filter Icon */}
                                        <div>
                                            <IoFilter className="size-[22px] text-[#07242B]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {isModalOpen && modalData && (
                    <AwardModal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        content={
                            <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                                <div className="bg-white w-full h-auto sm:w-[520px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                    <button className="ms-auto block" onClick={closeModal}>
                                        <AiFillCloseSquare className="size-[20px]" />
                                    </button>
                                    <div className="w-full text-center">
                                        <div className="pt-4">
                                            <div className="text-center">
                                                <h4 className="font-semibold uppercase text-[17px]">Award Project</h4>
                                                <p className="py-2 capitalize">Award <b>{modalData?.userDetails?.user}</b> the <b>{dynamicData?.title}</b></p>
                                            </div>

                                            <div className="w-full h-full">
                                                <form onSubmit={awardHandler} className="w-full">
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="agreement" className="block pb-2 font-semibold">Agreement amount fee</label>
                                                        
                                                        <div className="flex bg-white items-center justify-between w-full ring-[1px] ring-gray-400 rounded-md px-3 outline-none border-none shadow-md">
                                                            <BsCurrencyPound className="size-5" />
                                                            <input min={0} type="number" id="agreement" name="agreement" className="w-auto flex-grow px-3 py-3 outline-none bg-transparent text-black border-none" placeholder="0" />
                                                            <MdEditSquare className="size-5" />
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-center pt-5">Disclaimer: All professionals on our platform are verified,</p>
                                                    <p className="text-sm text-center"> Please note that WorkAlat is not responsible for any loss of fund.</p>


                                                    <div className="py-2 text-start">
                                                        <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">Award Project <FaArrowRight className="size-[15px] text-black" /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                )}
            </div>



            {awardSending && (
                <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen z-[400] bg-black/50 flex items-center justify-center">
                    <div className="w-10/12 sm:w-[450px] bg-white py-12 rounded-md">
                        <div className="flex items-center justify-center">
                            <CompositionLoader />
                        </div>
                        <h4 className="text-center text-[24px] font-semibold tracking-wider">
                            Sending Award
                        </h4>
                    </div>
                </div>
            )}

            {awardSent && (
                <div className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen z-[400] bg-black/50 flex items-center justify-center">
                    <div className="w-10/12 sm:w-[550px] bg-white py-12 rounded-md">
                        <div className="flex items-center justify-center">
                            <img className="w-[100px]" src="/successMessage.png" alt="work alat" />
                        </div>
                        <h4 className="text-center text-[24px] font-semibold tracking-wider py-2">
                            Done
                        </h4>
                        <p className="text-center text-md pb-4 px-5">We are waiting for Anita Baker to accept the awarded project</p>
                        <Link href={`/client/my-projects/proposal/${dynamicData?.projectId}`} onClick={() => {
                            window.location.reload()
                        }} className="flex items-center bg-[#FFBE00] px-5 py-2 w-8/12 mx-auto justify-center gap-3">
                            Project Dashboard <IoMdArrowForward className="size-[15px] text-black" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
