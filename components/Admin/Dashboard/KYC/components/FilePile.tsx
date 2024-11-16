import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface FilePileProps {
  fileName: string;
  fileUrl: string;
}

const FilePile: React.FC<FilePileProps> = ({ fileName, fileUrl }) => {
  // Function to handle the View action
  const handleViewFile = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  // Function to handle the Download action
  const handleDownloadFile = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    // const link = document.createElement("a");
    // link.href = fileUrl; // Cloudinary file URL
    // link.download = fileName; // The name the file should be saved as
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md min-h-16 bg-gray-100 border rounded-md shadow-md p-4 mb-4">
      {/* File Name */}
      <p className="text-sm font-medium truncate">{fileName}</p>

      {/* Buttons */}
      <div className="flex gap-2">
        {/* View Button */}
        {/* <button
          onClick={handleViewFile}
          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-sm"
        >
          <VisibilityIcon className="mr-1" fontSize="small" />
        </button> */}

        {/* Download Button */}
        <button
          onClick={handleDownloadFile}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all text-sm"
        >
          <DownloadIcon className="mr-1" fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default FilePile;
