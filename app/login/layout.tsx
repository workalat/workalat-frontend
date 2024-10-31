import React from "react";
import { redirect } from "next/navigation";
import Session from "../../lib/session";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = async ({ children }) => {
  const session = await Session();
  const user = session?.user;

  console.log(session);

  async function signin(){
    const response  : any  = await axios.post(`http://localhost:5000/forgetPasswordLoginEmail`, {
      userEmail : session?.user?.email,
      });
  };
  signin();


  // if (user) {
  //   redirect("/");
  // }

  return <>{children}</>;
};

export default AuthLayout;
