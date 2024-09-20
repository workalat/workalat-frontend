'use client'

import Menus from "../Menus/Menus"
import { ticketsData } from "@/utils/TicketsData";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function CreateSupportTicket() {
    // here tickets data will be dynamically from the backend. for now i using "import { ticketsData } from "@/utils/TicketsData";" as a demo tickets data. and here also will be post operation for create ticket

    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>

            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">
                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Support Tickets</h4>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{ticketsData?.length} Records</h4>
                    {/* users type selector */}
                    <div className="flex justify-end gap-4">
                        <Link href={"/admin/support-tickets"} className="bg-transparent flex items-center justify-center text-[15px] py-2 font-semibold rounded-md px-8 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer">All</Link>

                        <Link href="/admin/support-tickets/create-tickets" className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] font-semibold">Open New Ticket<FaArrowRight className="size-3" /></Link>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-black mt-5"></div>

                {/* ticket creator form */}

                <form>
                    <div className='pt-5'>
                        <h1 className='font-bold text-[20px]'>Create New Ticket</h1>
                        <div className='pt-5'>
                            <label htmlFor="department" className="block font-semibold">Department</label>
                            <select name="department" id="department" className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' defaultValue="select">
                                <option value="select" disabled>Select your option</option>
                                <option value="department-1">Department-1</option>
                                <option value="department-2">Department-2</option>
                            </select>
                        </div>
                    </div>
                    <div className='pt-5'>
                        <label htmlFor="subject" className="block font-semibold">Subject</label>
                        <input type="subject" name="subject" id='subject' className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' required />
                    </div>
                    <div className='pt-5'>
                        <label htmlFor="relatedProject" className="block font-semibold">Related Project</label>
                        <select name="relatedProject" id="relatedProject" className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' defaultValue="select">
                            <option value="select" disabled>Select your option</option>
                            <option value="department-1">Project-1</option>
                            <option value="department-1">Project-2</option>

                        </select>
                    </div>
                    <div className='py-5'>
                        <label htmlFor="sms" className="block font-semibold">Describe Ticket Issue</label>
                        <textarea name="sms" id="sms" className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none h-28'></textarea>
                    </div>
                    <button className='bg-[#07242B] py-4 px-5 gap-3 rounded-md text-white font-semibold flex items-center justify-center'>Create Ticket
                        <FaArrowRight className="size-3" /></button>
                </form>
            </div>
        </div>
    )
}
