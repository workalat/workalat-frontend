import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
 
import arrowRightIcon from "@/public/icons/arrow_right.svg";

import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import { useRouter } from "next/navigation";

const formItems = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "One Off Requirement",
    value: "one-off",
  },
  {
    label: "Other",
    value: "other",
  },
];

interface Step5Props {
  handleNext: () => void;
  updateFormData: (data: any) => void;
  handlePrev: () => void;
}

const Step5: React.FC<Step5Props> = ({
  handleNext,
  updateFormData,
  handlePrev,
}) => {
  const [frequency, setFrequency] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency((event.target as HTMLInputElement).value);
  };


  //My Workflow
  const { projectData, setProjectData, searchJobQuestions } = useUserContext();
  const { generateSnackbar } = useSnackbar();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!frequency){
      generateSnackbar("Please Choose One Option.", "error");
    }
    else{
      setProjectData({ ...projectData, ["serviceFrequency"] :  frequency });
      console.log(projectData);
      handleNext();
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-balance">
        How often do you need this service?
      </h1>
      <p className="-mt-4 mb-2">Pick an additional laundry service.</p>
      <form className="flex flex-col gap-0 pl-2 pr-8 md:px-8 md:pr-14 w-full" onSubmit={handleSubmit}>
        <FormControl>
          <RadioGroup
            aria-labelledby="additional service"
            name="additional service"
            value={frequency}
            onChange={handleChange}
          >
            {formItems.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                labelPlacement="start"
                className="flex-grow md:text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="pl-4 sm:pl-4 mt-2 sm:mt-8 flex justify-between">
          <Button
            variant="outlined"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
            color="secondary"
            onClick={handlePrev}
          >
            <Image
              src={arrowRightIcon}
              alt="Arrow right"
              className="rotate-180"
            />
            <span className="font-bold">Back</span>
          </Button>
          <Button
            variant="contained"
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4 md:-mr-2"
            type="submit"
          >
            <span className="font-bold">Next</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step5;
