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
  let router = useRouter();
  let [choice, setChoice] = useState("access");
  let [points, setPoints] = useState(0);
  let [totalUsers, setTotalUsers] = useState(0);

  let [newAdmin, setNewAdmin] = useState({
    admin_name : "",
    admin_email : "",
    admin_password : "",
    admin_status : "user",
  })


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
        console.log(transactionId);
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

                    <Link className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" href="/admin/activities/membership">
                        Membership Activity
                    </Link>
                </div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{totalUsers} Records</h4>
                    {/* users type selector */}
                    <select
                        name="users"
                        className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => {
                            setUserType(e.target.value);
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
                            
                        }}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="success">Success</option>
                        <option className="bg-[#07242B] text-white" value="pending">Pending</option>
                        <option className="bg-[#07242B] text-white" value="fail">Failed</option>
                        <option className="bg-[#07242B] text-white" value="refunded">Refunded</option>
                    </select>
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
                                            £{user?.transactionAmount} ({user?.points} Points)
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
                            <div className="py-3 px-2">
                                <div className="flex pb-2">
                                    <img className="w-[60px] h-[60px] object-cover" src={modalData?.userPicture} alt="work alat" />

                                    <div className="px-2">
                                        <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{modalData?.userName} <span className="text-sm font-thin lowercase flex gap-0 items-center">
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