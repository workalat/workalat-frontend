import React, { useEffect } from "react";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import loadingGif from "@/public/images/loader.gif";

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

const Loader = () => (
  <div className="bg-white px-10 flex flex-col items-center gap-4 text-center">
    <h1 className="text-3xl font-bold text-center max-w-[450px]">
      Fetching the best match for you.
    </h1>
    <p className="">
      Please wait as we ensure to get th best match for your dry cleaning
      service.
    </p>
    <Image
      src={loadingGif}
      alt="Loading"
      width={230}
      className="pointer-events-none"
    />
  </div>
);

const Step7 = ({ handleNext, updateFormData, handlePrev }: Step7Props) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataType>({
    title: "",
    description: "",
    file: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.file === null
    ) {
      return alert("Please fill in all fields");
    }

    updateFormData({ summary: formData });
    setLoading(true);

    // MOCK API call
    setTimeout(() => {
      handleNext();
    }, 3000);
  }

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center max-w-[450px]">
            When do you need this service?
            </h1>
            <p className="-mt-4">Please let us know when you need the service</p>
          <form
              className="flex flex-col gap-0 px-8 w-full"
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
                    className="flex-grow text-xl py-1 border-b border-b-dark border-opacity-30 flex justify-between px-1"
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="mt-2 flex w-full justify-between">
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
      )}
    </>
  );
};

export default Step7;
