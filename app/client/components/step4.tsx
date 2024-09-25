import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { IoIosArrowForward } from "react-icons/io";

const formItems = [
  {
    label: "Pick Up / Collection",
    value: "pickup",
  },
  {
    label: "Drop Off / Delivery",
    value: "dropoff",
  },
  {
    label: "Alterations or Tailoring",
    value: "alterations or tailoring",
  },
  {
    label: "Repairs",
    value: "repairs",
  },
  {
    label: "Stain Removal",
    value: "stain removal",
  },
  {
    label: "Folding",
    value: "folding",
  },
  {
    label: "Washing",
    value: "washing",
  },
  {
    label: "Ironing",
    value: "ironing",
  },
];

interface Step4Props {
  handleNext: () => void;
  updateFormData: (data: any) => void;
  handlePrev: () => void;
}

const Step4: React.FC<Step4Props> = ({
  handleNext,
  handlePrev,
  updateFormData,
}) => {
  const [additionalService, setAdditionalService] = React.useState(
    localStorage.getItem("stepFormData")
      ? JSON.parse(localStorage.getItem("stepFormData")!).additional_service
      : ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalService((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormData({additional_service: additionalService});
    handleNext();
  };

  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center">
        Need any additional service?
      </h1>
      <p className="-mt-4 mb-4">Pick an additional laundry service.</p> */}
      <form className="flex flex-col gap-0 px-8 w-full" onSubmit={handleSubmit}>
        {/* this div will be removed */}
        <div className="h-[400px]"></div>
        {/* <FormControl>
          <RadioGroup
            aria-labelledby="additional service"
            name="additional service"
            value={additionalService}
            onChange={handleChange}
          >
            {formItems.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                labelPlacement="start"
                className="flex-grow text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
              />
            ))}
          </RadioGroup>
        </FormControl> */}
        <div className="mt-8 flex justify-between">
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
        <button onClick={handleNext} className="flex items-center justify-center">Skip <IoIosArrowForward className="size-3" /></button>
      </form>
    </>
  );
};

export default Step4;
