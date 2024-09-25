'use client'
import ViewSupportTickets from "@/components/Dashboard/SupportTickets/ViewSupportTickets";
import { useParams } from "next/navigation"

export default function SupportTicketsViewPage() {
    const { id } = useParams();
    return (
        <div>
            <ViewSupportTickets path={id} />
        </div>
    )
}
