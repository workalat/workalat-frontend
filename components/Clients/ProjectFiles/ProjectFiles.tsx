"use client";

import { projectsData } from "@/utils/projectClientsData";
import React, { useEffect, useState } from "react";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { PiFilesLight, PiUploadFill } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";

import { useUserContext } from "@/context/user_context";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from "js-cookie";
import VerifyUser from "@/app/middleware/VerifyUser";
import axios from "axios";
import { Box, Modal } from "@mui/material";

const FilePill = ({ file, onRemove }) => (
  <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
    {file.name}
    <button
      onClick={() => onRemove(file)}
      className="ml-2 text-green-600 hover:text-green-800"
    >
      &times;
    </button>
  </div>
);

export default function ProjectFiles({ params }: any) {
  const dynamicData = projectsData?.find(
    (data) => data?.projectId == params?.id
  );
  const [filterFiles, setFilterFiles]  : any  = useState<string>("all");
  let [data, setData]  : any  = useState({});

  const [loading2, setLoading2]  : any  = useState(true);
  let router  : any  = useRouter();
  let { singleProjectDetails }  : any  = useUserContext();
  const { generateSnackbar }  : any  = useSnackbar();
  let [existingFiles, setExistingFiles]  : any  = useState([]);
  let [newFiles, setNewFiles]  : any  = useState([]);
  let [selectedFiles, setSelectedFiles]  : any  = useState([]);
  let [userData, setUserData]  : any  = useState({});
  const [showUploadPopup, setShowUploadPopup]  : any  = useState(false);
  const [uploadProgress, setUploadProgress]  : any  = useState(0);
  const [currentPath, setCurrentPath]  : any  = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    getUser();
  }, []);

  async function getUser() {
    try {
      let projectId  : any  = params.id;
      setLoading2(true);
      let token  : any  = Cookies.get("token");
      let ver  : any  = await VerifyUser(token, "client");
      if (ver?.status === "success" && ver?.userType === "client") {
        setUserData(ver);
        let res  : any  = await singleProjectDetails({
          userId   : ver.userId, 
          userType: ver.userType,
          projectId: projectId,
          need: "files",
        });
        if (res?.status !== 400 || res?.data?.status == "success") {
          setData(res?.data?.data);
          setExistingFiles(res?.data?.data.projectFileURL);
          setLoading2(false);
        } else {
          generateSnackbar("Some error occurred, Please Try Again.", "error");
          router.push("/client/my-projects/");
        }
      } else {
        router.push("/login");
      }
    } catch (e) {
      generateSnackbar("Some error occurred, Please Try Again.", "error");
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file  : any ) => file.size <= 100 * 1024 * 1024); // 100MB limit
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleFilesUpload = async () => {
    if (selectedFiles.length === 0) {
      return generateSnackbar("Please select files to upload.", "error");
    }

    try {
      const formData = new FormData();
      formData.append("userId", userData.userId);
      formData.append("userType", userData.userType);
      formData.append("projectId", params.id);

      selectedFiles.forEach((file  : any ) => {
        formData.append("projectFiles", file);
      });

      setShowUploadPopup(true);

      const res  : any  = await axios.post("/uploadProjectFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent  : any ) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (res?.status === 200 || res?.data?.status === "success") {
        generateSnackbar("Files uploaded Successfully.", "success");
        router.refresh();
      } else {
        generateSnackbar(
          res.data?.message || "Some Error Occurred, Please try Again.",
          "error"
        );
      }
    } catch (error) {
      generateSnackbar("Some Error Occurred, Please try Again.", "error");
    } finally {
      setShowUploadPopup(false);
      setUploadProgress(0);
    }
  };

  const allFiles = [...existingFiles, ...newFiles];
  const filteredFiles = allFiles.filter((file  : any ) => {
    if (filterFiles === "all") {
      return true;
    } else if (filterFiles === "doc") {
      return (
        file.fileType.includes("pdf") ||
        file.fileType.includes("doc") ||
        file.fileType.includes("msword")
      );
    } else if (filterFiles === "img") {
      return file.fileType.includes("image");
    } else if (filterFiles === "video") {
      return file.fileType.includes("video");
    }
    return false;
  });

  return (
    <>
      {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
          <div className="min-h-screen flex flex-col">
            <div className="bg-white relative flex-grow">
              <img
                className="absolute z-0 left-0 top-[40px] w-[600px]"
                src="/CIRCLES.png"
                alt="workalat"
              />
              <img
                className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]"
                src="/CIRCLES.png"
                alt="workalat"
              />

              <ProjectsHeader isActive={"files"} data={data} />
              <div className="relative z-10 container mx-auto max-w-7xl px-6 flex-grow">
                <div className="h-full flex flex-col">
                  <div className="flex flex-grow items-stretch">
                    <div className="w-full sm:w-[230px] p-2 border-b sm:border-e sm:border-b-0 border-black/20">
                      <h4 className="font-bold text-lg text-[#E88B00] pt-2 pb-3">
                        Filter
                      </h4>
                      {" "}
                      <div className="w-11/12 mx-auto p-3 bg-[#F3F3F3] shadow rounded-md">
                        <ul className="flex flex-col gap-2">
                          <li>
                            <button
                              onClick={() => setFilterFiles("all")}
                              className={`w-full flex items-center justify-start px-3 py-2 gap-2 rounded-md transition-colors duration-300 ${
                                filterFiles === "all"
                                  ? "bg-[#07242B] text-white"
                                  : "text-[#07242B] bg-white hover:bg-[#07242B] hover:bg-opacity-10"
                              }`}
                            >
                              <PiFilesLight size={20} /> All Files (
                              {allFiles.length})
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => setFilterFiles("doc")}
                              className={`w-full flex items-center justify-start px-3 py-2 gap-2 rounded-md transition-colors duration-300 ${
                                filterFiles === "doc"
                                  ? "bg-[#07242B] text-white"
                                  : "text-[#07242B] bg-white hover:bg-[#07242B] hover:bg-opacity-10"
                              }`}
                            >
                              <IoDocumentText size={20} /> Documents (
                              {
                                allFiles.filter(
                                  (file) =>
                                    file.fileType.includes("pdf") ||
                                    file.fileType.includes("doc")
                                ).length
                              }
                              )
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => setFilterFiles("img")}
                              className={`w-full flex items-center justify-start px-3 py-2 gap-2 rounded-md transition-colors duration-300 ${
                                filterFiles === "img"
                                  ? "bg-[#07242B] text-white"
                                  : "text-[#07242B] bg-white hover:bg-[#07242B] hover:bg-opacity-10"
                              }`}
                            >
                              <BsImages size={20} /> Images (
                              {
                                allFiles.filter((file) =>
                                  file.fileType.includes("image")
                                ).length
                              }
                              )
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => setFilterFiles("video")}
                              className={`w-full flex items-center justify-start px-3 py-2 gap-2 rounded-md transition-colors duration-300 ${
                                filterFiles === "video"
                                  ? "bg-[#07242B] text-white"
                                  : "text-[#07242B] bg-white hover:bg-[#07242B] hover:bg-opacity-10"
                              }`}
                            >
                              <BiSolidVideos size={20} /> Videos (
                              {
                                allFiles.filter((file) =>
                                  file.fileType.includes("video")
                                ).length
                              }
                              )
                            </button>
                          </li>
                        </ul>
                      </div>{" "}
                    </div>

                    <div className="w-full flex-grow sm:w-auto px-2 flex-1 h-full flex flex-col">
                      <div className="flex flex-wrap mb-4">
                        {selectedFiles.map((file, index) => (
                          <FilePill
                            key={index}
                            file={file}
                            onRemove={(fileToRemove) =>
                              setSelectedFiles((files) =>
                                files.filter((f) => f !== fileToRemove)
                              )
                            }
                          />
                        ))}
                      </div>
                      {
                        (data?.projectStatusAdmin === true ) && (
                          <>
                              <div className="flex py-2 justify-end">
                                <label className="bg-main text-white text-sm px-3 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                                  <PiUploadFill size={17} /> Select Files
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                    multiple
                                    className="hidden"
                                  />
                                </label>
                                {selectedFiles.length > 0 && (
                                  <button
                                    onClick={handleFilesUpload}
                                    className="ml-2 bg-green-500 text-white text-sm px-3 py-2 rounded-md"
                                  >
                                    Upload Files
                                  </button>
                                )}
                              </div> 
                          </>
                        )
                      }
                      

                      <div className="p-3 border flex-grow mb-5 border-dashed rounded-lg border-black/40 overflow-auto">
                        <div className="w-full h-full">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="text-[#E88B00] font-semibold">
                                <tr>
                                  <th className="px-4 text-start">Name</th>
                                  <th className="px-4 text-start">Size</th>
                                  <th className="px-4 text-start">
                                    Uploaded by
                                  </th>
                                  <th className="px-4 text-start">Date</th>
                                  <th className="px-4 text-start"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredFiles.map((file, i) => (
                                  <tr key={i}>
                                    <td className="flex items-center gap-2 px-4 py-2">
                                      <PiFilesLight size={20} />
                                      {file.fileName}
                                    </td>
                                    <td className="px-4 py-2">
                                      {(file.fileSize / 1024).toFixed(2)} KB
                                    </td>
                                    <td className="px-4 font-bold py-2 capitalize">
                                      {file.uploadedBy}
                                    </td>
                                    <td className="px-4 py-2">
                                      {new Date(file.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">
                                      <a
                                        href={file?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={file?.fileName}
                                      >
                                        <button className="px-4 py-1 text-black border border-black rounded-md bg-white">
                                          Download
                                        </button>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={showUploadPopup}
            onClose={() => setShowUploadPopup(false)}
          >
            <Box className="bg-white p-6 rounded-md w-1/3 mx-auto mt-32">
              <h2 className="text-lg font-bold mb-4">Uploading Files...</h2>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-green-500 h-2"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="mt-2">{uploadProgress}%</p>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
