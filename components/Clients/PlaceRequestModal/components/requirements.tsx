import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import dynamic from "next/dynamic";
import { FaArrowRight } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to ensure it works with SSR in Next.js
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReqProps {
  handleNext: () => void;
  handlePrev: () => void;
}

export default function Requirements({ handleNext, handlePrev }: ReqProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center md:mt-8 text-pretty">
        This is the summary of your project requirement
      </h1>
      <p className="-mt-4 text-center text-pretty">
        Please edit the details below if you are not satisfied.
      </p>
      <form
        className="flex flex-col gap-0 px-4 md:px-8 w-full space-y-4"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <label className="font-semibold">Title</label>
          <OutlinedInput
            defaultValue={"I need a dry cleaner in Cardiff, CF37"}
            className="border-b-4 border-b-secondary"
          />
        </FormControl>
        <FormControl>
          <label className="font-semibold">Your Bio.</label>
          <ReactQuill
            theme="snow"
            className="bg-white rounded-lg shadow-lg overflow-hidden border-2 h-[250px] [&_*]:!font-mono border-b-4 border-b-secondary"
            placeholder="Start typing here"
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"], // Bold, italic, underline, strike-through
                [{ list: "ordered" }, { list: "bullet" }], // Ordered list, bullet list
                [{ align: [] }], // Text align
                ["blockquote", "code-block"], // Blockquote, code block
                ["link"], // Link insertion
                ["clean"], // Clear formatting
              ],
            }}
            formats={[
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "align",
              "blockquote",
              "code-block",
              "link",
            ]}
          />
        </FormControl>
        <Box className="flex items-center justify-between flex-col md:flex-row">
            <Button 
                variant="outlined"
                className="rounded-sm flex gap-2 mt-4 flex-grow w-full md:flex-grow-0"
                color="secondary"
                onClick={handlePrev}
            >
                <span className="font-bold">Back</span>
            </Button>
            <Button 
                variant="contained"
                className="rounded-sm flex gap-2 mt-4 flex-grow w-full md:flex-grow-0"
                type="submit"
            >
                <span className="font-bold">Post a Project</span>
                <FaArrowRight />
            </Button>
        </Box>
      </form>
    </>
  );
}
