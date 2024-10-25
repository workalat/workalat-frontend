"use client";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WalletIcon from '@mui/icons-material/Wallet';
import { Box, Button, Modal, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from 'react';
import doneIcon from "@/public/icons/done.svg";
import { useUserContext } from '@/context/user_context';
import { useSnackbar } from '@/context/snackbar_context';
import { useRouter, useSearchParams } from 'next/navigation';
import ClientDetails from './client-details';
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/context/firebase';

export default function ContactClient({ open, onClose, job, openClientDetails, applied, setApplied, userData }) {
  const [loading, setLoading] = useState(false);
  const [proposalMessage, setProposalMessage] = useState("");
  const [applied2, setApplied2] = useState(false);
  const [clientData, setClientData] = useState({});
  let [loaderMessage, setLoaderMessage] = useState("");




  const { generateSnackbar } : any = useSnackbar();
  const { checkBid, applyJob ,setPayPayment ,payPayment,payAsGoSession, userChatDetilas} : any = useUserContext();
  const router : any = useRouter();
  let projectId : any = useSearchParams().get("job")

  const closeApplied : any = () => {
    router.push("/leads");
  };


  window.addEventListener("message", (event) => {
    // Check the origin to ensure it matches
    if (event?.origin !== process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ORIGIN) {
        return; // Ignore messages from untrusted origins
    }
    
    if (event.data.paymentStatus === 'success') {
        setPayPayment("paid")
        // Display success message or handle it accordingly
    } else {
        // console.log("Payment failed or no status received");
    }
});



async function handleAdd(current, user2, projectTitle){
  console.log(current,user2)
  try{
    let chatRef : any = collection(db, "chats")
    let userChatRef : any = collection(db, "usersChats");

    let currentUser : any = await userChatDetilas({
      userId : current.userId,
      userType : current.userType === "client" ? "client" : "professional"
    })
    let user : any = await userChatDetilas({
      userId : user2.clientId,
      userType : current.userType === "client" ? "professional" : "client"
    });


    let newChatRef : any = doc(chatRef);
    await setDoc(newChatRef, {
      createdAt : serverTimestamp(),
      message : [],
    });

    await updateDoc(doc(userChatRef, user?.data?.data?.id  ), {//RECIEVER ID / jisko bhej rha hu
      chats : arrayUnion({
        chatId : newChatRef?.id,
        lastMessage : "",
        flag : false,
        projectTitle : projectTitle,
        activeChat : currentUser?.data?.data?.activeChat,
        chatNotifications : currentUser?.data?.data?.chatNotifications,
        receiverId : currentUser?.data?.data?.id,  //My ID / SENDER ID
        updatedAt : Date.now()
      })
    });
    
    await updateDoc(doc(userChatRef, currentUser?.data?.data?.id,), { //My ID / SENDER ID
      chats : arrayUnion({
        chatId : newChatRef?.id,
        lastMessage : "",
        flag : false,
        projectTitle : projectTitle,
        activeChat : user?.data?.data?.activeChat,
        chatNotifications : user?.data?.data?.chatNotifications,
        receiverId : user?.data?.data?.id, //RECIEVER ID / jisko bhej rha hu
        updatedAt : Date.now()
      })
    });
  } 
  catch(e){
    console.log(e);
  }
};

  async function payAsGenerate(projectId, professionalId){
    try{
      setLoaderMessage("Generating Payment Sesstion, Please Wait...");
      setLoading(true);

      let res: any = await payAsGoSession({
        projectId : projectId,
        professionalId : professionalId
      });
      if(res?.status !== 400 || res?.data?.status === "success"){
      setLoading(false);
      const paymentWindow = window.open(res?.data?.session?.url, '_blank', 'width=500,height=600');
      }
      else{
        generateSnackbar("Failed to Generate Payment Session.", "error");
      }
    }
    catch(e){
      generateSnackbar("Failed to Generate Payment Session.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(!proposalMessage){
        return generateSnackbar("Please Write a proposal.", "warning")
      }
      if(!proposalMessage){
        return generateSnackbar("Please Write a proposal.", "warning")
      }
      let bid : any = await checkBid({ userId: userData.userId, projectId: projectId });
      let data : any = bid?.data;
      let professionalData : any = bid?.data?.data;

      if (!data.eligible) {
        generateSnackbar("Cannot apply on this project.", "warning");
      } else if (!professionalData?.adminAccessProfessional) {
        generateSnackbar("Admin has restricted your Account.", "error");
      }
      else if(professionalData?.payAsGo === true && payPayment === "unpaid"){
          payAsGenerate(projectId,userData.userId);
      }
      else if(professionalData?.payAsGo === true && payPayment === "paid"){
          let res : any = await applyJob({
            professionalId: professionalData?._id,
            projectId: data?.projectId,
            proposal: proposalMessage,
            proposalType: "points",
          });
          if (res?.status !== 400 || res?.data?.status === "success") {
            generateSnackbar("Bid Sent successfully.", "success");
            setClientData(res?.data?.data[0]);
            handleAdd(userData, res?.data?.data[0],data?.projectTitle);
            setApplied(true);
            setTimeout(() => {
              setApplied(false);
              setApplied2(true);
              setPayPayment("unpaid")
              router.push("/leads");
            }, 3000);
          }
      }
      else if (professionalData?.isMembership) {
        if (professionalData?.membershipLeads < 1) {
          generateSnackbar("Your membership limit has exceeded.", "warning");
        } else {
          let res = await applyJob({
            professionalId: professionalData?._id,
            projectId: data?.projectId,
            proposal: proposalMessage,
            proposalType: "leads",
          });
          if (res?.status !== 400 || res?.data?.status === "success") {
            generateSnackbar("Bid Sent successfully.", "success");
            setClientData(res?.data?.data[0]);
            handleAdd(userData, res?.data?.data[0] ,data?.projectTitle);
            setApplied(true);
            setTimeout(() => {
              setApplied(false);
              setApplied2(true);
              router.push("/leads");
            }, 3000);
          }
        }
      } else if (data?.projectAvailableBids < 1) {
        generateSnackbar("Maximum bidding limit is reached.", "warning");
      } else if (professionalData?.professionalTotalBidPoints < data?.pointsNeeded) {
        generateSnackbar("Not Enough Points.", "warning");
      } else {
        // Apply using points
        let res : any = await applyJob({
          professionalId: professionalData?._id,
          projectId: data?.projectId,
          proposal: proposalMessage,
          proposalType: "points",
        });
        if (res?.status !== 400 || res?.data?.status === "success") {
          generateSnackbar("Bid Sent successfully.", "success");
          setClientData(res?.data?.data[0]);
          handleAdd(userData, res?.data?.data[0] ,data?.projectTitle);
          setApplied(true);
          setTimeout(() => {
            setApplied(false);
            setApplied2(true);
            router.push("/leads");
          }, 3000);
        }
      }
    } catch (e) {
      console.error(e);
      generateSnackbar("Failed to contact client. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const JobDoneModal = (
    <div>
      <img src={doneIcon.src} alt='' className='w-20 mx-auto mb-2' />
      <h1 className='text-lg font-bold'>Done!</h1>
      <p className='capitalize'>You can now contact {clientData?.clientName} </p>
    </div>
  );

  return (
    <>
      <Modal open={open} className="flex justify-center items-center" onClose={onClose}>
        <Box className="bg-white w-full max-w-screen-sm text-center rounded-md p-6 pb-12 shadow-md">
          {loading ? (
            <div className="loader m-auto" />
          ) : applied ? (
            JobDoneModal
          ) : (
            <>
              <WalletIcon className="text-secondary text-7xl" />
              {/* <h1 className="font-bold">Contacting {job?.clientName} will cost you {?.proposalCost} points</h1> */}
              {/* <h1 className="font-bold">This project will cost you {?.proposalCost} points</h1> */}
              {/* <h1 className="font-bold">Contacting {job?.clientName} will cost you {?.proposalCost} points</h1> */}
              <p>
                Don't have enough points? {" "}
                <Link href="/wallet" className="text-red font-bold hover:underline">
                  Top up!
                </Link>
              </p>
              <form className="mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  label="Type your proposal"
                  rows={4}
                  className="shadow-md"
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                />
                
               
                  
                  <Button variant="contained" type="submit" className="mt-4 font-semibold" size="large">
                    Contact Client
                  <ArrowForwardIcon className="ml-2 text-2xl" />
                </Button>
               
               
              </form>
            </>
          )}
        </Box>
      </Modal>
      {applied2 && (
        <ClientDetails open={applied2} onClose={closeApplied} job={clientData} applied={setApplied2} />
      )}
      <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">{loaderMessage}</h1>
              </Box>
            </Box>
          </Modal>
    </>
  );
}