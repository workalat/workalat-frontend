'use client'

import ProjectFiles from "@/components/Professional/ProjectFiles/ProjectFiles";
import { useParams } from "next/navigation";

export default function FilesPage() {
    const pathname = useParams();
    return (
        <div className="pt-20">
            <ProjectFiles params={pathname}  />
        </div>
    )
}
