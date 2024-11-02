"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import { Typography } from "@mui/material";

export default function ProjectDetails({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);



    

    
  const [loading2, setLoading2]   : any  = useState(true);
  let router   : any  = useRouter();
  let { singleProjectDetails}   : any  = useUserContext();
  const { generateSnackbar }   : any  = useSnackbar();
  let [data, setData]   : any  = useState({});
  let [userData, setUserData]  : any  = useState({});

    
  useEffect(()=>{
    async function getUser(){
        try{
            let projectId  : any  = await params.id;
            setLoading2(true);
            let token  : any  = Cookies.get("token"); 
                let ver  : any  = await VerifyUser(token, "client");
                if(ver?.status === "success" && ver?.userType === "client"){
                    setUserData(ver);
                    let res  : any  = await singleProjectDetails({userId   : ver.userId, userType: ver.userType ,projectId : projectId, need : "details"});
                    if(res?.status !== 400 || res?.data?.status == "success"){
                        setData(res?.data?.data);
                        setLoading2(false);
                    }
                    else{
                        generateSnackbar("Some error occure, Please Try Again.", "error");
                        router.push("/client/my-projects/")
                    }
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

    return (
        <>
        {
            loading2 ? (
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
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"details"} data={data} params={params.id} />
            <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6">
                <div className="pb-12">
                    <div className="flex flex-col-reverse lg:flex-row justify-between gap-3">
                        <div className="w-full lg:w-2/3 xl:w-3/4 border border-black/20 px-3 py-5">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-bold text-[#E88B00]">Details</h4>
                                <h4 className="text-xl font-bold text-[#E88B00]">£{data?.projectPrice}</h4>
                            </div>
                            <p className="text-md leading-[1.4] py-3 capitalize">{data?.projectTitle}</p>
                            <p className="text-black text-md font-bold pb-4">Project overview:</p>
                            <Typography className='py-2 text-md capitalize' variant="body1"  dangerouslySetInnerHTML={{ __html: `${DOMPurify.sanitize(data?.projectDes)}` }} />
                            <div className="px-2">
                                {
                                    data?.projectQuestions?.map((overview  : any , i: number) => {
                                        return(
                                            <>        
                                                <p className="flex items-center gap-2 leading-8 font-bold capitalize" key={i}> {overview.questionTitle}</p>
                                                    {(overview?.answer.length>0)  && overview?.answer?.map((val, i)=>{
                                                        return(
                                                            <>
                                                            <p className="flex items-center gap-2 leading-8 list-none capitalize " key={i}> {val}
                                                            </p>
                                                            </>
                                                        )
                                                    })}
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <p className="text-lg px-2 py-3 font-bold text-[#E88B00]">Project ID: {params.id}</p>
                        </div>
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                        {
                            (data?.awardedStatus === "awarded" || data?.professionalDetails?.length > 0 )
                            
                            ?
                            <>
                            <div className="w-full m-2 bg-[#F3F3F3] rounded-md p-6">
                                <h5>Discuss the project details with <span className="capitalize font-bold">{data?.professionalDetails[0]?.professionalCompanyName.length>0 ? data?.professionalDetails[0]?.professionalCompanyName :   data?.professionalDetails[0]?.professionalFullName}</span></h5>

                                <div className="flex pt-3 items-center">
                                    <img className="w-12 h-12 object-cover" src={data?.professionalDetails[0]?.professionalPictureLink} alt="work alat" />
                                    <div className="px-2">
                                        <p className="text-sm font-bold capitalize">{data?.professionalDetails[0]?.professionalCompanyName.length>0 ? data?.professionalDetails[0]?.professionalCompanyName :   data?.professionalDetails[0]?.professionalFullName}</p>
                                        <Link href={`/client/chat/${data?.professionalDetails[0]?.professionalChatId}`} className="text-sm text-black px-3 rounded-md mt-1 py-1 font-semibold bg-[#FFBE00]">Chat</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 px-2 w-full">
                                <Link className="text-[15px] flex items-center justify-center px-[10px] py-3 text-black gap-1 bg-[#FFBE00] rounded-md" href={`/client/my-projects/`}><IoArrowBackSharp className="size-[15px] text-black" /> My Projects</Link>
                                <Link className="text-[15px] flex items-center justify-center px-[10px] py-3 text-white gap-1 bg-[#07242B] rounded-md" href={`/client/my-projects/proposal/${params.id}`}>View Proposals <IoArrowForwardSharp className="size-[15px] text-white" /></Link>
                            </div>
                            
                            </>
                            :
                            
                            <>
                            
                            </>
                        }

                            


                        </div>
                    </div>
                </div>
            </div>
        </div>
                </>
            )
        }
        </>
       
    )
}
