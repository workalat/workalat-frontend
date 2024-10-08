import { Box, Button, LinearProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import coinIcon from "@/public/icons/coin.svg";
import { getPastTime } from "@/utils/helper";

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
    <Box className="border rounded-md bg-[#F3F3F3] px-4 py-8 sm:p-8 text-main space-y-4 lg:space-y-2">
      <Box className="flex gap-x-4 gap-y-2 justify-between items-center flex-wrap">
        <h2 className="font-semibold text-lg">{lead.title}</h2>
        <Box className="flex gap-4 w-full sm:w-max justify-between sm:justify-start">
          <Box className="flex gap-2">
            <Image src={coinIcon} alt="Cost" />
            {lead.proposalCost} Points
          </Box>
          <span className="font-bold text-right sm:text-left">${lead.budget} GBP</span>
        </Box>
      </Box>
      <Box className="flex gap-4 items-start">
        <Image
          src={lead.client.image}
          alt=""
          width={64}
          height={64}
          className="w-14 h-14 object-cover rounded-sm"
        />
        <Box className="flex gap-4 items-start">
          <h3 className="text-lg font-semibold flex flex-col gap-0 justify-center">
            {lead.client.name}
            <span className="text-sm font-medium">{lead.location}</span>
          </h3>
          <Box className="flex items-center gap-1 mt-0.5 flex-wrap">
            {lead.tags.map((tag) => (
              <Box
                key={tag.name}
                className="flex justify-center items-center px-2 rounded-full text-sm"
                style={{ backgroundColor: tag.color }}
              >
                <span
                  className={`flex justify-center items-center rounded-sm -mr-0.5 [&>*]:!w-4
                  ${tag.name === "Verified" ? "[&>*]:!text-[#04842f]" : " [&>*]:!text-main"}
                    `}
                >
                  {tag.icon}
                </span>
                <span className="rounded-sm px-2 hidden sm:block">
                  {tag.name}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <p className="">{lead.shortDescription}</p>
      <Box className="!mt-4 flex justify-between items-center flex-wrap w-full">
        <Box>
          <Box className="flex items-center gap-2 text-sm flex-wrap">
            <LinearProgress
              variant="determinate"
              value={(lead.applications / lead.totalApplications) * 100}
              className="w-full sm:w-24 h-2 rounded-full"
              classes={{
                bar: "bg-secondary rounded-full",
                root: "bg-[#E0E0E0]",
              }}
            />
            {lead.applications} / {lead.totalApplications} professionals have
            bided
          </Box>
          <p className="sm:text-base text-sm mt-4">{getPastTime(lead.created_at.toISOString().split("T")[0])}</p>
        </Box>
        <Box className="flex gap-4 flex-wrap gap-y-2 mt-4 sm:mt-0 !w-full">
          <Link href={`/leads?job=${lead.id}`} className="w-full sm:w-auto">
            <Button variant="outlined" color="secondary" className="sm:!mt-4 w-full">
              View Details
            </Button>
          </Link>
          <Link href={`/leads?job=${lead.id}&apply=true`} className="w-full sm:w-auto">
            <Button variant="contained" color="secondary" className="sm:!mt-4 w-full">
              Contact
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
