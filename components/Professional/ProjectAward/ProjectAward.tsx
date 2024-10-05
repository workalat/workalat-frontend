"use client";

import { projectsData } from "@/utils/projectClientsData";
import Link from "next/link";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoArrowForward } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import ProjectList from "../ProjectList/ProjectList";

export default function ProjectAward() {
  const [activeStatusId, setActiveStatusId] = useState(null);

  const handleToggleStatus = (id: any) => {
    setActiveStatusId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="bg-white relative">
      {/* Left Image */}
      <img
        className="absolute z-0 left-0 top-[40px] w-[600px]"
        src="/CIRCLES.png"
        alt="workalat"
      />
      {/* Right Image */}
      <img
        className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]"
        src="/CIRCLES.png"
        alt="workalat"
      />

      {/* Content */}
      <div className="relative z-10 mt-6 container mx-auto max-w-7xl px-6 pt-6">
        <div className="py-16">
          <h3 className="text-2xl font-bold text-[#07242B]">My Responses</h3>
          <Link
            className="text-xs text-[#FFBE00] underline underline-offset-4 font-bold"
            href={"/professional/project-history"}
          >
            View Project History
          </Link>

          {/* projects */}
          <div className="pt-5">
            {projectsData?.map((data: any, i: number) => (
              <div
                key={i}
                className="bg-white shadow-md border border-[#07242B66] p-8 w-full rounded-md mb-3 relative overflow-hidden"
              >
                <p
                  className={`text-[12px] text-black/50 ${data?.status == "awarded" ? "bg-[#04842F33]" : "bg-[#EA740E33]"} absolute left-3 top-3 font-semibold capitalize px-2 py-1 rounded-[20px]`}
                >
                  {data?.status}
                </p>

                <h3 className="font-bold text-2xl text-center">
                  {data?.title}
                </h3>
                <p className="text-center text-[#07242B] text-sm">
                  {data?.date}
                </p>
                <p className="text-center text-[20px] text-[#323C47] px-3 md:px-8 xl:px-12">
                  {data?.description?.firstViewDesc.substring(0, 210)}...
                </p>

                <div className="flex gap-5 flex-col md:flex-row justify-center pt-5">
                  <Link
                    className="flex items-center justify-center font-bold px-5 text-[15px] py-4 text-black gap-1 bg-white border-2 border-[#FFBE00]"
                    href={`/professional/my-responses/details/${data?.projectId}`}
                  >
                    View Project Details
                    <IoArrowForward className="text-black size-[20px]" />
                  </Link>
                  <Link
                    className="flex items-center justify-center font-bold px-5 text-[15px] py-4 text-black gap-1 bg-[#FFBE00]"
                    href={`/professional/my-responses/proposal/${data?.projectId}`}
                  >
                    View Proposals
                    <IoArrowForward className="text-black size-[20px]" />
                  </Link>
                  <Link
                    className="flex items-center justify-center font-bold px-5 text-[15px] py-4 text-white gap-1 bg-[#07242B]"
                    href={`/professional/chat`}
                  >
                    Chat Client
                    <IoArrowForward className="text-white size-[20px]" />
                  </Link>
                </div>

                {/* for marking, it will be connect with backend */}

                {/* Button to open/close the dropdown */}
                <button
                  onClick={() => handleToggleStatus(data?.id)}
                  className="flex gap-1 items-center justify-center text-black font-bold absolute right-3 top-3"
                >
                  Status <MdArrowDropDown className="size-[20px]" />
                </button>

                {/* Dropdown */}
                <div
                  className={`ring-1 absolute right-3 top-10 flex flex-col shadow-lg rounded-lg ring-black/50 overflow-hidden justify-start ${
                    activeStatusId === data?.id ? "visible" : "invisible"
                  }`}
                >
                  <button className="py-2 px-2 flex items-center gap-1 hover:bg-slate-100 bg-white text-black text-start">
                    <GoDotFill className="size-[15px] text-black" />
                    Mark as completed
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <ProjectList /> */}
        </div>
      </div>
    </div>
  );
}
