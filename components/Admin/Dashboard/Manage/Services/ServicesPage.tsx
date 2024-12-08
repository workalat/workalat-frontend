"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6"; 
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

export default function ServicesPage({ data }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [heading,setHeading] : any = useState("");

  

    const closeModal = () => {
        setIsModalOpen(false);
    };


    

    // BACKEND INTEGRATION
    const {showAllServiceAdmin, showCategory ,addServicesAdmin,verifyAdmin, editService, deleteService} : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);
    let [allServiceData, setAllServiceData] : any = useState([]);
    let [allCategoryData, setAllCategoryData] : any = useState([]);
    let [categoryName, setCategoryName]  : any = useState("");
    const { generateSnackbar } : any  = useSnackbar();
    let [selectedCategory, setSelectedCategory] : any = useState("");
    let [selectedService, setSelectedService]  : any = useState("");
    let [oldData, setOldData]  : any = useState({});
    let router = useRouter();

        async function getData() {
            setLoading2(true);
          try {
            let res = await showAllServiceAdmin();
            let category = await showCategory();
            console.log(res, category);
            if ((res?.status === 200  && category?.status === 200)|| (res?.data?.status === "success" && category?.data?.status )) {
                setAllServiceData(res?.data?.data[0].services.reverse());
                setAllCategoryData(category?.data?.data[0].category.reverse());
                setSelectedCategory(category?.data?.data[0].category.reverse()[0]);
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
                  console.log(res);
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


      
      async function addServiceValue(e : any) {
        // setLoading2(true);
        e.preventDefault();
        if(selectedCategory.length === 0 || selectedService.length === 0){
            return generateSnackbar("Plese Select Category and Service.", "error");
        }
      try {
        let res = await addServicesAdmin({category : selectedCategory,service : selectedService});
        console.log(res);
        if (res?.status === 200 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message , "success");
            setCategoryName("");
            setSelectedService("");
            setLoading2(false);
            router.refresh();
            closeModal();
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    }

    const openModal = (type, service, category) => {
        console.log(type,service,category);
        if(type === "add"){
          setIsModalOpen(true);
          setHeading("Add New")
        }
        else{
            setHeading("Edit");
            setOldData(service);
            setSelectedService(service)
            setSelectedCategory(category)
            setIsModalOpen(true);
        }
      };

      async function editServiceValue(e : any) {
        // setLoading2(true);
        e.preventDefault();
        console.log(selectedCategory, selectedService,oldData)
        if(selectedService.length === 0){
            return generateSnackbar("Plese Fill the Service.", "error");
        }
      try {
        let res = await editService({
            category : selectedCategory,
            oldValue : oldData,
            newValue : selectedService
    });
        if (res?.status === 200 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message , "success");
            router.refresh();
            closeModal();
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    }

    async function deleteServiceValue(category, service) {
      console.log(category, service);
      try {
        let res = await deleteService({
            category : category,
            serviceValue : service,
    });
        if (res?.status === 200 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message , "success");
            router.refresh();
            closeModal();
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        console.log(e);
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
                <button
                    onClick={()=>{openModal("add", "", "")}}
                    className="sm:text-[17px] text-[12px] text-white bg-[#07242B] px-[20px] py-[10px] rounded-md flex gap-2 items-center"
                >
                    Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                </button>
            </div>

            {/* page items */}
            <div className="w-full">
                <div className="w-full max-w-full overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#E7EDF2]">
                            <tr>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Service name
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Category
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allServiceData?.map((item: any, i: number) => (
                                <>
                                    {
                                        (item?.service?.length>0)
                                        ?
                                        <>
                                        {
                                            item?.service?.map((val, i)=>{
                                                return(
                                                    <>
                                                    <tr className="border-b border-black/10" key={i}>
                                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                                            {val}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">   
                                                            {item?.category}
                                                        </p>
                                                    </td>
                                                    <td className="p-4">
                                                    <div className="flex items-center justify-end">
                                                        <button onClick={()=>{openModal("edit", val, item?.category)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                            Edit
                                                        </button>
                                                        <button onClick={()=>{deleteServiceValue(item?.category, val)}}>
                                                            <MdDelete className="size-[20px] text-[#F52933]" />
                                                        </button>
                                                    </div>
                                                </td>
                                </tr>
                                                    </>
                                                )
                                            }) 
                                        }
                                        </>
                                        :
                                        <></>
                                    }
                                    </>
                                    
                            ))}
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
                                            <h4 className="font-semibold uppercase text-[17px]">{heading} Service</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="name" className="block pb-2 font-semibold">Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter service name"
                                                        value={selectedService}
                                                        onChange={(e)=>{setSelectedService(e.target.value)}}
                                                    />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="category" className="block pb-2 font-semibold">Category</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md capitalize"                                                        
                                                        value={selectedCategory}
                                                        disabled={heading == "Add New" ? false : true}
                                                        onChange={(e) => setSelectedCategory(e.target.value)} 
                                                    >
                                                        <option disabled value="Select">Select category</option>
                                                        {
                                                            allCategoryData?.map((catg: any, i: number) => (
                                                                <option key={i} value={catg} className="capitalize">{catg}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>

                                                <div className="py-2 text-start">
                                                    <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]" onClick={
                                                        (e : any)=>{heading == "Add New" ? addServiceValue(e) : editServiceValue(e)}
                                                    }>
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