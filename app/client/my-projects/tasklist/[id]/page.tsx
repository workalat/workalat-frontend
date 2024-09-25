"use client"

import Tasklist from "@/components/Clients/Tasklist/Tasklist";
import { useParams } from "next/navigation";

export default function page() {
    const pathname = useParams();
    return (
        <div className="">
            <Tasklist params={pathname} />
        </div>
    )
}
