"use client";
import { Box, Button, FormControlLabel, Grid, Switch } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";
import Close from "@mui/icons-material/Close";

import VerifyUser from "@/app/middleware/VerifyUser";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from '@/context/user_context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/context/firebase";

type PreferencesProp = {
  activateChat: boolean;
  markUnavailable: boolean;
} & Record<string, boolean>;

const formItems = [
  { name: "markUnavailable", label: "Make as unavailable" },
  { name: "activateChat", label: "Activate Chat" },
];

const PreferenceSettings = () => {
  const [preferences, setPreferences]  : any  = useState<PreferencesProp>({
    markUnavailable: false,
    activateChat: false,
  });


  //Loading
  const [loading2, setLoading2]  : any  = useState(true);
  const { generateSnackbar }  : any  = useSnackbar();
  
  let [markUnavailable, setMarkUnavailable]  : any   =useState(true);
  let [activateChat, setActivateChat]  : any  = useState(true);
  let [userData,setUserData]  : any  = useState({});


  const router = useRouter();
  let { getChatPage, setMark, setChat }  : any  = useUserContext();
  
  
  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver :any = await VerifyUser(token, "client");
        if(ver.status === "success"){
          setUserData(ver);
            let data : any = await getChatPage({userId : ver.userId, userType : "client"});
            if(data?.status === 200 || data?.data?.status === "success"){
              
              setMarkUnavailable(data?.data?.data?.mark);
              setActivateChat(data?.data?.data?.chat);
              setLoading2(false);
          }
          else{
              generateSnackbar(data?.response?.data?.message || "Some Error Occur, Please try Again." ,"error")
          }  
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
      
      let userChatRef = doc(db, "usersChats", userData?.userId);
      let userChatsSnapShot : any = await getDoc(userChatRef);
      if(userChatsSnapShot.exists()){
        let userChatsData  : any  = userChatsSnapShot.data();
        let change  = userChatsData?.chats?.map(async (val, i)=>{
          val.activeChat = activateChat
          let userChatRef2 = doc(db, "usersChats", val?.receiverId);
          let userChatsSnapShot2 : any = await getDoc(userChatRef2);
          if(userChatsSnapShot2.exists()){
            let userChatsData2  : any  = userChatsSnapShot2.data();
            let change2 = userChatsData2?.chats?.map((val, i)=>{
              if(val?.receiverId === userData?.userId){
                val.activeChat = activateChat
                return(val)
              }
              else{
                return(val);
              }
            });
            await updateDoc(userChatRef2, {
              chats : userChatsData2?.chats
            });
          }
          return(val)
        });
        await updateDoc(userChatRef, {
          chats :userChatsData?.chats
        });
      }

      let m = await setMark({userId : userData?.userId,userType : userData?.userType,current_value : !markUnavailable});
      let a = await setChat({userId : userData?.userId,userType : userData?.userType,current_value : !activateChat});
      if((a?.status === 200 && m?.status === 200 )|| (a?.data?.status === "success" && m?.data?.status === "success" )){
        generateSnackbar("Status Updated Successfully." ,"success");
    }
    else{
        generateSnackbar(a?.response?.data?.message || m?.response?.data?.message   || "Some Error Occur, Please try Again." ,"error")
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
              <Box className="mt-3 px-6 sm:px-12 py-12 border border-dark border-opacity-30 rounded-xl relative">
        <Grid container spacing={4} component={"form"}>
          {/* {formItems.map((item) => (
            <Grid key={item.label} item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white rounded-lg border border-dark border-opacity-30 p-4 shadow-medium">
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      name={item.name}
                      // checked={}
                      //  onChange={handleTwoFact}
                    />
                  }
                  label={item.label}
                  labelPlacement="start"
                  className="flex justify-between"
                />
              </Box>
            </Grid>
          ))} */}
           <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white rounded-lg border border-dark border-opacity-30 p-4 shadow-medium">
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      name={"markUnavailable"}
                      checked={markUnavailable}
                       onChange={(e)=>{setMarkUnavailable(!markUnavailable)}}
                    />
                  }
                  label={"Mark as Unavailable"}
                  labelPlacement="start"
                  className="flex justify-between"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="bg-white rounded-lg border border-dark border-opacity-30 p-4 shadow-medium">
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      name="activateChat"
                      checked={activateChat}
                      onChange={(e)=>{setActivateChat(!activateChat)}}
                    />
                  }
                  label={"Active Chat"}
                  labelPlacement="start"
                  className="flex justify-between"
                />
              </Box>
            </Grid>
          <Grid item xs={12}>
            <Box mt={2} className="flex gap-2 mt-8 flex-wrap">
              {/* <Button
                variant="contained"
                color="secondary"
                className="gap-2 py-3 px-6 flex-grow md:flex-grow-0"
              >
                Cancel
                <Image src={cancelIcon} alt="Cancel" />
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                className="gap-2 py-3 px-6 flex-grow md:flex-grow-0"
                onClick={handleSave}
              >
                Save changes
                <Image src={arrowRight} alt="Save changes" />
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="error" className="absolute top-4 right-4" >
          Close Account
          <Close />
        </Button> */}
      </Box>
            )
      }
      
    </>
  );
};

export default PreferenceSettings;
