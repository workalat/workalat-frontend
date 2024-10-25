'use client'
import SideNav from "@/components/sideNav";
import { ticketsData } from "@/utils/TicketsData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { formatDateTime } from "@/utils/helper";
import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useSnackbar } from "@/context/snackbar_context";

export default function CreateSupportTicket() {
    // here tickets data will be dynamically from the backend. for now i using "import { ticketsData } from "@/utils/TicketsData";" as a demo tickets data. and here also will be post operation for create ticket


    const [isClientDashboard, setIsClientDashboard] = useState<boolean>(false);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    let {  createTicket } = useUserContext();
     // State to hold the projects fetched from the backend
     const [projects, setProjects] = useState([
        {
            serviceTitle : "Other",
            _id : "0"
        },
     ]);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    let [userData,setUserData] = useState({});
    // loading
    const [loading2, setLoading2] = useState(true);
    let router = useRouter();

    let [ticketData, setTicketData] = useState({
        department  : "finance",
        subject     : "",
        relatedProject : "",
        relatedProjectId    : "",
        createdBy      : "",
        creatorId   : "",
        creatorName : "",
        ticketStatus : "customer",
        message : ""
    })
  
  
    const { generateSnackbar } = useSnackbar();


      // Helper function to capitalize project name
        const capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };


    const pathname = usePathname();

    useEffect(() => {

        if (pathname === "/client/dashboard" || pathname.startsWith("/client/dashboard/")) {
            setIsClientDashboard(true);
        } else if (pathname === "/professional/dashboard" || pathname.startsWith("/professional/dashboard/")) {
            setIsClientDashboard(false);
        }
    }, [pathname]);

    
  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token : any  = Cookies.get("token");
        let ver : any  = await VerifyUser(token, "client");
        if(ver?.status === "success"){
          setUserData(ver);
          let find : any = sessionStorage.getItem('projectData')
          const storedData : any = JSON.parse(find);
          setProjects([...storedData,...projects])
          setTicketData({
            ...ticketData,
            ["createdBy"] : ver.userType,
            ["creatorId"] : ver.userId,
            ["creatorName"] : ver.userName
          })
        }
        else{
          router.push("/"); 
        }
      }
      catch(e){
        router.push("/client/dashboard/support-tickets"); 
        generateSnackbar("Some Error Occur, Please try Again." ,"error")
      }
    };
    verify();
  }, []);


      // Function to handle the selection of a project
      const handleProjectChange = (e) => {
        const selectedProjectName = e.target.value.toLowerCase(); // Ensure project name is in lowercase
        
        // Find the selected project based on the project name (in lowercase)
        const selectedProject = projects.find(proj => proj.serviceTitle.toLowerCase() === selectedProjectName);
        
        // Update the ticketData with the selected project name and ID
        setTicketData({
            ...ticketData,
            relatedProject: selectedProject.serviceTitle.toLowerCase(), // Store project name in lowercase
            relatedProjectId: selectedProject._id // Store project ID
        });
    };


  async function handleCreateTicket(e){
    try{
        e.preventDefault();
        if(!ticketData.subject || !ticketData.relatedProject || !ticketData.creatorId || !ticketData.message){
            generateSnackbar( "Please fill all the Required Field." ,"error")
        }
        else{
            let res = await createTicket({
            department : ticketData.department,
            subject : ticketData.subject,
            relatedProject : ticketData.relatedProject,
            relatedProjectId : ticketData.relatedProjectId,
            createdBy : ticketData.createdBy,
            creatorId : ticketData.creatorId,
            ticketStatus : ticketData.ticketStatus,
            message : ticketData.message
        });
        if(res.status !== 400 || res.data?.status === "success"){
            generateSnackbar("Ticket Created Successfully.", "success");
            router.push("/client/dashboard/support-tickets");
        }
        else{
            generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
        }     
        }
        

    }
    catch(e){
        generateSnackbar("Some Error Occur, Please try Again." ,"error")
    }
  }


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
                        <h4 className="text-[20px] font-bold">Support Tickets</h4>

                        {/* header */}
                        <div className="flex justify-between items-center pt-5">
                            <h4 className="font-bold text-[20px]">{ticketsData?.length} Records</h4>
                            {/* users type selector */}
                            <div className="flex justify-end gap-4">
                                <Link href={isClientDashboard ? "/client/dashboard/support-tickets" : "/professional/dashboard/support-tickets"} className="bg-transparent flex items-center justify-center text-[15px] py-2 font-semibold rounded-md px-8 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer">All</Link>

                                <Link href={isClientDashboard ? "/client/dashboard/support-tickets/create-tickets" : "/professional/dashboard/support-tickets/create-tickets"} className="flex gap-2 justify-center items-center px-4 py-3 rounded-md bg-[#07242B] text-white text-[15px] font-semibold">Open New Ticket<FaArrowRight className="size-3" /></Link>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-black mt-5"></div>

                        {/* ticket creator form */}

                        <form>
                            <div className='pt-5'>
                                <h1 className='font-bold text-[20px]'>Create New Ticket</h1>
                                <div className='pt-5'>
                                    <label htmlFor="department" className="block font-semibold">Department</label>
                                    <select name="department" value={ticketData.department} onChange={(e)=>{setTicketData({...ticketData, ["department"] : e.target.value})}} id="department" className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' defaultValue="select">
                                        <option value="finance" selected>Finance</option>
                                        <option value="technical">Technical</option>
                                    </select>
                                </div>
                            </div>
                            <div className='pt-5'>
                                <label htmlFor="subject" className="block font-semibold">Subject</label>
                                <input type="subject" name="subject" value={ticketData.subject} onChange={(e)=>{setTicketData({...ticketData, ["subject"] : e.target.value})}}  id='subject' className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' required />
                            </div>
                            {/* <div className='pt-5'>
                                <label htmlFor="relatedProject" className="block font-semibold">Related Project</label>
                                <select   name="relatedProject" value={ticketData.relatedProject} onChange={(e)=>{setTicketData({...ticketData, ["relatedProject"] : e.target.value})}} id="relatedProject" className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none' defaultValue="select">
                                    <option value="select" disabled >Select your option</option>
                                    <option value="department-1">Project-1</option>
                                    <option value="department-1">Project-2</option>

                                </select>
                            </div> */}
                              <div className='pt-5'>
                                <label htmlFor="relatedProject" className="block font-semibold">Related Project</label>
                                
                                <select
                                    name="relatedProject"
                                    value={ticketData.relatedProject} // Now using relatedProject (lowercase name) for the value
                                    onChange={handleProjectChange} // Updated change handler
                                    id="relatedProject"
                                    className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none'
                                >
                                    <option value="" disabled>Select your option</option>
                                    {/* Dynamically rendering project options with capitalized names */}
                                    {projects.map((project) => (
                                        <option key={project._id} value={project.serviceTitle.toLowerCase()}>
                                            {capitalize(project.serviceTitle)} {/* Display capitalized project name */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='py-5'>
                                <label htmlFor="sms" className="block font-semibold">Describe Ticket Issue</label>
                                <textarea name="message" id="message" value={ticketData.message} onChange={(e)=>{setTicketData({...ticketData, ["message"] : e.target.value})}} className='w-full px-2 py-2 ring-[1px] ring-gray-500 focus:ring-none rounded mt-2 outline-none h-28'></textarea>
                            </div>
                            <button className='bg-[#07242B] py-4 px-5 gap-3 rounded-md text-white font-semibold flex items-center justify-center' onClick={handleCreateTicket}>Create Ticket
                                <FaArrowRight className="size-3" /></button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
