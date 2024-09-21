"use client"

import ProjectProposal from "@/components/Clients/ProjectProposal/ProjectProposal";
import { useParams } from "next/navigation";

export default function ProposalPage() {
  const pathname = useParams();
  return (
    <div>
      <ProjectProposal params={pathname} />
    </div>
  )
}
