"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ProfessionalSettingsPage from '@/components/Settings/ProfessionalSettings';

const SettingsPage = () => {
  
  // const user = useUserContext().user;
  let { professionalDetailsP1, professionalDetailsP2 } = useUserContext();
  
  // loading
  const [loading2, setLoading2] = useState(true);
  let router = useRouter();
  let [user, setUser]= useState("")
  let [data1, setData1] = useState({});
  let [data2, setData2] = useState({});

  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "professional");
        // console.log(ver);
        if(ver.status === "success"){
          // if(ver.registerAs === "client"){
          //   setUser("/client/account_settings")
          // }
          // else{
            let d1 = await professionalDetailsP1({ userId : ver.userId});
            let d2 = await professionalDetailsP2({ userId : ver.userId});

            setData1(d1?.data?.data);
            setData2(d2?.data?.data);
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
            <ProfessionalSettingsPage data1={data1} data2={data2} />
            )
        }

    </>
  )
}

export default SettingsPage

      