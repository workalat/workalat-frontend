import React, { useEffect } from "react";
import { Autocomplete, Button, FormControl, OutlinedInput, TextField } from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { siteConfig } from "@/config/site";

interface Step1Props {
    handleNext: () => void;
    updateFormData: (data: any) => void;
}

interface Option {
  label: string;
}

const Step1 = ({ handleNext, updateFormData }: Step1Props) => {
    
  const [formData, setFormData] = React.useState({
    service: "",
    location: "",
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(formData.service === "" || formData.location === "") return alert("Please fill in all fields");
      updateFormData(formData);
      handleNext();
  };

  useEffect(() => {
    if(localStorage.getItem("stepFormData") === null) return;
    const formDataItem = localStorage.getItem("stepFormData");
    const formData_ = formDataItem ? JSON.parse(formDataItem) : {
      service: "",
      location: "",
    };

    setFormData(formData_);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Place your request</h1>
      <form className="flex flex-col items-center gap-6 w-full px-10" onSubmit={handleSubmit}>
        <FormControl className="w-full">
          <label htmlFor="service" className="sm:text-lg font-bold mb-2">
            Services needed
          </label>
          {/* <OutlinedInput
            required
            placeholder="e.g Web Development, Dry Cleaning"
            value={formData.service || ""}
            id="service"
            className="rounded-md shadow-medium border-b-3 border-b-secondary"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, service: e.target.value }));
             }
            }
          /> */}
          <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={siteConfig.categories}
            className="[&_input]:pl-3 [&_input]:text-base w-full [&>*>*]:border-b-4 [&>*>*]:border-b-secondary [&>*>*]:rounded-b-sm"
              onChange={(
                event: React.SyntheticEvent,
                newValue?: Option | null
              ) => {
                if (newValue) {
                  setFormData((prev) => ({ ...prev, service: newValue.label }));
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="What service are you looking for?"
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
        </FormControl>
        <FormControl className="w-full">
          <label htmlFor="location" className="sm:text-lg font-bold mb-2">
            Location of service
          </label>
          <OutlinedInput
            required
            placeholder="Enter your postcode or town"
            value={formData.location || ""}
            id="location"
            className="rounded-md shadow-medium border-b-3 border-b-secondary"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, location: e.target.value }));
             }
            }
          />
        </FormControl>
        <Button
          variant="contained"
          className="h-[50px] w-[140px] rounded-sm flex gap-2 mt-4"
          type="submit"
        >
          <span className="font-bold">Continue</span>
          <Image src={arrowRightIcon} alt="Arrow right" />
        </Button>
      </form>
    </>
  );
};

export default Step1;
