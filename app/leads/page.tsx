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