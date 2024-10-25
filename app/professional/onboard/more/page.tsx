"use client";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Close from "@mui/icons-material/Close";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';
import VerifyUser from "@/app/middleware/VerifyUser";
import { useSnackbar } from "@/context/snackbar_context";

export default function MoreInfoPage() {
  const router = useRouter();
  const { findAllServices, addLeadsToProfessioal, tempUserData }   : any  = useUserContext();
  const { generateSnackbar }   : any  = useSnackbar();
  
  // State for more leads
  const [moreLeads, setMoreLeads]   : any  = useState<string[]>([]);
  const extraServiceRef   : any  = useRef<HTMLInputElement>(null);
  const [allServices, setAllServices]   : any  = useState<string[]>([]);
  const [filteredServices, setFilteredServices]   : any  = useState<string[]>([]);
  const [searchTerm, setSearchTerm]   : any  = useState("");
  let [userPService,setUserPService]   : any  = useState<string[]>([]);
  let [userData, setUserData]   : any  = useState({});
  let [loading, setLoading]  : any  =  useState(true);

  useEffect(() => {
    async function getServices() {
      try {
        setLoading(true);
        let token  : any  = Cookies.get("token");
        let ver  : any  = await VerifyUser(token, "professional");
        if(ver?.status === "success"){
          if(ver?.userType === "professional" && ver?.isRegistrationComplete !== true){
            setUserData(ver);
            const data  : any  = await findAllServices();
            setAllServices(data?.data);
            setUserPService(tempUserData?.userPrimaryService || Cookies.get("userPrimaryService"));
            setLoading(false);
          }
          else{
            if(ver?.userType === "professional"){
              router.push("/leads")
            }
            else{
              router.push("/client/dashboard")
            }
          }
        }
        else{
          router.push("/login");
        }
      }
       catch (e) {
        router.push("/login");
      }
    }
    getServices();
  }, [findAllServices]);

  const handleSearch : any   = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value  : any  = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredServices(
      allServices.filter(service => service.toLowerCase().includes(value))
    );
  };

  const addMoreServices = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newService = extraServiceRef.current?.value.trim();

    if (newService && !moreLeads.includes(newService)) {
      setMoreLeads([...moreLeads, newService]);
      extraServiceRef.current!.value = ""; // Clear input
      setSearchTerm(""); // Clear search term
      setFilteredServices(allServices); // Reset the filtered services list
    }
  };

  const removeService = (index: number) => {
    setMoreLeads(moreLeads.filter((_, i) => i !== index));
  };

  const handleServiceSelect = (service: string) => {
    if (!moreLeads.includes(service)) {
      setMoreLeads([...moreLeads, service]);
      setSearchTerm(""); // Clear input
      setFilteredServices(allServices.filter(s => s !== service)); // Remove selected service from options
    }
  };

  const handleButtonClick = async  () => {
    try{     
      if(moreLeads.length > 0) {
        let res  : any  = await addLeadsToProfessioal({userId : userData.userId, services: moreLeads});
 
        if(res?.data?.status ==="success"){
          generateSnackbar("Data Saved Successfully", "success");
          Cookies.remove("userPrimaryService");
          Cookies.remove("userId");
          router.push("/leads");
        }
        else{ 
          generateSnackbar("Some Error Occur, please Try Again.", "error");
        }

      }
      else{
        generateSnackbar("Please select atleast one Service", "error");

      }
    }
    catch(e){
      // console.log(e); // Handle error here, e.g., display an error message to the user.
      generateSnackbar("Some Error Occur, please Try Again.", "error");
    }
    
  };

  return (
    <>
    {
      loading ? (
          <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
          </div>
      )
      :
      (
        <Box className="w-full h-full flex justify-center items-start">
      <Box className="w-full max-w-4xl p-6">
        <h1 className="font-bold text-2xl lg:text-3xl text-center">
          Maximise your leads
        </h1>
        <p className="lg:text-xl text-black text-opacity-70 text-center">
          Add other services you can provide
        </p>
        <Box className="p-4 py-8 md:p-8 xl:p-16 border shadow-md rounded-md bg-white w-full mt-6 space-y-12">
          <Box>
            <p className="mb-2">You&apos;ve signed up for</p>
            <Box className="bg-gray-200 rounded-md px-4 py-2 w-max capitalize">
              {userPService}
            </Box>
          </Box>
          <Box>
            <p className="text-black text-opacity-50 font-semibold mb-2">
              We will also share leads from
            </p>
            <form
              className="mt-6 border border-gray-300 hover:border-secondary rounded-md flex justify-between p-2"
              onSubmit={addMoreServices}
            >
              <input
                ref={extraServiceRef}
                type="text"
                placeholder="Add more services"
                value={searchTerm}
                onChange={handleSearch}
                className="rounded-md py-2 px-4 md:text-lg focus:outline-none w-full"
              />
              <Box className="flex gap-4 flex-wrap">
                {moreLeads.map((lead, index) => (
                  <Box
                    key={index}
                    className="bg-main text-white rounded-md px-4 py-2 w-max flex items-center"
                  >
                    {lead}
                    <Close
                      role="button"
                      className="ml-2"
                      onClick={() => removeService(index)}
                    />
                  </Box>
                ))}
              </Box>
            </form>
            {filteredServices.length > 0 && searchTerm && (
              <Box className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-auto">
                {filteredServices.map((service, index) => (
                  <Box
                    key={index}
                    onClick={() => handleServiceSelect(service)}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {service}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              size="large"
              className="font-semibold"
              onClick={() => {
                handleButtonClick();
              }}
            >
              See leads
              <ArrowForward className="w-5 ml-2" />
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
      )
    }
    </>
  );
}
