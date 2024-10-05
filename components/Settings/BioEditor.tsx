import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to ensure it works with SSR in Next.js
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BioEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState<string>("");

  const handleChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <Box className="">
      <Typography variant="h6" gutterBottom className="text-gray-700">
        Your Bio.
      </Typography>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        theme="snow"
        className="bg-white rounded-lg shadow-lg overflow-hidden border-2 h-[250px] font-mono"
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
    </Box>
  );
};

export default BioEditor;
