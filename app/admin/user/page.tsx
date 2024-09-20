import UsersDashboard from "@/components/Admin/Dashboard/Users/UsersDashboard";
import AdminNavbar from "@/components/navbar/admin_navbar";

export default function UsersPage() {
    return (
        <div>
            <AdminNavbar />
            <UsersDashboard />
        </div>
    )
}
