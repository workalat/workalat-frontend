"use client";
import { Box, Button, FormControlLabel, Grid, Switch } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";
import Close from "@mui/icons-material/Close";

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

  return (
    <>
      <Box className="mt-3 px-6 sm:px-12 py-12 border border-dark border-opacity-30 rounded-xl relative">
        <Grid container spacing={4} component={"form"}>
          {formItems.map((item) => (
            <Grid key={item.label} item xs={12} sm={6} md={4} lg={4}>
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
          <Grid item xs={12}>
            <Box mt={2} className="flex gap-2 mt-8 flex-wrap">
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
        </Grid>
        <Button variant="contained" color="error" className="absolute top-4 right-4" >
          Close Account
          <Close />
        </Button>
      </Box>
    </>
  );
};

export default PreferenceSettings;
