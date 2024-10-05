"use client"
import { Button } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import clientHeroImg from "@/public/images/client_hero.png";
import bgPattern5 from "@/public/images/bg_pattern_5.svg";
import bgPattern6 from "@/public/images/bg_pattern_6.svg";
import drycleanImg from "@/public/images/dry_clean.png";
import graphicDesignImg from "@/public/images/engineering.png";
import cleaningImg from "@/public/images/cleaning.png";
import webDevImg from "@/public/images/web_dev_2.png";
import PlaceRequestModal from "@/components/Clients/PlaceRequestModal/PlaceRequestModal";

const featured_services = [
  {
    title: "Cleaning",
    img: cleaningImg,
    subtitle: "Get professional cleaning service swiftly anytime you want."
  },
  {
    title: "Web Development",
    img: webDevImg,
    subtitle: "Get professional web development service swiftly anytime you want."
  },
  {
    title: "Graphic Design",
    img: graphicDesignImg,
    subtitle: "Get professional graphic design service swiftly anytime you want."
  },
  {
    title: "Dry Cleaning",
    img: drycleanImg,
    subtitle: "Get professional dry cleaning service swiftly anytime you want."
  }
]

const Home = () => {

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  
  return (
    <>
      <section className="bg-main text-white p-6 sm:p-12 rounded-lg !space-y-8 min-h-[480px] relative z-10">
        <h1 className="text-4xl sm:text-[40px] sm:leading-[3rem] font-bold max-w-[650px]">
          Find services for your business on Whatworks
        </h1>
        <div className="space-y-3">
          <p className="max-w-[580px]">
            Most businesses could be getting a better deal on the services they
            use day to day. We&apos;ve got thousands of suppliers ready and
            waiting to quote.
          </p>
          <p className="max-w-[500px]">
            Find everything from web designers to bookkeepers and telephone
            systems to office stationery.
          </p>
        </div>
        <Button variant="contained" className="p-4 px-6 rounded-sm flex gap-2" onClick={openModal}>
          <span className="font-bold">Place new request</span>
          <Image src={arrowRightIcon} alt="Arrow right" />
        </Button>
        <Image src={clientHeroImg} alt="" className="absolute right-0 bottom-0 z-10 hidden lg:block" />
      </section>
      <Image src={bgPattern5} alt="" className="absolute left-0 top-0 z-0" />
      <Image src={bgPattern6} alt="" className="absolute right-0 top-0 z-0" />
      <section className="space-y-4 my-16">
        <h2 className="text-dark text-3xl font-bold">Featured Services</h2>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          {
            featured_services.map((service, index) => (
              <div key={index} className="flex flex-col gap-3 items-center md:max-w-[300px] flex-grow">
                <Image src={service.img} alt={service.title} className="w-full h-[221px] object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold border-b border-dark border-opacity-15">{service.title}</h3>
                  <p className="mt-2">{service.subtitle}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <PlaceRequestModal open={open} onClose={closeModal} />
    </>
  );
};

export default Home;
