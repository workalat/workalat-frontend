import React from "react";

import AuthNavbar from "@/components/navbar/auth_navbar";

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthNavbar />
      <main>
        {children}
      </main>
    </>
  );
};

export default ClientDashboardLayout;
