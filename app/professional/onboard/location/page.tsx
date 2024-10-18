"use client";

import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';




// Importing postcode and region data
import postcodesData from "@/postcodes.json";
import regionsData from "@/postcode_region.json"; 
import { useSnackbar } from "@/context/snackbar_context";

export default function LocationPage() {
  const {userData ,addProfessionalDetails, tempUserData, setTempUserData } = useUserContext();
  const router = useRouter();
  // snackbar
  const { generateSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>([]);
  const [nationwide, setNationwide] = useState(false); // For the nationwide checkbox

  // Handle adding/removing "nationwide"
  const handleNationwideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setNationwide(isChecked);
    if (isChecked) {
      setSelectedPostcodes((prev) => [...prev, "nationwide"]);
    } else {
      setSelectedPostcodes((prev) => prev.filter((postcode) => postcode !== "nationwide"));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate loading
    // console.log(selectedPostcodes);
    if(selectedPostcodes.length >0){
      setLoading(true);
      console.log(selectedPostcodes); // Send selected postcodes to the backend

      let name = tempUserData.name || Cookies.get('name'); 
      let companyName = tempUserData.companyName || Cookies.get('companyName');
      let website  = tempUserData.website || Cookies.get('website');
      let bio  = tempUserData.bio || Cookies.get('bio');
      let companySize = tempUserData.companySize || Cookies.get("companySize");
      let skills = tempUserData.skills || JSON.parse(Cookies.get("skills"));
      let isData = tempUserData.isData || Cookies.get("isData") || true;
      let userId = tempUserData.userId || Cookies.get("userId") || userData.userId;
  
      let res = await addProfessionalDetails({name, companyName,website,bio,companySize,skills,isData,userId,selectedPostcodes});
      // console.log(res);
      if(res.status !==400 || res.data?.status === "success"){
        setTempUserData({});
        Cookies.remove('name');
        Cookies.remove('companyName');
        Cookies.remove('website');
        Cookies.remove('bio');
        Cookies.remove('companySize');
        Cookies.remove('skills');
        Cookies.remove('isData');
        router.push("/professional/onboard/more");
      }
      else{
        generateSnackbar("Some Error occur, please Try Again.", "error");
      }
      setLoading(false);
  
      // router.push("/professional/onboard/more");
    }
    else{
      generateSnackbar("Please select atleast one Postcode, or Nationwide.", "error");

    }

    }
    catch(e){
      // console.log(e);
      generateSnackbar("Some Error Occur, please Try Again.", "error");
    }
  };

  // Handle removing a selected postcode
  const handleRemovePostcode = (postcode: string) => {
    setSelectedPostcodes((prev) => prev.filter((p) => p !== postcode));
  };

  // Filter postcodes to exclude the selected ones from the dropdown
  const filteredPostcodes = postcodesData.filter(
    (postcode) => !selectedPostcodes.includes(postcode)
  );

  return (
    <>
      <Box className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-100 p-4">
        <Box className="w-full max-w-5xl bg-white p-6 rounded-md shadow-md text-center">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Where would you like to see leads from?
          </h1>
          <p className="text-black text-opacity-70 lg:text-xl">
            Tell us the area you cover so we can show you leads for your location.
          </p>
          <form className="p-4 md:p-8 xl:p-12 w-full" onSubmit={handleSubmit}>
            <Box className="flex flex-col md:flex-row gap-4 items-start">
              <FormControl fullWidth>
                {/* Displaying selected postcodes as chips */}
                <Box className="flex flex-wrap gap-2 mt-4">
                  {selectedPostcodes.map((postcode) => (
                    <Chip
                      key={postcode}
                      label={`${postcode} - ${regionsData[postcode] || ""}`}
                      onDelete={() => handleRemovePostcode(postcode)}
                      color="primary"
                      className="capitalize"
                    />
                  ))}
                </Box>
              </FormControl>

              {/* Autocomplete for postcode selection */}
              <Autocomplete
                disablePortal
                id="postcode-autocomplete"
                options={filteredPostcodes.map((postcode) => ({ label: postcode }))}
                className="w-full"
                onChange={(event, newValue) => {
                  if (newValue && !selectedPostcodes.includes(newValue.label)) {
                    // Add postcode to the array and clear input
                    setSelectedPostcodes((prev) => [...prev, newValue.label]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Post Code"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <PinDropIcon />,
                    }}
                  />
                )}
              />
            </Box>

            {/* Nationwide Checkbox */}
            <Box className="flex items-center mt-6">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={nationwide}
                    onChange={handleNationwideChange}
                    color="primary"
                  />
                }
                label="Also allow Nationwide"
              />
            </Box>

            {/* Submit button */}
            <Box className="flex justify-between items-center mt-6">
              <p className="text-black text-opacity-60 text-sm md:text-base">
                You can change your location at any time.
              </p>
              <Button type="submit" variant="contained" size="large" className="text-white">
                Next
                <ArrowForward className="w-5 ml-2" />
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      {/* Loading modal */}
      <Modal open={loading}>
        <Box className="flex justify-center items-center w-full h-full">
          <Box className="bg-white p-6 rounded-md shadow-md text-center">
            <img src="/images/loader.gif" alt="Loading..." className="w-40 mx-auto" />
            <h1 className="font-bold text-xl mt-4">Creating account...</h1>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
