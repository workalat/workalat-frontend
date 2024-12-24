"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import { Rating, Typography } from "@mui/material";
import axios from "axios";

export default function ProjectProposal({ params }: any) {
    const dynamicData = projectsData?.find((data  : any ) => data?.projectId == params?.id);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleDeselectAll = () => {
        setSelectedRating(0);
    };


    const [isModalOpen, setIsModalOpen]   : any = useState(false);
    let [confirmedPrice, setConfirmedPrice]   : any = useState(0);
    const [modalData, setModalData]   : any = useState<any>();
    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    
    const [loading2, setLoading2]   : any  = useState(true);
    let router   : any  = useRouter();
    let { singleProjectDetails, awardProject}   : any  = useUserContext();
    const { generateSnackbar }   : any  = useSnackbar();
    let [data, setData]   : any  = useState({});
    let [userData, setUserData]  : any  = useState({});
    
  const [currentPath, setCurrentPath]   : any  = useState("");

  
      


    useEffect(() => {
        setCurrentPath(window.location.pathname);
        getUser();
      }, []);


async function getUser(){
    try{
        let projectId = params.id;
        setLoading2(true);
        let token  : any  = Cookies.get("token");
            let ver  : any  = await VerifyUser(token, "professional");
            if(ver?.status === "success" && ver?.userType === "professional"){
                setUserData(ver);
                let res = await singleProjectDetails({userId   : ver?.userId, userType : ver?.userType ,projectId : projectId, need : "proposals"});
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


const [flag, setFlag] : any = useState("");
const fetchFlag = async (cnt) => {

    if (!cnt.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${cnt}`
      );

      const country = response.data[0]; // First matching country
      if (country && country.flags && country.flags.png) {
        setFlag(country.flags.png)
      } else {
        setFlag(null)
      }
    } catch (err) {
      setFlag(null)
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
                                    <Link href={`/professional/profile/${d?.professionalId}`} target="_blank"> 
                                        <img className="w-[60px] h-[60px] object-cover" src={d?.professionalPicture} alt="work alat" />
                                    </Link>
                                        <div className="px-2">
                                        <Link href={`/professional/profile/${d?.professionalId}`} target="_blank">
                                            <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center capitalize">{d?.professionalName} <span className="text-sm font-thin lowercase flex gap-0 items-center"><HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" /></span></h2>
                                            </Link>
                                            <div className="flex items-center gap-1">
                                                <div className="flex gap-1">
                                                   
                                                     <Rating precision={0.1} value={parseFloat(`${(d?.professionalTotalRatings / d?.professionalTotalReviews).toFixed(1) }`)} readOnly />
                                                            <Typography  className='text-sm' color="text.secondary" ml={1}>
                                                            { d?.professionalTotalReviews > 0 ?  (d?.professionalTotalRatings / d?.professionalTotalReviews).toFixed(1) : "0" }
                                                        </Typography>
                                                </div>
                                                <div className="flex gap-2 my-1">
                                                {
                                                fetchFlag(d?.professionalCountry) !== null &&
                                                <>
                                                <img 
                                                src={flag}
                                                alt=""
                                                className="w-[15px] h-[15px] object-cover rounded-sm"
                                                /> 
                                                </>
                                                }
                                                <span className="text-sm font-medium capitalize">{d?.professionalCountry}</span>
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
