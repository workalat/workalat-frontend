"use client"
import { Box, Skeleton } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlagIcon from '@mui/icons-material/Flag';
import ReplayIcon from '@mui/icons-material/Replay';

import LeadsFilter from "./sub-components/filter";
import JobDetailsSlider from "./sub-components/job-details-slider";
import LeadCard from "./sub-components/lead-card";
import ContactClient from "./sub-components/contact-client";
import ClientDetails from "./sub-components/client-details";

interface Lead {
  id: number;
  title: string;
  shortDescription: string;
  proposalCost: number;
  budget: number;
  techStack: string[];
  created_at: Date;
  location: string;
  applications: number;
  totalApplications: number;
  tags: {
    name: string,
    icon: React.ReactNode,
    color: string;
  }[];
  client: {
    id: number;
    name: string;
    isVerified: boolean;
    image: string;
  };
}

interface JobSearchCriteria {
  keyword: string;
  services: string[];
  location: {
    custom: string;
    within_30mi: boolean;
    nationwide: boolean;
    all: boolean;
  };
  budget: {
    minBudget: number;
    maxBudget: number;
  };
  time: {
    anytime: boolean;
    lastHour: boolean;
    today: boolean;
    yesterday: boolean;
    threeDays: boolean;
    sevenDays: boolean;
    twoWeeks: boolean;
  };
}

export default function LeadsPage() {

  // router
  const router = useRouter();
  
  // job id
  const searchParams = useSearchParams();

  const job = searchParams.get("job");
  const applyToJob = searchParams.get("apply") === "true";
  const applied = searchParams.get("applied") === "true";

  // job details
  const openJobDetails = (id: number) => {
    router.push(`/leads?job=${id}`);
  }

  const onJobDetailsClose = () => {
    router.push("/leads");
  }

  // job application
  const [activeJob, setActiveJob] = useState<Lead | null>(null);

  const closeJobApplication = () => {
    router.push(`/leads?job=${job}`)
  }
  
  // loading state
  const [loading, setLoading] = useState(true);
  
  // leads
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(()=>{
    // simulate loading leads
    setTimeout(() => {
      setLeads(fakeLeads);
    }, 1000);

    setLoading(false);

    // job
    if(job) {
      openJobDetails(Number(job));
      setActiveJob(fakeLeads.find(lead => lead.id === Number(job)) as Lead);
      if(applyToJob || applied) {
        if(appliedToJob) {
          router.push(`/leads?job=${job}&applied=true`);
        }
      }

    }
  },[])

  // applied
  const [appliedToJob, setAppliedToJob] = useState(false);
  const openClientDetails = () => {
    setAppliedToJob(false);
    setActiveJob(
      fakeLeads.find(lead => lead.id === Number(job)) as Lead
    );
    router.push(`/leads?job=${Number(job)}&applied=true`);
  }
  const closeApplied = () => {
    router.push("/leads");
  }

  // filter
  const [appliedFilters, setAppliedFilters] = useState<JobSearchCriteria>({
    keyword: "",
    services: [],
    location: {
      custom: "",
      within_30mi: false,
      nationwide: false,
      all: true,
    },
    budget: {
      minBudget: 0,
      maxBudget: 999999,
    },
    time: {
      anytime: true,
      lastHour: false,
      today: false,
      yesterday: false,
      threeDays: false,
      sevenDays: false,
      twoWeeks: false,
    },
  });

  const handleFilterSubmit = (data: JobSearchCriteria) => {
    setAppliedFilters(data);
  };

  const applyFilters = (lead: Lead): boolean => {
    if (!appliedFilters) return true;
    const servicesMatch = appliedFilters.services.length > 0
      ? appliedFilters.services.every(service => lead.techStack.includes(service))
      : true;
  
    const locationMatch = appliedFilters.location.custom
      ? appliedFilters.location.custom.toLowerCase() === lead.location.toLowerCase()
      : appliedFilters.location.within_30mi
        ? lead.location.toLowerCase().includes('chicago')
        : appliedFilters.location.nationwide
          ? true
          : appliedFilters.location.all
            ? true
            : false;
  
    const budgetMatch = lead.budget >= appliedFilters.budget.minBudget && lead.budget <= appliedFilters.budget.maxBudget;
  
    const timeMatch = appliedFilters.time.anytime
      ? true
      : appliedFilters.time.lastHour
        ? new Date().getHours() - new Date(lead.created_at).getHours() <= 1
        : appliedFilters.time.today
          ? new Date().getDate() === new Date(lead.created_at).getDate()
          : appliedFilters.time.yesterday
            ? new Date().getDate() === new Date(lead.created_at).getDate() + 1
            : appliedFilters.time.threeDays
              ? new Date().getDate() - new Date(lead.created_at).getDate() <= 3
              : appliedFilters.time.sevenDays
                ? new Date().getDate() - new Date(lead.created_at).getDate() <= 7
                : appliedFilters.time.twoWeeks
                  ? new Date().getDate() - new Date(lead.created_at).getDate() <= 14
                  : false;
  
    const keywordMatch = lead.title.toLowerCase().includes(appliedFilters.keyword?.toLowerCase() || '');
  
    return servicesMatch && locationMatch && budgetMatch && timeMatch && keywordMatch;
  };
  

  return (
    <Box className="flex gap-x-6 gap-y-1 items-start flex-col lg:flex-row">
      { !loading &&  <LeadsFilter setFilterss={handleFilterSubmit} />}
      <Box className="grid grid-cols-1 gap-4 py-5 flex-grow">
        {
          !loading ? leads.filter(applyFilters).map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
            )) : (
              <Box className="animate-pulse space-y-4">
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="rectangular" height={300} />
              </Box>
            )
        }
      </Box>
      <JobDetailsSlider open={job ? true:false } jobId={Number(job)} onClose={onJobDetailsClose} />
      <ContactClient  open={applyToJob} job={activeJob} applied={appliedToJob} setApplied={setAppliedToJob} openClientDetails={openClientDetails} onClose={closeJobApplication} />
      <ClientDetails open={applied} job={activeJob} onClose={closeApplied} />
    </Box>
  );
}


