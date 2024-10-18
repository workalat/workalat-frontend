"use client"
import Manage from "@/components/Membership/manage/Manage";
import AuthNavbar from "@/components/navbar/auth_navbar";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import { Box, Modal, Typography } from "@mui/material"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function ManageMembershipPage() {
    let [loading, setLoading] = useState(false);
    let [loading2, setLoading2] = useState(false);
    
    let {confirmMembership} = useUserContext();

    // Alert
    const { generateSnackbar } = useSnackbar();

    let searchParams = useSearchParams();
    let router = useRouter();
    const hasFetched = useRef(false);


    useEffect(()=>{
        async function confirmSubs(){
            if (hasFetched.current) {return};
            try{
                setLoading2(true);
                let sessionId  = searchParams.get('sessionId');
                setLoading2(false);
                setLoading(true)
                let res = await confirmMembership({sessionId: sessionId});
                if(res.status === 200 && res.data?.status === "success"){
                    console.log(res);
                    generateSnackbar("Activating Membership Successfull.", "success");
                    router.push("/membership/manage")
                    setLoading(false);
                }
                else{
                    router.push("/membership/error")
                }
            }
            catch(e){
                console.log(e);
            }
        }
        confirmSubs();
    },[searchParams.get('sessionId')])

    return (
        <>
        {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :( 
                
            <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">Activating Membership...</h1>
              </Box>
            </Box>
          </Modal>
            )
        }
        </>
    )
}
