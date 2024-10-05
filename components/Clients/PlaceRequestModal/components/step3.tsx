import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { IoIosArrowForward } from "react-icons/io";

interface Step3Props {
  handleNext: () => void;
  updateFormData: (data: any) => void;
  handlePrev: () => void;
}

const Step3: React.FC<Step3Props> = ({ handleNext, handlePrev, updateFormData }) => {
  const [numOfItems, setNumOfItems] = React.useState(
    localStorage.getItem("stepFormData") ? JSON.parse(localStorage.getItem("stepFormData")!).no_of_items : ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setNumOfItems(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(numOfItems === "") return alert("Please select an option");
    updateFormData({no_of_items: numOfItems});
    handleNext();
  }
  
  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center">
        Number of Items to Dry Clean
      </h1>
      <p className="-mt-4 mb-4">Indicate the number of laundry.</p> */}
      <form className="flex flex-col gap-0 px-8 w-full" onSubmit={handleSubmit}>
        {/* this div will be removed */}
        <div className="h-[400px]"></div>
        {/* <FormControl fullWidth>
          <InputLabel id="no_of_items">Please select</InputLabel>
          <Select
            required
            labelId="no_of_items"
            id="no_of_items"
            value={numOfItems}
            label="Please select"
            className="rounded-md shadow-medium border-b-3 border-b-secondary"
            onChange={handleChange}
          >
            <MenuItem value={"1"}>One</MenuItem>
            <MenuItem value={"2"}>Two</MenuItem>
            <MenuItem value={"3"}>Three</MenuItem>
            <MenuItem value={"4"}>Four</MenuItem>
            <MenuItem value={"5"}>Five</MenuItem>
            <MenuItem value={"More"}>More</MenuItem>
          </Select>
        </FormControl> */}
        <div className="mt-8 flex justify-between">
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

export default Step3;
