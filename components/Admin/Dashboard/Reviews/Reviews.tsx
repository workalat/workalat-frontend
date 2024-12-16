'use client'

import { reviewsData } from "@/utils/reviewsData";
import { useEffect, useState } from "react";
import { MdDelete, MdOutlineStarOutline } from "react-icons/md";
import Menus from "../Menus/Menus";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import { Rating } from "@mui/material";
import ResponsesModal from "../Responses/ResponsesModal";
import { GiCheckedShield } from "react-icons/gi";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

export default function Reviews() {
    // here reviews will be dynamically from the backend. for now i using "import { reviewsData } from "@/utils/reviewsData";" as a demo review data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] = useState(reviewsData); // Filtered data

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

    // Filter users based on selected user type
    useEffect(() => {
        let result = reviewsData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user: any) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);





  // BACKEND INTEGRATION
  const {
    showAllReviews,
    verifyAdmin,
    deleteReview
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [allClientsData, setAllClientsData] : any = useState([]);
  let [allProfessionalData, setAllProfessionalData] : any = useState([]);
  let [allFilterData, setAllFilterData] : any = useState([]);
  const { generateSnackbar }: any = useSnackbar();
  let router = useRouter();
  let [totalUsers, setTotalUsers] = useState(0);

  const [isModalOpen, setIsModalOpen] : any = useState(false);
  const [modalData, setIsModalData] : any= useState({});
  const openModal = (data: any) => {
      setIsModalData(data);
      setIsModalOpen(true);
  }
  const closeModal = () => {
      setIsModalData({});
      setIsModalOpen(false);
  }

 
  async function getData() {
    setLoading2(true);
    try {
      let res = await showAllReviews();
      if (res?.status === 200 || res?.data?.status === "success") {
        setAllClientsData(res?.data?.data?.clientsData?.reverse());
        setAllProfessionalData(res?.data?.data?.professionalData?.reverse());
        setAllFilterData([...res?.data?.data?.clientsData?.reverse(), ...res?.data?.data?.professionalData?.reverse()]);

        setTotalUsers(res?.data?.data?.clientsData?.length + res?.data?.data?.professionalData?.length)
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
    };
    verify();
  }, []);



  async function deleteAReview(totalRatings, projectId, userType) {
    try {
      let res = await  deleteReview({projectId,totalRatings,userType})
      if (res?.status === 200 || res?.data?.status === "success") {
        generateSnackbar(
          res?.data?.message ,
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
  };
 


    return (
        <>
         {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <> 
            <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the reviews dashboard */}
                <h4 className="text-[20px] font-bold">Reviews</h4>

                {/* header */}
                <div className="flex justify-end items-center pt-5">
                    {/* users type selector */}
                    <select
                        name="users"
                        className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) =>{
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
                              setAllFilterData([...allClientsData, ...allProfessionalData]);
                              setTotalUsers(allClientsData?.length + allProfessionalData?.length) 
                          } 
                          }}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="client">Client</option>
                        <option className="bg-[#07242B] text-white" value="professional">Professional</option>
                    </select>
                </div>
                <div className="h-[1px] w-full bg-black mt-5"></div>


                <div className="w-full pt-7">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="py-2 border-b border-black/20">
                                <tr>
                                    <th className="p-4 text-left">
                                        {selectedUsers.length > 0 ? (
                                            <div className="flex items-center">
                                                <span className="text-slate-600 font-semibold mr-2 text-[15px] text-nowrap">{selectedUsers.length} selected</span>
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
                                    <th className="p-4 text-left">Project title</th>
                                    <th className="p-4 text-left">Review description</th>
                                    <th className="p-4 text-left">Review</th>
                                    <th className="p-4 text-left">User</th>
                                    <th className="p-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                allFilterData.map((user: any, i) => (
                                    <tr key={i} className="border-b border-black/20">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?.giverId)}
                                                onChange={() => toggleSelectUser(user?.giverId)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-0">
                                            <img src={user?.giverPictureLink} alt={user?.giverName} className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.giverName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.projectName}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.giverReview.slice(0.20)}...</td>
                                        <td className="p-4 text-[15px] capitalize w-[110px]">
                                            <Rating precision={0.1} value={user?.giverRating} style={{fontSize : ".9rem"}} readOnly />
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.userType}</td>
                                        <td className="p-4">
                                            {/* this buttons will be connected with backend for some function or operation */}
                                            <div className="flex items-center gap-2">
                                            <button className="text-[#00a770] cursor-pointer" onClick={() => openModal(user)}>View</button>
                                                <button onClick={()=>{deleteAReview(user?.giverRating, user?.projectId, user?.userType)}}><MdDelete className="text-[#F52933] cursor-pointer" size={17} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {modalData && (
                        <ResponsesModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            content={
                                <div className="py-3 px-2">
                                <div className="flex justify-end">
                                    <button onClick={closeModal} style={{fontSize : "1.4rem"}}><IoMdClose /></button>
                                </div>
                                    <div className="flex justify-between pb-2">
                                      
                                        <div className="flex">
                                            <img className="w-[60px] h-[60px] object-cover" src={modalData?.giverPictureLink} alt="work alat" />

                                            <div className="px-2">
                                                <h2 className="capitalize font-semibold text-[15px] flex gap-1 items-center">{modalData?.giverName} <span className="text-sm font-thin lowercase flex gap-0 items-center">
                                                  { modalData?.isGiverVerify && <HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />}
                                                   { modalData?.isGiverKycVerify && <GiCheckedShield className="size-[12px] text-[#F76C10]" />}</span></h2>
                                                <p className="text-sm font-semibold capitalize">Project title: {modalData?.projectName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 overflow-x-hidden overflow-y-scroll hiddenScroll h-[300px]">
                                        <p>Review: 
                                        <Rating precision={0.1} value={modalData?.giverRating} style={{fontSize : ".9rem"}} readOnly /></p>

                                        <label className="block pb-2 font-semibold">Description: </label>
                                        <p>{modalData?.giverReview}</p>
                                    </div>
                                </div>
                            }
                        />
                    )
                    }
                </div>
            </div>
   
        </>
      )
    }
        </>
            )
}
