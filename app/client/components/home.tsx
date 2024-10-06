"use client"
import { Button } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import clientHeroImg from "@/public/images/category-hero.png";
import bgPattern5 from "@/public/images/bg_pattern_5.svg";
import bgPattern6 from "@/public/images/bg_pattern_6.svg";
import drycleanImg from "@/public/images/categories/13.jpg";
import graphicDesignImg from "@/public/images/categories/6.jpg";
import cleaningImg from "@/public/images/categories/1.jpg";
import webDevImg from "@/public/images/categories/2.jpg";
import PlaceRequestModal from "@/components/Clients/PlaceRequestModal/PlaceRequestModal";
import { FaArrowRight } from "react-icons/fa6";

const featured_services = [
  {
    title: "House Cleaning",
    img: cleaningImg,
    subtitle: "Get expert cleaning services to keep your space spotless and fresh."
  },
  {
    title: "Graphic Design",
    img: webDevImg,
    subtitle: "Creative graphic design solution providers to bring your vision to life."
  },
  {
    title: "Handyman",
    img: graphicDesignImg,
    subtitle: "Get a reliable handyman services for all your home repair needs"
  },
  {
    title: "Web Development",
    img: drycleanImg,
    subtitle: "Professional web development service to build your digital presence"
  }
]

const Home = () => {

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  
  return (
    <div>
      <section className="bg-main text-white p-6 sm:p-12 rounded-lg !space-y-8 min-h-[480px] relative z-10">
        <h1 className="text-4xl sm:text-[40px] sm:leading-[3rem] font-bold max-w-[650px]">
          Connect with the right professional for any task
        </h1>
        <div className="space-y-3">
          <p className="max-w-[580px]">
            WorkAlat connects you with the top freelancers and service providers to get the job done right. From local specialists to remote experts, our platform simplifies the hiring process, saving you time and ensuring quality results.
          </p>
          {/* <p className="max-w-[500px]">
            Find everything from web designers to bookkeepers and telephone
            systems to office stationery.
          </p> */}
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
              <div key={index} className="flex flex-col gap-3 items-center md:max-w-[300px] flex-grow bg-main overflow-hidden rounded-xl">
                <Image src={service.img} alt={service.title} className="w-full h-[150px] border-b-[8px] border-white object-cover rounded-md" />
                <div className="text-fadedwhite px-4 pb-4">
                  <h3 className="text-lg font-semibold border-b border-dark border-opacity-15">{service.title}</h3>
                  <p className="mt-2">{service.subtitle}</p>
                  <button className="w-full p-2 flex justify-center items-center gap-2 border border-secondary mt-3 rounded-md">
                    Explore <FaArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <PlaceRequestModal open={open} onClose={closeModal} />
    </div>
  );
};

export default Home;
