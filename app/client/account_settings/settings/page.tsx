"use client"
import React, { useEffect, useState } from 'react'

// import { useUserContext } from '@/context/user_context'
import ClientSettings from '@/components/Settings/ClientSettings';

import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  
  // const user = useUserContext().user;
  let { getClientsData } = useUserContext();
  
  // loading
  const [loading2, setLoading2] = useState(true);
  let router = useRouter();
  let [user, setUser]= useState("")
  let [data, setData] = useState({});

  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "client");
        // console.log(ver);
        if(ver.status === "success"){
          // if(ver.registerAs === "professional"){
          //   setUser("/professional/account_settings")
          // }
          // else{
            let data = await getClientsData({ userId : ver.userId});
            // console.log(data);
            setData(data?.data?.data);
            setLoading2(false);
          // }
        }
        else{
          router.push("/");
        }
      }
      catch(e){
        console.log(e);
      }
    };
    verify();
  }, []);

  
  return (
    <>
      
      {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
              <ClientSettings data={data} />
            )
        }

    </>
  )
}

export default SettingsPage
