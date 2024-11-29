"use client";

import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import PagesEditModal from "../Pages/PagesEditModal/PagesEditModal";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { useUserContext } from "@/context/user_context";
export default function WalletPage({ data }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };


    
    // BACKEND INTEGRATION
    const {walletPage,addPointsWallet,verifyAdmin, editPointsWallet, deletePointsWallet} : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);
    let [allData, setAllData] : any = useState([]);
    const { generateSnackbar } : any  = useSnackbar();
    let [heading,setHeading] : any = useState("");
    let [points,setPoints] : any = useState("");
    let [amount,setAmount] : any = useState("");
    let [walletId,setWalletId] : any = useState("");

    let [oldData, setOldData]  : any = useState({});
    let router = useRouter();
    function sortByPointsAscending(array) {
        return array.sort((a, b) => a.point - b.point);
    }

        async function getData() {
            setLoading2(true);
          try {

            let res = await walletPage();
            console.log(res);
            if (res?.status === 200|| res?.data?.status === "success" ) {
                let data = sortByPointsAscending(res?.data?.data[0]?.points)
                setAllData(data);
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


      
      async function addPoints(e : any) {
        // setLoading2(true);
        e.preventDefault();
        if(amount.length === 0 || points.length === 0){
            return generateSnackbar("Plese Enter Amount and Points.", "error");
        }
      try {
        let res = await addPointsWallet({
            point : points,
            amount
        });
        if (res?.status === 200 || res?.data?.status === "success") {
            generateSnackbar(res?.data?.message , "success");
            router.refresh();
           
          } else {
            generateSnackbar("Some error occurred, Please Try Again.", "error");
          }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Some error occurred, Please Try Again.", "error");
      }
    }

    const openModal = (type : any , data : any) => {
        console.log(type,data);
        if(type === "add"){
          setIsModalOpen(true);
          setHeading("Add New")
        }
        else{
            setHeading("Edit");
            setAmount(data?.amount);
            setPoints(data?.point);
            setWalletId(data?._id);
            setIsModalOpen(true);
        }
      };

      async function editPoints(e : any) {
        // setLoading2(true);
        e.preventDefault();
        console.log(amount, points,walletId);
        if(amount.length === 0 || points.length === 0){
            return generateSnackbar("Plese Enter Amount and Points.", "error");
        }
      try {
            let res = await editPointsWallet({
                walletId,
                newPoint : points,
                newAmount : amount
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

    async function deletePoint(walletId) {
      try {
        let res = await deletePointsWallet({
            walletId
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
        <>
        <div className="w-full px-2 py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
                <button
                    onClick={()=>{openModal("add", "")}}
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
                                    Points
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase whitespace-nowrap">
                                    Amount
                                </th>
                                <th className="p-4 text-start text-[15px] sm:text-[17px] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((item: any, i: number) => (
                                <tr className="border-b border-black/10" key={i}>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            {item?.point}
                                        </p>
                                    </td>
                                    <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                        <p className="hover:bg-[#E6E6E6] w-fit px-2 rounded-md">
                                            £{item?.amount}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end">
                                            <button onClick={()=>{openModal("edit", item)}} className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold">
                                                Edit
                                            </button>
                                            <button onClick={()=>{deletePoint(item?._id)}} >
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
                                            <h4 className="font-semibold uppercase text-[17px]">{heading} Wallet Rule</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="points" className="block pb-2 font-semibold">Points</label>
                                                    <input
                                                        type="text"
                                                        id="points"
                                                        name="points"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter points"
                                                        value={points}
                                                        onChange={(e)=>{setPoints(e.target.value)}}
                                                    />
                                                </div>
                                                <div className="py-2 text-start">
                                                    <label htmlFor="amount" className="block pb-2 font-semibold">Amount</label>
                                                    <input
                                                        type="text"
                                                        id="amount"
                                                        name="amount"
                                                        className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md"
                                                        placeholder="Enter amount"
                                                        value={amount}
                                                        onChange={(e)=>{setAmount(e.target.value)}}
                                                    />
                                                </div>

                                                <div className="py-2 text-start">
                                                    <button onClick={
                                                        (e : any)=>{
                                                            heading == "Add New" ? addPoints(e)  : editPoints(e)
                                                        }
                                                    } className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">
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