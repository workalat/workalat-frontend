"use client";
import { Box, Button, FormControl, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BioEditor from "./BioEditor";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import userIcon from "@/public/icons/user.svg";

import "react-quill/dist/quill.snow.css";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import axios from "axios";

// Dynamically import React Quill to ensure it works with SSR in Next.js
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ClientSettings = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    bio: "",
    userId: "",
  });

  // State for avatar image
  const [avatar, setAvatar] = useState("https://your-cloudinary-url.com/default-avatar.jpg"); // Replace with your default avatar URL
  const { addClientsData } = useUserContext();
  const { generateSnackbar } = useSnackbar();
  let [file,setFile] = useState();
  
  // loading
  const [loading2, setLoading2] = useState(true);
  
  // loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(data);
    setLoading2(true)
    setFormData({
      ...formData,
      name: data.clientFullName,
      phone_number: data.clientPhoneNo,
      email: data.clientEmail,
      bio: data.clientBio,
      userId: data._id,
    });
    setAvatar(data.clientPictureLink);
    setLoading2(false)
  }, [data]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let res = await addClientsData({
        userId: formData.userId,
        name: formData.name,
        bio: formData.bio,
      });
      if (res.status !== 400 || res.data?.status === "success") {
        // Handle form submission
        generateSnackbar(res.data?.message, "success");
      } else {
        return generateSnackbar(
          res.response?.data?.message || "Some Error occurs, please try again in a few minutes",
          "error"
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleChangeImage(e){
    e.preventDefault();
    try{
      console.log(file);
      if (!file) {
        generateSnackbar("Please Select a File First", "warning");
        return;
      }
      else{
        setLoading(true);
        const formDat = new FormData();
        formDat.append('profilePic', file);
        formDat.append('userId', formData.userId);
        formDat.append('userType', "client");

        const res = await axios.post('/changePicture', formDat, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.status !== 400 || res.data?.status === "success") {
          generateSnackbar("Profile Picture Updated Successfully", "success");
          setAvatar(res.data?.picture);
          setLoading(false);
        }
        else {
          generateSnackbar(res.response?.data?.message || "Some Error occurs, please try again in a few minutes", "error");
        }
      }
    }
    catch(e){
      generateSnackbar("Some Error occurs, please try again in a few minutes", "error");
    }
  }


  return (
    <>
      {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :(
              <> <div>
              <h1 className="text-main font-bold text-3xl text-center mb-6 mt-8">
                My Personal Details
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="bg-white border-main shadow-medium relative z-10 py-12 px-6 sm:px-6 rounded-lg max-w-2xl mx-auto">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="w-40 h-40 border shadow-sm rounded-[100%] bg-white p-2 pb-0 -mt-14 rounded-[100%]">
                      <img src={avatar} alt="User icon" className="w-full h-full object-fit rounded-[100%]" />
                    </div>
        
                    <label htmlFor="file-upload" className="cursor-pointer">
                     <Button
                        variant="contained"
                        component="span" // Ensures that the button works as a label for the file input
                        className="font-bold text-lg w-full max-w-[300px] py-2"
                      >
                        Upload Photo
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        name="profilePic"
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="hidden" // Hide the actual file input
                      />
                    </label>
                    
                    {/* <input
                      type="file"
                      name="file"
                      accept="image/*" // Ensure only images can be selected
                      placeholder="Upload Picture"
                      onChange={handleFileChange} // Call the handler when file changes
                      className="bg-main !bg-opacity-40 text-main font-bold text-lg w-full max-w-[300px] py-2"
                    /> */}
                    <Button
                      variant="contained"
                      className="font-bold text-lg w-full max-w-[300px] py-2"
                      onClick={handleChangeImage}
                    >
                      Save
                    </Button>
                  </div>
                  <div className="space-y-4 mt-6 sm:mt-0">
                    <FormControl className="w-full">
                      <label htmlFor="name" className="sm:text-lg font-bold mb-2">
                        Name
                      </label>
                      <input
                        required
                        placeholder="Jane Doe"
                        value={formData.name || ""}
                        id="name"
                        className="rounded shadow-medium px-4 py-[10px] outline-none capitalize"
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                        }}
                      />
                    </FormControl>
                    <FormControl className="w-full">
                      <label htmlFor="phone" className="sm:text-lg font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        required
                        placeholder="+920000000000"
                        value={formData.phone_number || ""}
                        id="phone"
                        disabled
                        className="rounded shadow-medium px-4 py-[10px] outline-none"
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            phone_number: e.target.value,
                          }));
                        }}
                      />
                    </FormControl>
                    <FormControl className="w-full">
                      <label htmlFor="email" className="sm:text-lg font-bold mb-2">
                        Email
                      </label>
                      <input
                        required
                        placeholder="hello@gmail.com"
                        value={formData.email || ""}
                        disabled
                        id="email"
                        className="rounded shadow-medium px-4 py-[10px] outline-none"
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                        }}
                      />
                    </FormControl>
                    <FormControl className="w-full">
                      <Box>
                        <Typography variant="h6" gutterBottom className="text-gray-700">
                          Your Bio.
                        </Typography>
                        <ReactQuill
                          value={formData.bio}
                          name="bio"
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, bio: e }));
                          }}
                          theme="snow"
                          className="bg-white rounded-lg shadow-lg overflow-hidden border-2 h-[250px] font-mono"
                          placeholder="Start typing here"
                          modules={{
                            toolbar: [
                              ["bold", "italic", "underline", "strike"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              [{ align: [] }],
                              ["blockquote", "code-block"],
                              ["link"],
                              ["clean"],
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
                    </FormControl>
                  </div>
                </div>
                <Button
                  variant="contained"
                  className="font-bold text-lg w-full max-w-2xl mx-auto py-2 mt-10 flex gap-2"
                  type="submit"
                >
                  <span>Save Changes</span>
                  <Image src={arrowRightIcon} alt="Arrow right" />
                </Button>
              </form>
            </div>
            <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                <h1 className="text-center font-bold text-xl ml-2">Updating Profile Picture...</h1>
              </Box>
            </Box>
          </Modal>
              </>
            )
          }

    
    </>
   
  );
};

export default ClientSettings;
