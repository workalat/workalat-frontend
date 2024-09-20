import React, { useEffect } from "react";
import { Button, FormControl, OutlinedInput, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import addIcon from "@/public/icons/add.svg";
import loadingGif from "@/public/images/loader.gif";
import { isEmptyObject } from "@/utils/helper";

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center max-w-[450px]">
            This is the summary of your project requirement
          </h1>
          <p className="mb-2 -mt-4">
            Please edit the details below if you are not satisfied.
          </p>
          <form
            className="flex flex-col items-center gap-6 w-full px-10"
            onSubmit={handleSubmit}
          >
            <FormControl className="w-full">
              <label htmlFor="service" className="sm:text-lg font-bold mb-2">
                Title
              </label>
              <OutlinedInput
                required
                placeholder="I need a dry cleaner in CF37 1FD"
                value={formData.title}
                id="service"
                className="rounded-md shadow-medium border-b-3 border-b-secondary"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </FormControl>
            <FormControl className="w-full">
              <label htmlFor="location" className="sm:text-lg font-bold mb-2">
                Description
              </label>
              <TextField
                required
                multiline
                placeholder="I need a professional dry cleaner in my house located in CF37 1FD. The service i required in a weekly basis to clean my laundry, iron it and arrange it properly."
                value={formData.description}
                rows={4}
                id="location"
                className="rounded-md shadow-medium [&>*]:!border-b-4 [&>*]:!border-b-secondary"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl className="w-full relative cursor-pointer">
              <MuiFileInput
                required
                className="bg-main bg-opacity-40 rounded-md !border-none focus:!border-none"
                value={formData.file}
                onChange={(newFile) =>
                  setFormData((prev) => ({ ...prev, file: newFile }))
                }
              />
              <div
                className={`flex gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-none ${(formData.file || isEmptyObject(formData.file)) ? "hidden" : ""}`}
              >
                <Image src={addIcon} alt="" />
                <p className="text-lg">Add photos/files</p>
              </div>
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
