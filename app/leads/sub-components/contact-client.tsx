// "use client";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import WalletIcon from '@mui/icons-material/Wallet';
// import { Box, Button, Modal, TextField } from "@mui/material";
// import Link from "next/link";
// import { useState } from 'react';

// import doneIcon from "@/public/icons/done.svg";
// import { useUserContext } from '@/context/user_context';
// import { useSnackbar } from '@/context/snackbar_context';
// import VerifyUser from '@/app/middleware/VerifyUser';
// import Cookies from 'js-cookie';
// import { useRouter, useSearchParams } from 'next/navigation';
// import ClientDetails from './client-details';

// interface Lead {
//   id: number;
//   title: string;
//   shortDescription: string;
//   proposalCost: number;
//   budget: number;
//   techStack: string[];
//   created_at: Date;
//   location: string;
//   client: {
//     id: number;
//     name: string;
//     isVerified: boolean;
//     image: string;
//   };
// }



// export default function ContactClient({ open, onClose, job, openClientDetails, applied, setApplied, data}) {

//   // application
//   const [loading, setLoading] = useState(false);
//   let [proposalMessage, setProposalMessage] = useState("");

//   let [applied2, setApplied2] = useState(false);
//   let [clientData,setClientData] = useState({});

//   const closeApplied = () => {
//     router.push("/leads");
//   }

  
// const { generateSnackbar } = useSnackbar();

