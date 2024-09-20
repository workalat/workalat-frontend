"use client"

import { ticketsData } from "@/utils/TicketsData";
import { useEffect, useState } from "react"
import Menus from "../Menus/Menus";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

type PropsType = {
    path: any
}
export default function ViewSupportTickets({ path }: PropsType) {
    // here tickets data will be dynamically from the backend. for now i using "import { ticketsData } from "@/utils/TicketsData";" as a demo tickets data

    const [filteredTicketsData, setFilteredTicketsData] = useState<any>();

    useEffect(() => {
        const data = ticketsData;
        const filteredData = data?.find((ticket: any) => ticket?.id == path);
        if (filteredData) {
            setFilteredTicketsData(filteredData);
        }
    }, [path]);


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-stone-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>

            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">
                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Viewing Support Ticket</h4>

                {/* ticket details */}
                <div className="bg-[#07242B] rounded-md px-4 py-2 mt-5">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <h4 className="text-[20px] text-white font-semibold py-2 tracking-wide">Ticket Details</h4>
                            <button className="bg-[#FFBE00] text-black px-4 capitalize py-1 rounded text-[12px] xl:text-[15px] font-bold">Waiting on customer</button>
                        </div>

                        <div className="relative inline-flex items-center justify-center gap-3">
                            {/* Label */}
                            <label
                                htmlFor="change"
                                className="block text-white font-bold text-lg cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                Change Status
                            </label>

                            {/* Custom Dropdown Button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    className="bg-white rounded-lg p-1 shadow-md"
                                    onClick={toggleDropdown}
                                >
                                    <IoMdArrowDropdown className="text-[#FFBE00] text-2xl" />
                                </button>

                                {/* Dropdown Options */}
                                {isOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 overflow-hidden bg-[#F0F0F0] shadow-lg rounded-xl py-1 z-10">
                                        <ul className="text-left overflow-hidden">
                                            <li
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    console.log("Awaiting customer selected");
                                                }}
                                            >
                                                Awaiting customer
                                            </li>
                                            <li
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    console.log("Closed selected");
                                                }}
                                            >
                                                Closed
                                            </li>
                                            <li
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    console.log("Open selected");
                                                }}
                                            >
                                                Open
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* Hidden Select Element */}
                                <select
                                    name="changeStatus"
                                    id="change"
                                    className="hidden" // Hide the select element
                                >
                                    <option value="waiting">Awaiting customer</option>
                                    <option value="closed">Closed</option>
                                    <option value="open">Open</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="pt-3 pb-2 gap-2 md:gap-0 flex flex-wrap justify-between">
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Subject</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{filteredTicketsData?.subject}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Ticket ID</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{filteredTicketsData?.ticketId}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Department</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{filteredTicketsData?.department}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Related project</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{filteredTicketsData?.relatedProject}</p>
                        </div>
                    </div>
                </div>

                {/* here is post method for post ticket reply also will be dynamic with backend operation*/}

                <div className="pt-5 pb-2">
                    <h4 className="text-[17px] font-bold tracking-wide pb-3">Post Ticket Reply</h4>

                    <form className="w-full px-3 py-3 border border-black/50 rounded-md bg-white">
                        <textarea name="post" className="w-full border-none outline-none bg-[#E3E3E3] px-3 py-2 text-[17px] h-[150px] rounded-md tracking-wide" placeholder="Please reply ticket here"></textarea>

                        <button className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] mt-3 font-semibold">Post reply <FaArrowRight className="size-3" /></button>
                    </form>
                </div>


                {/* ticket chat need to dynamic it need to post method with backend for question and answer */}

                <div className="w-full pt-5">
                    <div className="py-2 border-b border-black/30">
                        {
                            filteredTicketsData?.messages && <div>
                                <p className="text-[15px] font-bold capitalize">{filteredTicketsData?.messages?.answer?.sender} (<span className="lowercase">{filteredTicketsData?.messages?.answer?.senderEmail}</span>) <span className="text-[12px] font-normal">on {filteredTicketsData?.messages?.answer?.sendDate} (<span className="text-[#FFBE00] capitalize">{filteredTicketsData?.messages?.answer?.project}</span>)</span></p>

                                {filteredTicketsData?.messages?.answer?.reply?.map((msg: any, i: number) => <p className="text-[15px] py-2 text-[#07242B]" key={i}>{msg}</p>)}

                                <p className="pt-4">{filteredTicketsData?.messages?.answer?.sender}</p>
                                <p className="pt-0">{filteredTicketsData?.messages?.answer?.designation}</p>
                                <p className="pt-0">{filteredTicketsData?.messages?.answer?.subject}</p>
                                <p className="pt-0">{filteredTicketsData?.messages?.answer?.websiteLink}</p>
                            </div>
                        }
                    </div>

                    <div className="pb-2 pt-4 border-b border-black/30">
                        {
                            filteredTicketsData?.messages && <div>
                                <p className="text-[15px] font-bold capitalize">{filteredTicketsData?.firstName} {filteredTicketsData?.lastName} <span className="text-[12px] font-normal">on {filteredTicketsData?.messages?.question?.sendDate} (<span className="text-[#FFBE00] capitalize">{filteredTicketsData?.messages?.question?.project}</span>)</span></p>

                                {filteredTicketsData?.messages?.question?.msg?.map((msg: any, i: number) => <p className="text-[15px] py-2 text-[#07242B]" key={i}>{msg}</p>)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
