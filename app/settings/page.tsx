"use client";
import { useState } from "react";
import { Avatar, Button, FormControl, OutlinedInput } from "@mui/material";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import userIcon from "@/public/icons/user.svg";
import BioEditor from "./BioEditor";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  return (
    <>
      <h1 className="text-main font-bold text-3xl text-center mb-2">
        Account Settings
      </h1>
      <p className="text-main text-md text-center max-w-[600px] mx-auto mb-4">
        Keep your details updated so that professionals can get in touch. If you
        no longer require the service, please close the request.
      </p>
      <form>
        <div className="bg-white border-main shadow-medium relative z-10 py-12 px-6 sm:px-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-main text-center font-bold text-2xl mb-6">
            My personal details
          </h2>
          <div className="flex flex-col justify-center items-center gap-3">
            <Avatar
              src={userIcon}
              alt="Profile picture"
              className="w-28 h-28 mb-3"
            />
            <Button
              variant="contained"
              className="bg-main !bg-opacity-40 text-main font-bold text-lg w-full max-w-[300px] py-2"
            >
              Upload Photo
            </Button>
            <Button
              variant="contained"
              className="bg-main !bg-opacity-40 text-main font-bold text-lg w-full max-w-[300px] py-2"
            >
              Take Photo
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
                className="rounded shadow-medium px-4 py-[10px] outline-none"
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
                id="email"
                className="rounded shadow-medium px-4 py-[10px] outline-none"
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </FormControl>
            <FormControl className="w-full">
              <label htmlFor="location" className="sm:text-lg font-bold mb-2">
                Your Primary Location
              </label>
              <input
                required
                placeholder="York, London"
                value={""}
                id="location"
                className="rounded shadow-medium px-4 py-[10px] outline-none"
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </FormControl>
            <FormControl className="w-full">
              <BioEditor />
            </FormControl>
          </div>
        </div>
        <Button
          variant="contained"
          className="font-bold text-lg w-full max-w-2xl mx-auto py-2 mt-10 flex gap-2"
        >
          <span>Save Changes</span>
          <Image src={arrowRightIcon} alt="Arrow right" />
        </Button>
      </form>
    </>
  );
};

export default SettingsPage;
