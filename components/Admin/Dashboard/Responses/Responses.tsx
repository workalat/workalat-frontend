"use client"
import Menus from "../Menus/Menus";
import { IoFilterSharp, IoReloadOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import './Responses.css'
import "react-datepicker/dist/react-datepicker.css";
import { RiMapPin5Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { GiCheckedShield } from "react-icons/gi";
import { ResponsesData } from "@/utils/responsesData";
import ResponsesModal from "./ResponsesModal";

import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import moment from "moment";
import { Rating, Typography } from "@mui/material";
import DOMPurify from 'dompurify';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function Responses() {

    // here is demo data "import { responsesData } from "@/utils/responsesData";", which need to connect api and fetch from api then that data will be here.. and with the api also need to integration for update and delete methods because here is button in "view" and if there click there will show option for approve and reject so depends on that data need to update also. i here taking from leadsData.ts files (demo data)


    // date time filtering and location filtering
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const handleDateTimeChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedTime(date);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const uniqueLocations = Array.from(new Set(ResponsesData.map((data: any) => data.location)));

    const dateSelect = selectedDate ? `${format(selectedDate, "dd/MM/yyyy")}` : "";
    const timeSelect = selectedTime ? `${format(selectedTime, "hh:mm a")}` : "";

    // Filtered data based on selected filters
    const filteredData = ResponsesData.filter((data: any) => {
        const matchesDate = dateSelect ? data?.date === dateSelect : true;
        const matchesTime = timeSelect ? data?.time === timeSelect : true;
        const matchesLocation = selectedLocation ? data?.location === selectedLocation : true;
        return matchesDate && matchesTime && matchesLocation;
    });

    const [modalData, setModalData] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let router = useRouter();

    // const openModal = (data: any) => {
    //     setModalData(data);
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    // BACKEND INTEGRATION
    const {showLeadsAdmin, showLeadsBids,declineProposal,verifyAdmin} : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);
    let [allLeadsData, setAllLeadsData] = useState([]);
    const { generateSnackbar } : any  = useSnackbar();

        async function getData() {
            setLoading2(true);
          try {
            let res = await showLeadsAdmin();
            if (res?.status !== 400 || res?.data?.status === "success") {
                setAllLeadsData(res?.data?.data.reverse());
                setLoading2(false);
              } else {
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
              }
          } catch (e) {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
        }
        getData();

      useEffect(()=>{
        async function verify(){
            try{
                setLoading2(true);
                let adminToken : any = Cookies.get("adminToken");
                
                if(adminToken !== undefined){
                    let res : any = await verifyAdmin({adminToken});
                    if(res?.status === 200 || res?.data?.status === "success" || res?.data?.data?.verify === true){
                        if(res?.data?.data?.status === "system" || res?.data?.data?.status === "user" ){
                            getData();
                            setLoading2(false);
                        }
                        else{
                            router.push("/admin");
                        }
                    }   
                    else{
                        router.push("/admin-login");
                    }
                }
                else{
                    router.push("/admin-login")
                }
            }
            catch(e){
                // console.log(e);
                generateSnackbar("Something went wrong, please Try Again.", "error");   
            }
        };
        verify();
    }, []);

      const openModal = async (id: any) => {
        try {
            let res = await showLeadsBids({id});
            console.log(res);
            if (res?.status !== 400 || res?.data?.status === "success") {
                setModalData(res?.data?.data[0]);
                // setModalData(filteredData[0]);
                 setIsModalOpen(true);
              } else {
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
              }
          } catch (e) {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
    };

    const projectDecline= async (projectId: any, professoinalId : any) => {
        try {
            console.log(projectId,professoinalId);
            let res = await declineProposal({projectId, professoinalId});
            if (res?.status !== 400 || res?.data?.status === "success") {
                generateSnackbar(res?.data?.message || "Status Changed Successfully", "success");
                router.refresh();
                setIsModalOpen(false);
              } else {
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
                setIsModalOpen(false);
              }
          } catch (e) {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
    };

    return (
        <>
               {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-1 overflow-y-scroll relative hiddenScroll">
                <h3 className="font-semibold text-[20px]">Responses</h3>

                {/* heading */}
                <div className="w-full flex justify-between pt-4 pb-3 items-center">
                    <h3 className="font-bold text-[20px]">{filteredData.length} Records</h3>
                    <button onClick={() => window.location.reload()} className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#FFBE00]"><IoReloadOutline className="size-[20px] text-black" /></button>
                </div>

                {/* table */}
                <div className="overflow-x-auto w-full mt-5">
                    {/* Table header */}
                    <table className="min-w-full leads-table">
                        <thead className="text-black text-[15px] border-y border-black">
                            <tr>
                                <th className="py-3 px-3 text-left font-semibold">Name</th>
                                <th className="py-3 px-3 text-left font-semibold">Project Title</th>
                                <th className="py-3 px-3 text-left font-semibold">Location</th>
                                <th className="py-3 px-3 text-right font-semibold">
                                    <div className="flex justify-end gap-2 items-center">
                                        <h5 className="flex gap-2 items-center">Filter By: <IoFilterSharp className="size-[20px] text-black" /></h5>
                                        {/* Date/Time Picker */}
                                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md w-[200px] xl:w-[254px] py-1 px-2">
                                            <label htmlFor="dateTime" className="text-gray-700">Date/Time:</label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateTimeChange}
                                                showTimeSelect
                                                timeFormat="hh:mm aa"
                                                timeIntervals={15}
                                                dateFormat="dd/MM/yyyy | hh:mm aa"
                                                placeholderText="Select Date | Time"
                                                className="p-1 w-full font-normal outline-none"
                                                id="dateTime"
                                            />
                                        </div>

                                        {/* Location Picker */}
                                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md w-[200px] xl:w-[254px] py-1 px-2">
                                            <label htmlFor="location" className="text-gray-700">Location:</label>
                                            <select defaultValue="Select" name="location" id="location" className="font-normal w-full capitalize py-1 outline-none bg-transparent" onChange={handleLocationChange}>
                                                <option value="Select" disabled>Select location</option>
                                                {
                                                    uniqueLocations?.map((data: any, i: number) => (
                                                        <option key={i} value={data}>{data}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Table body */}
                        <tbody>
                            <tr className="h-4"></tr>
                            {
                                allLeadsData.map((data: any, i: number) => (
                                    <tr key={i} className="bg-[#07242B] text-white border-y-8 border-white">
                                        {/* Username column */}
                                        <td className="py-4 px-3 text-[17px] xl:text-[20px] font-semibold capitalize">
                                            {data?.clientName}
                                        </td>
                                        {/* Project title column */}
                                        <td className="py-2 px-3 text-[15px] xl:text-[17px] text-[#ACACAC] capitalize">
                                            {data?.serviceNeeded}
                                        </td>
                                        {/* Location column */}
                                        <td className="py-2 px-3 text-[15px] xl:text-[17px] text-[#ACACAC] capitalize">
                                            <div className="flex gap-3 items-center">
                                                <RiMapPin5Fill className="text-[#FFBE00]" />
                                                <p>{data?.serviceLocationTown}</p>
                                            </div>
                                        </td>
                                        {/* Date/Time and Responses column */}
                                        <td className="py-2 px-3 text-right">
                                            <div className="text-[10px] xl:text-[14px] text-[#ACACAC] flex items-center justify-between">
                                                <p>Date/Time:  { moment(data?.projectTimeStamp).format("DD/MM/YYYY | hh:mm A")}</p>
                                                <p className="text-[#FFBE00]">{data?.totalProposals} of 5 Responses</p>
                                                <button onClick={() => openModal(data?._id)} className="py-[5px] px-5 bg-[#FFBE00] rounded-md text-black font-semibold hover:bg-[#d3a416] transition-all duration-300">View Responses</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div>
                        {/* modal */}
                        {modalData && (
                            <ResponsesModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="py-3 px-2">
                                        <div className="flex justify-between pb-2">
                                            <div className="flex">
                                                <img className="w-[60px] h-[60px] object-cover" src={modalData?.clientPictureLink} alt="work alat" />

                                                <div className="px-2">
                                                    <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{modalData?.clientName} <span className="text-sm font-thin lowercase flex gap-0 items-center">
                                                    {
                                                    (modalData?.isClientEmailVerify && modalData?.isClientPhoneNoVerify)
                                                    ?
                                                    <HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />
                                                    :
                                                    <></>
                                                    }
                                                    {
                                                    (modalData?.kycStatus === "approved")
                                                    ?
                                                    <GiCheckedShield className="size-[12px] text-[#F76C10]" />
                                                    :
                                                    <></>
                                                }{
                                                    (modalData?.kycStatus === "approved")
                                                    ?
                                                    <GiCheckedShield className="size-[12px] text-[#F76C10]" />
                                                    :
                                                    <></>
                                                }
                                                        </span></h2>
                                                    <p className="text-sm font-semibold capitalize">Project title: {modalData?.serviceTitle}</p>
                                                </div>
                                            </div>

                                            <p className="text-[#FFBE00] text-[12px]">{modalData?.totalProposals} of 5 Responses</p>
                                        </div>

                                        <div className="pt-3 overflow-x-hidden overflow-y-scroll hiddenScroll h-[300px]">
                                            <ul className="py-1">
                                                {
                                                    modalData?.proposals?.map((response: any, i: number) => (
                                                        <li className="p-3 my-2 rounded-sm bg-[#F3F3F3]" key={i}>
                                                            <div className="flex justify-between items-start pb-2">
                                                                <div className="flex">
                                                                    <img className="w-[45px] h-[45px] object-cover" src={response?.professionalPicture} alt="work alat" />

                                                                    <div className="px-2">
                                                                        <h2 className="capitalize font-semibold text-[13px] flex gap-1 items-center">{response?.professionalName} <span className="text-sm font-thin lowercase flex gap-0 items-center">
                                                                            {/* <HiMiniCheckBadge className="size-[13px] text-[#29B1FD]" /> */}
                                                                        </span></h2>
                                                                        <div className="flex py-px">
                                                                            <div className="flex gap-[3px] items-center">
                                                                                {/* {
                                                                                    [...Array(response?.professionalTotalRatings)].map((_, i) => (
                                                                                        <FaStar key={i} className="size-[10px] text-amber-300" />
                                                                                    ))
                                                                                } */}

                                                                                <div className="flex gap-1 items-center"> 
                                                                                    <Rating precision={0.1} value={(response?.professionalTotalRatings / response.professionalTotalReviews )} readOnly style={{fontSize : "15px"}} />
                                                                                    <p className="text-xs">{  response.professionalTotalReviews>0 ? Number((response?.professionalTotalRatings / response.professionalTotalReviews )).toFixed(1) : 0}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="capitalize flex items-center gap-0.5 px-2 text-[12px]">
                                                                                {/* <img className="size-[13px]" src="/flag.png" alt="workalat" /> */}
                                                                            {/* <p>{modalData?.location}</p> */}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-sm font-semibold capitalize text-[10px]">Project title: {modalData?.serviceTitle}</p>
                                                                    </div>
                                                                </div>


                                                                <button className="block bg-[#F52933] px-4 text-[12px] font-semibold py-2 rounded-md hover:bg-[#f52933dc] transition-all duration-300 text-white" onClick={(e)=>{
                                                                    projectDecline(modalData?._id,response?.professionalId)
                                                                }}>Declined</button>
                                                            </div>

                                                            <p className="text-[13px]">{response?.proposal}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }
                            />
                        )
                        }

                    </div>

                </div>
            </div>
        </div>
      )
    }
   </>
        
    )
}
