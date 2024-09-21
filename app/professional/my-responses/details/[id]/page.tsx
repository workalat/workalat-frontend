'use client'

import ProjectDetails from "@/components/Professional/ProjectDetails/ProjectDetails";
import { useParams } from "next/navigation"

export default function ProjectDetailsPage() {
    const pathname = useParams();
    
    return (
        <div className="pt-20">
            <ProjectDetails params={pathname} />
        </div>
    )
}
