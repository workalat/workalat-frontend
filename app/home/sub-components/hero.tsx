"use client";
import React, { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button } from "@mui/material";

import searchIcon from "@/public/icons/search.svg";
import heroIcon from "@/public/images/hero_img.svg";
import { siteConfig } from "@/config/site";
import { useUserContext } from "@/context/user_context";
import PinDropIcon from "@mui/icons-material/PinDrop";
import locIcon from "@/public/icons/location.svg";

// Import postcode and region data 
import postcodesData from "@/postcodes.json";
import regionsData from "@/postcode_region.json"; 
import { useSnackbar } from "@/context/snackbar_context";

interface Option {
  label: string;
}

const Hero = ({ openModal }: { openModal: () => void } ) => {
  const [inputFocus, setInputFocus] : any = useState<boolean>(false);
  const [zipFocus, setZipFocus] : any = useState<boolean>(false);
  const [searchEnabled, setSearchEnabled] : any = useState<boolean>(true);

  // State to manage category selection
  const [category, setCategory] : any = useState<string>("");

  // State to manage post code input
  const [postCode, setPostCode] = useState<string>("");
  const [selectedPostcode, setSelectedPostcode] : any = useState(""); // For storing the selected postcode
  const [filteredPostcodes, setFilteredPostcodes] : any = useState(postcodesData); // For filtering postcodes


  useEffect(() => {
    if (category && postCode) {
      setSearchEnabled(false);
    } else {
      setSearchEnabled(true);
    }
  }, [category, postCode]);

  let [userPService,setUserPService] : any = useState<string[]>([]);
  let [userData, setUserData] : any = useState({});
  let [loading, setLoading ] : any =  useState(true);
  let [service, setService] : any = useState([]);

  const { generateSnackbar } : any = useSnackbar();
// Store the service selected by the user (lowercase for backend)
const [selectedService, setSelectedService] : any = useState<string>("");

  //USE CONTEXT
  const { findAllServices,findServiceCategory, projectData, setProjectData } : any = useUserContext();


  useEffect(() => {
    async function getServices() {
      try {
        // setLoading(true);
        const data : any = await findAllServices();
        setService(data?.data);          
      }
       catch (e) {
        // router.push("/login");
      }
    }
    getServices();
  }, []);

  const toCamelCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

    // Function to handle postcode selection
    const handlePostcodeSelection = (event, newValue) => {
      if (newValue) {
        const postcode = newValue.label;
        const region = regionsData[postcode] || ""; // Get region name
        
        // Set the selected postcode (display postcode + region in the input)
        setSelectedPostcode(`${postcode} , ${region}`);
        setPostCode(newValue.label);
      }
    };

    async function handleSubmit(e){
      try{
        e.preventDefault();
        if(!postCode || !selectedService){
          generateSnackbar("Please Fill all the Fields", "error");
        }
        else{
          let cat : any = await findServiceCategory({serviceName :selectedService });
          setProjectData({
            ...projectData,
            serviceCategory : cat.data?.category,
            serviceNeeded : selectedService,
            serviceLocationPostal : postCode,
            postCodeRegion : selectedPostcode
          });
          openModal();
        }
      }
      catch(e){
        // console.log(e)
          generateSnackbar("Some error occur, Please Try Again.", "error");
      }
    }

  return (

<div className="flex items-center justify-between w-full h-full container mx-auto max-w-7xl px-6 py-0 mt-[-10%]">
  <div className="max-w-[800px] flex flex-col gap-7 relative z-10">
    <h1 className="text-white text-4xl md:text-5xl font-bold">
      Find verified professionals you can trust
    </h1>
    <p className="text-white text-xl sm:text-xl">It takes a few clicks...</p>
    <Box
      component={"form"}
      className="flex items-center flex-wrap gap-4 bg-white  px-2 rounded-md border-2 border-transparent transition-all [&:has(input:focus)]:border-secondary w-full" // Increased width slightly
      // onSubmit={handleSearch}
    >
      {/* Services Input */}
      <div className="flex w-full md:max-w-[350px]">
        <img
          alt=""
          className={inputFocus || category !== "" ? "opacity-100" : "opacity-40"}
          src={searchIcon.src}
          width={18}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="w-full outline-none border-none"
          options={service.map((serviceName: string) => ({
            label: toCamelCase(serviceName), // Camel Case for display
            value: serviceName, // Original lowercase value
          }))}
          sx={{
            fontSize: "1.2rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Remove the outer border
              },
              "&:hover fieldset": {
                border: "none", // Remove the hover border
              },
              "&.Mui-focused fieldset": {
                border: "none", // Remove the focus border
              },
            },
          }}
          onChange={(
            event: React.SyntheticEvent,
            newValue?: { label: string; value: string } | null
          ) => {
            if (newValue) {
              setCategory(newValue.label);  // Display the Camel Case label
              setSelectedService(newValue.value); // Save the lowercase value for backend
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="What service are you looking for?"
              className="capitalize"
              InputProps={{
                ...params.InputProps,
                onFocus: () => setInputFocus(true),
                onBlur: () => setInputFocus(false),
              }}
              sx={{
                "& input::placeholder": {
                  fontSize: "1rem", // Adjust placeholder font size here
                },
              }}
            />
          )}
        />
      </div>

      {/* Postcode Input */}
      <div className="flex w-full md:max-w-[250px]">

        <Autocomplete
          disablePortal
          id="postcode-autocomplete"
          options={filteredPostcodes.map((postcode) => ({ label: postcode }))}
          className="w-full"
          sx={{
            fontSize: "1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Remove the outer border
              },
              "&:hover fieldset": {
                border: "none", // Remove the hover border
              },
              "&.Mui-focused fieldset": {
                border: "none", // Remove the focus border
              },
            },
          }}
          onChange={handlePostcodeSelection}  // When a postcode is selected
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Postcode"
              InputProps={{
                ...params.InputProps,
                startAdornment:(
                  <img
                      alt=""
                      className={
                        zipFocus || postCode !== ""
                          ? "opacity-100"
                          : "opacity-40"
                      }
                      src={locIcon.src}
                      width={18}
                    />
                ),
                endAdornment: postCode ? params.InputProps.endAdornment : null
              }}
            />
          )}
          value={selectedPostcode}
        />
      </div>

      {/* Search Button */}
      <Button
        className="bg-secondary text-main px-6 py-2 rounded-md disabled:text-opacity-40 flex-shrink-0 md:w-auto w-[100%] mb-1"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Box>
    <p className="text-white -mt-4">
      Popular: House Cleaning, Web Design, Plumbing
    </p>
  </div>
  <img
    src={heroIcon.src}
    alt=""
    className="absolute -bottom-28 -right-28 2xl:right-32 w-[1050px] min-w-[1050px]"
  />
</div>

  );
};

export default Hero;