const fakeLeads: Lead[] = [
  {
    id: 10,
    title: "Healthcare Management System",
    shortDescription: "Develop a comprehensive healthcare management system with patient and staff modules.",
    proposalCost: 30000,
    budget: 35000,
    techStack: ["Java", "Spring Boot", "MySQL"],
    created_at: new Date("2024-08-01T08:30:00Z"),
    location: "Chicago, IL",
    client: {
      id: 301,
      name: "HealthCorp",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 11,
    title: "Social Media Marketing Platform",
    shortDescription: "Create a platform for managing and analyzing social media marketing campaigns.",
    proposalCost: 18000,
    budget: 22000,
    techStack: ["React", "Node.js", "AWS"],
    created_at: new Date("2024-08-03T10:00:00Z"),
    location: "Austin, TX",
    client: {
      id: 302,
      name: "AdMaster",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 12,
    title: "Online Learning Platform",
    shortDescription: "Build a scalable online learning platform with video streaming and interactive features.",
    proposalCost: 25000,
    budget: 30000,
    techStack: ["Vue.js", "Django", "PostgreSQL"],
    created_at: new Date("2024-08-05T12:15:00Z"),
    location: "Seattle, WA",
    client: {
      id: 303,
      name: "EduTech Ltd.",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 13,
    title: "Automated Inventory System",
    shortDescription: "Develop an automated system for managing and tracking inventory in retail stores.",
    proposalCost: 22000,
    budget: 27000,
    techStack: ["Ruby on Rails", "MySQL", "Redis"],
    created_at: new Date("2024-08-10T14:00:00Z"),
    location: "Miami, FL",
    client: {
      id: 304,
      name: "RetailKing",
      isVerified: false,
      image: "/images/customer1.png"
    }
  },
  {
    id: 14,
    title: "Real Estate Property Listing App",
    shortDescription: "Create a mobile app for listing and managing real estate properties.",
    proposalCost: 15000,
    budget: 20000,
    techStack: ["Flutter", "Firebase", "Node.js", "Web Development"],
    created_at: new Date("2024-08-12T09:45:00Z"),
    location: "New York, NY",
    client: {
      id: 305,
      name: "PropMart",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 15,
    title: "Finance Dashboard Tool",
    shortDescription: "Develop a tool for visualizing financial data and generating reports.",
    proposalCost: 16000,
    budget: 21000,
    techStack: ["Angular", "Python", "MongoDB"],
    created_at: new Date("2024-08-15T13:30:00Z"),
    location: "San Francisco, CA",
    client: {
      id: 306,
      name: "FinTech Solutions",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 16,
    title: "Event Management System",
    shortDescription: "Create a system to manage and organize events with ticketing and scheduling features.",
    proposalCost: 20000,
    budget: 25000,
    techStack: ["Laravel", "Vue.js", "SQLite"],
    created_at: new Date("2024-08-18T11:00:00Z"),
    location: "Boston, MA",
    client: {
      id: 307,
      name: "EventPro",
      isVerified: false,
      image: "/images/customer1.png"
    }
  },
  {
    id: 17,
    title: "Customer Feedback System",
    shortDescription: "Develop a system to collect and analyze customer feedback with reporting features.",
    proposalCost: 13000,
    budget: 17000,
    techStack: ["React", "Node.js", "PostgreSQL"],
    created_at: new Date("2024-08-20T15:30:00Z"),
    location: "Philadelphia, PA",
    client: {
      id: 308,
      name: "FeedbackInc",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 18,
    title: "AI Chatbot for Customer Support",
    shortDescription: "Build an AI-powered chatbot to assist with customer support and inquiries.",
    proposalCost: 22000,
    budget: 27000,
    techStack: ["Python", "TensorFlow", "AWS Lambda"],
    created_at: new Date("2024-08-22T10:00:00Z"),
    location: "Dallas, TX",
    client: {
      id: 309,
      name: "SupportAI",
      isVerified: true,
      image: "/images/customer1.png"
    }
  },
  {
    id: 19,
    title: "Subscription Management System",
    shortDescription: "Create a system for managing subscription services with billing and analytics features.",
    proposalCost: 17000,
    budget: 21000,
    techStack: ["Node.js", "Express", "MongoDB"],
    created_at: new Date("2024-08-25T08:15:00Z"),
    location: "San Diego, CA",
    client: {
      id: 310,
      name: "SubManage",
      isVerified: false,
      image: "/images/customer1.png"
    }
  },
  {
    id: 20,
    title: "Travel Booking Platform",
    shortDescription: "Develop a platform for booking travel arrangements including flights, hotels, and car rentals.",
    proposalCost: 35000,
    budget: 40000,
    techStack: ["React", "GraphQL", "MySQL"],
    created_at: new Date("2024-08-28T16:00:00Z"),
    location: "Denver, CO",
    client: {
      id: 311,
      name: "TravelGenie",
      isVerified: true,
      image: "/images/customer1.png"
    }
  }
].map(lead => ({
  ...lead,
  applications: 2,
  totalApplications: 5,
  tags: [
    {
      name: "Verified",
      icon: <CheckBoxIcon style={{ color: 'rgba(4, 132, 47, 0.2)' }} />,
      color: 'rgba(4, 132, 47, 0.2)'
    },
    {
      name: "Urgent",
      icon: <FlagIcon style={{ color: 'rgba(255, 58, 68, 0.2)' }} />,
      color: 'rgba(255, 58, 68, 0.2)'
    },
    {
      name: "Frequent User",
      icon: <ReplayIcon style={{ transform: 'rotate(180deg)', color: 'rgba(247, 108, 16, 0.2)' }} />,
      color: 'rgba(247, 108, 16, 0.2)'
    }
  ]
}));

