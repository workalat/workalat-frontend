import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";

interface Step7Props { 
  handleNext: () => void;
  handlePrev: () => void;
  updateFormData: (data: any) => void;
}

interface FormDataType {
  title: string;
  description: string;
  file: File | null;
}

const formItems = [
  {
    label: "Urgently",
    value: "urgent",
  },
  {
    label: "Later",
    value: "later",
  },
  {
    label: "I'm Flexible",
    value: "flexible",
  },
  {
    label: "I am planning and researching",
    value: "planning",
  },
];

const Step7 = ({ handleNext, updateFormData, handlePrev }: Step7Props) => {
  const [formData, setFormData] = React.useState<FormDataType>({
    title: "",
    description: "",
    file: null,
  });
  
  const { projectData, setProjectData,  } = useUserContext();
  const { generateSnackbar } = useSnackbar();

 

  useEffect(() => {
    if(!projectData.projectPriceString || !projectData.projectPriceTitle || !projectData.projectMaxPrice === 0 ||  !projectData.pointsNeeded){
      handlePrev();
    }
  }, []);

  const [budget, setBudget] = useState()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget((event.target as HTMLInputElement).value);
  }; 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(budget.length);
    if(!budget) {
      generateSnackbar("Please select one option.", "error");
    }
    else{
    setProjectData({
      ...projectData,
      ["projectUrgentStatus"] : budget
    })
    console.log(projectData);
    handleNext();
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-pretty">
        When do you need this service?
      </h1>
      <p className="-mt-4 text-center text-pretty">
        Please let us know when you need the service
      </p>
      <form
        className="flex flex-col gap-0 pl-2 pr-8 md:px-8 w-full"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="additional service"
            name="additional service"
            value={budget}
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
        <div className="pl-4 sm:pl-0 mt-2 flex w-full justify-between">
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
            className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
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

export default Step7;
