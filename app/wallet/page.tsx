"use client"
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import CurrentBalance from "./sub-components/balance";
import MoreCredits from "./sub-components/more-credits";
import Transactions from "./sub-components/transactions";
import BuyPoints from "./sub-components/buy";
import SuccessModal from "./sub-components/success";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import VerifyUser from "@/app/middleware/VerifyUser";
import Cookies from 'js-cookie';

export default function WalletPage() {
    // buy modal
    const [open, setOpen] : any  = useState(false);


    const openBuyModal = () => {
        setOpen(true);
    };
    
    let {walletPointsData, walletTransactionData, pasAsGo, buyPoints} : any  = useUserContext();
    let [userData, setUserData] : any  = useState({});
    // success modal
    const [success, setSuccess] : any  = useState(false);
    let [pointsData, setPointsData] : any  = useState([]);
    let [transactionData, setTransactionData] : any  = useState([]);
    let [totalPoints, setTotalPoints] : any  = useState("");
    let [payGo, setPayGo] : any  = useState(false);
    

    let [loading2, setLoading2] : any  = useState(true);
    
    // Alert
    const { generateSnackbar }: any  = useSnackbar();

    let router = useRouter();
    useEffect(()=>{
        async function confirmSubs(){
            try{
                setLoading2(true);
                let token : any  = Cookies.get("token");
                let ver : any  = await VerifyUser(token, "professional");
                if(ver?.status === "success" && ver?.userType === "professional" ){
                        setUserData(ver);
                        let pointsData : any  = await walletPointsData();
                        let walletHistoryData : any  = await walletTransactionData({userId : ver.userId});
                        
                    if((pointsData?.status !== 400 && pointsData?.data?.status === "success") && (walletHistoryData?.status !== 400 && walletHistoryData?.data?.status === "success")){
                        
                        // console.log(pointsData, walletHistoryData);
                        setPointsData(pointsData?.data?.data?.points)
                        setTransactionData(walletHistoryData?.data?.data?.pointsHistory);
                        setTotalPoints(walletHistoryData?.data?.data?.professionalTotalBidPoints);
                        setPayGo(walletHistoryData?.data?.data?.payAsGo)
                        setLoading2(false);
                    }
                    else{
                        generateSnackbar(pointsData?.response?.data?.message || walletHistoryData.response?.data?.message  ||  "Some error occurr, Please try again", "error");
                       
                    }
                }
                else{
                    router.push("/professional/login");
                }
            }
            catch(e){
              // console.log(e);
                generateSnackbar("Some error occurr, Please try again", "error");
            }
        }
        confirmSubs();
    },[]);


    
    async function confirmSubs(){
      try{
        let res : any  = await pasAsGo({
          professionalId : userData?.userId,
          current_value : payGo
        });
        setPayGo(res?.data?.current_value);
        if(res?.data?.current_value === true || res.data?.current_value){
          generateSnackbar("Activated Successfully.", "success");
        }
        else{
          generateSnackbar("Deactivated Successfully.", "success");
        }
      }
      catch(e){
          generateSnackbar("Some error occurr, Please try again", "error");
      }
  }

  async function purchasePoints({amount, points}){
    try{
      let res : any  = await buyPoints({
        professionalId : userData.userId,
        amount : amount,
        points : points
      });
      if(res?.status !== 400 || res?.data?.status === "success"){
        window.open(res?.data?.session?.url, "_blank");
    }
    else{
        generateSnackbar(res.response?.data?.message || "Some error occurr, Please try again", "error");
    }
    }
    catch(e){
        // console.log(e);
        generateSnackbar("Some error occurr, Please try again", "error");
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
                <Box className="space-y-8 mt-8">
                  <CurrentBalance data={totalPoints} payGoValue={payGo} change={confirmSubs} />
                  <MoreCredits openBuyModal={openBuyModal} data={pointsData} buy={purchasePoints} payGoValue={payGo} />
                  <Transactions  data={transactionData}  />
                  <BuyPoints open={open} setOpen={setOpen} data={{points: "25 Points", price: "£42.50" }} setSuccess={setSuccess} />
                  <SuccessModal open={success} setOpen={setSuccess} />
                </Box>
              </>
            )
          }
          </>
    
  );
}