// let { checkBid , applyJob} = useUserContext();
// let router = useRouter();
// let projectId = useSearchParams().get("job");


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try{
//       let token = Cookies.get("token");
//         let ver = await VerifyUser(token, "professional");
//         if(ver.status === "success"){
//           // Check if bid already exists for this job
//           let bid = await checkBid({userId : ver.userId, projectId : projectId});
//           console.log(bid);

//           let data = bid?.data;
//           let professionalData = bid?.data?.data;
//           setClientData(bid?.data.data[0])

//           // console.log(professionalData);
          
//           if(data.eligible === false || !data.eligible){
//              return generateSnackbar("Can not apply on this project.", "warning");
//           }
//           else if(data.projectAvailableBids <1) {
//             return generateSnackbar("Maximum bidding limit is reached.", "warning");
//           }
//           else if(professionalData.adminAccessProfessional === false){
//             return generateSnackbar("You cannot apply on this project.", "warning");
//           }
//           else if(professionalData.isMembership === true || professionalData.isMembership) {
//               if(professionalData.membershipLeads < 1){
//                 return generateSnackbar("Your membership limit has exceeded.", "warning");
//               } 
//               else{
//                     //Apply using leads
//                     console.log("LEads");
//                     let res = await applyJob({
//                       professionalId : professionalData._id,
//                       projectId : data.projectId,
//                       proposal : proposalMessage,
//                       proposalType : "leads",
//                     });
//                     console.log(res);
//                     if(res.status !== 400 || res.data?.status === "success"){
//                       generateSnackbar("Bid Sent successfully.", "success");
//                       setLoading(false);
//                       setApplied(true);
//                       setClientData(res?.data?.data[0])
//                       setTimeout(()=>{setApplied(false);},1000);
//                       setTimeout(()=>{setApplied2(true);},1000)
//                       // router.forward(<openClientDetails />)
//                     }
//               }
//           }
//           else{ 
//             if(professionalData.professionalTotalBidPoints < data.pointsNeeded){
//             return generateSnackbar("Not Enough Points.", "warning");
//           } 
//           else{
//                 //Apply using leads
//                 console.log("Poits")
//           }

//           }
          
//         }
//         else{
//           generateSnackbar("Please login again.", "error");
//           router.push("/professional/login");
//           return;
//         }
//     }
//     catch(e){
//       console.log(e);
//       generateSnackbar("Failed to contact client. Please try again.", "error");
//     }
//   //   // TODO: add contact client logic
//   //   // simulate form submission
//   //   setLoading(false);
//   //   setApplied(true);

//   //   // show client contact details after 3 sec
//   //   setTimeout(() => {
//   //     openClientDetails();
//   //   }, 2000)
//   }

  
//   const JobDoneModal = (
//     <div>
//       <img src={doneIcon.src} alt='' className='w-20 mx-auto mb-2' />
//       <h1 className='text-lg font-bold'>Done!</h1>
//       {/* <p>You can now contact {job?.client.name}</p> */}
      
//       <p>You can now contact Arham</p>
//     </div>
//   )

//   return (
//     <>
//     <Modal open={open} className="flex justify-center items-center" onClose={onClose}>
//       <Box className="bg-white w-full max-w-screen-sm text-center rounded-md p-6 pb-12 shadow-md">
//         {
//           loading ? <div className="loader m-auto" /> : (
//             applied ? JobDoneModal : (
//               <>
//                 <WalletIcon className="text-secondary text-7xl" />
//                 <h1 className="font-bold">Contacting Arham will cost you 20 points</h1>
//                 {/* <h1 className="font-bold">Contacting {job?.client.name} will cost you {job?.proposalCost} points</h1> */}
//                 <p>You have 20 points in your wallet.{" "}
//                   <Link href="/wallet" className="text-red font-bold hover:underline">Top up!</Link>
//                 </p>
//                 <form className="mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
//                   <TextField
//                     fullWidth
//                     multiline
//                     label="Type your proposal"
//                     rows={4}
//                     className="shadow-md"
//                     value={proposalMessage}
//                     onChange={(e)=>{setProposalMessage(e.target.value)}}
//                   />
//                   <Button variant="contained" type="submit" className="mt-4 font-semibold" size="large" >
//                     Contact client
//                     <ArrowForwardIcon className="ml-2 text-2xl" />
//                   </Button>
//                 </form>
//               </>
//             )
//           )
//         }
//       </Box>
//       </Modal>
//         {
//           (applied2)
//           ?
//             <ClientDetails open={applied2} onClose={closeApplied} job={clientData}  applied={setApplied2} />
//           :
//           ""
//         }
//       </>

    
//   )
// }



"use client";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WalletIcon from '@mui/icons-material/Wallet';
import { Box, Button, Modal, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from 'react';
import doneIcon from "@/public/icons/done.svg";
import { useUserContext } from '@/context/user_context';
import { useSnackbar } from '@/context/snackbar_context';
import { useRouter, useSearchParams } from 'next/navigation';
import ClientDetails from './client-details';

export default function ContactClient({ open, onClose, job, openClientDetails, applied, setApplied, userData }) {
  const [loading, setLoading] = useState(false);
  const [proposalMessage, setProposalMessage] = useState("");
  const [applied2, setApplied2] = useState(false);
  const [clientData, setClientData] = useState({});

  const { generateSnackbar } = useSnackbar();
  const { checkBid, applyJob } = useUserContext();
  const router = useRouter();
  let projectId = useSearchParams().get("job")

  const closeApplied = () => {
    router.push("/leads");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let bid = await checkBid({ userId: userData.userId, projectId: projectId });
      console.log(bid);
      let data = bid?.data;
      let professionalData = bid?.data?.data;

      if (!data.eligible) {
        generateSnackbar("Cannot apply on this project.", "warning");
      } else if (data.projectAvailableBids < 1) {
        generateSnackbar("Maximum bidding limit is reached.", "warning");
      } else if (!professionalData.adminAccessProfessional) {
        generateSnackbar("You cannot apply on this project.", "warning");
      }
      else if(payAsGo === true){
        
      }
      else if (professionalData.isMembership) {
        if (professionalData.membershipLeads < 1) {
          generateSnackbar("Your membership limit has exceeded.", "warning");
        } else {
          let res = await applyJob({
            professionalId: professionalData._id,
            projectId: data.projectId,
            proposal: proposalMessage,
            proposalType: "leads",
          });
          if (res.status !== 400 || res.data?.status === "success") {
            generateSnackbar("Bid Sent successfully.", "success");
            setClientData(res?.data?.data[0]);
            setApplied(true);
            setTimeout(() => {
              setApplied(false);
              setApplied2(true);
            }, 1000);
          }
        }
      } else if (professionalData.professionalTotalBidPoints < data.pointsNeeded) {
        generateSnackbar("Not Enough Points.", "warning");
      } else {
        // Apply using points
        let res = await applyJob({
          professionalId: professionalData._id,
          projectId: data.projectId,
          proposal: proposalMessage,
          proposalType: "points",
        });
        if (res.status !== 400 || res.data?.status === "success") {
          generateSnackbar("Bid Sent successfully.", "success");
          setClientData(res?.data?.data[0]);
          setApplied(true);
          setTimeout(() => {
            setApplied(false);
            setApplied2(true);
          }, 1000);
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
      <p>You can now contact {clientData?.clientName}</p>
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
              <h1 className="font-bold">Contacting {job?.clientName} will cost you {job?.proposalCost} points</h1>
              <p>
                You have {userData.professionalTotalBidPoints} points in your wallet.{" "}
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
                  Contact client
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
    </>
  );
}