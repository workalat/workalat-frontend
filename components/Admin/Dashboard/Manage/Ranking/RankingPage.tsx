"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { PiUploadFill } from "react-icons/pi";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/user_context";

export default function RankingPage({ data }: any) {
    const [isModalOpen, setIsModalOpen] : any = useState(false);
 
    const closeModal = () => {
        setIsModalOpen(false);
    };


    
     // BACKEND INTEGRATION
     const {verifyAdmin,rankingPage,updateRanking} : any  = useUserContext();
     const [loading2, setLoading2] : any  = useState(true);
     let [allData, setAllData] : any = useState({
        level_1 : "",
        level_2 : "",
        level_3 : "",
        level_4 : "",
        level_pro : "",
     });
     let [updateData, setUpdateData] : any = useState({
        level_1 : "",
        level_2 : "",
        level_3 : "",
        level_4 : "",
        level_pro : "",
     });
     let [modalData, setModalData] : any = useState({
        currentHeading : "",
        currentLevel : "",
        currentLevelValue : "",
     })

     const openModal = (currentHeading, currentLevel,currentLevelValue) => {
        setModalData({currentHeading,currentLevel,currentLevelValue});
        setUpdateData(allData)
         setIsModalOpen(true);
     };
     const { generateSnackbar } : any  = useSnackbar();
     let router = useRouter();
 
         async function getData() {
             setLoading2(true);
           try {
             let res = await rankingPage();
             if (res?.status === 200 || res?.data?.status === "success") {
                setAllData(res?.data?.data?.ranking);
                 setLoading2(false);
               } else {
                 generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
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
                   if(res?.data?.data?.status === "system"){
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
 
 
        async function updateRankingData(e){
            try{
                e.preventDefault();
                switch (modalData.currentLevel){
                    case "level_1":
                        let a = updateData.level_1;
                        let b = updateData.level_2;
                        if(a>b || a ==0){
                           return generateSnackbar("Please Ener valid Criteria.", "error");
                        }
                        break;
                    case "level_2":
                        let c = updateData.level_1;
                        let d = updateData.level_2;
                        let e = updateData.level_3;
                        if(d<c || d>e || d == 0){
                            return generateSnackbar("Please Ener valid Criteria.", "error");
                        }
                        break;

                    case "level_3":
                        let f = updateData.level_2;
                        let g = updateData.level_3;
                        let h = updateData.level_4;
                        if(g<f || g>h || g == 0){
                            return generateSnackbar("Please Ener valid Criteria.", "error");
                        }
                        break;

                    case "level_4":
                        let i = updateData.level_3;
                        let j = updateData.level_4;
                        let k = updateData.level_pro;
                        if(j<i || j>k || j == 0){
                            return generateSnackbar("Please Ener valid Criteria.", "error");
                        }
                        break;

                    case "level_pro":
                        let l = updateData.level_4;
                        let m = updateData.level_pro;
                        if(m<l || m == 0){
                            return generateSnackbar("Please Ener valid Criteria.", "error");
                        }
                        break;
                }

                let res = await updateRanking({rank : updateData});
                console.log(res);
                if (res?.status === 200 || res?.data?.status === "success") {
                    generateSnackbar(res?.data?.message , "success");
                    window.location.reload();
                    // router.refresh();
                    closeModal();
                  } else {
                    generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
                  }
            }
            catch(e){
                // console.log(e);
                generateSnackbar("Some error occurred, Please Try Again.", "error");
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
             <div className="w-full px-2 py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
                {/* <button
                    onClick={openModal}
                    className="sm:text-[17px] text-[12px] text-white bg-[#07242B] px-[20px] py-[10px] rounded-md flex gap-2 items-center"
                >
                    Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                </button> */}
            </div>

            {/* page items */}
            <div className="w-full">
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#E7EDF2]">
                            <tr>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Rank
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Icon
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Criteria
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data?.pageItems?.map((item: any, i: number) => (
                                <tr className="border-b border-black/10" key={i}>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.level}
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < item?.icon ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.criteria}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button onClick={openModal} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                            {/* <button>
                                                <MdDelete className="size-[20px] text-[#F52933]" />
                                            </button> */}
                                        {/* </div>
                                    </td>
                                </tr> */}
                            {/* ))}  */}
                            {/* Level 1  */}
                              <tr className="border-b border-black/10" >
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            Level 1
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < 1 ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            0 - {allData.level_1}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button onClick={()=>{openModal("Level 1", "level_1", allData.level_1)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Level 2 */}
                                <tr className="border-b border-black/10" >
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            Level 2
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < 2 ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {allData.level_1} - {allData.level_2}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button  onClick={()=>{openModal("Level 2", "level_2", allData.level_2)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Level 3  */}
                                <tr className="border-b border-black/10" >
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            Level 3
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < 3 ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {allData.level_2} - {allData.level_3}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button  onClick={()=>{openModal("Level 3", "level_3", allData.level_3)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Level 4  */}
                                <tr className="border-b border-black/10" >
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            Level 4
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < 4 ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {allData.level_3} - {allData.level_4}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button  onClick={()=>{openModal("Level 4", "level_4", allData.level_4)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Level pro  */}
                                <tr className="border-b border-black/10" >
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            Pro
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <div className="flex space-x-2">
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-[10px] h-[10px] rounded-sm border border-black rotate-45 overflow-hidden ${index < 5 ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {allData.level_4} - {allData.level_pro}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button  onClick={()=>{openModal("Level Pro", "level_pro", allData.level_pro)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <PagesEditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-full sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    <div className="pt-4">
                                        <div className="text-center">
                                            <h4 className="font-semibold uppercase text-[17px]">Update Ranking</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="rank" className="block pb-2 font-semibold">Ranking</label>
                                                    <input
                                                        type="text"
                                                        id="rank"
                                                        name="rank"
                                                        value={modalData?.currentHeading}
                                                        disabled
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter ranking"
                                                    />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="rank" className="block pb-2 font-semibold">Criteria (Maximum Job Completion)</label>
                                                    <input
                                                        type="text"
                                                        id="rank"
                                                        name="rank"
                                                        value={modalData?.currentLevelValue}
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter Criteria: 20"
                                                        onChange={(e : any)=>{
                                                            setModalData({...modalData, currentLevelValue : e.target.value})
                                                            setUpdateData({...updateData , [modalData?.currentLevel] : e.target.value})
                                                        }}
                                                    />
                                                </div>
                                                {/* <div className="py-2 text-start">
                                                    <label htmlFor="criteria" className="block pb-2 font-semibold">Criteria</label>
                                                    <select
                                                        id="criteria"
                                                        name="criteria"
                                                        className="w-full capitalize ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        defaultValue="Select"
                                                    >
                                                        <option value="Select">Select Badge</option>
                                                        {
                                                            data?.pageItems?.map((crt: any, i: number) => (
                                                                <option key={i} value={crt?.criteria}>{crt?.criteria}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div> */}
                                                {/* <div className="py-2 text-start">
                                                    <label htmlFor="img" className="block pb-2 font-semibold">Upload icon</label>

                                                    <label htmlFor="img" className="flex items-center gap-3 text-black/20 w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md">
                                                        <PiUploadFill className="size-[20px] text-black" />
                                                        <input
                                                            type="file"
                                                            id="img"
                                                            name="title"
                                                            className="hidden"
                                                            placeholder="Enter Title"
                                                        />
                                                        Click here to upload image
                                                    </label>
                                                </div> */}

                                                <div className="py-2 text-start">
                                                    <button onClick={updateRankingData} className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">
                                                        Save <FaArrowRight className="size-[15px] text-black" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}
        </div>
        </>
      )
    } 
        </>
       
    );
}