"use client"

import { ticketsData } from "@/utils/TicketsData";
import { useEffect, useState } from "react"
import Menus from "../Menus/Menus";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

import { useParams, useRouter } from "next/navigation";
import moment from "moment"; 
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';

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


    
    // loading
    const [loading2, setLoading2] = useState(true);
    let router : any = useRouter();
    let { findSingleTicket, respondTicket, changeStatusTicket } : any = useUserContext();
    let [ticketData, setTicketData] : any = useState({});
    let [allTicketMessages, setAllTicketMessages] : any = useState([]);
    let [ticketMessages, setTicketMessages] : any = useState("")
    const { generateSnackbar } : any = useSnackbar();

    let params = useParams();
    
    useEffect(() => {
        async function getTicketData(){
            try{
                setLoading2(true);
              let res : any = await findSingleTicket({ticketId : params.id});
              if(res?.status !== 400 || res?.data?.status === 'success'){
              setTicketData(res?.data?.data);
              setAllTicketMessages(res?.data?.data?.ticketMessages.reverse());
              setLoading2(false);
              }
              else{
                  generateSnackbar(res?.response?.data?.message || "Some Error Occur, Please try Again.", "error")
                  router.push("/admin/support-tickets")
              }
            }
            catch(e){
                generateSnackbar("Some Error occurr, please try again", "error")
            }
        }
        getTicketData();
    }, [params.id]);



    async function handleReplyTicket(e){
        try{
            e.preventDefault();
            if(!ticketMessages){
                generateSnackbar("Please Type your Reply.", "error")
            }
            else{
                let res = await respondTicket({
                    ticketId : params?.id,
                    userId : "66f2e90c50951ee2a1228555",
                    userType : "admin",
                    ticketStatus : "admin",
                    userMessage : ticketMessages,
                });
                if(res.status !== 400 || res.data?.status === 'success'){
                    let message = {
                        messageTimeStamp : Date.now(),
                        message_email : "",
                        message_name : "Md Azam",
                        ticketMessages : ticketMessages,
                        userType : "admin",
                        userId : "ticketMessages"
                    }
                    setAllTicketMessages([message,...allTicketMessages]);
                    setTicketMessages("");
                    }
                    else{
                        generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again.", "error")
                    }
            }
        }
        catch(e){
            generateSnackbar("Some Error occurr, please try again", "error")
        }
    }

    async function changeStatus(type){
        try{
                let res = await changeStatusTicket({
                    ticketId : params.id,
                    newStatus : type
                });
                if(res?.status === 200 || res?.data?.status === 'success'){
                    generateSnackbar(res?.data?.message, "success");
                    setTicketData({...ticketData, ticketStatus : type});
                    window.location.reload();
                    }
                    else{
                        generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again.", "error")
                    }
            
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Some Error occurr, please try again", "error")
        }
    }

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
                            <button className="bg-[#FFBE00] text-black px-4 capitalize py-1 rounded text-[12px] xl:text-[15px] font-bold"> {ticketData?.ticketStatus == "closed" ? <span>Closed</span> : <span>Waiting on {ticketData?.ticketStatus}</span> } </button>
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
                                                    changeStatus("customer");
                                                }}
                                            >
                                                Awaiting customer
                                            </li>
                                            <li
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    changeStatus("closed");
                                                }}
                                            >
                                                Closed
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
                                    <option value="customer">Awaiting customer</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="pt-3 pb-2 gap-2 md:gap-0 flex flex-wrap justify-between">
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Subject</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{ticketData?.ticketSubject}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Ticket ID</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{ticketData?.ticketNumber}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Department</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{ticketData?.ticketDepartment}</p>
                        </div>
                        <div className="w-[48%] md:w-auto">
                            <h5 className="text-[20px] font-semibold tracking-wide text-white">Related project</h5>
                            <p className="capitalize text-[15px] text-white font-semibold tracking-wide leading-[1.5]">{(ticketData?.ticketRelatedProject) ? `${ticketData?.ticketRelatedProject.slice(0,25)}...` : "Not Project"}</p>
                        </div>
                    </div>
                </div>

                {/* here is post method for post ticket reply also will be dynamic with backend operation*/}

                { ticketData?.ticketStatus !== "closed" &&
                    
                    <div className="pt-5 pb-2">
                    <h4 className="text-[17px] font-bold tracking-wide pb-3">Post Ticket Reply</h4>

                    <form className="w-full px-3 py-3 border border-black/50 rounded-md bg-white">
                        <textarea name="post" value={ticketMessages} onChange={(e)=>{setTicketMessages(e.target.value)}} className="w-full border-none outline-none bg-[#E3E3E3] px-3 py-2 text-[17px] h-[150px] rounded-md tracking-wide" placeholder="Please reply ticket here"></textarea>

                        <button className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] mt-3 font-semibold" onClick={handleReplyTicket}>Post reply <FaArrowRight className="size-3" /></button>
                    </form>
                    </div>

                }


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
                                    allTicketMessages?.length > 0 && 
                                    <div>
                                            {
                                                allTicketMessages?.map((val, i)=>{
                                                    return(
                                                        <div className="pb-2 pt-4 border-b border-black/30" key={i}>
                                                            <p className="text-[15px] font-bold capitalize">{val.message_name} <span className="normal-case">{(val.message_email)}</span> <span className="text-[12px] font-normal">on {moment(val.messageTimeStamp).format('MMMM DD, YYYY hh:mm A')} <span className="text-[#FFBE00]">{(val.message_email)  ? "(WorkAlat Staff)" : ""}</span></span></p>
                                                            <p className="text-[15px] py-2 text-[#07242B]">{val.ticketMessages}</p>
                                                        </div>
                                                    )

                                                })
                                            }
                                    </div>
                                }
                    </div>
                </div>
            </div>
        </div>
    )
}
