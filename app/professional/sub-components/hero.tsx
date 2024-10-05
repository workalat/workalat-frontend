"use client";
import React, { FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";


import searchIcon from "@/public/icons/search.svg";
import heroIcon from "@/public/images/hero_img2.svg";
import { siteConfig } from "@/config/site";

interface Option {
  label: string;
}

const Hero: React.FC = () => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);


  // State to manage category selection
  const [category, setCategory] = useState<string>("");

  // State to manage post code input


  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log("searching...");
    if (e) {
      router.push("/professional/signup");
    }
  };

  return (
    <div className=" flex items-center justify-between w-full h-full container mx-auto max-w-7xl px-6">
      <div className="max-w-[796px] flex flex-col gap-9 relative z-10">
        <h1 className="text-black text-4xl md:text-5xl font-bold">
          Ready to grow your business?
        </h1>
        <p className="text-black text-xl sm:text-xl">
        Join WorkAlat to grow your business and reach more clients
        </p>
        <Box
          component={"form"}
          className="flex items-center gap-4 bg-white py-2 px-3 rounded-md border-1 border-x-gray-300 transition-all [&:has(input:focus)]:border-secondary w-full"
          onSubmit={handleSearch}
        >
          <div className="flex w-full md:max-w-[340px]">
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
              // eslint-disable-next-line react/jsx-sort-props
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
                  placeholder="What service do you provide?"
                  InputProps={{
                    ...params.InputProps,
                    onFocus: () => setInputFocus(true),
                    onBlur: () => setInputFocus(false),
                  }}
                />
              )}
            />
          </div>

          <Button
            className="bg-secondary text-main px-6 py-2 rounded-md disabled:text-opacity-40 flex-grow min-w-40"
            type="submit"
          >
            Get Started
          </Button>
        </Box>
      </div>
      <img
        src={heroIcon.src}
        alt=""
        className="hidden md:block w-[850px] h-[750px] object-fill object-center"

      />

    </div>
  );
};

export default Hero;