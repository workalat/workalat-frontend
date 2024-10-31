"use client"

import { projectsData } from "@/utils/projectClientsData"
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { IoArrowBackSharp, IoArrowForwardSharp, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser"
import MaskedEmail from "@/components/Admin/Dashboard/Leads/MaskedEmail";
import MaskedPhoneNumber from "@/components/Admin/Dashboard/Leads/MaskedPhoneNumber";
import DOMPurify from 'dompurify';
import { Typography } from "@mui/material";

export default function ProjectDetails({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);
    console.log(params);


    

    
  const [loading2, setLoading2]   : any  = useState(true);
  let router   : any  = useRouter();
  let { singleProjectDetails,professionlalAwardedChoice}   : any  = useUserContext();
  const { generateSnackbar }   : any  = useSnackbar();
  let [data, setData]   : any  = useState({});
  let [userData, setUserData]  : any  = useState({});

    
  useEffect(()=>{
    async function getUser(){
        try{
            let projectId  : any  = await params.id;
            setLoading2(true);
            let token = Cookies.get("token"); 
                let ver  : any  = await VerifyUser(token, "professional");
                if(ver?.status === "success" && ver?.userType === "professional"){
                    setUserData(ver);
                    let res = await singleProjectDetails({userId   : ver?.userId, userType: ver?.userType ,projectId : projectId, need : "details"});
                    // console.log(res);
                    if(res?.status !== 400 || res?.data?.status == "success"){
                        setData(res?.data?.data);
                        setLoading2(false);
                    }
                    else{
                        // generateSnackbar("Some error occure, Please Try Again.", "error");
                        router.push("/professional/my-responses")
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
    getUser();
}, []);




async function handleAcceptProject(choice  : any ){
    try{
        let task  : any  = await professionlalAwardedChoice({
            professionalId : userData.userId,
            projectId : params.id,
            choice
        });
        console.log(task);
        if(task?.status !== 400 || task?.data?.status === "success"){
            generateSnackbar(task?.data?.message || "Project Status Changed Successfully.", "success");
            router.refresh();
        }
        else{
            // generateSnackbar( task?.response?.data?.message || "Some Error Occured, Please Try Again.", "success");
            router.push("/professional/my-responses/")
        }
    }
    catch(e){
        console.log(e);
    }
}

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
                            {/* <p className="text-md leading-[1.4] py-3 capitalize">{data?.projectDes}</p> */}
                            <div className="px-2">
                                {
                                    data?.projectQuestions?.map((overview  : any , i: number) => {
                                        return(
                                            <>       
                                            {
                                                overview?.answer?.length>0 && <>
                                                
                                                <p className="flex capitalize items-center gap-2 leading-8 font-bold" key={i}> {overview.questionTitle}</p>
                                                    {overview?.answer?.map((val, i)=>{
                                                        return(
                                                            <>
                                                            <p className="flex items-center capitalize gap-2 leading-8 list-none " key={i}> {val}
                                                            </p>
                                                            </>
                                                        )
                                                    })}
                                                 </>
                                            } 
                                                
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <p className="text-lg px-2 py-3 font-bold text-[#E88B00]">Project ID: {params?.id}</p>
                        </div>

                                
                            <div className="w-full lg:w-1/3 xl:w-1/4 ">

                        {
                            (data?.awardedStatus === "awarded" || data?.clientDetails?.length > 0 )
                            ?
                            <>

                        <div className="w-full">
                            <div className="w-full bg-[#F3F3F3] rounded-md p-4">
                                <h5>Discuss the project details with <span className="capitalize font-bold">{data?.clientDetails[0]?.clientFullName}</span></h5>

                                <div className="flex pt-3 items-center">
                                    <img className="w-12 h-12 object-cover" src={data?.clientDetails[0]?.clientPictureLink} alt="work alat" />
                                    <div className="px-2">
                                        <p className="text-sm font-bold capitalize">{data?.clientDetails[0]?.clientFullName}</p>
                                        <Link href={`/professional/chat/${data?.clientDetails[0]?.clientChatId}`} className="text-sm text-black px-3 rounded-md mt-1 py-1 font-semibold bg-[#FFBE00]">Chat</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">

                                <div className="flex flex-col  justify-center gap-2 items-center my-2 w-full bg-[#F3F3F3] py-2 px-1 mx-auto">
                                    <div className="flex gap-1 overflow-hidden w-auto justify-start items-center">
                                        <div className="text-[13px]">
                                        <MaskedPhoneNumber phoneNumber={(data?.clientDetails[0]?.clientPhoneNo) ? `${data?.clientDetails[0]?.clientPhoneNo.slice(1)}` : "0000000"}/>
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-[#ABABAB] h-[19px] sm:block hidden"></div>
                                    <div className="flex w-auto justify-center items-center text-[13px]">
                                        <MaskedEmail email={data?.clientDetails[0]?.clientEmail} />
                                    </div>
                                </div>

                                {
                                    
                                    (data.projectStatusProfessional === "pending" )
                                    ?
                                    
                                <div className="flex justify-center gap-2">
                                <button className="text-[15px] flex items-center justify-center px-[12px] py-2 text-white gap-1 bg-red rounded-md" onClick={()=>{handleAcceptProject('reject')}}>
                                    <IoClose className="size-[15px] text-white" /> Declined
                                </button>
                                <button className="text-[15px] flex items-center justify-center px-[12px] py-2 text-black gap-1 bg-secondary rounded-md" onClick={()=>{handleAcceptProject('accept')}}>Accept <IoArrowForwardSharp className="size-[15px] text-black" /></button></div>
                                    :
                                    <>
                                    </>
                                }
                                </div>
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
