import AuthNavbar from "@/components/navbar/auth_navbar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthNavbar />
            <main>
                {children}
            </main>
        </>
    )
}
