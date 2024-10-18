"use client"
import { Box, Button, LinearProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlagIcon from '@mui/icons-material/Flag';
import ReplayIcon from '@mui/icons-material/Replay';

import coinIcon from "@/public/icons/coin.svg";
import { getPastTime } from "@/utils/helper";
import moment from "moment";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
    name: string;
    icon: React.ReactNode;
    color: string;
  }[];
  client: {
    id: number;
    name: string;
    isVerified: boolean;
    image: string;
  };
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <>
    <Box className="border rounded-md bg-[#F3F3F3] px-4 py-8 sm:p-8 text-main space-y-4 lg:space-y-2">
      <Box className="flex gap-x-4 gap-y-2 justify-between items-center flex-wrap">
        {/* Category / Service */}
        <h2 className="font-semibold text-lg capitalize">{lead.serviceNeeded} </h2>     
        <Box className="flex gap-4 w-full sm:w-max justify-between sm:justify-start">
          <Box className="flex gap-2">
            <Image src={coinIcon} alt="Cost" />
            {/* Points  */}
            {lead.pointsNeeded} Points
          </Box>
          {/* Amont  */}
          <span className="font-bold text-right sm:text-left">${lead.projectMaxPrice} GBP</span>
        </Box>
      </Box>
      <Link href={`/client/profile/${lead.clientId}`}  className="cursor-pointer">
      <Box className="flex gap-4 items-start">
        {/* Clinet image */}
        <img
          src={lead.clientPictureLink}
          alt=""
          width={64}
          height={64}
          className="w-14 h-14 object-cover rounded-sm"
        />
        <Box className="flex gap-4 items-start">
          <h3 className="text-lg font-semibold flex flex-col gap-0 justify-center capitalize">
            {/* Name  */}
            {lead.clientName}
            <span className="text-sm font-medium capitalize">{lead.serviceLocationPostal}   {(lead.serviceLocationTown) ?(`| ${lead.serviceLocationTown}`) :""}</span>
            {/* <span className="text-sm font-medium">UK</span> */}
          </h3>
          <Box className="flex items-center gap-1 mt-0.5 flex-wrap">
            {/* Verified  */}
            {
              ((lead.isClientEmailVerify === true && lead.isClientPhoneNoVerify === true) || (lead.isClientEmailVerify && lead.isClientPhoneNoVerify))
              ?
              <Box
                  className="flex justify-center items-center px-2 rounded-full text-sm"
                  style={{ backgroundColor: `rgba(4, 132, 47, 0.2)` }}
                >
                  <span
                    className={`flex justify-center items-center rounded-sm -mr-0.5 [&>*]:!w-4
                     [&>*]:!text-[#04842f]
                      `}
                  >
                    <CheckBoxIcon style={{ color: 'rgba(4, 132, 47, 0.2)' }} />
                  </span>
                  <span className="rounded-sm px-2 hidden sm:block">
                    Verified
                  </span>
                </Box>

              :
              <></>
            }

              {/* Urgent  */}
              {
                (lead.projectUrgentStatus === "urgent")
                ?
               <Box
                className="flex justify-center items-center px-2 rounded-full text-sm"
                style={{ backgroundColor: `rgba(255, 58, 68, 0.2)`}}
              >
                <span
                  className={`flex justify-center items-center rounded-sm -mr-0.5 [&>*]:!w-4
                   [&>*]:!text-main
                    `}
                >
                  <FlagIcon style={{ color: 'rgba(255, 58, 68, 0.2)' }} />
                </span>
                <span className="rounded-sm px-2 hidden sm:block">
                  Urgent
                </span>
              </Box> 
                :
                <>
                </>
              }

          </Box>
        </Box>
      </Box>
      </Link>

      {/* Title  */}
      <p className="capitalize">{`${lead.serviceDes}...`}</p>
      <Box className="!mt-4 flex justify-between items-center flex-wrap w-full">
        <Box>
          <Box className="flex items-center gap-2 text-sm flex-wrap">
            <LinearProgress
              variant="determinate"
              value={(-5+ lead.maxBid)}
              className="w-full sm:w-24 h-2 rounded-full"
              classes={{
                bar: "bg-secondary rounded-full",
                root: "bg-[#E0E0E0]",
              }}
            />
            {/* Leads Number */}
            {-5+ lead.maxBid} professionals have
            bided
          </Box>
          {/* Date  */}
          <p className="sm:text-base text-sm mt-4">{moment(lead.projectTimeStamp).fromNow()}</p>
        </Box>
        <Box className="flex gap-4 flex-wrap gap-y-2 mt-4 sm:mt-0 !w-full">
          <Link href={`/leads?job=${lead._id}`} className="w-full sm:w-auto">
            <Button variant="outlined" color="secondary" className="sm:!mt-4 w-full">
              View Details
            </Button>
          </Link>
          <Link href={`/leads?job=${lead._id}&apply=true`} className="w-full sm:w-auto">
            <Button variant="contained" color="secondary" className="sm:!mt-4 w-full">
              Contact
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>

    </>
    
  );
}
