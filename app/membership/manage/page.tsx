"use client"
import Manage from "@/components/Membership/manage/Manage";
import AuthNavbar from "@/components/navbar/auth_navbar";


import { Box, Modal, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VerifyUser from "@/app/middleware/VerifyUser";
import Cookies from 'js-cookie';
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import moment from "moment";


export default function ManageMembershipPage() {
    
    let {getMembershipData, requestCancelMembershipData, generateInvoice} : any = useUserContext();
    let [membershipData, setMembershipData] : any = useState({});
    let [userData, setUserData] : any = useState({});
    let [lastTransactionId,setLastTransactionId] : any = useState("");
    

    let [loading, setLoading] : any = useState(false);
    let [loading2, setLoading2] : any = useState(true);
    
    // Alert
    const { generateSnackbar } : any = useSnackbar();

    let router : any = useRouter();
    useEffect(()=>{
        async function confirmSubs(){
            try{
                setLoading2(true);
                let token : any = Cookies.get("token");
                let ver : any = await VerifyUser(token, "professional");
                if(ver?.status === "success"){
                    let res : any = await getMembershipData({userId : ver.userId});
                    if(res?.status !== 400 && res?.data?.status === "success"){
                        setUserData(ver);
                        setMembershipData(res?.data?.data);
                        setLastTransactionId(res?.data?.data.membershipTransactionHistory[res?.data?.data.membershipTransactionHistory?.length - 1]?._id);
                        setLoading2(false);
                    }
                    else{
                        generateSnackbar(res?.response?.data?.message || "Some error occurr, Please try again", "error");
                       
                    }
                }
                else{
                    router.push("/professional/login");
                }
            }
            catch(e){
                console.log(e);
                generateSnackbar("Some error occurr, Please try again", "error");
            }
        }
        confirmSubs();
    },[]);

    async function handleCancelMembership(){
        try{
            setLoading(true);
           let res : any = await requestCancelMembershipData({
            professionalId : userData.userId,
            trxId : lastTransactionId
           });
           if(res?.status !== 400 && res?.data?.status === "success"){
                setLoading(false);
                generateSnackbar("Your Request for Cancelling Membership is submitted, Your payment will be refund within 48 hours", "success")
                setTimeout(()=>{
                    router?.refresh();
                }, 1000)
           }
           else{
            setLoading(false);
            generateSnackbar(res?.response?.data?.message || "Some error Occur, Please Try Again.", "error")
           }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Some error Occur, Please Try Again.", "error")
        }
    }

    async function handleInvoiceGeneration(sessionId){
        try{
           let res : any = await generateInvoice({
            sessionId
           });
           if(res?.status !== 400 && res?.data?.status === "success"){
            window.open(res?.data?.hostedInvoiceUrl, '_blank')
           }
           else{
            generateSnackbar(res?.response?.data?.message || "Some error Occur, Please Try Again.", "error")
           }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Some error Occur, Please Try Again.", "error")
        }
    }

    
    return (
        <>
         {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
                <>
                <div> 
            <AuthNavbar />
            <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
                    <Link
                        href="/client/dashboard"
                        className="flex gap-2 absolute left-0 font-bold"
                    >
                        <Image
                            src={arrowRightSm}
                            alt="Back to dashboard"
                            className="rotate-180"
                        />
                        <span>
                            Back <span className="hidden md:inline-flex">to dashboard</span>
                        </span>
                    </Link>
                    <Typography gutterBottom className="text-3xl font-bold text-center">
                        Manage Membership
                    </Typography>
                </Box>

                <div className="w-full border border-black/30 rounded-md px-0 py-4 mt-12">
                    <div className="py-2 border-b border-black/30 mx-4">
                        <h1 className="text-2xl font-bold">Alat Pro</h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch">
                        <div className="w-full md:w-1/3 border-e border-black/30 py-2">
                            <div className="rounded-r-full py-1 px-3 text-white font-semibold w-11/12 md:w-4/5 bg-gradient-to-r from-[#07242B] to-[#187991]">
                                <p>Member since {moment(membershipData.accountCreationDate).format(" D MMMM YYYY")}</p>
                            </div>

                            <div className="py-4 border-b border-black/30 ps-2">
                                <div className="flex">
                                    <div className="w-4 mt-1">
                                        <GoDotFill className="size-4 text-secondary" />
                                    </div>
                                    <div className="px-1 w-auto">
                                        <h4 className="text-lg font-semibold">Standard Plan</h4>
                                        <p className="text-md text-[#909090]">Next payment {moment(membershipData.memberShipExpirationDate).format(" D MMMM YYYY")}</p>
                                    </div>
                                </div>

                                {/* <div className="flex px-4 gap-3 items-center pt-4">
                                    <img className="w-12" src="/images/mastercard.png" alt="work alat" />
                                    <p>****   ****   ****   125</p>
                                </div> */}
                            </div>

                            <div className="px-4 py-5">
                                {
                                    (membershipData.membershipStatus === "active") 
                                    ?
                                    <button onClick={handleCancelMembership} className="text-white bg-red px-4 py-2 rounded-md font-semibold gap-2 flex items-center justify-center">
                                        Cancel Membership <FaArrowRight className="size-4 text-white" />
                                    </button>
                                    :
                                    
                                    <button onClick={()=>{router.push("/membership")}} className="text-white bg-secondary px-4 py-2 rounded-md font-semibold gap-2 flex items-center justify-center">
                                        Purchase Membership <FaArrowRight className="size-4 text-white" />
                                    </button>

                                }
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 py-2">
                            <div className="rounded-l-full ms-auto py-1 px-4 text-white font-semibold w-fit bg-gradient-to-l from-[#07242B] to-[#187991]">
                                <p>Payment History</p>
                            </div>

                            <div className="w-full pt-5">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-end">Date</th>
                                                <th className="px-4 py-2 text-end">Invoice</th>
                                                <th className="px-4 py-2 text-end">Transaction ID</th>
                                                <th className="px-4 py-2 text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                membershipData.membershipTransactionHistory?.map((data: any, i: number) => (
                                                    <tr key={i}>
                                                        <td className="px-4 text-end">{moment(data.timeStamp).format(" D MMMM YYYY")}</td>
                                                        <td className="px-4 text-end flex text-secondary cursor-pointer items-center gap-2 justify-end" onClick={()=>{handleInvoiceGeneration(data?.transactionId)}}>
                                                            <IoMdEye className="size-4 text-secondary" />
                                                            View
                                                        </td>
                                                        <td className="px-4 text-end">{`${data?._id.slice(0, 25)}...`}</td>
                                                        <td className="px-4 text-end">
                                                            <p className="font-semibold">{data?.totalTransactionAmount}</p>
                                                            <p className="text-xs"> {`£ ${data.transactionAmount} (+£${data?.transactionAmountTax})`}  VAT</p>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">Cancelling Membership...</h1>
              </Box>
            </Box>
          </Modal>
                </> 
            )
        }

        
        </>
    )
}
