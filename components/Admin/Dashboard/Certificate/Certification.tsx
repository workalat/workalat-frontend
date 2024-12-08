'use client'

import { useEffect, useState } from "react";
import Menus from "../Menus/Menus" 
import { certificate } from "@/utils/certificationData";
import CertificationModal from "./CertificationModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import { PiFilesDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import moment from "moment";

export default function Certification() {
    // here users will be dynamically from the backend. for now i using "import {certificate} from "@utils/certificationData"" as a demo certificate users data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // To filter by user type
    const [filteredUsers, setFilteredUsers] = useState(certificate); // For the filtered data

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
        let result = certificate;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);

    // modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>();

   

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const {showAllCertificate, showSingleCertificate,verifyAdmin,changeCertificateStatus} : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);
    let [allCertificateData, setAllCertificateData] : any = useState([]);
    let [currentUser, setCurrentUser] : any = useState("");
    let [currentCertificate, setCurrentCertificate] : any = useState("");
    let [allFilterData, setAllFilterData] : any = useState([]);
    let [comment, setComment] : any = useState("");
    const { generateSnackbar } : any  = useSnackbar();
    let [questionTitle, setQuestionsTitle] = useState("");
    let router = useRouter();

        async function getData() {
            setLoading2(true);
          try {
            let res = await showAllCertificate();
            console.log(res);
            if (res?.status === 200 || res?.data?.status === "success") {
                setAllCertificateData(res?.data?.data?.reverse());
                setAllFilterData(res?.data?.data?.reverse());
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
                        if(res?.data?.data?.status === "system" || res?.data?.data?.status === "user" ){
                            getData();
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


      const openModal = (certificateId: any, userId : any) => {
        async function getData() {
          try {
            let res = await showSingleCertificate({id : certificateId});
            if (res?.status === 200 || res?.data?.status === "success") {
                console.log(res?.data?.data?.certifications[0])
               setModalData(res?.data?.data?.certifications[0]);
               setComment(res?.data?.data?.certifications[0]?.adminComment)
               setCurrentUser(userId);
               setCurrentCertificate(certificateId);
               setIsModalOpen(true);
              } else {
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
              }
          } catch (e) {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
        }
        getData();
    };



    const changeKyc = async (choice : any) => {
        try {
            console.log(currentUser,currentCertificate,choice,comment)
            let res = await changeCertificateStatus({
                professionalId : currentUser,
                certificationId : currentCertificate,
                adminComment : comment,
                choice : choice
            });
            if (res?.status === 200 || res?.data?.status === "success") {
                generateSnackbar(res?.data?.message , "success");
                closeModal();
                router.refresh();
              } else {
                generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
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
        <> 
         <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Certification</h4>
                {/* users type selector */}


                {/* header */}
                <div className="flex justify-end items-center pt-5">
                    <select
                        name="users"
                        className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => {
                            setUserType(e.target.value);
                            if(e.target.value === "all"){
                                setAllFilterData(allCertificateData);
                            }   
                            else if (e.target.value === "pending"){
                                let data = allCertificateData.filter((val)=>{if(val.status === "pending"){return(val)}});
                                setAllFilterData(data);
                            }   
                            else if(e.target.value === "approved"){
                                let data = allCertificateData.filter((val)=>{if(val.status === "approved"){return(val)}});
                                setAllFilterData(data);
                            } 
                            else if(e.target.value === "rejected"){
                                let data = allCertificateData.filter((val)=>{if(val.status === "rejected"){return(val)}});
                                setAllFilterData(data);
                            }
                            ;
                        }}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="pending">Pending</option>
                        <option className="bg-[#07242B] text-white" value="approved">Approved</option>
                        <option className="bg-[#07242B] text-white" value="rejected">Rejected</option>
                    </select>
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
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">User ID</th>
                                    <th className="p-4 text-left">Date Submitted</th>
                                    <th className="p-4 text-left">Time</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFilterData.map((user) => (
                                    <tr key={user?.userId} className="border-b border-black">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?.userId)}
                                                onChange={() => toggleSelectUser(user?.userId)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.professionalName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.userId}</p>
                                        </td>
                                    <td className="p-4 text-[15px] capitalize">{moment(user?.timeStamp).format("DD-MM-YYYY")}</td>
                                    <td className="p-4 text-[15px] capitalize">{moment(user?.timeStamp).format("HH:mm A")}</td>
                                        <td className={`p-4 text-[15px] capitalize ${user?.status == "approved" ? "text-[#04842F]" : user?.status == "pending" ? "text-[#FFBE00]" : user?.status == "rejected" && "text-[#FE321F]"}`}>{user?.status}</td>
                                        <td className="p-4">
                                            <button onClick={() => openModal(user?.certificateId,user?.userId)} className="bg-transparent border-2 border-[#FFBE00] text-black px-4 py-2 font-semibold rounded flex justify-center items-center gap-2 text-[15px]">Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* modal */}

                        {/* in this modal have form for manage order. so here form i did with demo data but it need to make dynamic with backend and make for CRUD operation */}
                        {modalData && (
                            <CertificationModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                content={
                                    <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                                        <div className="bg-white w-full h-auto sm:w-[520px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                            <button className="ms-auto block" onClick={closeModal}>
                                                <IoCloseCircleOutline className="size-[20px]" />
                                            </button>
                                            <div className="w-full text-center">
                                                <h4 className="font-semibold text-[20px] capitalize">Manage Certification</h4>
                                                <div className="w-[250px] h-2 bg-slate-200 rounded-md mx-auto my-4">
                                                    <div className={`w-full transition-all duration-300 rounded-md h-full bg-black`}></div>
                                                </div>
                                            </div>
                                            <div className="w-full border border-black rounded-md py-2 px-3">
                                                <div className="pt-1 flex flex-wrap">
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Certificate</label>
                                                        <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" readOnly type="text" defaultValue={modalData?.certificateTitle} />
                                                    </div>
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Expiration Date</label>
                                                        <div className="flex flex-wrap gap-3">
                                                            <input className="w-full md:w-[48.5%] border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" readOnly type="text" placeholder="Month" defaultValue={modalData?.certificateExpirationMonth} />
                                                            <input className="w-full md:w-[48.5%] border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" readOnly type="text" placeholder="Year"  defaultValue={modalData?.certificateExpirationYear} />
                                                        </div>
                                                    </div>
                                                    <div className="py-2 w-full px-1">
                                                        <label className="block pb-1">Uploaded File</label>
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-auto flex gap-2 cursor-pointer">
                                                                <a href={`${modalData?.certificationImage}`} target="_blank" rel="noreferrer" download={true}  className="size-[25px] text-black/60 flex justify-start items-center w-[100%]" >
                                                                    <PiFilesDuotone className="size-[25px] text-black/60" />Certification Image
                                                                </a>
                                                            </div>
                                                            {/* <select className="border rounded-md outline-none py-1 px-2 border-black/50" name="view" defaultValue={"View"}>
                                                                <option value="View" disabled>View</option>
                                                                <option value="Download">Download</option>
                                                                <option value="Preview">Preview</option>
                                                            </select> */}
                                                        </div>
                                                    </div>
                                                    <div className="pt-2 pb-1 px-1 w-full">
                                                        <form className="w-full">
                                                            <label htmlFor="comment" className="pb-1 block">Comment</label>
                                                            <textarea name="comment" id="comment" value={comment} onChange={(e : any) =>{setComment(e?.target?.value)}}  className="w-full h-32 outline-none border border-black/50 rounded-md px-2 py-1 text-[15px]" placeholder="Comment"></textarea>
                                                        </form>

                                                        <div className="flex gap-2 pt-3 flex-col sm:flex-row w-full">
                                                            <button className="text-black font-semibold px-4 py-2 bg-[#FFBE00] rounded-md w-full sm:w-1/2" onClick={()=>{changeKyc("approved")}}>Approve</button>
                                                            <button className="text-white font-semibold px-4 py-2 bg-[#FE321F] flex items-center justify-center rounded-md w-full sm:w-1/2"  onClick={()=>{changeKyc("rejected")}}><AiFillCloseSquare className="size-[15px] text-white" /> Reject</button>
                                                        </div>
                                                    </div>
                                                </div>
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
