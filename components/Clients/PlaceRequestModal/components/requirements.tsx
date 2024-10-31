"use client"
import VerifyUser from "@/app/middleware/VerifyUser";
import { useUserContext } from "@/context/user_context";
import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";


// Dynamically import React Quill to ensure it works with SSR in Next.js
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReqProps {
  handleNext: () => void;
  handlePrev: () => void;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Requirements({ handleNext, handlePrev }: ReqProps) {


  const { projectData, setProjectData } : any  = useUserContext();
  let [projectDes, setProjectDes] : any  = useState("");
  let [project, setProject] : any  = useState({});
  let [clientId, setClientId] : any  = useState("");
  let [projectTitle, setProjectTitle] : any  = useState("");
  
  useEffect(()=>{
    if(!projectData?.projectUrgentStatus){
      handlePrev();
    }
    else{
      // console.log(projectData);
      setProject(projectData);
      setProjectDes(`
             I need a ${projectData?.serviceNeeded} in ${projectData?.postCodeRegion} for ${projectData?.serviceFrequency} basis, <br /><br /><br />

             <b><p className={"text-yellow-400"} style={{color : "yellow"}}>Additional Information</p></b><br />
        ${
          projectData?.serviceQuestions?.map((val, i)=>{
            // console.log(val);
            return(`
              ${
                val?.answer?.length>0

                ?
                `
                <b className="capitalize">${toTitleCase(val?.questionTitle)}</b><br />
              
              ${val?.answer.map((va)=>{
                return(`<p className="capitalize">${toTitleCase(va)}</p><br/>`)
              })}
              `
                :
                ''
              }
              
              
              `)
          })
        }

        `);
      // setProjectDes(projectData?.serviceDes);
      setProjectTitle(`I need a ${projectData?.serviceNeeded} in ${projectData?.postCodeRegion}`)
    }
  },[])
  
  



    // snackbar
    const { generateSnackbar } = useSnackbar();
    // let router = useRouter();
  const handleSubmit = async (e: any ) => {
    try{
          e.preventDefault();
          if(!projectTitle || !projectDes){
            return generateSnackbar("Please fill all Fields", "error")
          }
         
          let token : any  = Cookies.get("token");
          let ver : any  = await VerifyUser(token, "client");
          if(ver?.status === "success" && ver?.userType === "client"){
            if(!ver?.adminAccess || ver?.adminAccess === false){
              return generateSnackbar("Admin has restricted our account", "error")
            }
            setProjectData({
              ...projectData,
               "userId" : ver.userId,
              "serviceTitle" : projectTitle,
              "serviceDes" : projectDes});
            setProjectDes(projectDes);
            sessionStorage?.setItem("projectData", JSON.stringify(projectData));
            handleNext();
            handleNext();
            handleNext();
            handleNext();
            handleNext();
          }
          else{
            handleNext();
          }
    }
    catch(e){
      // console.log(e);
    }
  };
  
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center md:mt-8 text-pretty">
        This is the summary of your project requirement
      </h1>
      <p className="-mt-4 text-center text-pretty">
        Please edit the details below if you are not satisfied.
      </p>
      <form
        className="flex flex-col gap-0 px-4 md:px-8 w-full space-y-4"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <label className="font-semibold">Title</label>
          <OutlinedInput
            // defaultValue={"I need a dry cleaner in Cardiff, CF37"}
            className="border-b-4 border-b-secondary"
            value={projectTitle}
          />
        </FormControl>
        <FormControl>
          <label className="font-semibold">Description</label>
          <ReactQuill
            theme="snow"
            className="bg-white rounded-lg py-2 shadow-lg overflow-hidden border-2 h-[250px] [&_*]:!font-mono border-b-4 border-b-secondary"
            placeholder="Start typing here"
            value={projectDes}
            onChange={(e)=>{setProjectDes(e)}}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"], // Bold, italic, underline, strike-through
                [{ list: "ordered" }, { list: "bullet" }], // Ordered list, bullet list
                [{ align: [] }], // Text align
                ["blockquote", "code-block"], // Blockquote, code block
                ["link"], // Link insertion
                ["clean"], // Clear formatting
              ],
            }}
            formats={[
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "align",
              "blockquote",
              "code-block",
              "link",
            ]}
          />
        </FormControl>
        <Box className="flex items-center justify-between flex-col md:flex-row">
            <Button 
                variant="outlined"
                className="rounded-sm flex gap-2 mt-4 flex-grow w-full md:flex-grow-0"
                color="secondary"
                onClick={handlePrev}
            >
                <span className="font-bold">Back</span>
            </Button>
            <Button 
                variant="contained"
                className="rounded-sm flex gap-2 mt-4 flex-grow w-full md:flex-grow-0"
                type="submit"
            >
                <span className="font-bold">Post a Project</span>
                <FaArrowRight />
            </Button>
        </Box>
      </form>
    </>
  );
}
