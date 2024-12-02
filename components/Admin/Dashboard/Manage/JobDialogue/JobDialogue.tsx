"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare, AiOutlineMinusCircle } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { FiPlusCircle } from "react-icons/fi";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function JobDialogue({ data }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);



    const closeModal = () => {
        
        setInputFields([{ value: '', isChecked: true }]);
        setQuestionsTitle("");
        setWalletId("");
        setSlug("");
        setIsModalOpen(false);
    };


    // for select choices
    const [fieldType, setFieldType] = useState<string>('radio');


    // Handle field type change
    const handleFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setFieldType(selectedValue);
    };

        const [inputFields, setInputFields] = useState([{ value: '', isChecked: true }]);

    // Handler to add a new input field
    const handleAddField = () => {
        setInputFields([...inputFields, { value: '', isChecked: false }]);
    };

    // Handler to remove input fields (supports single and bulk deletion)
    const handleRemoveField = (index: number) => {
        // If some checkboxes are selected, delete all selected
        const updatedFields = inputFields.filter((_, i) => {
            return !(inputFields[i].isChecked || i === index);
        });
        setInputFields(updatedFields);
    };

    // Handler to update the value of an input field
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFields = [...inputFields];
        updatedFields[index].value = event.target.value;
        setInputFields(updatedFields);
    };

    // Handler to toggle the checkbox
    const handleCheckboxChange = (index: number) => {
        const updatedFields = [...inputFields];
        updatedFields[index].isChecked = !updatedFields[index].isChecked;
        setInputFields(updatedFields);
    };



     // BACKEND INTEGRATION
     const {showAllQuestions, addAllQuestions,verifyAdmin, deleteQuestions, editJobsQuestions} : any  = useUserContext();
     const [loading2, setLoading2] : any  = useState(true);
     let [allQuestionsData, setAllQuestionsData] : any = useState([]);
     const { generateSnackbar } : any  = useSnackbar();
     let [questionTitle, setQuestionsTitle] : any = useState("");
     let router = useRouter();
     let [heading, setHeading] : any = useState("");
     let [walletId, setWalletId] : any = useState("");
     let [slug, setSlug] : any = useState("");
 
         async function getData() {
             setLoading2(true);
           try {
             let res = await showAllQuestions();
             if (res?.status === 200 || res?.data?.status === "success") {
                setAllQuestionsData(res?.data?.data?.reverse());
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
 
 
         const openModal = (data) => {
            if(data === "Add"){
                setHeading("Add");
                setIsModalOpen(true);
            }
            else{
                setHeading("Edit");
                setIsModalOpen(true);
            }
        };
       
       async function addQuestions(e : any) {
         // setLoading2(true);
         e.preventDefault();
         setHeading("Add");
         if(inputFields.length <1 || fieldType == "Select Field" || questionTitle.length<1){
            return generateSnackbar("Please Fill all the Fields.", "error");
         }  
         let answers = inputFields
         ?.filter((val) => val.isChecked === true) 
         .map((val) => val.value);
         
       try {
         let res = await addAllQuestions({
            questionTitle : questionTitle,
             questionType : fieldType,
             questionChoices : answers
         });
         if (res?.status === 200 || res?.data?.status === "success") {
             generateSnackbar(res?.data?.message , "success");
        //      setCategoryName("");
        //      setSelectedService("");
        //      setLoading2(false);
             router.refresh();
             closeModal();
           } else {
             generateSnackbar("Some error occurred, Please Try Again.", "error");
           }
       } catch (e) {
         // console.log(e);
         generateSnackbar("Some error occurred, Please Try Again.", "error");
       }
     };

         
     async function editQuestions(data : any) {
        setHeading("Edit");
        const updatedFields = data.questionChoices.length>0 ?  data.questionChoices.map((val) => ({
            value: val,
            isChecked: true,
        })) :  [{ value: '', isChecked: true }]
        setInputFields(updatedFields);
        setQuestionsTitle(data?.questionTitle);
        setFieldType(data?.questionType);
        setWalletId(data?._id);
        setSlug(data?.slug);
        openModal("Edit");
      try {
      } catch (e) {
        // console.log(e);
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    };


    async function updateQuestions(e : any) {
        e.preventDefault();
        if(inputFields.length <1 || fieldType == "Select Field" || questionTitle.length<1){
           return generateSnackbar("Please Fill all the Fields.", "error");
        }  
        let answers = inputFields
        ?.filter((val) => val.isChecked === true) 
        .map((val) => val.value);
        
      try {
        let res = await editJobsQuestions({
            questionId : walletId,
            questionTitle : questionTitle,
            questionType : fieldType,
            questionChoices : answers,
            questionSlug : slug
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



     async function deleteSingleQuestions(questionId) {
        try {
          let res = await deleteQuestions({
            questionId
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
            <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
            <button
                onClick={()=>{
                    openModal("Add");
                }}
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
                                Title
                            </th>
                            <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                Field Type
                            </th>
                            <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                Slug
                            </th>
                            <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                Options
                            </th>
                            <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allQuestionsData?.map((item: any, i: number) => (
                            <tr className="border-b border-black/10" key={i}>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md uppercase">
                                        {item?.questionTitle}
                                    </p>
                                </td>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md uppercase">
                                        {item?.questionType}
                                    </p>
                                </td>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                        {item?.slug}
                                    </p>
                                </td>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md uppercase">
                                        {item?.questionChoices[0]?.substring(0, 17)}...
                                    </p>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end">
                                        <button onClick={()=>{
                                            editQuestions(item);
                                        }} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                            Edit
                                        </button>
                                        <button onClick={()=>{deleteSingleQuestions(item?._id)}}>
                                            <MdDelete className="size-[20px] text-[#F52933]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
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
                                        <h4 className="font-semibold uppercase text-[17px]">{heading} Job Dialogue</h4>
                                    </div>

                                    <div className="w-full h-full">
                                        <form className="w-full">
                                            <div className="py-2 text-start">
                                                <label htmlFor="title" className="block pb-2 font-semibold">Title</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                    placeholder="Enter title"
                                                    value={questionTitle}
                                                    onChange={(e)=>{setQuestionsTitle(e.target.value)}}
                                                />
                                            </div>

                                            <div className="py-2">
                                                {/* Field Type Selector */}
                                                <div className="py-2 text-start">
                                                    <label htmlFor="field" className="block pb-2 font-semibold">
                                                        Field Type
                                                    </label>
                                                    <select
                                                        id="field"
                                                        name="field"
                                                        className="w-full capitalize ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        value={fieldType}
                                                        onChange={handleFieldTypeChange}
                                                    >
                                                        <option value="radio" className="capitalize">{fieldType == "radio" ? "Radio" :  "Radio"}</option>
                                                        {/* <option value="dropdown">Dropdown</option> */}
                                                        <option value="multi-choice" className="capitalize">{fieldType == "multi-select" ?  "Multi-Select" : "Multi-Select" }</option>
                                                    </select>
                                                </div>
                                                     {/* Slug  */} 
                                                     {
                                                            heading == "Edit" && 
                                                            <div className="py-2 text-start">
                                                            <label htmlFor="title" className="block pb-2 font-semibold">Slug</label>
                                                            <input
                                                                type="text"
                                                                id="title"
                                                                name="title"
                                                                className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                                placeholder="Enter title"
                                                                value={slug}
                                                                onChange={(e)=>{setSlug(e.target.value)}}
                                                            />
                                                            </div>
                                                        }

                                                {/* Dynamic Choices List */}
                                                <div className="py-2">
                                                    <h3 className="font-semibold text-start">Choices</h3>

                                                    <div className="pt-3">
                                                        {inputFields.map((inputField, index) => (
                                                            <div key={index} className="flex items-center space-x-3 mb-4">
                                                                {/* Checkbox */}
                                                                <input
                                                                    type="checkbox"
                                                                    checked={inputField.isChecked}
                                                                    onChange={() => handleCheckboxChange(index)}
                                                                    className="form-checkbox w-5 h-5 shadow border-none outline-none"
                                                                />

                                                                {/* Input Field */}
                                                                <input
                                                                    type="text"
                                                                    value={inputField.value}
                                                                    onChange={(e) => handleInputChange(index, e)}
                                                                    placeholder="Add new"
                                                                    className="flex-1 capitalize px-3 py-2 border rounded-md shadow border-black/40"
                                                                />

                                                                {/* Plus and Minus Buttons */}
                                                                <div className="flex gap-1">
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleAddField}
                                                                    >
                                                                        <FiPlusCircle className="text-green-500 size-[20px]" />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveField(index)}
                                                                    >
                                                                        <AiOutlineMinusCircle className="text-red size-[20px]" />
                                                                    </button>
                                                               </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>

                                                   
                                                
                                            </div>

                                            <div className="py-2 text-start">
                                                <button type="submit" className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]" onClick={
                                                    (e : any)=>{
                                                        heading === "Add" ? addQuestions(e): updateQuestions(e);
                                                    }
                                                    
                                                    
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
      )
    }
        </>
    );
}