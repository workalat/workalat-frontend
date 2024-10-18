'use client'

import { projectsData } from "@/utils/projectClientsData"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GoDotFill } from "react-icons/go"
import { IoArrowForward, IoCloseCircleOutline } from "react-icons/io5"
import { MdArrowDropDown } from "react-icons/md"
import ProjectList from "../ProjectList/ProjectList"
import ReviewModal from "./ReviewModal/ReviewModal"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { IoMdArrowForward } from "react-icons/io"
import { useSnackbar } from "@/context/snackbar_context"
import { useUserContext } from "@/context/user_context"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import moment from "moment"

export default function ProjectAward() {
    

    
  const [loading2, setLoading2] = useState(true);
  let router = useRouter();
  let { allActiveProjectsClient, markAsAwardedClient } = useUserContext();
  const { generateSnackbar } = useSnackbar();
  let [allProjects, setAllProjects] = useState([]);

    const [activeStatusId, setActiveStatusId] = useState(null);

    const handleToggleStatus = (id: any) => {
        setActiveStatusId((prevId) => (prevId === id ? null : id));
    };


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>();
    let [userData, setUserData]= useState({});

    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const [rating, setRating] = useState(0);

    // Handle star click
    const handleClick = (index: number) => {
        setRating(index);
    };

  useEffect(()=>{
        async function getUser(){
            try{
                setLoading2(false);
                let token = Cookies.get("token");
                    let ver = await VerifyUser(token, "client");
                    if(ver.status === "success" && ver.userType === "client"){
                        setUserData(ver);
                        let res = await allActiveProjectsClient({clientId : ver.userId});
                        console.log(res);
                        if(res.status !== 400 || res.data?.status == "success"){
                            setAllProjects(res?.data?.data);
                        }
                        else{
                            generateSnackbar("Some error occure, Please Try Again.", "error")

                        }
                        setLoading2(false);
                    }
                    else{
                        router.push("/login");
                    }
            }
            catch(e){
                generateSnackbar("Some error occure, Please Try Again.", "error")
            }
        };
        getUser();
  }, [])


  async function markAsAwarded(clientId, projectId){
    console.log(clientId, projectId);
    try{
        let res = await markAsAwardedClient({clientId,projectId});
        console.log(res);

    }
    catch(e){
        generateSnackbar("Some error occure, Please Try Again.", "error")
    }
  }

    
    return (
        <>
            {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
                <>
                <div className="bg-white relative">
                        {/* Left Image */}
                        <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
                        {/* Right Image */}
                        <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

                        {/* Content */}
                        <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                            <div className="pb-12">
                                <h3 className="text-2xl font-bold text-[#07242B]">My Projectt</h3>
                                <Link className="text-xs text-[#FFBE00] underline underline-offset-4 font-bold" href={"/client/project-history"}>View Project History</Link>

                                {/* projects */}
                                <div className="pt-5">
                                    {
                                        allProjects?.map((data: any, i: number) => (
                                            <div key={i} className="bg-white shadow-md border border-[#07242B66] p-8 w-full rounded-md mb-3 relative overflow-hidden">
                                                <p className={`text-[12px] text-black/50 ${data?.projectStatusClient === "awarded" ? "bg-[#04842F33]" : "bg-[#EA740E33]"} absolute left-3 top-3 font-semibold capitalize px-2 py-1 rounded-[20px] capitalize`}>{data?.projectStatusClient}</p>

                                                <h3 className="font-bold text-2xl text-center mt-6 sm:mt-0 capitalize">{data?.serviceNeeded} ({data?.serviceLocationTown} {data?.serviceLocationPostal} ) </h3>
                                                <p className="text-center text-[#07242B] text-sm mb-4 sm:mb-0">{moment(data?.projectTimeStamp).format('dddd, D MMMM')}</p>
                                                <p className="sm:text-[20px] text-[#323C47] text-justify sm:text-center md:px-8 xl:px-12">{data?.serviceDes.split(0, 210)}...</p>

                                                <div className="flex gap-5 gap-y-2 flex-col sm:flex-row justify-center pt-8 sm:pt-5">
                                                    <Link className="flex items-center justify-center font-bold px-5 text-[15px] py-4 text-black gap-1 bg-[#FFBE00]" href={`/client/my-projects/details/${data?._id}`}>
                                                        View Project Details
                                                        <IoArrowForward className="text-black size-[20px]" />
                                                    </Link>
                                                    <Link className="flex items-center justify-center font-bold px-5 text-[15px] py-4 text-white gap-1 bg-[#07242B]" href={`/client/my-projects/proposal/${data?._id}`}>
                                                        View Proposals
                                                        <IoArrowForward className="text-white size-[20px]" />
                                                    </Link>
                                                </div>



                                                {/* for marking, it will be connect with backend */}

                                                {/* Button to open/close the dropdown */}
                                                <button
                                                    onClick={() => handleToggleStatus(data?._id)}
                                                    className="flex gap-1 items-center justify-center text-black font-bold absolute right-3 top-3"
                                                >
                                                    Status <MdArrowDropDown className="size-[20px]" />
                                                </button>

                                                {/* Dropdown */}
                                                <div
                                                    className={`ring-1 absolute right-3 top-10 flex flex-col shadow-lg rounded-lg ring-black/50 overflow-hidden justify-start ${activeStatusId === data?._id ? "visible" : "invisible"
                                                        }`}
                                                >
                                                    {
                                                        (data?.projectStatus === "cancelled" || data?.projectStatus === "completed")
                                                        ?
                                                        
                                                        <>

                                                        </>
                                                        :
                                                        (data?.awardedStatus === "awarded")

                                                        ?
                                                        <button onClick={() => openModal(data)} className="border-y border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                                                            <GoDotFill className="size-[15px] text-black" />
                                                            Mark as completed
                                                        </button>
                                                        :
                                                        <>
                                                    <button className="border-none border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start" onClick={()=>{markAsAwarded(userData.userId,data?._id )}}>
                                                    <GoDotFill className="size-[15px] text-black" />
                                                    Mark as awarded
                                                    </button>
                                                    <button className="border-none border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                                                        <GoDotFill className="size-[15px] text-black" />
                                                        Cancel project
                                                    </button>
                                                        </>
                                                    }
                                                    {/* <button className="border-none border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                                                        <GoDotFill className="size-[15px] text-black" />
                                                        Mark as awarded
                                                    </button>
                                                    <button onClick={() => openModal(data)} className="border-y border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                                                        <GoDotFill className="size-[15px] text-black" />
                                                        Mark as completed
                                                    </button>
                                                    <button className="border-none border-black/40 py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                                                        <GoDotFill className="size-[15px] text-black" />
                                                        Cancel project
                                                    </button> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* <ProjectList /> */}
                            </div>

                            {/* modal */}
                            {modalData && (
                                <ReviewModal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    content={
                                        <div className="w-full max-h-[80vh] overflow-y-auto">
                                            <div className="bg-white w-full h-auto sm:w-[520px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                                <button className="ms-auto block" onClick={closeModal}>
                                                    <IoCloseCircleOutline className="size-[20px]" />
                                                </button>
                                                <div className="w-full text-center">
                                                    <h4 className="font-semibold text-[20px] capitalize">Leave a Review</h4>
                                                    <p className="mt-4 sm:mt-0">Project Title: <br className="block sm:hidden" /> <strong>{modalData?.title}</strong></p>

                                                    <div className="flex items-center justify-center py-3">
                                                        <img className="w-14 h-14 object-cover" src={modalData?.userDetails?.profilePhoto} alt="work alat" />
                                                        <p className="text-sm font-bold capitalize px-2">{modalData?.userDetails?.user}</p>

                                                        <div className="flex items-center">
                                                            {[1, 2, 3, 4, 5].map((index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleClick(index)}
                                                                    className="text-yellow-400"
                                                                >
                                                                    {rating >= index ? (
                                                                        <AiFillStar size={20} />
                                                                    ) : (
                                                                        <AiOutlineStar size={20} />
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <form className="w-full text-start px-5">
                                                        <label className="block font-semibold text-sm" htmlFor="review">Leave Your Review</label>
                                                        <textarea name="review" id="review" className="border border-black/20 w-full mt-3 rounded-md shadow-lg p-2 h-[100px] outline-none"></textarea>

                                                        <button className="text-black flex items-center justify-center px-5 py-3 mt-4 mx-auto bg-[#FFBE00] font-semibold">Submit Review <IoMdArrowForward className="size-5 text-black" /></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </div>
                    </div>
                </>
            )
        }

        
        </>
        
    )
}
