import React from "react";

import Home from "./components/home";

import AuthNavbar from "@/components/navbar/auth_navbar";

const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthNavbar />
      <main className="mt-14 md:mt-20 container mx-auto max-w-7xl px-6">
        <Home />
        <>
          {children}
        </>
      </main>
    </>
  );
};

export default ClientDashboardLayout;
