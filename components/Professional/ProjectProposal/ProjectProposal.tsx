"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { AiFillCloseSquare, AiOutlineClose } from "react-icons/ai";
import { IoCheckmarkSharp, IoFilter } from "react-icons/io5";
import Link from "next/link";
import AwardModal from "./AwardModal/AwardModal";
import { BsCurrencyPound } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";
import CompositionLoader from "@/utils/CompositionLoader";
import { IoMdArrowForward } from "react-icons/io";

import { useUserContext } from "@/context/user_context";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import { Rating, Typography } from "@mui/material";

export default function ProjectProposal({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
    // console.log(params.id);
    // console.log(window.location.pathname);

    const [selectedRating, setSelectedRating] = useState(0);

    const handleSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleDeselectAll = () => {
        setSelectedRating(0);
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    let [confirmedPrice, setConfirmedPrice] = useState(0);
    const [modalData, setModalData] = useState<any>();
    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    
    const [loading2, setLoading2] = useState(true);
    let router = useRouter();
    let { singleProjectDetails, awardProject} = useUserContext();
    const { generateSnackbar } = useSnackbar();
    let [data, setData] = useState({});
    let [userData, setUserData]= useState({});
    
  const [currentPath, setCurrentPath] = useState("");

  
      

    const [awardSending, setAwardSending] = useState<boolean>(false);
    const [awardSent, setAwardSent] = useState<boolean>(false);

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        getUser();
      }, []);


async function getUser(){
    try{
        let projectId = params.id;
        console.log(projectId);
        console.log(window.location.pathname);
        setLoading2(true);
        let token = Cookies.get("token");
            let ver = await VerifyUser(token, "professional");
            if(ver.status === "success" && ver.userType === "professional"){
                setUserData(ver);
                let res = await singleProjectDetails({userId   : ver.userId, userType : ver.userType ,projectId : projectId, need : "proposals"});
                console.log(res);
                if(res.status !== 400 || res.data?.status == "success"){
                    setData(res?.data?.data); 
                    setLoading2(false);
                }
                else{
                    generateSnackbar("Some error occure, Please Try Again.", "error");
                    router.push("/professional/my-responses/")
                }
            }
            else{
                router.push("/professional/login");
            }
    }
    catch(e){
        generateSnackbar("Some error occure, Please Try Again.", "error")
    }
};
    return (
        <>
            {
                loading2 ? (
                    <div className="w-[100%] h-screen flex justify-center items-center">
                    <div className="loader m-auto" />
                    </div>
                )
                :(

                    <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"proposal"} data={data} />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="pb-12">
                    {
                        data?.proposals?.map((d: any, i: number) => (
                            <div className="flex items-end gap-2 flex-col lg:flex-row p-4 my-2 shadow bg-[#F3F3F3]" key={i}>
                                <div className="w-full lg:w-3/4">
                                    <div className="flex">
                                        <img className="w-[60px] h-[60px] object-cover" src={d?.professionalPicture} alt="work alat" />

                                        <div className="px-2">
                                            <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center capitalize">{d?.professionalName} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" /></span></h2>
                                            <div className="flex items-center gap-1">
                                                <div className="flex gap-1">
                                                   
                                                     <Rating precision={0.1} value={`${(d?.professionalTotalRatings / d?.professionalTotalReviews).toFixed(1) }`} readOnly />
                                                            <Typography  className='text-sm' color="text.secondary" ml={1}>
                                                            {(d?.professionalTotalRatings / d?.professionalTotalReviews).toFixed(1) }
                                                        </Typography>
                                                </div>
                                                <div className="capitalize flex items-center gap-0.5 px-2 text-[12px]"><img className="size-[13px]" src="/flag.png" alt="workalat" />
                                                    <p>United Kingdom</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold capitalize">Project title: {data?.serviceNeeded} ({(data?.serviceLocationTown) ? `${data?.serviceLocationTown}` : data?.serviceLocationPostal}) </p>
                                        </div>
                                    </div>
                                    <p className="leading-6 text-sm text-[#323C47] pt-3">{d?.proposal}</p>
                                </div>

                               
                            </div>
                        ))
                    }
                </div>
            </div>




        </div>

                )
            }
        
        </>
            )
}
