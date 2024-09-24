'use client'

import Reviews from "@/components/Clients/Reviews/Reviews";
import { useParams } from "next/navigation";

export default function ReviewsPage() {
    const pathname = useParams();
    return (
        <div className="">
            <Reviews params={pathname} />
        </div>
    )
}
