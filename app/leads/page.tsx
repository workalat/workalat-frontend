// "use client"
// import { Box, Skeleton } from "@mui/material";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import FlagIcon from '@mui/icons-material/Flag';
// import ReplayIcon from '@mui/icons-material/Replay';

// import LeadsFilter from "./sub-components/filter";
// import JobDetailsSlider from "./sub-components/job-details-slider";
// import LeadCard from "./sub-components/lead-card";
// import ContactClient from "./sub-components/contact-client";
// import ClientDetails from "./sub-components/client-details";
// import { useUserContext } from "@/context/user_context";
// import { useSnackbar } from "@/context/snackbar_context";
// import VerifyUser from "../middleware/VerifyUser";
// import Cookies from 'js-cookie';

// interface Lead {
//   id: number;
//   title: string;
//   shortDescription: string;
//   proposalCost: number;
//   budget: number;
//   techStack: string[];
//   created_at: Date;
//   location: string;
//   applications: number;
//   totalApplications: number;
//   tags: {
//     name: string,
//     icon: React.ReactNode,
//     color: string;
//   }[];
//   client: {
//     id: number;
//     name: string;
//     isVerified: boolean;
//     image: string;
//   };
// }

// interface JobSearchCriteria {
//   keyword: string;
//   services: string[];
//   location: {
//     custom: string;
//     within_30mi: boolean;
//     nationwide: boolean;
//     all: boolean;
//   };
//   budget: {
//     minBudget: number;
//     maxBudget: number;
//   };
//   time: {
//     anytime: boolean;
//     lastHour: boolean;
//     today: boolean;
//     yesterday: boolean;
//     threeDays: boolean;
//     sevenDays: boolean;
//     twoWeeks: boolean;
//   };
// }

// export default function LeadsPage() {

//   // router
//   const router = useRouter();
  
//   // job id
//   const searchParams = useSearchParams();

//   const job = searchParams.get("job");
//   const applyToJob = searchParams.get("apply") === "true";
//   const applied = searchParams.get("applied") === "true";

//   // job details
//   const openJobDetails = (id: number) => {
//     router.push(`/leads?job=${id}`);
//   }

//   const onJobDetailsClose = () => {
//     router.push("/leads");
//   }

//   // job application
//   const [activeJob, setActiveJob] = useState<Lead | null>(null);

//   const closeJobApplication = () => {
//     router.push(`/leads?job=${job}`)
//   }
  
//   // loading state
//   const [loading, setLoading] = useState(true);
  
//   // leads
//   const [leads, setLeads] = useState<Lead[]>([]);

//   // useEffect(()=>{
//   //   // simulate loading leads
//   //   setTimeout(() => {
//   //     setLeads(fakeLeads);
//   //   }, 1000);


//   //   // job
//   //   if(job) {
//   //     openJobDetails(Number(job));
//   //     setActiveJob(fakeLeads.find(lead => lead.id === Number(job)) as Lead);
//   //     if(applyToJob || applied) {
//   //       if(appliedToJob) {
//   //         router.push(`/leads?job=${job}&applied=true`);
//   //       }
//   //     }

//   //   }
//   // },[])

//   // applied
//   const [appliedToJob, setAppliedToJob] = useState(false);
//   const openClientDetails = () => {
//     setAppliedToJob(false);
//     setActiveJob("123");
//     router.push(`/leads?job=${Number(job)}&applied=true`);
//   }
//   const closeApplied = () => {
//     router.push("/leads");
//   }

//   // filter
//   const [appliedFilters, setAppliedFilters] = useState<JobSearchCriteria>({
//     keyword: "",
//     services: [],
//     location: {
//       custom: "",
//       within_30mi: false,
//       nationwide: false,
//       all: true,
//     },
//     budget: {
//       minBudget: 0,
//       maxBudget: 999999,
//     },
//     time: {
//       anytime: true,
//       lastHour: false,
//       today: false,
//       yesterday: false,
//       threeDays: false,
//       sevenDays: false,
//       twoWeeks: false,
//     },
//   });

