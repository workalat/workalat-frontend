'use client'

import Reviews from "@/components/Professional/Reviews/Reviews";
import { useParams } from "next/navigation";

export default function ReviewsPage() {
    const pathname = useParams();
    return (
        <div className="pt-20">
            <Reviews params={pathname} />
        </div>
    )
}
