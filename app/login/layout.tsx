import React from "react";
import Session from "../../lib/session";
import axios from "axios";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Props {
  children: React.ReactNode;
}

const AuthLayout : any  = async ({ children }) => {
  const session  : any  = await Session();
  const user  : any  = session?.user; 

  const data  : any  = {
    ...user,
    provider: user?.image?.includes("https://lh3.googleusercontent.com")
      ? "google"
      : "linkedin",
  };
  return <>{children}</>;
};

export default AuthLayout;
