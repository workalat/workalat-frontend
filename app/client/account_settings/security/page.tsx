"use client";
import { useState } from "react";
import Image from "next/image";
import { Box, Button, Grid, Switch, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import ChangePasswordModal from "./change_password";

import arrowRight from "@/public/icons/arrow_right.svg";
import AccountKyc from "@/components/AccountKyc/AccountKyc";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

const SecuritySettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isProceed, setIsProceed] = useState(false);
  const [isUploading, setIsUploading] = useState(true);
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setIsNext(false);
    setIsProceed(false)
  }

  return (
    <div>
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 h-full bg-white md:bg-transparent">
            <Typography
              gutterBottom
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              Password
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Box className="flex justify-between items-center border-b border-dark border-opacity-30 pb-2">
              <Typography gutterBottom className="text-xl font-semibold">
                Two Factor Authentication
              </Typography>
              <Switch />
            </Box>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
            >
              Enable
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Typography
              gutterBottom
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              Phone Verification
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={() => router.push("security/phone")}
            >
              Verify
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Typography
              gutterBottom
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              KYC
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              onClick={openModal}
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
            >
              Enable
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <AccountKyc
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        content={
          <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
            <div className="bg-white w-full h-auto sm:w-[520px] p-3 rounded-md overflow-y-auto hiddenScroll mx-auto">
              <button className="ms-auto block" onClick={closeModal}>
                <IoCloseCircleOutline className="size-[20px]" />
              </button>
              {
                isUploading ?
                  isProceed ?
                    <div>
                      <div className="w-full text-start">
                        <h4 className="font-semibold text-[20px] capitalize">{
                          isNext ? <span>
                            Upload Document <br /> <span className="text-sm">Identify Verification</span>
                          </span> : "Let's Know More About You"
                        }</h4>
                        <div className="w-[250px] h-2 bg-slate-200 rounded-md mx-auto my-4">
                          <div className={`${isNext ? "w-3/4" : "w-1/2"} transition-all duration-300 rounded-md h-full bg-black`}></div>
                        </div>
                      </div>
                      <div className="w-full border h-auto border-black rounded-md py-2 px-3 hiddenScroll overflow-y-scroll overflow-x-hidden">
                        <p className="p-3">Select and Upload any of the below to confirm your identity</p>
                        {
                          isNext ?
                            <form className="pt-1 flex flex-wrap">
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">Document Type</label>
                                <select className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-2 capitalize" id="document-type">
                                  <option value="Driving License">Driving License</option>
                                  <option value="Passport">Passport</option>
                                  <option value="National ID">National ID</option>
                                </select>
                              </div>
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">ID number</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="pb-2 pt-5 w-full px-1">
                                <div className="flex justify-center items-end gap-4">
                                  <label className="flex items-center justify-center flex-col cursor-pointer">
                                    <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0 6.75C0 4.89375 1.485 3.375 3.3 3.375H5.88988C7.3992 3.375 8.84481 2.76667 9.9 1.6875C10.9552 0.608329 12.4008 0 13.9101 0H19.0899C20.5992 0 22.0448 0.608329 23.1 1.6875C24.1552 2.76667 25.6008 3.375 27.1101 3.375H29.7C30.5752 3.375 31.4146 3.73058 32.0335 4.36351C32.6523 4.99645 33 5.85489 33 6.75V23.625C33 24.5201 32.6523 25.3785 32.0335 26.0115C31.4146 26.6444 30.5752 27 29.7 27H3.3C2.42479 27 1.58542 26.6444 0.966548 26.0115C0.347678 25.3785 0 24.5201 0 23.625V6.75ZM16.5 23.625C18.688 23.625 20.7865 22.7361 22.3336 21.1537C23.8808 19.5714 24.75 17.4253 24.75 15.1875C24.75 12.9497 23.8808 10.8036 22.3336 9.22129C20.7865 7.63895 18.688 6.75 16.5 6.75C14.312 6.75 12.2135 7.63895 10.6664 9.22129C9.11919 10.8036 8.25 12.9497 8.25 15.1875C8.25 17.4253 9.11919 19.5714 10.6664 21.1537C12.2135 22.7361 14.312 23.625 16.5 23.625ZM16.5 20.25C15.85 20.25 15.2063 20.1191 14.6057 19.8646C14.0052 19.6102 13.4595 19.2373 12.9998 18.7672C12.5402 18.2971 12.1756 17.739 11.9268 17.1248C11.678 16.5106 11.55 15.8523 11.55 15.1875C11.55 14.5227 11.678 13.8644 11.9268 13.2502C12.1756 12.636 12.5402 12.0779 12.9998 11.6078C13.4595 11.1377 14.0052 10.7648 14.6057 10.5104C15.2063 10.2559 15.85 10.125 16.5 10.125C17.8128 10.125 19.0719 10.6584 20.0002 11.6078C20.9285 12.5572 21.45 13.8448 21.45 15.1875C21.45 16.5302 20.9285 17.8178 20.0002 18.7672C19.0719 19.7166 17.8128 20.25 16.5 20.25Z" fill="#FFBE00" />
                                    </svg>
                                    Take a photo
                                    <input type="file" className="hidden" />
                                  </label>

                                  <label className="flex items-center justify-center flex-col cursor-pointer">

                                    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.3333 12.0004V22.0004C13.3338 22.4252 13.4965 22.8338 13.7881 23.1427C14.0797 23.4516 14.4783 23.6375 14.9023 23.6624C15.3264 23.6873 15.744 23.5493 16.0697 23.2766C16.3955 23.004 16.6048 22.6172 16.655 22.1954L16.6667 22.0004V12.0004H26.6667C27.5076 12.0001 28.3176 12.3178 28.9342 12.8896C29.5509 13.4614 29.9286 14.2452 29.9917 15.0837L30 15.3337V30.3337C30.0003 31.1747 29.6827 31.9847 29.1108 32.6013C28.539 33.218 27.7553 33.5957 26.9167 33.6588L26.6667 33.6671H3.33333C2.49237 33.6673 1.68239 33.3497 1.06575 32.7779C0.449118 32.2061 0.0714057 31.4223 0.00833369 30.5837L1.67113e-07 30.3337V15.3337C-0.000265965 14.4928 0.317344 13.6828 0.889162 13.0662C1.46098 12.4495 2.24474 12.0718 3.08333 12.0087L3.33333 12.0004H13.3333ZM16.4733 1.11542L22.0717 6.71208C22.3844 7.02482 22.5601 7.44898 22.5601 7.89125C22.5601 8.33352 22.3844 8.75768 22.0717 9.07042C21.7589 9.38315 21.3348 9.55884 20.8925 9.55884C20.4502 9.55884 20.0261 9.38315 19.7133 9.07042C18.5893 7.94577 16.6667 8.74185 16.6667 10.3319V12.0004H13.3333V10.3319C13.3333 8.74185 11.4107 7.94577 10.2867 9.07042C10.1318 9.22527 9.94798 9.3481 9.74566 9.4319C9.54334 9.51571 9.32649 9.55884 9.1075 9.55884C8.88851 9.55884 8.67166 9.51571 8.46934 9.4319C8.26702 9.3481 8.08318 9.22527 7.92833 9.07042C7.77348 8.91557 7.65065 8.73173 7.56684 8.52941C7.48304 8.32709 7.43991 8.11024 7.43991 7.89125C7.43991 7.67226 7.48304 7.45541 7.56684 7.25309C7.65065 7.05077 7.77348 6.86693 7.92833 6.71208L13.5283 1.11542C13.919 0.725105 14.4486 0.505859 15.0008 0.505859C15.5531 0.505859 16.0827 0.725105 16.4733 1.11542Z" fill="#FFBE00" />
                                    </svg>

                                    Upload a file
                                    <input type="file" className="hidden" />
                                  </label>
                                </div>
                              </div>
                              <div className="py-4 w-full px-1">
                                <button type="button" onClick={() => setIsUploading(false)} className="text-[15px] text-black font-semibold flex w-full justify-center items-center py-2 bg-[#FFBE00]">Next <IoMdArrowForward className="size-[15px] text-black" /></button>
                              </div>
                            </form>
                            :
                            <form className="pt-1 flex flex-wrap h-[350px]">
                              <p className="text-[15px] font-semibold">Personal Information</p>
                              <div className="my-2 bg-black h-[1px] w-full"></div>
                              <div className="py-2 w-full sm:w-1/2 px-1">
                                <label className="block pb-1">First name</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full sm:w-1/2 px-1">
                                <label className="block pb-1">Last name</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full sm:w-1/2 px-1">
                                <label className="block pb-1">Email</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3" type="text" />
                              </div>
                              <div className="py-2 w-full sm:w-1/2 px-1">
                                <label className="block pb-1">Phone</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">Company Name</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">Company Number</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">Address</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>
                              <div className="py-2 w-full px-1">
                                <label className="block pb-1">Post Code</label>
                                <input className="w-full border border-slate-300 rounded-md shadow-md outline-none py-2 px-3 capitalize" type="text" />
                              </div>

                              <div className="pt-2 pb-1 px-1 w-full">
                                <button onClick={() => setIsNext(true)} className="text-[15px] text-black font-semibold flex w-full justify-center items-center py-2 bg-[#FFBE00]">Next <IoMdArrowForward className="size-[15px] text-black" /></button>
                              </div>
                            </form>
                        }
                      </div>
                    </div> :
                    <div>
                      <div className="w-full text-start">
                        <h4 className="font-semibold text-[20px] capitalize">Let’s Know More About You</h4>
                        <div className="mt-2 bg-black/50 h-px w-full"></div>
                      </div>
                      <div className="w-full py-5 px-3 flex flex-col justify-center items-center">
                        <svg width="130" height="130" viewBox="0 0 265 265" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M121.457 22.084C106.815 22.084 92.7724 27.9006 82.4188 38.2541C72.0653 48.6077 66.2487 62.6502 66.2487 77.2923C66.2487 91.9345 72.0653 105.977 82.4188 116.33C92.7724 126.684 106.815 132.501 121.457 132.501C136.099 132.501 150.142 126.684 160.495 116.33C170.849 105.977 176.665 91.9345 176.665 77.2923C176.665 62.6502 170.849 48.6077 160.495 38.2541C150.142 27.9006 136.099 22.084 121.457 22.084ZM121.457 143.542C95.0122 143.542 70.9414 151.205 53.2416 162.004C44.4083 167.392 36.8558 173.752 31.4012 180.664C26.0349 187.444 22.082 195.582 22.082 204.271C22.082 213.602 26.6202 220.955 33.1568 226.2C39.3402 231.169 47.4999 234.459 56.1677 236.756C73.5914 241.36 96.8452 242.917 121.457 242.917L129.021 242.862C130.87 242.837 132.683 242.347 134.294 241.439C135.905 240.53 137.261 239.231 138.24 237.662C139.218 236.092 139.786 234.302 139.892 232.456C139.999 230.609 139.639 228.766 138.848 227.095C134.651 218.236 132.482 208.553 132.499 198.751C132.499 184.926 136.728 172.118 143.949 161.507C145.022 159.93 145.669 158.102 145.826 156.201C145.982 154.3 145.644 152.391 144.843 150.659C144.043 148.928 142.807 147.434 141.257 146.322C139.707 145.21 137.896 144.519 135.999 144.315C131.251 143.807 126.393 143.542 121.457 143.542ZM202.238 155.147C199.973 154.393 197.524 154.393 195.26 155.147L162.135 166.189C159.935 166.921 158.022 168.328 156.666 170.208C155.311 172.089 154.581 174.349 154.582 176.667V195.118C154.58 206.928 158.934 218.325 166.81 227.125C174.686 235.926 185.531 241.514 197.269 242.818C198.263 242.928 199.246 242.928 200.228 242.818C211.966 241.514 222.811 235.926 230.687 227.125C238.563 218.325 242.917 206.928 242.915 195.118V176.667C242.916 174.349 242.187 172.089 240.831 170.208C239.476 168.328 237.562 166.921 235.363 166.189L202.238 155.147Z" fill="#FFBE00" />
                        </svg>
                      </div>
                      <button onClick={() => setIsProceed(true)} className="text-black font-semibold flex items-center bg-secondary gap-1 px-3 py-2 rounded-md mx-auto mt-12 mb-3">Proceed <FaArrowRight className="size-3 text-black" /></button>
                    </div>
                  : <div className="h-[400px]"></div>
              }
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SecuritySettings;
