"use client"

import { ticketsData } from "@/utils/TicketsData";
import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa6";

import MenuIcon from "@mui/icons-material/Menu";
import SideNav from "@/components/sideNav";

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


    const [isClientDashboard, setIsClientDashboard] = useState<boolean>(false);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };


    return (
        <div>
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button
                    className="bg-main text-white p-2 rounded-full shadow-lg"
                    onClick={toggleSideNav}
                >
                    <MenuIcon />
                </button>
            </div>
            <div
                className={`fixed inset-0 z-40 transform ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
            >
                <SideNav key={"side-mobile"} isClientDashboard={isClientDashboard} setIsClientDashboard={setIsClientDashboard} />
            </div>
            <section className="w-full max-w-full mx-auto bg-[url('/images/bg_pattern_5.svg')] bg-left-top bg-no-repeat py-4 mb-6">
                <div className="mt-6 container mx-auto max-w-7xl px-6 flex flex-col md:flex-row">
                    <section className="md:max-w-[400px] md:block hidden">
                        <SideNav key={"side-desktop"} isClientDashboard={isClientDashboard} setIsClientDashboard={setIsClientDashboard} />
                    </section>


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
            </section>
        </div>
    )
}
