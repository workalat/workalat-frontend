"use client";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { useState } from "react";

import businessIcon from "@/public/icons/business.svg";
import eventsIcon from "@/public/icons/events.svg";
import healthIcon from "@/public/icons/health.svg";
import houseIcon from "@/public/icons/house.svg";
import lessonsIcon from "@/public/icons/lessons.svg";
import moreIcon from "@/public/icons/more.svg";
import petIcon from "@/public/icons/pet.svg";
import cleaningIcon from "@/public/icons/cleaning.svg";
import webIcon from "@/public/icons/web.svg";
import gardeningIcon from "@/public/icons/gardening.svg";
import investigatorsIcon from "@/public/icons/investigators.svg";
import coachIcon from "@/public/icons/coach.svg";
import arrowFilledIcon from "@/public/icons/arrow_filled.svg";
import PlaceRequestModal from "../Clients/PlaceRequestModal/PlaceRequestModal";

const group1 = [
  { link: "/", label: "Web Design", icon: businessIcon },
  { link: "/", label: "Graphic Design", icon: eventsIcon },
  { link: "/", label: "Accounting", icon: healthIcon },
  { link: "/", label: "SEO", icon: houseIcon },
  { link: "/", label: "Social Media Marketing", icon: lessonsIcon },
  { link: "/", label: "Music Band", icon: moreIcon },
];

const group2 = [
  [
    { link: "/", label: "Dog & Pet Grooming", icon: petIcon },
    { link: "/", label: "House Cleaning", icon: cleaningIcon },
    { link: "/", label: "Bricklayer", icon: webIcon },
    { link: "/", label: "Painting", icon: gardeningIcon },
    { link: "/", label: "Bodyguard", icon: investigatorsIcon },
    { link: "/", label: "Home Care", icon: coachIcon },
  ],
];

const Dropdown = ({ className }: { className: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div
      className={`${className} absolute top-full py-6 px-5 bg-white shadow-lg max-w-max rounded-md flex justify-center items-center divide-x-1 gap-10`}
    >
      <div className="flex flex-col gap-2 w-[300px]">
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Services</p>
          <Link href={"/categories"} className="underline">
            See all
          </Link>
        </div>
        <div>
          {group1.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-fadedwhite hover:bg-opacity-30"
            >
              <span className="flex items-center gap-2">
                <span className="bg-main rounded-md p-2">
                  <img alt="" src={item.icon.src} />
                </span>
                <p>{item.label}</p>
              </span>
              <IconButton onClick={handleOpenModal}>
                <img alt="" src={arrowFilledIcon.src} />
              </IconButton>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[340px] px-2 pl-10">
        <div className="flex justify-between text-sm">
          <p className="font-semibold">Services</p>
          <Link href={"/categories"} className="underline">
            See all
          </Link>
        </div>
        <div>
          {group2.map((group, index) => (
            <div key={index}>
              {group.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-fadedwhite hover:bg-opacity-30"
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-main rounded-md p-2">
                      <img alt="" src={item.icon.src} />
                    </span>
                    <p>{item.label}</p>
                  </span>
                  <IconButton onClick={handleOpenModal}>
                    <img alt="" src={arrowFilledIcon.src} />
                  </IconButton>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <PlaceRequestModal open={openModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Dropdown;
