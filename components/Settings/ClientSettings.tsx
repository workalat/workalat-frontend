"use client";
import { Button, FormControl } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import BioEditor from "./BioEditor";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import userIcon from "@/public/icons/user.svg";

const ClientSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
  });

  return (
    <>
      <h1 className="text-main font-bold text-3xl text-center mb-6 mt-8">
        My Personal Details
      </h1>
      <form>
        <div className="bg-white border-main shadow-medium relative z-10 py-12 px-6 sm:px-6 rounded-lg max-w-2xl mx-auto">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="w-40 h-40 border shadow-sm rounded-md bg-white p-2 pb-0 -mt-14">
              <img src={userIcon.src} alt="User icon" className="w-full h-full object-fit" />
            </div>
            <Button
              variant="contained"
              className="bg-main !bg-opacity-40 text-main font-bold text-lg w-full max-w-[300px] py-2"
            >
              Upload Photo
            </Button>
            <Button
              variant="contained"              
              className="font-bold text-lg w-full max-w-[300px] py-2"
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

export default ClientSettings;