//   const handleFilterSubmit = (data: JobSearchCriteria) => {
//     setAppliedFilters(data);
//   };

//   const applyFilters = (lead: Lead): boolean => {
//     if (!appliedFilters) return true;
//     const servicesMatch = appliedFilters.services.length > 0
//       ? appliedFilters.services.every(service => lead.techStack.includes(service))
//       : true;
  
//     const locationMatch = appliedFilters.location.custom
//       ? appliedFilters.location.custom.toLowerCase() === lead.location.toLowerCase()
//       : appliedFilters.location.within_30mi
//         ? lead.location.toLowerCase().includes('chicago')
//         : appliedFilters.location.nationwide
//           ? true
//           : appliedFilters.location.all
//             ? true
//             : false;
  
//     const budgetMatch = lead.budget >= appliedFilters.budget.minBudget && lead.budget <= appliedFilters.budget.maxBudget;
  
//     const timeMatch = appliedFilters.time.anytime
//       ? true
//       : appliedFilters.time.lastHour
//         ? new Date().getHours() - new Date(lead.created_at).getHours() <= 1
//         : appliedFilters.time.today
//           ? new Date().getDate() === new Date(lead.created_at).getDate()
//           : appliedFilters.time.yesterday
//             ? new Date().getDate() === new Date(lead.created_at).getDate() + 1
//             : appliedFilters.time.threeDays
//               ? new Date().getDate() - new Date(lead.created_at).getDate() <= 3
//               : appliedFilters.time.sevenDays
//                 ? new Date().getDate() - new Date(lead.created_at).getDate() <= 7
//                 : appliedFilters.time.twoWeeks
//                   ? new Date().getDate() - new Date(lead.created_at).getDate() <= 14
//                   : false;
  
//     const keywordMatch = lead.title.toLowerCase().includes(appliedFilters.keyword?.toLowerCase() || '');
  
//     return servicesMatch && locationMatch && budgetMatch && timeMatch && keywordMatch;
//   };
  

//  // loading
//  const [loading2, setLoading2] = useState(true);
//  let [leadsData, setLeadsData] = useState([]);
//  let [userData, setUserData] = useState({});
//  let { showLeads } = useUserContext();


//  const { generateSnackbar } = useSnackbar();





//   useEffect(() => {
//     async function verify(){
//       try{
//         setLoading2(true);
//         let token = Cookies.get("token");
//         let ver = await VerifyUser(token, "professional");
//         console.log(ver);
//         if(ver.status === "success"){
//           setUserData(ver);
//           console.log(ver);
//           let res = await showLeads({userId: ver.userId});
//           console.log(res);
//           if(res.status !== 400 || res.data?.status === "success"){
//             // console.log(res.data?.data[0].projectMaxPrice);
//             if(ver.isRegistrationComplete === false || !ver.isRegistrationComplete){
//               router.push("/professional/onboard/formpage")
//             }
//             else{
              
//             setLeadsData(res.data?.data);
//             setLoading2(false);
//             setLoading(false); 
//             }
//           }
//           else{
//             generateSnackbar("Failed to fetch leads, Please try again." ,"error");
//             setTimeout(()=>{
//               router.push("/professional/login")
//             }, 1500);
//           }

//         }
//         else{
//           router.push("/professional/login"); 
//         }
//       } 
//       catch(e){
//         // console.log(e);
//         generateSnackbar("Some Error Occur, Please try Again." ,"error")
//       }
//     };
//     verify();
//   }, []);



