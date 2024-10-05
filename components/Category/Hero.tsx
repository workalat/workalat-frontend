"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

import PlaceRequestModal from "../Clients/PlaceRequestModal/PlaceRequestModal";

import CategoryGrids from "./CategoryGrids";
import Services from "./Services/Services";

export default function Hero() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
      <div className="w-full bg-main rounded-xl flex flex-col-reverse lg:flex-row mt-5">
        <div className="w-full lg:w-3/5">
          <div className="px-12 py-12">
            <h3 className="text-4xl text-white font-bold">
              Find services for your business on Whatworks
            </h3>
            <p className="text-lg text-white pt-5">
              Most businesses could be getting a better deal on the services
              they use day to day. We've got thousands of suppliers ready and
              waiting to quote.
            </p>
            <p className="text-lg text-white pt-3">
              Find everything from web designers to bookkeepers and telephone
              systems to office stationery.
            </p>
            <div className="pt-5">
              <button
                onClick={openModal}
                className="bg-secondary font-semibold gap-2 px-5 py-3 rounded-md flex items-center justify-center"
              >
                Place new request <FaArrowRight className="size-[13px]" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <Image
            className="w-[300px] lg:w-[400px] xl:w-[400px] mx-auto lg:ms-auto pe-5 -mt-12 lg:-mt-5 xl:-mt-12 h-auto"
            width={1000}
            height={1000}
            src="/images/client_hero.png"
            alt="what works"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 py-12">
        {[
          "Tell us what you want",
          "Receive Free Quotes",
          "Choose your professional",
        ].map((title, index) => (
          <div
            key={index}
            className="bg-[#F0F0F0] w-full p-6 flex flex-col justify-start items-start rounded-lg shadow-lg"
          >
            <div className="bg-gray-300 w-12 h-12 flex justify-center items-center rounded-full shadow-md">
              <h2 className="font-bold text-xl text-gray-700">{index + 1}</h2>
            </div>
            <h2 className="font-semibold mt-4 mb-2 text-center text-lg sm:text-xl text-gray-800">
              {title}
            </h2>
            <p className="text-justify text-sm sm:text-base text-gray-600">
              {index === 0 &&
                `We'll help you find professionals. Help us refine your search by telling us your requirements and we'll contact service providers in your area to help you.`}
              {index === 1 &&
                `You'll receive free quotes from professionals and get quick notifications via our website or app. We make sure we do the leg work for you!`}
              {index === 2 &&
                `Pick from some of the best providers in your area. With easy access to reviews and direct contact with professionals, you can be confident with your choice.`}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className=" cursor-pointer rounded-[5px] bg-secondary text-[#242424] text-[10px] lg:text-[13px] md:text-[11px] sm:text-[10px] font-bold flex items-center justify-center space-x-2 group px-6 py-4">
          <button>Get quotes from professional near you</button>
          <FaArrowRight />
        </div>
      </div>

      <CategoryGrids />
      <Services />

      <PlaceRequestModal open={isOpenModal} onClose={closeModal} />
    </div>
  );
}
