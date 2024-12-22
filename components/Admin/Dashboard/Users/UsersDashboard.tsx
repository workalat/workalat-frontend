'use client'

import { useEffect, useState } from "react";
import Menus from "../Menus/Menus"
import { allUsersData } from "@/utils/usersData";
import { AiFillCloseSquare, AiOutlineControl, AiOutlineSearch } from "react-icons/ai";
import UserModal from "./UserModal";
import { FaArrowRight } from "react-icons/fa6";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { GiConfirmed } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import moment from "moment";

export default function UsersDashboard() {

    // here users will be dynamically form the backend. for now i useing "import {allUsersData} from "@utils/usersData"" as a demo users data

    // States for user data, filtering, and search
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // To filter by user type
    const [searchQuery, setSearchQuery] = useState(''); // To search by name or username
    const [filteredUsers, setFilteredUsers] = useState(allUsersData); // For the filtered data

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user: any) => user.id));
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

    // Filtering users based on the selected user type and search query
    useEffect(() => {
        let result = allUsersData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user: any) => user.status.toLowerCase() === userType);
        }

        // Filter by search query (userDisplayName or username)
        if (searchQuery) {
            result = result.filter((user: any) =>
                user.userDisplayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [userType, searchQuery]);

    // modal
    const [modalData, setModalData] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = (data: any) => {
    //     setModalData(data);
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    }; 




    

     // BACKEND INTEGRATION
     const {allUsers, verifyAdmin, singleUser,changeUserStatus, addPoints, accessUserAccount} : any  = useUserContext();
     const [loading2, setLoading2] : any  = useState(true);
     let [allClientsData, setAllClientsData] : any = useState([]);
     let [allProfessionalData, setAllProfessionalData] : any = useState([]);
     let [allFilterData, setAllFilterData] : any = useState([]);
     const { generateSnackbar } : any  = useSnackbar();
     let router = useRouter();
     let [choice, setChoice] = useState("access");
     let [points, setPoints] = useState(0);
     let [totalUsers, setTotalUsers] = useState(0);


     async function getData() {
        setLoading2(true);
      try {
        let res = await allUsers();
        if (res?.status === 200  || res?.data?.status === "success" ) {
           setAllClientsData(res?.data?.data?.clientsData?.reverse());
           setAllProfessionalData(res?.data?.data?.professioanlData?.reverse());
           setAllFilterData([...res?.data?.data?.clientsData?.reverse(),...res?.data?.data?.professioanlData?.reverse()])
           setTotalUsers(res?.data?.data?.clientsData?.length + res?.data?.data?.professioanlData?.length)
           setLoading2(false);
          } else {
            generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    }
 

     useEffect(()=>{
        async function verify(){
            try{
                setLoading2(true);
                let adminToken : any = Cookies.get("adminToken");
                
                if(adminToken !== undefined){
                    let res : any = await verifyAdmin({adminToken});
                    if(res?.status === 200 || res?.data?.status === "success" || res?.data?.data?.verify === true){
                        getData();
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

    
    const openModal = async (id: any, userType) => {
        try{
            let res = await singleUser({userId : id, userType});
            if(res?.status === 200 || res?.data?.status === "success"){
                setModalData(res?.data?.data);
                setIsModalOpen(true);
            }
            else{
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error"); 
            }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Some error occurred, Please Try Again.", "error"); 
        }
    };


    async function changeAccountStatus(userId, userType,userChoice){
        try{
                let res : any = await changeUserStatus({
                    userId,
                    userType,
                    choice : userChoice
                });
                if(res?.status === 200 || res?.data?.status === "success" || res?.data?.data?.verify === true){
                    router.refresh();
                    generateSnackbar( res?.data?.message , "success"); 
                }   
                else{
                    generateSnackbar("Something went wrong, please Try Again.", "error");   
                }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Something went wrong, please Try Again.", "error");   
        }
    };

    async function assignPoints(userId){
        try{
                let res : any = await addPoints({
                    userId,points
                });
                if(res?.status === 200 || res?.data?.status === "success" || res?.data?.data?.verify === true){
                    generateSnackbar( res?.data?.message , "success"); 
                }   
                else{
                    generateSnackbar("Something went wrong, please Try Again.", "error");   
                }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Something went wrong, please Try Again.", "error");   
        }
    };

    async function accessAccount(userId , userType){
        try{
                let res : any = await accessUserAccount({
                    userId, userType
                });
                if(res?.status === 200 || res?.data?.status === "success"){
 
                    Cookies.set("token", res?.data?.data?.token, { secure: true, sameSite: 'None' });
                    Cookies.set("userType", res?.data?.data?.userType, { secure: true, sameSite: 'None' });

                    window.open(`/${res?.data?.data?.userType}/dashboard`, "_blank");
                }   
                else{
                    generateSnackbar("Something went wrong, please Try Again.", "error");   
                }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Something went wrong, please Try Again.", "error");   
        }
    };



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if(e.target.value.length <0){        
        setAllFilterData(allClientsData,allProfessionalData);
    }

    const filteredClients = allClientsData.filter(client =>
      client.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const filteredProfessionals = allProfessionalData.filter(professional =>
      professional.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setAllFilterData([...filteredClients,...filteredProfessionals]);
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
        <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

            {/* heading of the users dashboard */}

            {/* users type selector */}
            <select
                name="users"
                className="bg-[#FFBE00] text-[15px] py-2 font-semibold rounded-md px-2 ring-2 ring-[#FFBE00] outline-none border-none cursor-pointer mt-3"
                value={userType}
                onChange={(e) => {
                    setUserType(e.target.value);    
                    if(e.target.value === "client"){
                        setAllFilterData(allClientsData);
                        setTotalUsers(allClientsData?.length);
                    }   
                    else if (e.target.value === "professional"){
                        setAllFilterData(allProfessionalData);
                         setTotalUsers(allProfessionalData?.length);
                    }   
                    else if(e.target.value === "all"){
                        setAllFilterData([...allClientsData,...allProfessionalData]);
                         setTotalUsers(allClientsData?.length + allProfessionalData?.length) 
                    }          
                }}
            >
                <option className="bg-[#07242B] text-white" value="all">All Users</option>
                <option className="bg-[#07242B] text-white" value="client">Clients</option>
                <option className="bg-[#07242B] text-white" value="professional">Professional</option>
            </select>

            {/* header */}
            <div className="flex justify-between items-center pt-5">
                <h3 className="text-black font-bold text-[20px]">{totalUsers} Records</h3>

                <div className="flex items-center justify-end">
                    {/* search box */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 w-[250px]">
                        <AiOutlineSearch className="size-[20px] text-[#909090]" />
                        <input
                            type="search"
                            placeholder="Search Name/Username"
                            className="outline-none bg-transparent ml-2 text-gray-500 placeholder-gray-400 w-full py-1"
                            value={searchQuery}
                            onChange={
                                handleSearch
                            }
                        />
                    </div>
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
                                <th className="p-6 text-left"></th>
                                <th className="p-4 text-left">User ID</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Status</th>
                                {/* <th className="p-4 text-left">Country</th> */}
                                <th className="p-4 text-left"></th>
                                <th className="p-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allFilterData.map((user: any) => (
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
                                        <img src={user?.userPictureLink} alt={user?.userName} className="w-12 h-12 rounded-full mr-2 object-cover" />
                                    </td>
                                    <td className="p-4">
                                        <p className="text-[15px]">{user?._id.slice(0,15)}...</p>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-bold capitalize text-[20px]">{user?.userName}</p>
                                            <p className="text-gray-500 text-[15px]">{user?.userEmail}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[15px] capitalize">{user?.userType}</td>
                                    {/* <td className="p-4 text-[15px] capitalize">{user?.country}</td> */}
                                    <td className="p-4">
                                        <button onClick={() => openModal(user?._id, user?.userType)} className="bg-[#07242B] text-white px-4 py-2 rounded flex justify-center items-center gap-2 text-[15px]">
                                            <AiOutlineControl className="rotate-90 text-white size-[15px] xl:size-[20px]" /> View
                                        </button>
                                    </td>
                                    <td className="p-4 flex flex-col gap-2">

                                        {/* the action buttons are currently act as demo it need to connect backend for taking action on the user with Put or patch method in api */}

                                        <button className="bg-[#FFBE00] text-black px-2 py-2 rounded text-[12px] xl:text-[15px] font-bold" onClick={(e : any)=>{
                                            // setChoice("access");
                                            accessAccount(user?._id, user?.userType)
                                            // changeAccountStatus(user?._id, user?.userType, "access");
                                        }}>Access Account</button>
                                        <button className={`${ user?.userStatus ? "bg-[#FE321F]" : "bg-[#115a11]" } text-white px-2 py-2 rounded flex items-center text-[12px] xl:text-[15px] justify-center gap-2 font-semibold`} onClick={(e : any)=>{
                                            setChoice( user?.userStatus ?"ban" : "access");
                                            changeAccountStatus(user?._id, user?.userType,  user?.userStatus ?"ban" : "access");
                                        }}>
                                            {
                                                user?.userStatus ? <AiFillCloseSquare className="text-white size-[15px] xl:size-[20px]"  />  : <GiConfirmed className="text-white size-[15px] xl:size-[20px]"  /> 
                                            }
                                            { user?.userStatus?"Ban" : "Access"} Account
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    {/* modal */}

                    {/* in this modal have form for manage user and taking action. so here form i did with demo data but it need to make dynamic with backend and make for CRUD operation */}
                    {modalData && (
                        <UserModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            content={
                                <div className="w-full flex-col sm:flex-row max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto flex gap-3 justify-center items-start">
                                    <div className="bg-white w-full h-screen sm:w-[420px] sm:max-h-[85vh] p-3 rounded-md overflow-y-auto hiddenScroll">
                                        <button className="ms-auto block" onClick={closeModal}>
                                            <AiFillCloseSquare className="size-[20px]" />
                                        </button>
                                        <div className="w-full text-center">
                                            <h4 className="font-semibold text-[20px]">Manage User</h4>
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="fullName" className="block pb-2 font-semibold">Full Name</label>
                                                    <input type="text" id="fullName" name="fullName" defaultValue={modalData?.userFullName} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2 capitalize" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="userId" className="block pb-2 font-semibold">User ID</label>
                                                    <input type="text" id="userId" name="userId" defaultValue={modalData?.userId} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    { 
                                                    modalData?.userType === "professional" && 
                                                        <>
                                                            <label htmlFor="businessName" className="block pb-2 font-semibold">Business Name</label>
                                                            <input type="text" id="businessName" name="businessName" defaultValue={modalData?.userCompanyName} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" />
                                                        </>
                                                    }
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="status" className="block pb-2 font-semibold">User Type</label>
                                                    <input type="text" id="status" name="status" defaultValue={modalData?.userType} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2 capitalize" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="country" className="block pb-2 font-semibold">Country</label>
                                                    <input type="text" id="country" name="country" defaultValue={modalData?.userCountry} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2 capitalize" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="userEmail" className="block pb-2 font-semibold">Email</label>
                                                    <input type="email" id="userEmail" name="userEmail" defaultValue={modalData?.userEmail ? modalData?.userEmail  : ""} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="userPhone" className="block pb-2 font-semibold">Phone Number</label>
                                                    <input type="number" id="userPhone" name="userPhone" defaultValue={modalData?.userPhoneNo ? modalData?.userPhoneNo  : ""} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="registered" className="block pb-2 font-semibold">Registered</label>
                                                    <input type="text" id="registered" name="registered" defaultValue={ moment(modalData?.accountCreationDate).format("DD/MM/YYYY HH:mm")} className="w-full ring-[1px] ring-gray-700 rounded-md px-3 py-2" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="sm:w-[350px] w-full h-screen overflow-y-auto sm:h-auto sm:overflow-hidden">
                                        <div className="w-full bg-white p-3 rounded-md">
                                            <h4 className="text-center font-semibold text-[20px]">Activity</h4>
                                            <form className="w-full">
                                                <div className="py-2">
                                                    <label htmlFor="activity" className="block pb-2 font-semibold">Activity</label>
                                                    <input type="text" defaultValue={`Registered as ${modalData?.userRegisterAs}`} className="capitalize  w-full py-2 px-3 ring-[1px] ring-gray-600 outline-none border-none rounded-md" />
                                                </div>
                                                <div className="py-2">
                                                    <label htmlFor="lastlog" className="block pb-2 font-semibold">Last Login</label>
                                                    <input type="text" id="lastlog" className="w-full py-2 px-3 ring-[1px] ring-gray-600 outline-none border-none rounded-md" defaultValue={ moment(modalData?.lastLoginDate).format("DD/MM/YYYY HH:mm")} />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="w-full bg-white p-3 rounded-md mt-3">
                                            <h4 className="text-center font-semibold text-[20px]">Action</h4>
                                            <form className="w-full" onSubmit={(e)=>{
                                                        e.preventDefault();
                                                        changeAccountStatus(modalData?.userId, modalData?.userType, choice);
                                                    }}>
                                                <div className="py-2">
                                                    <label htmlFor="action" className="block pb-2 font-semibold">Action</label>
                                                    <select className="w-full py-2 px-3 ring-[1px] ring-gray-600 outline-none border-none rounded-md" value={choice} onChange={(e : any)=>{setChoice(e.target.value)}} name="action" id="action">
                                                        <option value="access">Access account</option>
                                                        <option value="ban">Ban account</option>
                                                    </select>
                                                </div>
                                                <div className="py-2">
                                                    <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Continue <FaArrowRight className="size-[15px] text-black" /></button>
                                                </div>
                                            </form>
                                            {
                                                modalData?.userType === "professional" && 
                                                <>
                                                <form className="w-full" onSubmit={(e)=>{
                                                    e.preventDefault();
                                                    assignPoints(modalData?.userId);
                                                }}>
                                                    <div className="py-2">
                                                        <label htmlFor="assign" className="block pb-2 font-semibold">Assign point</label>
                                                        <input type="text" placeholder="Type" value={points} onChange={(e : any)=>{setPoints(e.target.value)}} className="w-full py-2 px-3 ring-[1px] ring-gray-600 outline-none border-none rounded-md" />
                                                    </div>
                                                    <div className="py-2">
                                                        <button className="py-3 px-4 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 bg-[#FFBE00]">Save <FaArrowRight className="size-[15px] text-black" /></button>
                                                    </div>
                                                    </form>
                                                </>
                                            }
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
      )
    }
        </>
    )
}
