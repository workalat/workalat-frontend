"use client"
import React, { useEffect, useState } from 'react'
import { Button, FormControlLabel, Switch } from '@mui/material'
import Image from 'next/image';

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import arrowRightWhiteIcon from "@/public/icons/arrow_right_white.svg";

;

import VerifyUser from "@/app/middleware/VerifyUser";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from '@/context/user_context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const NotificationsPage = () => {

    
  //Loading
  const [loading2, setLoading2] = useState(true);
  const { generateSnackbar } = useSnackbar();
  
  let [requestValue, setRequestValue] =useState(true);
  let [chatNotificationValue, setChatNotificationValue] = useState(true);
  let [reminderValue,setReminderValue] = useState({});
  let [userData, setUserData] = useState({});


  const router = useRouter();
  let { getNotificationPage , setRequest, setReminder, setChatNotification} = useUserContext();
  
  
  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "client");
        // console.log(ver);
        if(ver.status === "success"){
          setUserData(ver);
          // if(ver.registerAs === "professional"){
          //   router.push("/professional/dashboard")
          // }
          // else{
            let data = await getNotificationPage({userId : ver.userId, userType : "client"});
            if(data.status === 200 || data.data?.status === "success"){
              // console.log(data);
              
              setRequestValue(data.data?.data?.request);
              setReminderValue(data.data?.data?.reminder);
              setChatNotificationValue(data.data?.data?.chatNotification);
              setLoading2(false);
          }
          else{
              generateSnackbar(res.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
          }  
          // }
        }
        else{
          router.push("/"); 
        }
      }
      catch(e){
        generateSnackbar("Some Error Occur, Please try Again.", "error");
      }
    };
    verify();
  }, []);
  

  async function handleSave(){
    try{
    //   console.log(userData);
      let re = await setRequest({userId : userData.userId,userType : userData.userType,current_value : !requestValue});
      let rem = await setReminder({userId : userData.userId,userType : userData.userType,current_value : !reminderValue});
      let chatN = await setChatNotification({userId : userData.userId,userType : userData.userType,current_value : !chatNotificationValue});

    //   console.log(re);
    //   console.log(rem);
    //   console.log(chatN);
      if((re.status !== 400 && rem.status !== 400 && chatN.status !== 400 ) || (re.data?.status === "success" && rem.data?.status === "success" && chatN.data?.status === "success" )){
        // console.log(data);
        generateSnackbar("Status Updated Successfully." ,"success");
        
    }
    else{
        generateSnackbar(re.response?.data?.message || rem.response?.data?.message || chatN.response?.data?.message   || "Some Error Occur, Please try Again." ,"error")
    }  
    }
    catch(e){

    }
  }
  



  return (
    <>
    {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
                <section className='bg-main text-white px-6 py-12 sm:p-12 rounded-lg mt-8'>
        <h1 className='text-3xl sm:text-4xl font-bold'>Notifications</h1>
        <h2 className='text-lg font-semibold mt-3'>Choose your mail preference</h2>
        <form className='flex flex-col w-full gap-6 mt-6'>
            <FormControlLabel
                value="start"
                control={<Switch 
                    color="primary"
                    name={"requestValue"}
                    checked={requestValue}
                     onChange={(e)=>{setRequestValue(!requestValue)}}
                     />}
                label="Changes to my requests"
                labelPlacement="start"
                className='flex justify-between ml-0'
                />
            <FormControlLabel
                value="start"
                control={<Switch 
                    color="primary" 
                    name={"reminderValue"}
                    checked={reminderValue}
                     onChange={(e)=>{setReminderValue(!reminderValue)}} />}
                label="Updates about new features on WhatWorks"
                labelPlacement="start"
                className='flex justify-between ml-0'
                />
            <FormControlLabel
                value="start"
                control={<Switch
                     color="primary"
                     name={"chatNotificatioValuen"}
                     checked={chatNotificationValue}
                      onChange={(e)=>{setChatNotificationValue(!chatNotificationValue)}} 
                      />}
                label="Reminders to reply to Professionals"
                labelPlacement="start"
                className='flex justify-between ml-0'
            />
            <div className='flex justify-center gap-4 flex-col sm:flex-row gap-y-0'>
                {/* <Button
                    variant="outlined"
                    className="h-[50px] sm:max-w-[130px] rounded-sm flex gap-2 mt-4 flex-grow text-white border-white hover:border-white hover:bg-white hover:bg-opacity-10" 
                >
                    <span className="font-bold">More</span>
                    <Image src={arrowRightWhiteIcon} alt="Arrow right" />
                </Button> */}
                <Button
                    variant="contained"
                    className="h-[50px] sm:max-w-[130px] rounded-sm flex gap-2 mt-4 flex-grow"
                >
                    <span className="font-bold" onClick={handleSave}>Save</span>
                    <Image src={arrowRightIcon} alt="Arrow right" />
                </Button>
            </div>
        </form>
      </section>
            )
    }
      
    </>
  )
}

export default NotificationsPage
