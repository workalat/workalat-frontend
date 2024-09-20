import Messages from "@/components/Admin/Dashboard/Messages/Messages";
import AdminMessageNav from "@/components/navbar/admin_message_navbar";

export default function MessagesPage() {
    return (
        <div>
            <AdminMessageNav />
            <Messages />
        </div>
    )
}
