"use client"

import Tasklist from "@/components/Professional/Tasklist/Tasklist";
import { useParams } from "next/navigation";

export default function page() {
    const pathname = useParams();
    return (
        <div className="pt-20">
            <Tasklist params={pathname} />
        </div>
    )
}
