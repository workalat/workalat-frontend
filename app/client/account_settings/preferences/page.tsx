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

type PreferencesProp = {
  activateChat: boolean;
  markUnavailable: boolean;
} & Record<string, boolean>;

const formItems = [
  { name: "markUnavailable", label: "Make as unavailable" },
  { name: "activateChat", label: "Activate Chat" },
];

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState<PreferencesProp>({
    markUnavailable: false,
    activateChat: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked,
    }));
  };

  //Loading
  const [loading2, setLoading2] = useState(true);
  const { generateSnackbar } = useSnackbar();
  
  let [markUnavailable, setMarkUnavailable] =useState(true);
  let [activateChat, setActivateChat] = useState(true);
  let [userData,setUserData] = useState({});


  const router = useRouter();
  let { getChatPage, setMark, setChat } = useUserContext();
  
  
  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "client");
        console.log(ver);
        if(ver.status === "success"){
          setUserData(ver);
          // if(ver.registerAs === "professional"){
          //   router.push("/professional/dashboard")
          // }
          // else{
            let data = await getChatPage({userId : ver.userId, userType : "client"});
            if(data.status === 200 || data.data?.status === "success"){
              // console.log(data);
              
              setMarkUnavailable(data.data?.data?.mark);
              setActivateChat(data.data?.data?.chat);
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
    console.log(userData.userId);
    try{
      // console.log(markUnavailable, activateChat)
      let m = await setMark({userId : userData.userId,userType : userData.userType,current_value : !markUnavailable});
      let a = await setChat({userId : userData.userId,userType : userData.userType,current_value : !activateChat});
      // console.log(m);
      // console.log(a);
      if((a.status === 200 && m.status === 200 )|| (a.data?.status === "success" && m.data?.status === "success" )){
        // console.log(data);
        generateSnackbar("Status Updated Successfully." ,"success");
        
    }
    else{
        generateSnackbar(a.response?.data?.message || m.response?.data?.message   || "Some Error Occur, Please try Again." ,"error")
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
