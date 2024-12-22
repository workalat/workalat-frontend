"use client"

import { activitiesData } from "@/utils/activitiesData";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Menus from "../../Menus/Menus";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
 


import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function Membership() {
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





       // BACKEND INTEGRATION
  const {
    membershipPageData,
    verifyAdmin,
    changeMembershipStatus
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [allData, setAllData]: any = useState([]);
  let [allFilterData, setAllFilterData]: any = useState([]);
  const { generateSnackbar }: any = useSnackbar();
  let router = useRouter();
  let [totalUsers, setTotalUsers] : any = useState(0);
    const [searchTerm, setSearchTerm] : any = useState(""); // Search term for filtering




  async function getData() {
    setLoading2(true);
    try {
      let res = await membershipPageData();
      console.log(res);
      if (res?.status === 200 || res?.data?.status === "success") {
        setAllData(res?.data?.data.reverse());
        setAllFilterData(
            res?.data?.data.reverse()
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


  async function membershipStatus(professoinalId : string, choice, sessionId) {
    try {
        let res: any = await changeMembershipStatus({ professoinalId, choice,sessionId});
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

                  <div className="flex gap-3 items-center">

                  <Link className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" href="/admin/activities">
                        Membership History
                    </Link>
                    
                    <button  className="block bg-[#FFBE00] text-[15px] font-semibold text-black px-4 py-3 rounded-md" onClick={downloadData}>Downloads</button>
                  </div>

                </div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px]">{totalUsers} Records</h4>
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
                                      }
                                      else{
                                        let filter = allData?.filter((val)=>{
                                          if(val?.professionalFullName?.includes(e.target.value)){
                                            return(val);
                                          }
                                        });
                                        setAllFilterData(filter);
                                        setTotalUsers(filter?.length);
                                      }
                                    }}
                                />
                            </div>
                        </div>
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
                            else if (e.target.value === "active"){
                                let data = allData.filter((val)=>{if(val.membershipStatus === "active"){return(val)}});
                                setAllFilterData(data);
                                setTotalUsers(data?.length);
                            }   
                            else if(e.target.value === "pending"){
                                let data = allData.filter((val)=>{if(val.membershipStatus === "pending"){return(val)}});
                                setAllFilterData(data);
                                setTotalUsers(data?.length);
                            } 
                            else if(e.target.value === "cancelled"){
                                let data = allData.filter((val)=>{if(val.membershipStatus === "cancelled"){return(val)}});
                                setAllFilterData(data);
                                setTotalUsers(data?.length);
                            } 
                            else if(e.target.value === "request cancellation"){
                                let data = allData.filter((val)=>{if(val.membershipStatus === "request cancellation"){return(val)}});
                                setAllFilterData(data);
                                setTotalUsers(data?.length);
                            }
                            else if(e.target.value === "expired"){
                                let data = allData.filter((val)=>{if(val.membershipStatus === "expired"){return(val)}});
                                setAllFilterData(data);
                                setTotalUsers(data?.length);
                            }
                          }}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="active">Active</option>
                        <option className="bg-[#07242B] text-white" value="pending">Pending </option>
                        <option className="bg-[#07242B] text-white" value="cancelled">Cancelled </option>
                        <option className="bg-[#07242B] text-white" value="request cancellation">Request Cancellation</option>
                        <option className="bg-[#07242B] text-white" value="expired">Expired </option>
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
                                    <th className="p-4 text-left">User ID</th>
                                    <th className="p-4 text-left">Date Activated</th>
                                    <th className="p-4 text-left">Current Status</th>
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
                                            <img src={user?.professionalPictureLink} alt="work alat" className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.professionalFullName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?._id}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{moment(user?.memberShipExpirationDate).subtract(30, 'days').format('MMM, DD, YYYY | hh:mm A')}</td>
                                        <td className="p-4 text-[15px] capitalize">
                                             <p className={`text-[13px] capitalize ${user?.membershipStatus === "active" ? "text-[#00A770]" : user?.membershipStatus === "pending" ? "text-[#FFBE00]"  :"text-[#C8102E]" }  font-semibold`}>{user?.membershipStatus}</p> 
                                        </td>
                                        <td className="p-4 text-end">
                                            {/* this button will be connected with backend for some function or operation */}

                                            {
                                                user?.membershipStatus === "active" || user?.membershipStatus === "request cancellation" ? <button className="bg-[#F52933] px-3 py-2 text-white font-semibold rounded-md flex items-center justify-center gap-1 mx-auto" onClick={()=>{membershipStatus(user?._id, "cancelled",user?.sessionId)}} ><IoMdClose className="text-[17px] text-white" /> Cancel Membership</button>
                                                    :
                                                    user?.membershipStatus === "cancelled" ? <></> :
                                                    <button className="bg-[#242424] mx-auto flex items-center justify-center px-4 py-2 text-white font-semibold rounded-md" onClick={()=>{membershipStatus(user?._id, "active", user?.sessionId)}}>Active Membership</button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      )
    }
      
      </>
    );
}