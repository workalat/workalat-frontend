'use client'

import { ticketsData } from "@/utils/TicketsData";
import { useEffect, useState } from "react";
import { RiCloseFill, RiRefreshLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import SideNav from "@/components/sideNav";
import { usePathname } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";

import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser'; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import moment from "moment";

export default function SupportTickets() {

    // here tickets data will be dynamically from the backend. for now i using "import { ticketsData } from "@/utils/TicketsData";" as a demo tickets data

    // States for user data, filtering
    const [userType, setUserType] : any = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] : any = useState(ticketsData); // Filtered data

    let [userData,setUserData] : any = useState({});
    let [allTicketData, setAllTicketData] : any = useState([]);

    // loading
    const [loading2, setLoading2] : any = useState(true);
    let { findAllTickets } : any = useUserContext();
  
  
    const { generateSnackbar } : any = useSnackbar();
  

    // Filter users based on selected user type
    useEffect(() => {
        let result = ticketsData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user: any) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);

    const pathname = usePathname();

    const [isClientDashboard, setIsClientDashboard] = useState<boolean>(false);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    useEffect(() => {

        if (pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/")) {
            setIsClientDashboard(true);
        } else if (pathname === "/professional/dashboard" || pathname.startsWith("/professional/dashboard/")) {
            setIsClientDashboard(false);
        }
    }, [pathname]);

    const router = useRouter();





    useEffect(() => {
        async function verify(){
          try{
            setLoading2(true);
            let token : any = Cookies.get("token");
            let ver : any = await VerifyUser(token, "client");
            if(ver?.status === "success"){
              setUserData(ver);
              let res : any = await findAllTickets({userId :ver.userId, userType : ver.userType});
              if(res?.status !== 400 || res?.data?.status === "success"){
                    setAllTicketData(res?.data?.data);
                    sessionStorage.setItem('projectData', JSON.stringify(res?.data?.projectData));
                    setLoading2(false);
            }
            else{
                generateSnackbar(res?.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
            } 
            }
            else{
              router.push("/"); 
            }
          }
          catch(e){
            generateSnackbar("Some Error Occur, Please try Again." ,"error")
          }
        };
        verify();
      }, []);


    return (
        <>
        {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
                <>
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
                        <h4 className="text-[20px] font-bold">Support Tickets</h4>

                        {/* header */}
                        <div className="flex justify-between items-center pt-5">
                            <h4 className="font-bold text-[20px]">{allTicketData?.length} Records</h4>
                            {/* users type selector */}
                            {/* <select
                                name="users"
                                className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option className="bg-[#07242B] text-white" value="all">All</option>
                                <option className="bg-[#07242B] text-white" value="client">Client</option>
                                <option className="bg-[#07242B] text-white" value="professional">Professional</option>
                            </select> */}
                        </div>
                        <div className="h-[1px] w-full bg-black mt-5"></div>
                        <div className="py-2 w-full">
                            <div className='flex gap-4 justify-end items-center pb-[10px]'>
                                {/* button for refresh */}
                                <button onClick={() => window.location.reload()} className="flex justify-center items-center px-5 py-3 rounded-md bg-white text-[#07242B] border border-[#07242B] "><RiRefreshLine className="size-[15px]" /></button>
                                {/* open new ticket button */}
                                <Link href={isClientDashboard ? "/client/dashboard/support-tickets/create-tickets" : "/professional/dashboard/support-tickets/create-tickets"} className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] font-semibold">Open New Ticket<FaArrowRight className="size-3" /></Link>
                                {/* all tickets */}
                                <button className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-white text-[#07242B] border border-[#07242B] text-[15px] font-bold ">All Tickets<FaArrowRight className="size-3" /></button>
                            </div>
                        </div>

                        <div className="w-full pt-5">
                            <div className="overflow-auto h-[550px] hiddenScroll">
                                <table className="min-w-full bg-white">
                                    <thead className="py-2 border-b border-black/20 text-[15px]">
                                        <tr>
                                            <th className="p-4 text-left">Tickets</th>
                                            <th className="p-4 text-left">Related projects</th>
                                            <th className="p-4 text-left">Status</th>
                                            <th className="p-4 text-left">Last Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTicketData.map((user: any) => (
                                            <tr key={user?._id} className="border-b border-black/20">

                                                <td className="p-4">
                                                    <p className="text-gray-500 text-[15px] capitalize">{user?.ticketSubject} | {moment(user?.ticketTimeStamp).format('DD-MM-YYYY | HH:mm:ss')}</p>
                                                </td>
                                                <td className="p-4 text-[15px] capitalize">{user?.ticketRelatedProject}</td>
                                                <td className="p-4">
                                                    {/* this button will be connected with backend for some function or operation and it will dynamic */}
                                                    {
                                                        (user?.ticketStatus === "admin" && user?.ticketStatus !== "closed") ? <Link href={isClientDashboard ? `/client/dashboard/support-tickets/view/${user?._id}` : `/professional/dashboard/support-tickets/view/${user?._id}`} className="flex gap-2 justify-center items-center px-2 py-2 rounded-md bg-[#7A7A7A] text-white text-[15px] font-semibold w-[200px]"><RiCloseFill className="size-[15px] rounded-sm text-[#07242B] bg-white capitalize" />Waiting on  {user?.ticketStatus}</Link> : user?.status == "closed" && <button className="px-4 py-2 rounded-md bg-[#00A770] text-white text-[15px] font-semibold">Closed</button>
                                                    }
                                                </td>

                                                <td className="p-4 text-[15px] capitalize text-nowrap">{moment(user?.updatedAt).format('DD-MM-YYYY | HH:mm:ss')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
                </>

            )
        }

        
        </>
        
    )
}