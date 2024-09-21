'use client'

import ProjectDetails from "@/components/Clients/ProjectDetails/ProjectDetails"
import { useParams } from "next/navigation"

export default function ProjectDetailsPage() {
    const pathname = useParams();
    
    return (
        <div>
            <ProjectDetails params={pathname} />
        </div>
    )
}
