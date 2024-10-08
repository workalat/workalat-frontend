"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import loadingGif from "@/public/images/loader.gif";

interface SetupAccountProps {
  handleNext: () => void;
  handlePrev: () => void;
}
export default function UploadPicture({
  handleNext,
  handlePrev,
}: SetupAccountProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // MOCK API call
    setTimeout(() => {
      handleNext();
    }, 3000);
  };

  const [files, setFiles] = useState<File[] | null>(null);

  const picRef = React.useRef<HTMLInputElement>(null);
  const takePicInput = () => {
    if (picRef.current) {
      picRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);

    if (files) {
      setFiles(files);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-center max-w-sm text-balance -mt-8">
        Upload a picture or document for your project
      </h1>
      <p className="-mt-4">(optional)</p>
      <form
        className="flex flex-col gap-0 px-4 md:px-8 w-full"
        onSubmit={handleSubmit}
      >
        <input
          ref={picRef}
          multiple
          type="file"
          accept="image/*, .pdf"
          className="hidden"
          id="file"
          onChange={handleImageUpload}
        />
        <Button
          color="secondary"
          variant="contained"
          className="bg-main bg-opacity-30 rounded-md text-main font-semibold py-4 hover:!text-white gap-2"
          onClick={takePicInput}
        >
          <IoIosAddCircle />
          Add photos/file
        </Button>
        {files &&
          files.map((file, index) => (
            <Accordion key={index} variant="outlined" className="border-green-500 mt-6">
              <AccordionSummary>
                <Tooltip arrow title="Click to preview">
                  <Typography color={"green"} className="hover:underline">
                    {file ? file.name : "No image selected"}
                  </Typography>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails>
                {file.type === "application/pdf" ? (
                  <embed
                    src={file ? URL.createObjectURL(file) : ""}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    className="object-cover"
                  />
                ) : (
                  <img
                    src={file ? URL.createObjectURL(file) : ""}
                    alt="preview"
                    className="w-full h-96 object-cover"
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        <Box className="flex justify-between items-center gap-y-2 mt-8">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className=" flex gap-2"
            onClick={handlePrev}
          >
            <FaArrowLeft />
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            className=" flex gap-2"
            type="submit"
          >
            Post project
            <FaArrowRight />
          </Button>
        </Box>
      </form>
    </>
  );
}

const Loader = () => (
  <div className="bg-white px-10 flex flex-col items-center gap-4 text-center">
    <h1 className="text-3xl font-bold text-center max-w-[450px]">
      Publishing Your Project
    </h1>
    <p className="">We are publishing your project, please wait</p>
    <Image
      src={loadingGif}
      alt="Loading"
      width={230}
      className="pointer-events-none"
    />
  </div>
);
