'use client'
import ViewSupportTickets from "@/components/Admin/Dashboard/SupportTickets/ViewSupportTickets";
import AdminNavbar from "@/components/navbar/admin_navbar";
import { useParams } from "next/navigation"

export default function SupportTicketsViewPage() {
    const { id } = useParams();
    return (
        <div>
            <AdminNavbar />
            <ViewSupportTickets path={id} />
        </div>
    )
}
