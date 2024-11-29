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


export default function CategoriesPage({ data }: any) {
    // modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [heading,setHeading] : any = useState("");

  

    const closeModal = () => {
        setIsModalOpen(false);
    };


    

    // BACKEND INTEGRATION
    const {showCategory,addCategories, verifyAdmin, editCategory, deleteCategory} : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);

    let router = useRouter();
    let [allcategoryData, setCategoryData] : any = useState([]);
    let [categoryName, setCategoryName]  : any = useState("");
    let [oldData, setOldData]  : any = useState("");
    const { generateSnackbar } : any  = useSnackbar();

        async function getData() {
            setLoading2(true);
          try {
            let res = await showCategory();
            console.log(res);
            if (res?.status !== 400 || res?.data?.status === "success") {
                setCategoryData(res?.data?.data[0].category.reverse());
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
      
      async function addCategoryValue(e : any) {
        setLoading2(true);
        e.preventDefault();
        console.log(categoryName);
      try {
        let res = await addCategories({category : categoryName});
        if (res?.status !== 400 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message || `${categoryName.toUpperCase()} Addedd Suuccessfully.`, "success");
            setCategoryName("");
            allcategoryData.unshift(categoryName);
            setLoading2(false);
            closeModal();
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    }

    const openModal = (type, data) => {
      if(type === "add"){
        setIsModalOpen(true);
        setHeading("Add New")
      }
      else{
        setHeading("Edit");
        setOldData(data);
        setCategoryName(data);
        setIsModalOpen(true);

      }
    };

    async function editCategoryValue(e : any) {
      // setLoading2(true);
      e.preventDefault();
      console.log(categoryName, );
    try {
      let res = await editCategory({
        oldValue : oldData,
        newValue : categoryName
    });
      if (res?.status !== 400 || res?.data?.status === "success") {
          generateSnackbar(res?.data?.message || `${oldData.toUpperCase()} Updated Suuccessfully.`, "success");
          router.refresh();
          closeModal();
        } else {
          generateSnackbar("Some error occurred, Please Try Again.", "error");
        }
    } catch (e) {
      generateSnackbar("Some error occurred, Please Try Again.", "error");
    }
  }

  async function deleteCategoryValue(value) {
  try {
    let res = await deleteCategory({
      oldValue : value,
      newValue : categoryName
  });
    if (res?.status !== 400 || res?.data?.status === "success") {
        generateSnackbar(res?.data?.message || `${oldData.toUpperCase()} Updated Suuccessfully.`, "success");
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
        <div className="w-full py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
                <button onClick={()=>{openModal("add", "")}} className="sm:text-[17px] text-[12px] text-white bg-[#07242B] px-[20px] py-[10px] rounded-md flex gap-2 items-center">
                    Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                </button>
            </div>

            {/* page items */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4"></th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allcategoryData?.map((item: any, i: number) => (
                            <tr className="border-b border-black/10" key={i}>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p
                                        className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md"
                                    >
                                        {item}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end">
                                        <button
                                        onClick={()=>{openModal("edit", item)}}
                                            className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button onClick={()=>{deleteCategoryValue(item)}}>
                                            <MdDelete className="size-[20px] text-[#F52933]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <PagesEditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    <div className="pt-4">
                                        <div className="text-center">
                                            <h4 className="font-semibold uppercase text-[17px]">{heading} Category</h4>
                                        </div>

                                        <div className="w-full h-full" onSubmit={(e : any)=>{
                                          heading == "Add New" ? addCategoryValue(e) : editCategoryValue(e)
                                        }}>
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="name" className="block pb-2 font-semibold">Name</label>
                                                    <input type="text" id="name" name="name" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}} className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md" placeholder="Enter category name" />
                                                </div>


                                                <div className="py-2 text-start">
                                                    <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">Save <FaArrowRight className="size-[15px] text-black" /></button>
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
