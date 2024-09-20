"use client"
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Switch,
  } from "@mui/material";
  import Image from "next/image";
  import { useState } from "react";
  
  import cancelIcon from "@/public/icons/cancel.svg";
  import arrowRight from "@/public/icons/arrow_right.svg";
  
  type PreferencesProp = {
    purchaseList: boolean;
    salesList: boolean;
    uploadFiles: boolean;
    reviews: boolean;
    wishlist: boolean;
    chat: boolean;
    wallets: boolean;
    payments: boolean;
  } & Record<string, boolean>;
  
  const formItems = [
    { name: "purchaseList", label: "Purchase List" },
    { name: "salesList", label: "Sales List" },
    { name: "uploadFiles", label: "Upload Files" },
    { name: "reviews", label: "Reviews" },
    { name: "wishlist", label: "Wishlist" },
    { name: "chat", label: "Chat" },
    { name: "wallets", label: "Wallets" },
    { name: "payments", label: "Payments" },
  ];
  
  const PreferenceSettings = () => {
    const [preferences, setPreferences] = useState<PreferencesProp>({
      purchaseList: false,
      salesList: false,
      uploadFiles: false,
      reviews: false,
      wishlist: false,
      chat: false,
      wallets: false,
      payments: true,
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
  
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [name]: checked,
      }));
    };
  
    return (
      <>
        <Box className="mt-3 px-6 sm:px-12 py-12 border border-dark border-opacity-30 rounded-xl">
          <Grid
            container
            spacing={4}
            component={"form"}
          >
            {formItems.map((item) => (
              <Grid key={item.label} item xs={12} sm={6} md={4} lg={3}>
                <Box className="bg-white rounded-lg border border-dark border-opacity-30 p-4 shadow-medium">
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        name={item.name}
                        checked={preferences[item.name]}
                        onChange={handleChange}
                      />
                    }
                    label={item.label}
                    labelPlacement="start"
                    className="flex justify-between"
                  />
                </Box>
              </Grid>
            ))}
            <Box mt={2} className="flex gap-2 ml-8 mt-8 flex-wrap">
              <Button
                variant="contained"
                color="secondary"
                className="gap-2 py-3 px-6 flex-grow md:flex-grow-0"
              >
                Cancel
                <Image src={cancelIcon} alt="Cancel" />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="gap-2 py-3 px-6 flex-grow md:flex-grow-0"
              >
                Save changes
                <Image src={arrowRight} alt="Save changes" />
              </Button>
            </Box>
          </Grid>
        </Box>
      </>
    );
  };
  
  export default PreferenceSettings;
  