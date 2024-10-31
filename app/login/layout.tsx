// import React from "react";
// import { redirect } from "next/navigation";
// import Session from "../../lib/session";
// import axios from "axios";
// import { handlers } from "@/auth";

// interface Props {
//   children: React.ReactNode;
// }

// const AuthLayout: React.FC<Props> = async ({ children }) => {
//   const session = await Session();
//   const user = session?.user;

//   console.log(session);
//   console.log(handlers.GET.toString());
//   console.log(handlers.GET.prototype);
//   console.log(handlers.GET.name);
//   console.log(handlers.GET.length);
//   console.log( "Check if google" ,session?.user?.image?.includes("google"));

//   async function signin(){
//     const response  : any  = await axios.post(`http://localhost:5000/forgetPasswordLoginEmail`, {
//       userEmail : session?.user?.email,
//       });
//   };
//   signin();


//   // if (user) {
//   //   redirect("/");
//   // }

//   return <>{children}</>;
// };

// export default AuthLayout;


import React from "react";
// import { redirect } from "next/navigation";
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

  // console.log(data);
  if(data?.provider === "google"){
    let d : any  = {
      userFullName : data.name,      
      email : data.email,
      userPictureLink : data.image,
    }
    const response  : any  = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signinGoogle`, d);
    if(response?.data?.status === "success"){
      const customToken = response.data.token; // Retrieve your custom token
      Cookies.set("token", customToken, { secure: true, sameSite: "None" });
     
      // if(response?.data?.userType === "client"){
      //   redirect("/client/dashboard");
      // }
      // else{
      //   redirect("/professional/dashboard");
      // }

    }
      // return(response)
  }
  else{
    console.log("Linkedin",data)
  }


  // if (user) {
  //   redirect("/");
  // }

  return <>{children}</>;
};

export default AuthLayout;
