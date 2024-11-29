"use client";

import { allAdmins } from "@/utils/usersData";
import { useEffect, useState } from "react";
import Menus from "../Menus/Menus";
import { FaArrowRight } from "react-icons/fa6";
import { AiFillCloseSquare, AiOutlineControl } from "react-icons/ai";
import AdministratorModal from "./AdministratorModal";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import moment from "moment";

export default function Administrator() {
  // here users will be dynamically form the backend. for now i useing "import {allAdmins} from "@utils/usersData"" as a demo users data

  // States for user data, filtering, and search
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [userType, setUserType] = useState("all"); // To filter by user type
  const [filteredUsers, setFilteredUsers] = useState(allAdmins); // For the filtered data

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

  // Filtering users based on the selected user type
  useEffect(() => {
    let result = allAdmins;

    // Filter by user type
    if (userType !== "all") {
      result = result.filter((user) => user.status.toLowerCase() === userType);
    }

    setFilteredUsers(result);
  }, [userType]);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // BACKEND INTEGRATION
  const {
    allAdmin,
    verifyAdmin,
    createNewAdmin
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [allAdminsData, setAllAdminsData]: any = useState([]);
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
      let res = await allAdmin();
      if (res?.status === 200 || res?.data?.status === "success") {
        setAllAdminsData(res?.data?.data?.reverse());
        setAllFilterData(
            res?.data?.data?.reverse(),
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
            if(res?.data?.data?.status === "system" || res?.data?.data?.status === "user" ){
            getData();
            setLoading2(false);
        }
        else{
            router.push("/admin");
        }
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


  async function manageAdmin(id) {
    try {
        console.log(id);
    } catch (e) {
      // console.log(e);
      generateSnackbar("Something went wrong, please Try Again.", "error");
    }
  }

  async function createAdmin(e) {
    try {
      e.preventDefault();
      let res = await createNewAdmin(newAdmin);
      if (res?.status === 200 || res?.data?.status === "success") {
        setNewAdmin({
          admin_name : "",
          admin_email : "",
          admin_password : "",
          admin_status : "user",
        });
        closeModal();
        generateSnackbar(
          res?.data?.message,
        "success"
      );
      router.refresh();
      } else {
        generateSnackbar(
          res?.response?.data?.message ||
            "Some error occurred, Please Try Again.",
          "error"
        );
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
        <>
         <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Administrators</h4>
                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h3 className="text-black font-bold text-[20px]">{totalUsers} Records</h3>

                    <div className="flex items-center gap-3 justify-end">
                        <select
                            name="users"
                            className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                            value={userType}
                            onChange={(e) =>{ 
                              setUserType(e.target.value);
                              if(e.target.value === "all"){ 
                                setAllFilterData(allAdminsData);
                                setTotalUsers(allAdminsData?.length);
                              }
                            else if(e.target.value === "user"){
                                let filteredUsers = allAdminsData?.filter((val : any)=>{ if(val?.admin_status === "user"){return(val)}});
                                setAllFilterData(filteredUsers);
                                setTotalUsers(filteredUsers?.length);
                            }   
                            else if (e.target.value === "support"){
                              let filteredUsers = allAdminsData?.filter((val : any)=>{ if(val?.admin_status === "support"){return(val)}});
                              setAllFilterData(filteredUsers);
                              setTotalUsers(filteredUsers?.length);
                            }   
                            else if(e.target.value === "system"){
                              let filteredUsers = allAdminsData?.filter((val : any)=>{ if(val?.admin_status === "system"){return(val)}});
                              setAllFilterData(filteredUsers);
                              setTotalUsers(filteredUsers?.length);
                            } 
                            }}
                        >
                            <option className="bg-[#07242B] text-white" value="all">All Users</option>
                            <option className="bg-[#07242B] text-white" value="user">User Admin</option>
                            <option className="bg-[#07242B] text-white" value="support">Customer Support Admin</option>
                            <option className="bg-[#07242B] text-white" value="system">System Admin</option>
                        </select>

                        <button onClick={openModal} className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#07242B] text-white">Create Admin <FaArrowRight className="size-[15px] text-white" /></button>
                    </div>
                </div>

                <div className="w-full pt-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="py-2 border-y border-black">
                                <tr>
                                    <th className="p-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4"
                                        />
                                    </th>
                                    <th className="p-6  text-left"></th>
                                    <th className="p-4 text-left">Username</th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Level</th>
                                    <th className="p-4 text-left"></th>
                                    <th className="p-4 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  allFilterData?.length < 1
                                
                                ?
                                <>
                                   <tr>
                                    <td className="text-center p-4">No administrators found</td>
                                  </tr>
                                </>
                                 :
                                
                                allFilterData.map((user:any) => (
                                    <tr key={user?._id} className="border-b border-black">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?._id)}
                                                onChange={() => toggleSelectUser(user?._id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-0">
                                            <img src={user?.adminPictureLink} alt={user?.admin_name} className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] capitalize">{user?.admin_name}</p>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold capitalize text-[20px]">{user?.admin_name}</p>
                                                <p className="text-gray-500 text-[15px]">{user?.admin_email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.admin_status ==="support" ? `Customer ${user?.admin_status}` :user?.admin_status } Admin</td>
                                        {/* <td className="p-4 text-[15px] capitalize">{user?.country}</td> */}
                                        <td className="p-4">
                                            {/* this is manage button. in this figma i didn't seeing what will open here but i think it must would be dynamic and connected with backend */}
                                            <button className="bg-[#FFBE00] text-black px-4 py-3 rounded flex justify-center items-center gap-2 text-[15px]">
                                                <AiOutlineControl className="rotate-90 text-black size-[15px] xl:size-[20px]" /> Manage
                                            </button>
                                        </td>
                                        <td className="p-4"></td>
                                        <td className="p-4"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal */}

                        {/* in this modal have form for create admin. so here form i did with demo data but it need to make dynamic with backend and make for CRUD operation */}
                        {isModalOpen && (
                            <AdministratorModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                                        <div className="bg-white w-full h-auto sm:w-[420px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                            <button className="ms-auto block" onClick={closeModal}>
                                                <AiFillCloseSquare className="size-[20px]" />
                                            </button>
                                            <div className="w-full text-center">
                                                <h4 className="font-semibold text-[20px]">Create Admin</h4>
                                                <form className="w-full" onSubmit={createAdmin}>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="fullName" className="block pb-2 font-semibold">Full Name</label>
                                                        <input type="text" id="fullName"  value={newAdmin?.admin_name} onChange={(e : any) => {setNewAdmin({...newAdmin, admin_name : e.target.value})}} name="fullName" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="Name" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="email" className="block pb-2 font-semibold">Email</label>
                                                        <input type="email" id="email" name="email" value={newAdmin?.admin_email} onChange={(e : any) => {setNewAdmin({...newAdmin, admin_email : e.target.value})}} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="Email" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="password" className="block pb-2 font-semibold">Password</label>
                                                        <input type="password" id="password" name="password" value={newAdmin?.admin_password} onChange={(e : any) => {setNewAdmin({...newAdmin, admin_password : e.target.value})}} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" placeholder="***********" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="level" className="block pb-2 font-semibold">Level</label>
                                                        <select name="status" id="level" className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" value={newAdmin.admin_status} onChange={
                                                          (e : any)=>{setNewAdmin({...newAdmin, admin_status : e.target.value})}
                                                        }>
                                                            <option value="user">User Admin</option>
                                                            <option value="support">Customer Support Admin</option>
                                                            <option value="system">System Admin</option>
                                                        </select>
                                                    </div>

                                                    <div className="py-2 text-start">
                                                        <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Create Admin <FaArrowRight className="size-[15px] text-black" /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        )}
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