"use client"

import ProjectProposal from "@/components/Professional/ProjectProposal/ProjectProposal";
import { useParams } from "next/navigation";

export default function ProposalPage() {
  const pathname = useParams();
  return (
    <div className="pt-20">
      <ProjectProposal params={pathname} />
    </div>
  )
}
