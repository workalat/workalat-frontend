"use client";
import React, { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button } from "@mui/material";

import locIcon from "@/public/icons/location.svg";
import searchIcon from "@/public/icons/search.svg";
import heroIcon from "@/public/images/hero_img.svg";
import { siteConfig } from "@/config/site";

interface Option {
  label: string;
}

const Hero: React.FC = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [zipFocus, setZipFocus] = useState<boolean>(false);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);

  // State to manage category selection
  const [category, setCategory] = useState<string>("");

  // State to manage post code input
  const [postCode, setPostCode] = useState<string>("");

  useEffect(() => {
    if (category && postCode) {
      setSearchEnabled(false);
    } else {
      setSearchEnabled(true);
    }
  }, [category, postCode]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("searching...");
  };

  return (
    <div className="flex items-center justify-between w-full h-full container mx-auto max-w-7xl px-6">
      <div className="max-w-[696px] flex flex-col gap-9 relative z-10">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Find the perfect professional for you.
        </h1>
        <p className="text-white text-xl sm:text-xl">
          Get free quotes within minutes
        </p>
        <Box
          component={"form"}
          className="flex items-center flex-wrap gap-4 bg-white py-2 px-3 rounded-md border-2 border-transparent transition-all [&:has(input:focus)]:border-secondary max-w-2xl"
          onSubmit={handleSearch}
        >
          <div className="flex w-full md:max-w-[320px]">
            <img
              alt=""
              className={
                inputFocus || category !== "" ? "opacity-100" : "opacity-40"
              }
              src={searchIcon.src}
              width={18}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={siteConfig.categories}
              className="[&_input]:pl-3 [&_input]:text-lg w-full sm:w-[400px] [&_*]:pl-0 [&_*]:!py-0 [&_*]:!border-0 md:!border-r"
              onChange={(
                event: React.SyntheticEvent,
                newValue?: Option | null
              ) => {
                if (newValue) {
                  setCategory(newValue.label);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="What are you looking for?"
                  InputProps={{
                    ...params.InputProps,
                    onFocus: () => setInputFocus(true),
                    onBlur: () => setInputFocus(false),
                  }}
                />
              )}
            />
          </div>
          <TextField
            onFocus={() => setZipFocus(true)}
            onBlur={() => setZipFocus(false)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPostCode(e.target.value)
            }
            className="[&_*]:pl-0 [&_input]:pl-3 [&_input]:text-lg w-full sm:w-[180px] [&_*]:!py-0 !border-0 [&_*]:!border-0"
            placeholder="Post Code"
            type="number"
            InputProps={{
              startAdornment: (
                <img
                  alt=""
                  className={
                    zipFocus || postCode !== "" ? "opacity-100" : "opacity-40"
                  }
                  src={locIcon.src}
                  width={18}
                />
              ),
            }}
          />
          <Button
            disabled={searchEnabled}
            className="bg-secondary text-main px-6 py-2 rounded-md disabled:text-opacity-40 flex-grow"
            type="submit"
          >
            Search
          </Button>
        </Box>
      </div>
      <img
        src={heroIcon.src}
        alt=""
        className="absolute -bottom-10 -right-28 2xl:right-32 w-[1050px]"
      />
    </div>
  );
};

export default Hero;
