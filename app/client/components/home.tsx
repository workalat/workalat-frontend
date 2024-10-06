"use client";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

import PlaceRequestModal from "@/components/Clients/PlaceRequestModal/PlaceRequestModal";
import arrowRightIcon from "@/public/icons/arrow_right.svg";
import bgPattern5 from "@/public/images/bg_pattern_5.svg";
import bgPattern6 from "@/public/images/bg_pattern_6.svg";
import cleaningImg from "@/public/images/cleaning.png";
import clientHeroImg from "@/public/images/client_hero.png";
import drycleanImg from "@/public/images/dry_clean.png";
import graphicDesignImg from "@/public/images/engineering.png";
import webDevImg from "@/public/images/web_dev_2.png";

const featured_services = [
  {
    title: "House Cleaning",
    img: cleaningImg,
    subtitle:
      "Get expert cleaning services to keep your space spotless and fresh.",
  },
  {
    title: "Graphic Design",
    img: webDevImg,
    subtitle:
      "Creative graphic design solution providers to bring your vision to life.",
  },
  {
    title: "Handyman  ",
    img: graphicDesignImg,
    subtitle: "Get a reliable handyman services for all your home repair needs",
  },
  {
    title: "Web Development",
    img: drycleanImg,
    subtitle:
      "Professional web development service to build your digital presence",
  },
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <section className="px-6">
        <section className="bg-main text-white p-12 lg:p-16 rounded-lg !space-y-8 sm:min-h-[480px] relative z-10 w-full mx-auto max-w-[76.5rem]">
          <h1 className="text-4xl sm:text-[40px] sm:leading-[3rem] font-bold max-w-[650px]">
            Connect with the right professional for any task
          </h1>
          <div className="space-y-3">
            <p className="max-w-[580px]">
              WorkAlat connects you with the top freelancers and service
              providers to get the job done right. From local specialists to
              remote experts, our platform simplifies the hiring process, saving
              you time and ensuring quality results.
            </p>
          </div>
          <Button
            variant="contained"
            className="p-4 px-6 rounded-sm flex gap-2"
            onClick={openModal}
          >
            <span className="font-bold">Post a project</span>
            <Image src={arrowRightIcon} alt="Arrow right" />
          </Button>
          <Image
            src={clientHeroImg}
            alt=""
            className="absolute right-0 bottom-0 z-10 hidden lg:block"
          />
        </section>
      </section>
      <Image src={bgPattern5} alt="" className="absolute left-0 top-0 z-0" />
      <Image src={bgPattern6} alt="" className="absolute right-0 top-0 z-0" />
      <section className="bg-[#eff1f2] w-full bg-[url('/images/bg_pattern_3.svg')] bg-no-repeat bg-cover">
        <Box className="space-y-7 mt-20 pb-10 sm:px-6 lg:px-8 max-w-7xl mx-auto px-6 py-12">
          <h2 className="font-extrabold text-3xl pb-3">Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 max-w-350px mx-auto">
            {featured_services.map((service, index) => (
              <div
                key={index}
                className="h-96 rounded-lg overflow-hidden shadow-md mx-auto"
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  width={400}
                  height={225}
                  objectFit="cover"
                  className="w-full h-1/2 object-cover border border-b-4 border-white"
                />
                <div className="p-4 bg-main text-white w-full h-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm mb-3">{service.subtitle}</p>
                  </div>
                  <Button
                    variant="outlined"
                    className="text-white"
                    onClick={openModal}
                  >
                    Explore
                    <FaArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </section>
      <PlaceRequestModal open={open} onClose={closeModal} />
    </>
  );
};

export default Home;