//   return (
//     <>
//      {loading2 ? (
//                 <div className="w-[100%] h-screen flex justify-center items-center">
//                 <div className="loader m-auto" />
//                 </div>
//             )
//             :(
//               <>
//                 <Box className="flex gap-x-6 gap-y-1 items-start flex-col lg:flex-row">
//                   { !loading &&  <LeadsFilter setFilterProjects={setLeadsData} professionalId={userData.userId} />}
//                   <Box className="grid grid-cols-1 gap-4 py-5 flex-grow">
//                     {
//                       !loading ? leadsData.map((lead,i) => (
//                             <LeadCard key={i} lead={lead} />
//                         )) : (
//                           <Box className="animate-pulse space-y-4">
//                             <Skeleton variant="rectangular" height={300} />
//                             <Skeleton variant="rectangular" height={300} />
//                             <Skeleton variant="rectangular" height={300} />
//                             <Skeleton variant="rectangular" height={300} />
//                           </Box>
//                         )
//                     }
//                   </Box>
//                   <JobDetailsSlider open={job ? true:false } jobId={Number(job)} onClose={onJobDetailsClose} />
//                   <ContactClient  open={applyToJob} job={null} applied={appliedToJob} setApplied={setAppliedToJob} openClientDetails={openClientDetails} onClose={closeJobApplication} />
//                   <ClientDetails open={applied} job={activeJob} onClose={closeApplied} />
//                 </Box>
//               </>
//             )
//         }

//     </>
    
//   );
// }




"use client"
import { Box, Skeleton } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeadsFilter from "./sub-components/filter";
import JobDetailsSlider from "./sub-components/job-details-slider";
import LeadCard from "./sub-components/lead-card";
import ContactClient from "./sub-components/contact-client";
import ClientDetails from "./sub-components/client-details";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import VerifyUser from "../middleware/VerifyUser";
import Cookies from 'js-cookie';

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const job = searchParams.get("job");
  const applyToJob = searchParams.get("apply") === "true";
  const applied = searchParams.get("applied") === "true";

  const [loading, setLoading] = useState(true);
  const [leadsData, setLeadsData] = useState([]);
  const [userData, setUserData] = useState({});
  const [activeJob, setActiveJob] = useState(null);
  const [appliedToJob, setAppliedToJob] = useState(false);

  const { showLeads } = useUserContext();
  const { generateSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "professional");
        if (ver.status === "success") {
          setUserData(ver);
          if (ver.isRegistrationComplete === false) {
            router.push("/professional/onboard/formpage");
            return;
          }
          let res = await showLeads({ userId: ver.userId });
          if (res.status !== 400 || res.data?.status === "success") {
            setLeadsData(res.data?.data);
          } else {
            generateSnackbar("Failed to fetch leads. Please try again.", "error");
            setTimeout(() => {
              router.push("/professional/login");
            }, 1500);
          }
        } else {
          router.push("/professional/login");
        }
      } catch (e) {
        generateSnackbar("Some Error Occurred. Please try Again.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openJobDetails = (id) => {
    router.push(`/leads?job=${id}`);
  };

  const onJobDetailsClose = () => {
    router.push("/leads");
  };

  const closeJobApplication = () => {
    router.push(`/leads?job=${job}`);
  };

  const openClientDetails = () => {
    setAppliedToJob(true);
    router.push(`/leads?job=${job}&applied=true`);
  };

  const closeApplied = () => {
    router.push("/leads");
  };

  return (
    <>
      {loading ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <Box className="flex gap-x-6 gap-y-1 items-start flex-col lg:flex-row">
          <LeadsFilter setFilterProjects={setLeadsData} professionalId={userData.userId} />
          <Box className="grid grid-cols-1 gap-4 py-5 flex-grow">
            {leadsData.map((lead, i) => (
              <LeadCard key={i} lead={lead} openJobDetails={openJobDetails} />
            ))}
          </Box>
          <JobDetailsSlider open={!!job} jobId={Number(job)} onClose={onJobDetailsClose} />
          <ContactClient
            open={applyToJob}
            job={activeJob}
            applied={appliedToJob}
            setApplied={setAppliedToJob}
            openClientDetails={openClientDetails}
            onClose={closeJobApplication}
            userData={userData}
          />
          <ClientDetails open={applied} job={activeJob} onClose={closeApplied} />
        </Box>
      )}
    </>
  );
}