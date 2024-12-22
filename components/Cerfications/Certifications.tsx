'use client'

import { useEffect, useState } from "react"
import { FaArrowRight, FaSquarePlus } from "react-icons/fa6"
import CertificationModal from "./CertificationsModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { formatDateTime } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user_context";
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
import axios from "axios";
import { Box, Chip, Modal } from "@mui/material";
 
export default function Certifications() {

    const [isModalOpen, setIsModalOpen] : any = useState(false);
    const [isAddNewOpen, setIsAddNewOpen]  : any = useState(false);
    let[certificateData,setCertificateData]  : any = useState({
        name : "",
        month : "" ,
        year : "" ,
        isExpired : false,
    });
    let [file, setFile]  : any = useState({});
    const [filePill, setFilePill] : any = useState(null);
    let [expireFields, setExpireFields] = useState(false);
    let [loading,setLoading] : any  = useState(false);

   
    const addCertification = () => {
        setIsAddNewOpen(true)
    }

    const closeModal = () => {
        setCertificateData({});
        setFilePill(null);
        setCurrentStatus("add");
        setIsModalOpen(false);
    }
    const closeCertification = () => {
        setCertificateData({});
        setFilePill(null);
        setCurrentStatus("add");
        setIsAddNewOpen(false);
    }

    const [currentTime, setCurrentTime]  : any  = useState<string>(
        formatDateTime(new Date())
    );
    
  const {
    certificateDataProfessional
  } : any  = useUserContext();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatDateTime(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    let [userData,setUserData]  : any  = useState({});
    let [allCertificates, setAllCertificates] : any = useState([]);
    let [currentStatus, setCurrentStatus] : any = useState("add");
    let [currentCertiicate, setCurrentCertiicate] : any = useState({});

    const [loading2, setLoading2]  : any  = useState(true);
    let router  : any  = useRouter();
  
  
    const { generateSnackbar }  : any  = useSnackbar();

      useEffect(() => {
        async function verify(){
          try{
            setLoading2(true);
            let token   : any = Cookies.get("token");
            let ver   : any = await VerifyUser(token, "professional");
            if(ver?.status === "success"){
              setUserData(ver);
              setLoading2(false);
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

      const handleFileChange = (e  : any ) => {
        const files = e.target.files[0];
        setFile(files);
        setFilePill(files ? files.name : null);
      };

      async function handleSubmit(e  : any ){
        e.preventDefault();
        try{
            if(!file || !certificateData?.name || !certificateData?.month || !certificateData?.year){
                return generateSnackbar("Please Fill all the Fields", "error")
            }
            else{
                setLoading(true);
    
                const formDat = new FormData();
                formDat.append('certificationImage', file);
                formDat.append('professionalId', userData?.userId);
                formDat.append('certificateTitle', certificateData?.name);
                formDat.append('certificateExpirationMonth', certificateData?.month);
                formDat.append('certificateExpirationYear', certificateData?.year);
                formDat.append('isExpired', certificateData?.isExpired);
    
                const res  : any  = await axios.post('/applyCertification', formDat, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                  console.log(res);
                  if (res?.status !== 400 || res?.data?.status === "success") {
                    setLoading(false);
                    setFilePill(null);
                    generateSnackbar("Certification has been submitted for Verification.", "success");
                    closeCertification();
                    router.refresh();
                  }
                  else {
                    setLoading(false);
                    generateSnackbar(res?.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
                  }
            }
        }
        catch(error : any){
            setLoading(false);
            generateSnackbar( error?.response?.data?.message || "Please check if you have uploaded the file.", "error");
        }
      };

      const openModal = async () => {
        try{
            console.log(userData);
            let res = await certificateDataProfessional({userId : userData?.userId});
            console.log(res);
            if(res?.status !== 400 || res?.data?.status === "success"){
                setAllCertificates(res?.data?.data?.certifications?.reverse());
                setIsModalOpen(true);

            }
            else {
                setIsModalOpen(false);
              generateSnackbar(res?.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
            }
        }
        catch(e){
            console.log(e);
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
                <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <div className="flex justify-between items-center py-3 border-b border-black/30">
                    <h3 className="text-md font-bold">Certifications</h3>
                    <h3 className="text-md font-bold">{currentTime}</h3>
                </div>

                <div className="flex flex-col md:flex-row items-stretch gap-2">
                    <div className="w-full md:w-1/2 p-3">
                        <div className="w-full h-full bg-[#F2F2F2] p-4 rounded-md flex flex-col">
                            <div className="flex-grow flex flex-col justify-center items-center px-3 py-12">
                                <img className="w-20 h-20" src="/icons/certification.svg" alt="certificate" />
                                <h3 className="text-center text-black font-bold text-lg py-3">Upload your certificate or license</h3>
                                <p className="text-center text-black pb-3">To get our preferred badge, you can upload your certificate or license</p>
                                <button onClick={openModal} className="bg-secondary mt-3 py-2 px-4 rounded-md flex justify-center gap-2 items-center font-semibold">
                                    Manage <FaArrowRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-3">
                        <div className="w-full h-full bg-[#f2f2f2] p-4 rounded-md flex flex-col">
                            <div className="flex-grow flex flex-col justify-center items-center px-3 py-12">
                                <img className="w-20 h-20" src="/icons/certification.svg" alt="certificate" />
                                <h3 className="text-center text-black font-bold text-lg py-3">Take a Course</h3>
                                <p className="text-center text-black pb-3">Stand out to prospective clients by certifying your skills.</p>
                                <button className="bg-secondary mt-3 py-2 px-4 rounded-md flex justify-center gap-2 items-center font-semibold">
                                    Take a Test Now <FaArrowRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




            {isModalOpen && (
                <CertificationModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <IoCloseCircleOutline className="size-[20px]" />
                                </button>
                                <div className="w-full text-start">
                                    <h4 className="font-semibold text-[20px] capitalize">Certification / Licence</h4>

                                </div>
                                <div className="w-full mt-3 py-2 px-3">
                                    <ul>
                                        {
                                            allCertificates?.map((val)=>{
                                                return(
                                                    <>
                                                    <li className="flex border-y border-black/30 py-3 justify-between items-center">
                                                        <div>
                                                            <h4 className="text-lg font-semibold capitalize">{val?.certificateTitle}</h4>
                                                            <p className="text-sm">{val?.certificateExpirationMonth} {val?.certificateExpirationYear}</p>
                                                        </div>
                                                        <div className="flex gap-6">
                                                            
                                                        <Chip label={`${val?.status === "pending" ? "Pending" : val?.status  === "approved" ? "Approved" : "Rejected"}`}style={{ color:"white", backgroundColor : `${val?.status  == "pending" ? "text-secondary" : val?.status  === "approved" ? "green" : "red"}`}} />
                                                        <button onClick={()=>{
                                                            setCurrentStatus("edit");
                                                            setCurrentCertiicate(val);
                                                            setFilePill("Certification Image (Click to View)");
                                                            setCertificateData({
                                                                ...certificateData,
                                                                name : val?.certificateTitle,
                                                                month : val?.certificateExpirationMonth,
                                                                year : val?.certificateExpirationYear,
                                                                isExpired : val?.isExpired
                                                            })
                                                            setIsAddNewOpen(true);
                                                        }}><MdEditSquare className="size-5 text-secondary" /></button>
                                                        </div>
                                                    </li>
                                                    
                                                    </>
                                                )
                                            })
                                        }
                                        <li className="flex py-3 justify-between items-center border-b">
                                            <div className="px-3">
                                                <p className="text-sm text-[#7A7A7A]">Add another certification / licence</p>
                                            </div>
                                            <button onClick={addCertification} className="py-2 rounded-md px-4 bg-secondary text-back font-semibold flex items-center justify-center">
                                                Add <FaArrowRight className="size-3 text-black" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

            {isAddNewOpen && (
                <CertificationModal
                    isOpen={isAddNewOpen}
                    onRequestClose={closeCertification}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeCertification}>
                                    <IoCloseCircleOutline className="size-[20px]" />
                                </button>
                                <div className="w-full text-start">
                                    <h4 className="font-semibold text-[20px] capitalize">Add Another Certification / Licence</h4>

                                </div>
                                <div className="w-full mt-3 py-2 px-3">
                                    <form className="border-t p-2" onSubmit={handleSubmit}>
                                        <div className="py-2">
                                            <label className="block pb-2" htmlFor="certificate">Certification / Licence Name</label>
                                            <input type="text" value={certificateData.name} onChange={(e)=>{setCertificateData({...certificateData, ["name"] : e.target.value})}} name="name" id="certificate" placeholder="Thomas" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                        </div>
                                        <div className="py-2">
                                            <div className="flex flex-col md:flex-row gap-3 items-end">
                                                <div className="w-full md:w-1/2">
                                                    <label className="block pb-2" htmlFor="date">Expiration Date</label>
                                                    <input type="text" id="date" value={certificateData.month} disabled={expireFields} onChange={(e)=>{setCertificateData({...certificateData, ["month"] : e.target.value})}} name="month" placeholder="Month" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                                </div>
                                                <div className="w-full md:w-1/2">
                                                    <input type="text" placeholder="Year" value={certificateData.year} disabled={expireFields}  onChange={(e)=>{setCertificateData({...certificateData, ["year"] : e.target.value})}} name="year" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* File Pill */}
                                        {(filePill && currentStatus!== "edit" )&& (
                                            <div className="file-pill border-2 border-red-200 p-2 bg-green-200 break-words" style={{border: ".5px solid green"}}>
                                                <span style={{color : "green"}}>{filePill}</span>
                                            </div>
                                            )}
                                        <div className="py-2">
                                            <div className="flex flex-col md:flex-row gap-2 items-center">
                                                <div className="w-full md:w-1/3">
                                                    <div className="flex items-center gap-2">
                                                    {
                                                        currentStatus !== "edit" &&
                                                        <input className="h-5 w-5 shadow" id="check" type="checkbox" checked={certificateData.isExpired} onChange={(e)=>{
                                                            if(certificateData.isExpired === true){
                                                                setCertificateData({...certificateData,
                                                                    ["isExpired"] : (!certificateData.isExpired), 
                                                                    month : "",
                                                                    year : ""})
                                                            }
                                                            else{
                                                                setCertificateData({...certificateData,
                                                                    ["isExpired"] : (!certificateData.isExpired), 
                                                                    month : "--",
                                                                    year : "--"})
                                                            }
                                                            setExpireFields(prev => !prev)
                                                            }} />
                                                    }
                                                        
                                                        <label className="block text-xs" htmlFor="check">{currentStatus == "edit" ?`Certificate ${currentCertiicate?.certificateExpirationMonth == "--" ? "Will not Expire" : "Will Expire"}`  : "Does not Expire"}  </label>
                                                   </div>
                                                </div>
                                                
                                                {
                                                    currentStatus !== "edit" &&
                                                    
                                                <div className="w-full md:w-2/3">
                                                <label className="flex items-center gap-2 cursor-pointer bg-[#07242B66] justify-center px-2 py-2 rounded-md shadow">
                                                    <FaSquarePlus className="size-4 text-black" /> Upload certificate / licence
                                                    <input className="hidden" type="file" name="certificationImage" onChange={handleFileChange} />
                                               </label>
                                            </div>
                                                }
                                            </div>
                                        </div>

                                        {(filePill && currentStatus == "edit") && (
                                        <a href={`${currentCertiicate?.certificationImage}`} target="_blank"  rel="noreferrer">
                                            <div className="file-pill border-2 border-red-200 p-2 bg-green-200 break-words" style={{border: ".5px solid green"}}>
                                                <span style={{color : "green"}}>{filePill}</span>
                                            </div>
                                        </a>
                                            
                                            )}
                                        
                                        {currentStatus == "edit" &&
                                        
                                        <div>
                                            <h3 className="font-bold">Admin Comment:</h3>
                                        <p className="capitalize">{currentCertiicate?.adminComment}</p>
                                        </div>
                                        
                                        }

                                    

                                        {
                                            currentStatus !== "edit" &&
                                            <div className="border-t">
                                                <div className="flex justify-center gap-3 pt-7">
                                                    <button type="button" className="flex items-center justify-normal px-4 py-2 text-black bg-white border-2 border-secondary rounded-md gap-2" onClick={closeCertification}>Cancel <FaArrowRight className="size-3" /></button>
                                                    <button type="submit" className="flex items-center justify-normal px-4 py-2 text-black bg-secondary border-2 border-secondary rounded-md gap-2">Save <FaArrowRight className="size-3" /></button>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

        </div>
        <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">Submitting your Details...</h1>
              </Box>
            </Box>
          </Modal>
                </>
            )
        }
        </>
        
    )
}
