"use client"

import { activitiesData } from "@/utils/activitiesData";
import { useEffect, useState } from "react";
import Menus from "../Menus/Menus";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { GiCheckedShield } from "react-icons/gi";
import ActivitiesModal from "./ActivitiesModal";
import { HiMiniCheckBadge } from "react-icons/hi2";


import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import moment from "moment";


import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

export default function Activities() {
    // here users will be dynamically from the backend. for now i using "import { activitiesData } from "@/utils/activitiesData";" as a demo users data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] = useState(activitiesData); // Filtered data

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user) => user.id));
        }
        setSelectAll(!selectAll);
    };

    // Toggle individual user selection
    const toggleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    // Filter users based on selected user type
    useEffect(() => {
        let result = activitiesData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);


    const [modalData, setModalData] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (data: any) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



     // BACKEND INTEGRATION
  const {
    ActivitiesData,
    verifyAdmin,
    refundTransaction
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [allData, setAllData]: any = useState([]);
  let [allFilterData, setAllFilterData]: any = useState([]);
  const { generateSnackbar }: any = useSnackbar();
  const [dataType, setDataType] : any = useState('all'); // Filter by data type
  let router = useRouter();
  let [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] : any = useState(''); // Search term state


  async function getData() {
    setLoading2(true);
    try {
      let res = await ActivitiesData();
      if (res?.status === 200 || res?.data?.status === "success") {
        setAllData(res?.data?.data);
        setAllFilterData(
            res?.data?.data,
        );
        setTotalUsers(res?.data?.data?.length);
        setLoading2(false);
      } else {
        generateSnackbar(
          res?.response?.data?.message ||
            "Some error occurred, Please Try Again.",
          "error"
        );
      }
    } catch (e) {
      generateSnackbar("Some error occurred, Please Try Again.", "error");
    }
  }

  useEffect(() => {
    async function verify() {
      try {
        setLoading2(true);
        let adminToken: any = Cookies.get("adminToken");

        if (adminToken !== undefined) {
          let res: any = await verifyAdmin({ adminToken });
          if (
            res?.status === 200 ||
            res?.data?.status === "success" ||
            res?.data?.data?.verify === true
          ) {
            getData();
          } else {
            router.push("/admin-login");
          }
        } else {
          router.push("/admin-login");
        }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Something went wrong, please Try Again.", "error");
      }
    }
    verify();
  }, []);



  async function initiateRefund(transactionId : string) {
    try {
        let res: any = await refundTransaction({ transactionId });
        if (
          res?.status === 200 ||
          res?.data?.status === "success" 
        ) {
            generateSnackbar(res?.data?.message, "success");
            router.refresh();
        } else {
            generateSnackbar(res?.response?.data?.message ||"Something went wrong, please Try Again." , "error");
        }
    } catch (e) {
      // console.log(e);
      generateSnackbar("Something went wrong, please Try Again.", "error");
    }
  };

  
    function downloadData(){
  
  
              // Create a new workbook and worksheet
              const workbook = XLSX.utils.book_new();
              const worksheet = XLSX.utils.json_to_sheet(allFilterData);
  
              // Append worksheet to workbook
              XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
              // Write the workbook to a Blob
              const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
              const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
              // Save the Blob as a file
              saveAs(blob, "ExportedData.xlsx");
    }

    return (

        <>
        
        {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <div className="flex justify-between items-start">
                    <h4 className="text-[20px] font-bold">Activities</h4>

                    <div className="flex  gap-3 items-center">
                    <Link className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" href="/admin/activities/membership">
                        Membership Activity
                    </Link>

                    <button  className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" onClick={downloadData}>Downloads</button>

                    </div>

                </div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{totalUsers} Records</h4>
                    {/* users type selector */}

                      {/* users type selector */}
                      <div className="flex gap-3">
                        <div className="flex items-center justify-end">
                            {/* search box */}
                            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 w-[250px]">
                                <AiOutlineSearch className="size-[18px] text-[#909090]" />
                                <input
                                    type="search"
                                    placeholder="Search here"
                                    className="outline-none bg-transparent ml-2 text-gray-500 placeholder-gray-400 w-full"
                                    value={searchTerm}
                                    onChange={(e) =>{
                                         setSearchTerm(e.target.value);
                                         if(e.target.value == ""){
                                            setAllFilterData(allData);
                                            setTotalUsers(allData?.length);
                                          }
                                          else{
                                            let filter = allData?.filter((val)=>{
                                              if(val?.userName?.includes(e.target.value)){
                                                return(val);
                                              }
                                            });
                                            setAllFilterData(filter);
                                            setTotalUsers(filter?.length);
                                          }
                                        }} // Update search term
                                />
                            </div>
                        </div>
                        <select
                        name="users"
                        className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => {
                            setUserType(e.target.value);
                            if(dataType == "all"){
                                if(e.target.value === "all"){
                                    setAllFilterData(allData);
                                    setTotalUsers(allData?.length);
                                }   
                                else if (e.target.value === "pending"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "pending"){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }   
                                else if(e.target.value === "success"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "success"){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                } 
                                else if(e.target.value === "fail"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "fail"){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }
                                else if(e.target.value === "refunded"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "refunded"){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }
                            }
                            else{
                                if(e.target.value === "all"){
                                    setAllFilterData(allData);
                                    setTotalUsers(allData?.length);
                                }   
                                else if (e.target.value === "pending"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "pending" && val?.des == dataType){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }   
                                else if(e.target.value === "success"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "success" && val?.des == dataType){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                } 
                                else if(e.target.value === "fail"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "fail" && val?.des == dataType){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }
                                else if(e.target.value === "refunded"){
                                    let data = allData.filter((val)=>{if(val.transactionStatus === "refunded" && val?.des == dataType){return(val)}});
                                    setAllFilterData(data);
                                    setTotalUsers(data?.length);
                                }
                            }
                            
                        }}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="success">Success</option>
                        <option className="bg-[#07242B] text-white" value="pending">Pending</option>
                        <option className="bg-[#07242B] text-white" value="fail">Failed</option>
                        <option className="bg-[#07242B] text-white" value="refunded">Refunded</option>
                    </select>
                        <select
                            name="dataType"
                            className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                            value={dataType}
                            onChange={(e) =>{
                                 setDataType(e.target.value)

                                if(e.target.value === "all" && userType === "all"){
                                    setAllFilterData(allData)
                                    setTotalUsers(allData?.length);
                                }
                                else if(e.target.value === "Leads Purchase"){
                                    let filter = allData?.filter((val)=>{
                                        if(userType === "all"){
                                            if(val?.des == "Leads Purchase"){
                                              return(val);
                                            }
                                        }
                                        else{
                                            if(val?.des == "Leads Purchase" && val?.transactionStatus == userType){
                                            return(val);
                                          }
                                        }
                                      });
                                      setAllFilterData(filter);
                                      setTotalUsers(filter?.length);
                                }
                                else if(e.target.value === "Wallet Top up"){
                                    let filter = allData?.filter((val)=>{
                                        if(userType === "all"){
                                            if(val?.des == "Wallet Top up"){
                                              return(val);
                                            }
                                        }
                                        else{
                                            if(val?.des == "Wallet Top up" && val?.transactionStatus == userType){
                                                return(val);
                                              }
                                        }
                                      });
                                      setAllFilterData(filter);
                                      setTotalUsers(filter?.length);
                                }

                                }}
                        >
                            <option className="bg-[#07242B] text-white" value="all">All</option>
                            <option className="bg-[#07242B] text-white" value="Leads Purchase">Lead Purchase</option>
                            <option className="bg-[#07242B] text-white" value="Wallet Top up">Wallet Top Up</option>
                        </select>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-black mt-5"></div>
                <div className="py-2">
                    <p className="text-[15px] text-black/50 capitalize">Filter: <b>{userType}</b></p>
                </div>

                <div className="w-full pt-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="py-2 border-b border-black/20">
                                <tr>
                                    <th className="p-4 text-left">
                                        {selectedUsers.length > 0 ? (
                                            <div className="flex items-center">
                                                <span className="text-slate-600 font-semibold mr-2 text-[15px]">{selectedUsers.length} selected</span>
                                                {/* here will be functional for selected data for delete method for backend */}
                                                <MdDelete className="text-slate-500 cursor-pointer" size={15} />
                                            </div>
                                        ) : (
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4"
                                            />
                                        )}
                                    </th>
                                    <th className="p-6 text-left"></th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Date/Time</th>
                                    <th className="p-4 text-left">Invoice ID</th>
                                    <th className="p-4 text-left">Activity</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {allFilterData.map((user, i) => (
                                    <tr key={i} className="border-b border-black/20">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?._id)}
                                                onChange={() => toggleSelectUser(user?._id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-0">
                                            <img src={user?.userPicture} alt="work alat" className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.userName} </p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{moment(user?.transactionTimeStamp).format('DD-MM-YYYY | HH:mm')}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.transactionId.slice(0,20)}...</td>
                                        <td className="p-4 text-[15px] capitalize">{user?.des}</td>
                                        <td className="p-4 text-[15px] capitalize">
                                            £{user?.transactionAmount} (  { user?.des !== "Membership Purchase" ?  `${user?.points} Points` : `${user?.points} Leads`} )
                                        </td>
                                        <td className={`p-4 text-[15px] capitalize ${user?.transactionStatus == "success" ? "text-[#04842F]" : user?.transactionStatus == "pending" ? "text-[#FFBE00]" :( user?.transactionStatus == "cancelled" || user?.transactionStatus == "failed"  || user?.transactionStatus == "fail" || user?.transactionStatus =="refunded" )&& "text-[#FE321F]"}`}>{user?.transactionStatus}</td>
                                        <td className="p-4">
                                            {/* this button will be connected with backend for some function or operation */}
                                            <div className="flex justify-end gap-2 items-center">
                                                {
                                                    user?.transactionStatus === "success" && <button className="bg-[#FFBE00] px-4 py-2 text-white font-semibold rounded-md" onClick={()=>{initiateRefund(user?._id)}}>Refund</button>
                                                }
                                                <button onClick={() => openModal(user)} className="bg-[#242424] px-8 py-2 text-white font-semibold rounded-md">View</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* modal */}
                {modalData && (
                    <ActivitiesModal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        content={
                            <div className="py-3 px-2  flex-wrap  break-words text-wrap">
                                <div className="flex justify-end flex-wrap  break-words text-wrap">
                                    <button onClick={closeModal} style={{fontSize : "1.4rem"}}><IoMdClose /></button>
                                </div>
                                <div className="flex pb-2 ">
                                    <img className="w-[60px] h-[60px] object-cover" src={modalData?.userPicture} alt="work alat" />

                                    <div className="px-2">
                                        <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center  flex-wrap break-words text-wrap">{modalData?.userName} <span className="text-sm font-thin lowercase flex gap-0 items-center">
                                           {modalData?.userVerify && <HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" /> } 
                                           {modalData?.userKycVerify && <GiCheckedShield className="size-[12px] text-[#F76C10]" /> } 
                                            </span></h2>
                                        <p className="text-sm font-semibold capitalize break-words text-wrap my-2 flex-wrap">Invoice ID: {modalData.transactionId}</p>
                                        <p className="text-sm font-semibold capitalize">Status: {modalData.transactionStatus}</p>
                                    </div>
                                </div>

                                <div className="pt-3 mb-2 overflow-x-hidden overflow-y-scroll hiddenScroll h-[250px]">
                                    <ul className="py-1">
                                        <li className="py-1">
                                            <p className="font-semibold text-[15px]">Amount</p>
                                            <p className="text-[15px] text-[#323C47]">{modalData?.points} Points (£{modalData?.transactionAmount})</p>
                                        </li>
                                        <li className="py-1">
                                            <p className="font-semibold text-[15px]">Activity</p>
                                            <p className="text-[15px] text-[#323C47] capitalize">{modalData?.des}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                    />)}
            </div>
        </div>
      )
    }
        
        </>

    );
}