"use client"
import AuthNavbar from "@/components/navbar/auth_navbar";
import Profile from "@/components/Profile/Profile";
import { useUserContext } from "@/context/user_context";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    let router = useRouter();
    let params = useParams(); 
    let { professionalDetails } = useUserContext();
    const [loading2, setLoading2] = useState(true);
    let id = params.id; 
    let [data,setData] = useState({});
    let [isData,setIsData] = useState(false);

    useEffect(()=>{
        async function getData (){
            try{ 
                let data = await  professionalDetails({userId : id});
                // console.log(data);  
                if(data.status !== 400 || data.data?.status === "success"){
                    setData(data.data?.data);
                    setIsData(true);
                    setLoading2(false);
                }
                else{
                    setData({});
                    setIsData(false);
                    setLoading2(false);
                }
            }
            catch(e){
                console.log(e);
                router.push("/error");
            }
        }
        getData();
    },[id])

    return (
        <>
               {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div> 
            )
            :(
                <>
                {
                    (isData)
                    ?
                    <div>
                        <Profile data={data} isData={isData} />
                    </div>
                    :
                    "No Data Found"
                }
                </>
            )
        }
        </>
    )
}
