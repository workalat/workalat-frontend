import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Image from "next/image";
import React from "react";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { IoIosArrowForward } from "react-icons/io";

interface formDataType {
  two_piece: boolean;
  three_piece: boolean;
  curtains: boolean;
  dress: boolean;
  jackets: boolean;
  shirt: boolean;
  duvet: boolean;
  trousers: boolean;
  [key: string]: boolean; // Add this line
}

interface Step2Props {
    handleNext: () => void;
    updateFormData: (data: any) => void;
    handlePrev: () => void;
}

const formItems = [
  {
    name: "two_piece",
    label: "Two Piece",
  },
  {
    name: "three_piece",
    label: "Three Piece",
  },
  {
    name: "curtains",
    label: "Curtains",
  },
  {
    name: "dress",
    label: "Dress",
  },
  {
    name: "jackets",
    label: "Jackets",
  },
  {
    name: "shirt",
    label: "Shirt",
  },
  {
    name: "duvet",
    label: "Duvet",
  },
  {
    name: "trousers",
    label: "Trousers",
  },
];

const Step2: React.FC<Step2Props> = ({ handleNext, updateFormData, handlePrev }) => {
  const [state, setState] = React.useState<formDataType>(
    localStorage.getItem("stepFormData") ? JSON.parse(localStorage.getItem("stepFormData")!).service_subtype : {
      two_piece: false,
      three_piece: false,
      curtains: false,
      dress: false,
      jackets: false,
      shirt: false,
      duvet: false,
      trousers: false,
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(state).every((item) => item === false)) return alert("Please select at least one option");
    updateFormData({service_subtype: state});
    handleNext();
  }
  
  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center mt-8">
        What do you need Dry Cleaning?
      </h1> */}
      <form className="flex flex-col gap-0 px-4 pr-8 w-full" onSubmit={handleSubmit} >
        {/* this div will be removed */}
        <div className="h-[400px]"></div>
        {/* {formItems.map((item, index) => (
          <FormControlLabel
            key={index}
            className="flex-grow text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
            control={
              <Checkbox
                checked={state[item.name]}
                name={item.name}
                onChange={handleChange}
              />
            }
            label={item.label}
            labelPlacement="start"
          />
        ))} */}
        <div className="mt-8 flex justify-between pl-4">
            <Button
              variant="outlined"
              className="h-[50px] w-[110px] rounded-sm flex gap-2 mt-4"
              color="secondary"
              onClick={handlePrev}
            >
                <Image src={arrowRightIcon} alt="Arrow right" className="rotate-180" />
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

export default Step2;
