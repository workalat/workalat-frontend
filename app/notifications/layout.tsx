import React from "react";
import Image from "next/image";

import AuthNavbar from "@/components/navbar/auth_navbar";
import bgPattern5 from "@/public/images/bg_pattern_5.svg";
import bgPattern6 from "@/public/images/bg_pattern_6.svg";

const NotificationsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthNavbar />
      <main className="my-10 container mx-auto max-w-7xl px-6">
        <Image src={bgPattern5} alt="" className="absolute left-0 top-0 z-0" />
        <Image src={bgPattern6} alt="" className="absolute right-0 top-0 z-0" />
        <>{children}</>
      </main>
    </>
  );
};

export default NotificationsLayout;
