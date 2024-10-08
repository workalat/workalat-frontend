import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";

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
    value: "small",
  },
  {
    label: "Later",
    value: "mini",
  },
  {
    label: "I'm Flexible",
    value: "mega",
  },
  {
    label: "I am planning and researching",
    value: "negotiable",
  },
];

const Step7 = ({ handleNext, updateFormData, handlePrev }: Step7Props) => {
  const [formData, setFormData] = React.useState<FormDataType>({
    title: "",
    description: "",
    file: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
    // if (
    //   formData.title === "" ||
    //   formData.description === "" ||
    //   formData.file === null
    // ) {
    //   return alert("Please fill in all fields");
    // }

    // updateFormData({ summary: formData });
  };

  useEffect(() => {
    const formDataItem = localStorage.getItem("stepFormData");

    if (formDataItem) {
      const formData_: FormDataType = JSON.parse(formDataItem).summary || {
        title: "",
        description: "",
        file: null,
      };

      setFormData(formData_);
    }
  }, []);

  const [budget, setBudget] = React.useState(
    localStorage.getItem("stepFormData")
      ? JSON.parse(localStorage.getItem("stepFormData")!).budget
      : ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget((event.target as HTMLInputElement).value);
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
