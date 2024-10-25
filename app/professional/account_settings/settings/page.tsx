"use client"
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ProfessionalSettingsPage from '@/components/Settings/ProfessionalSettings';

const SettingsPage = () => {
  
  // const user = useUserContext().user;
  let { professionalDetailsP1, professionalDetailsP2 } : any  = useUserContext();
  
  // loading
  const [loading2, setLoading2] = useState(true);
  let router   : any  = useRouter();
  let [user, setUser ] : any  = useState("")
  let [data1, setData1]   : any  = useState({});
  let [data2, setData2]   : any  = useState({});

  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token : any  = Cookies.get("token");
        let ver : any  = await VerifyUser(token, "professional");
        if(ver.status === "success"){
            let d1 : any  = await professionalDetailsP1({ userId : ver.userId});
            let d2 : any  = await professionalDetailsP2({ userId : ver.userId});

            setData1(d1?.data?.data);
            setData2(d2?.data?.data);
            setLoading2(false);
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

      