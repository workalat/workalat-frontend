"use client";

import { useEffect, useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { jobAssignData } from "@/utils/manageData";
import { IoIosArrowDown } from "react-icons/io"; 
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function JobAssign({ data }: any) {
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true); 
    };
    const closeModal = () => {
            setSelectedMode("category");
            setHeading('Add');
            setSelectTypeOfAssign("");
            setTerm("");
            setIsModalOpen(false);
    };

    // assign type selector
    const [userType, setUserType] = useState("all"); // To filter by user type
    const [filteredUsers, setFilteredUsers] = useState(data?.pageItems); // For the filtered data

    // Filtering users based on the selected user type
    useEffect(() => {
        let result = data?.pageItems || [];

        // Filter by user type
        if (userType !== "all") {
            result = result.filter((item: any) => item.type.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType, data]);

    // filtering mode and type
    const [selectedMode, setSelectedMode] = useState<any>("category");
    const [filteredModeType, setFilteredModeType] = useState<any>();
    const [searchQuery, setSearchQuery] = useState(""); // For the search input in the type selector
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]); // To store filtered options
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if dropdown is open

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter mode based on selected mode
    useEffect(() => {
        const filteredData = jobAssignData?.find((item) => item?.mode === selectedMode);
        if (filteredData) {
            if(selectedMode === "category"){
                setFilteredModeType(allCategoryData);
                setFilteredOptions(allCategoryData || []); // Initialize with all options
                
                heading ==  "Add New"  ? setSelectTypeOfAssign("") : "";
            }
            else if(selectedMode === "service") {
                setFilteredModeType(allServiceStringData);
                setFilteredOptions(allServiceStringData || []); // Initialize with all options

                heading == "Add New" ? setSelectTypeOfAssign("") : "";
                
            }
        }
    }, [selectedMode, jobAssignData]);

    // Handle search and filter options based on the search query
    useEffect(() => {
        if (filteredModeType && filteredModeType.type) {
            const filtered = filteredModeType.type.filter((type: any) =>
                type.itemName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchQuery, filteredModeType]);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [selectedTypeOfAssign, setSelectTypeOfAssign] = useState<any>();




    
     // BACKEND INTEGRATION
     const {showAllAssignedQuestions,findAllServices,verifyAdmin ,addJobsQuestions,deleteJobsQuestions ,showAllServiceAdmin,showCategory} : any  = useUserContext();
     const [loading2, setLoading2] : any  = useState(true);
     let [allQuestionsCategoryData, setAllQuestionsCategoryData] : any = useState([]);
     let [allQuestionsServiceData, setAllQuestionsServiceData] : any = useState([]);
     let [allServiceData, setAllServiceData] : any = useState([]);
     let [allCategoryData, setAllCategoryData] : any = useState([]);
     let [allServiceStringData, setAllServiceStringData] : any = useState([]);
     let [viewService, setViewService] : any = useState(true);
     let [viewCategory, setViewCategory] : any = useState(true);
         
     let [heading, setHeading] : any = useState("");
     let router = useRouter();
     let [term, setTerm] : any = useState("");
     const { generateSnackbar } : any  = useSnackbar();
 
         async function getData() {
             setLoading2(true);
           try {
             let res = await showAllAssignedQuestions();
             let service = await showAllServiceAdmin();
             let allService = await findAllServices();
             let category = await showCategory();

             if (res?.status === 200 || res?.data?.status === "success") {
                setAllQuestionsCategoryData(res?.data?.data[0]?.categoryQuesions.reverse());
                setAllQuestionsServiceData(res?.data?.data[0]?.serviceQuestions.reverse());
                setAllServiceStringData(allService?.data?.reverse())
                setAllServiceData(service?.data?.data[0].services.reverse());
                setAllCategoryData(category?.data?.data[0].category.reverse());
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
            generateSnackbar("Something went wrong, please Try Again.", "error");
          }
        }
        verify();
      }, []);
      
 
 
       
       async function saveService(e : any) {
         // setLoading2(true);
         e.preventDefault();
         let slugs = term.split(",");

         if(selectedMode.length <1 || selectedTypeOfAssign?.length<1 || term.length<1){
            return generateSnackbar("Please Fill all the Fields.", "error");
         }  
       try {
         let res = await addJobsQuestions({
             mode : selectedMode,
             type : selectedTypeOfAssign,
             slugs : slugs
         });
         if (res?.status === 200 || res?.data?.status === "success") {
             generateSnackbar(res?.data?.message , "success");
             router.refresh();
             closeModal();
           } else {
             generateSnackbar("Some error occurred, Please Try Again.", "error");
           }
       } catch (e) {
         generateSnackbar("Some error occurred, Please Try Again.", "error");
       }
     }

     async function deleteQuestions(mode : any, type : any) {
      try {
        let res = await deleteJobsQuestions({
            mode : mode,
            type : type,
        });
        if (res?.status === 200 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message , "success");
            router.refresh();
            closeModal();
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
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
        <div className="w-full px-2 py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">
                    {data?.pageName}
                </h1>
                <div className="flex px-3 gap-3 items-center">
                    {/* users type selector */}
                    <select
                        name="users"
                        className="bg-[#FFBE00] hidden sm:block w-auto text-[10px] sm:text-[15px] py-2 font-semibold rounded-md px-2 ring-2 ring-[#FFBE00] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => {
                            setUserType(e.target.value)
                            if(e.target.value === "all"){
                                setViewCategory(true);
                                setViewService(true);
                            }
                            else if(e.target.value === "category"){
                                setViewCategory(true);
                                setViewService(false);
                            }
                            else if(e.target.value === "service"){
                                setViewCategory(false);
                                setViewService(true);
                            }
                        }}
                    >
                        <option className="bg-[#EDEDED] text-black" value="all">
                            All
                        </option>
                        <option className="bg-[#EDEDED] text-black" value="category">
                            Category
                        </option>
                        <option className="bg-[#EDEDED] text-black" value="service">
                            Service
                        </option>
                    </select>

                    <button
                        onClick={()=>{
                            setHeading('Add New');
                            setSelectedMode("category");
                            openModal();
                        }}
                        className="sm:text-[17px] text-[10px] text-white bg-[#07242B] px-4 sm:px-[20px] py-1 sm:py-[10px] rounded-md flex gap-2 items-center"
                    >
                        Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                    </button>
                </div>
            </div>

            {/* page items */}
            <div className="w-full">
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#E7EDF2]">
                            <tr>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Mode
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Type
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Term
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory &&  allQuestionsCategoryData?.filter((item: any) => item?.type !== null && item?.slugs !== null) 
            .map((item: any, i: number) => (
                                <tr className="border-b border-black/10" key={i}>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.type}
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            CATEGORY
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {item?.slugs.map((val, index) => {
                                            return index === item.slugs.length - 1 ? `${val}` : `${val}, `;
                                        })}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold" onClick={()=>{
                                            setSelectedMode("category");
                                            setHeading("Edit");
                                            setSelectTypeOfAssign(item?.type);
                                            let t = item?.slugs?.join();
                                            setTerm(t);
                                            setTimeout(() => {
                                                openModal();
                                            }, 0.4); // Let React update state before modal opens
                                        }}>
                                                Edit
                                            </button>
                                            <button onClick={()=>{deleteQuestions("category",item?.type)}}>
                                                <MdDelete className="size-[20px] text-[#F52933]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

            {viewService && allQuestionsServiceData
            ?.filter((item: any) => item?.type !== null && item?.slugs !== null) 
            .map((item: any, i: number) => (
                <tr className="border-b border-black/10" key={i}>
                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                    {item?.type}
                    </p>
                </td>
                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                    SERVICE
                    </p>
                </td>
                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                    {item?.slugs?.length > 0 &&
                        item?.slugs?.map((val, index) => {
                        return index === item.slugs.length - 1 ? `${val}` : `${val}, `;
                        })}
                    </p>
                </td>
                <td className="p-4">
                    <div className="flex items-center justify-end">
                    <button className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold" onClick={()=>{
                        setSelectedMode("service");
                        setHeading("Edit");
                        setSelectTypeOfAssign(item?.type);
                        let t = item?.slugs?.join();
                        setTerm(t);
                        setTimeout(() => {
                            openModal();
                        }, 0.4); // Let React update state before modal opens
                    }}>
                        Edit
                    </button>
                    <button onClick={() => deleteQuestions("service", item?.type)}>
                        <MdDelete className="size-[20px] text-[#F52933]" />
                    </button>
                    </div>
                </td>
                </tr>
            ))
            }
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
                                            <h4 className="font-semibold uppercase text-[17px]">{heading} Job Assign</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="mode" className="block pb-2 font-semibold">
                                                        Mode
                                                    </label>
                                                    <select
                                                        onChange={(e) => setSelectedMode(e.target.value)}
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md capitalize"
                                                        name="mode"
                                                        id="mode"
                                                        value={selectedMode}
                                                    >
                                                        <option value="category">
                                                            Category
                                                        </option>
                                                        <option value="service">
                                                        Service
                                                        </option>
                                                        {/* {jobAssignData?.map((mode: any, i: number) => (
                                                            <option key={i} value={mode?.mode}>
                                                                {mode?.mode}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>

                                                {/* Custom Type Selector with Search */}
                                                <div className="py-2 text-start">
                                                    <label htmlFor="type" className="block pb-2 font-semibold">
                                                        Type
                                                    </label>
                                                    <div className="relative" ref={dropdownRef}>
                                                        <div
                                                            className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 cursor-pointer outline-none shadow-md capitalize flex justify-between items-center"
                                                            onClick={toggleDropdown}
                                                        >
                                                            {selectedTypeOfAssign || "Select Type"}
                                                            <IoIosArrowDown className="text-[14px] -me-[9px] text-black" />
                                                        </div>

                                                        {/* Dropdown */}
                                                        {isDropdownOpen && (
                                                            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search type..."
                                                                    className="w-full px-3 py-2 outline-none"
                                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                                />
                                                                <ul>
                                                                    {filteredOptions.length > 0 ? (
                                                                        filteredOptions.map((type: any, i: number) => (
                                                                            <li
                                                                                key={i}
                                                                                className="py-2 px-4 cursor-pointer hover:bg-gray-200 capitalize"
                                                                                onClick={() => {
                                                                                    setSelectTypeOfAssign(type);
                                                                                    setIsDropdownOpen(false); // Close dropdown on selection
                                                                                }}
                                                                            >
                                                                                {type}
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <li className="py-2 px-4 text-gray-500">Please select a mode first</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="py-2 text-start">
                                                    <label htmlFor="term" className="block pb-2 font-semibold">
                                                        Term
                                                    </label>
                                                    <input type="text" className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md" value={term} onChange={(e)=>{setTerm(e.target.value)}} />
                                                    <p className="text-[12px] font-bold pt-3">Please enter the ID in the right order and separate with a comma (,)</p>
                                                </div>

                                                <div className="py-2 text-start">
                                                    <button
                                                        className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]"
                                                        type="submit"
                                                        onClick={saveService}
                                                    >
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
      )
    }
        </>
    );
}