'use client'

import ProjectFiles from "@/components/Clients/ProjectFiles/ProjectFiles";
import { useParams } from "next/navigation";

export default function FilesPage() {
    const pathname = useParams();
    return (
        <div className="">
            <ProjectFiles params={pathname}  />
        </div>
    )
}
