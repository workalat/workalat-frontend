"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import loadingGif from "@/public/images/loader.gif";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import axios from "axios";

interface SetupAccountProps {
  handleNext: () => void;
  handlePrev: () => void;
}
export default function UploadPicture({
  handleNext,
  handlePrev,
}: SetupAccountProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // MOCK API call
    setTimeout(() => {
      handleNext();
    }, 3000);
  };

  // const [files, setFiles] = useState<File[] | null>(null);

  const picRef = React.useRef<HTMLInputElement>(null);
  const takePicInput = () => {
    if (picRef.current) {
      picRef.current.click();
    }
  };


  
  const { projectData, setProjectData, postProject } : any  = useUserContext();
  let [sessionData, setSessionData] : any  = useState({});
  let [projectId, setProjectId] : any  = useState("");
  let [files, setFiles ] : any  = useState([]);

  const { generateSnackbar } : any  = useSnackbar();
  console.log(projectData);

  useEffect(()=>{
   async function post(){
      try{

        let p : any  = sessionStorage.getItem("projectData");
        let project : any  = JSON.parse(p);
        setSessionData(project);
        if(!project?.userId){
          handlePrev();
          handlePrev();
          handlePrev();
          handlePrev();
          handlePrev();
        }

      }
      catch(e){
        generateSnackbar("Some error occured, Please try Again.", "error");
      }
   };
   post();
    
  }, [])

  function handleBack(){
    if(projectData?.userId || sessionData?.userId){
      handlePrev();
      handlePrev();
      handlePrev();
      handlePrev();
      handlePrev();
    }
    else{
      handlePrev();
    }
  }


  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  

  
  
  const handleProjectFileUpload = async (event : any ) => {
    try {
      event.preventDefault();

      if(!files || files?.length<1){
             generateSnackbar("Please Fill all Data.", "error");
      }
      else{ 
      setLoading(true);
      let uploadProject = {
        userId : projectData?.userId || sessionData?.userId,
        serviceCategory : projectData?.serviceCategory || sessionData.serviceCategory,
        serviceNeeded : projectData?.serviceNeeded || sessionData.serviceNeeded,
        serviceLocationPostal : projectData?.serviceLocationPostal || sessionData.serviceLocationPostal,
        postCodeRegion : projectData?.postCodeRegion || sessionData.postCodeRegion,
        serviceQuestions : projectData?.serviceQuestions || sessionData.serviceQuestions,
        serviceFrequency : projectData?.serviceFrequency || sessionData.serviceFrequency,
        serviceFrequencyDays : projectData?.serviceFrequencyDays || sessionData.serviceFrequencyDays,
        projectPriceString : projectData?.projectPriceString || sessionData.projectPriceString,
        projectPriceTitle : projectData?.projectPriceTitle || sessionData.projectPriceTitle,
        projectMaxPrice : projectData?.projectMaxPrice || sessionData.projectMaxPrice,
        projectUrgentStatus : projectData?.projectUrgentStatus || sessionData.projectUrgentStatus,
        pointsNeeded : projectData?.pointsNeeded || sessionData.pointsNeeded,
        serviceTitle : projectData?.serviceTitle || sessionData.serviceTitle,
        serviceDes : projectData?.serviceDes || sessionData.serviceDes
      }
      let res : any   = await postProject({project : uploadProject});

      if(res?.status !== 400 || res?.data.status === "success"){
        setProjectId(res?.data?.projectId);

        
      const formData = new FormData();
      formData.append('userId', projectData?.userId || sessionData.userId);
      formData.append('userType', "client");
      formData.append('projectId', res?.data?.projectId);
        

      //       // // Append all selected files to the form data under the kycDocuments key
        files?.forEach((file) => {
            formData.append('projectFiles', file);
        });
      
        const upload : any  = await axios.post('/uploadProjectFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        handleNext(); 

      }
      else{
        setLoading(false)
        generateSnackbar("Failed to Upload Project, Please try Again.", "error");
      }
      }
    } catch (error) {
      setLoading(false);
        generateSnackbar("Some Error Occur, Please try Again." ,"error")
    }
};


const handleProjectUploadSkip = async (event : any ) => {
  try {
    event.preventDefault();

    
    setLoading(true);
    let uploadProject = {
      userId : projectData?.userId || sessionData?.userId,
      serviceCategory : projectData?.serviceCategory || sessionData.serviceCategory,
      serviceNeeded : projectData?.serviceNeeded || sessionData.serviceNeeded,
      serviceLocationPostal : projectData?.serviceLocationPostal || sessionData.serviceLocationPostal,
      postCodeRegion : projectData?.postCodeRegion || sessionData.postCodeRegion,
      serviceQuestions : projectData?.serviceQuestions || sessionData.serviceQuestions,
      serviceFrequency : projectData?.serviceFrequency || sessionData.serviceFrequency,
      serviceFrequencyDays : projectData?.serviceFrequencyDays || sessionData.serviceFrequencyDays,
      projectPriceString : projectData?.projectPriceString || sessionData.projectPriceString,
      projectPriceTitle : projectData?.projectPriceTitle || sessionData.projectPriceTitle,
      projectMaxPrice : projectData?.projectMaxPrice || sessionData.projectMaxPrice,
      projectUrgentStatus : projectData?.projectUrgentStatus || sessionData.projectUrgentStatus,
      pointsNeeded : projectData?.pointsNeeded || sessionData.pointsNeeded,
      serviceTitle : projectData?.serviceTitle || sessionData.serviceTitle,
      serviceDes : projectData?.serviceDes || sessionData.serviceDes
    }
    let res : any   = await postProject({project : uploadProject});

    if(res?.status !== 400 || res?.data.status === "success"){
      handleNext(); 
    }
    else{
      setLoading(false)
      generateSnackbar("Failed to Upload Project, Please try Again.", "error");
    }
    
  } catch (error) {
    setLoading(false);
      generateSnackbar("Some Error Occur, Please try Again." ,"error")
  }
};

if (loading) {
  return <Loader />;
}


  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-center max-w-sm text-balance -mt-8">
        Upload a picture or document for your project
      </h1>
      <p className="-mt-4">(optional)</p>
      <form
        className="flex flex-col gap-0 px-4 md:px-8 w-full"
        onSubmit={handleSubmit}
      >
        {/* <input
          ref={picRef}
          multiple
          type="file"
          accept="image/*, .pdf"
          className="hidden"
          id="file"
          onChange={handleImageUpload}
        /> */}
        <input ref={picRef} multiple type="file" accept="image/*, .pdf" className="hidden" id="projectFiles" onChange={handleFileChange} name="projectFiles"  />
        <Button
          color="secondary"
          variant="contained"
          className="bg-main bg-opacity-30 rounded-md text-main font-semibold py-4 hover:!text-white gap-2"
          onClick={takePicInput}
        >
          <IoIosAddCircle />
          Add photos/file
        </Button>
        {files &&
          files.map((file, index) => (
            <Accordion key={index} variant="outlined" className="border-green-500 mt-6">
              <AccordionSummary>
                <Tooltip arrow title="Click to preview">
                  <Typography color={"green"} className="hover:underline">
                    {file ? file.name : "No image selected"}
                  </Typography>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails>
                {file.type === "application/pdf" ? (
                  <embed
                    src={file ? URL.createObjectURL(file) : ""}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    className="object-cover"
                  />
                ) : (
                  <img
                    src={file ? URL.createObjectURL(file) : ""}
                    alt="preview"
                    className="w-full h-96 object-cover"
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box className="flex justify-center items-center gap-y-2 mt-8">
          <Button
            variant="text"
            color="secondary"
            size="large"
            className=" flex gap-2"
            onClick={handleProjectUploadSkip}
          > 
              Skip
          </Button>
          </Box>
        <Box className="flex justify-between items-center gap-y-2 mt-8">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className=" flex gap-2"
            onClick={handleBack}
          >
            <FaArrowLeft />
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            className=" flex gap-2"
            type="submit"
            onClick={handleProjectFileUpload}
          >
            Post project
            <FaArrowRight />
          </Button>
        </Box>
      </form>
    </>
  );
}

const Loader = () => (
  <div className="bg-white px-10 flex flex-col items-center gap-4 text-center">
    <h1 className="text-3xl font-bold text-center max-w-[450px]">
      Publishing Your Project
    </h1>
    <p className="">We are publishing your project, please wait</p>
    <Image
      src={loadingGif}
      alt="Loading"
      width={230}
      className="pointer-events-none"
    />
  </div>
);
