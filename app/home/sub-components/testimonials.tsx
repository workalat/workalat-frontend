"use client";
import React, { useState } from "react";
import Image from "next/image";

import testimonial1img from "@/public/images/testimonial1.png";
import testimonial2img from "@/public/images/testimonial2.png";
import testimonial3img from "@/public/images/testimonial3.png";
import testimonial4img from "@/public/images/testimonial4.png";
import arrowDownIcon from "@/public/icons/arrow_down.svg";

const Testimonials = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-semibold text-center pb-4">Testimonials</h2>
      <h2 className="text-main text-[120px] leading-[30px] mt-8 -mb-16 sm:-mb-28 md:-mb-14 text-center">
        “
      </h2>
      <TestimonialSlider />
    </div>
  );
};

const testimonials = [
  {
    text: "Interdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsum",
    img: testimonial2img.src,
    clientname: "Thomil Kalus",
    clientdesc: "Bank Manager, United Arab.",
},
{
    text: "Interdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsum",
    img: testimonial3img.src,
    clientname: "Thomil Kajus",
    clientdesc: "Bank Manager, United Arab.",
},
{
    text: "Interdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsum",
    img: testimonial1img.src,
    clientname: "Thomil Talus",
    clientdesc: "Bank Manager, United Arab.",
},
{
    text: "Interdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsum",
    img: testimonial4img.src,
    clientname: "Thomil Falus",
    clientdesc: "Bank Manager, United Arab.",
},
{
    text: "Interdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsumInterdum et malesuada fames ac ante ipsum",
    img: testimonial2img.src,
    clientname: "Thomil Yalus",
    clientdesc: "Bank Manager, United Arab.",
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <div className="max-w-4xl mx-auto overflow-x-hidden h-[600px] md:h-96">
      <div className="relative h-[354px] md:h-40">
        <div
          className="transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute w-full h-[384px] md:h-48 top-1/2 flex items-center justify-center transition-all ${activeIndex === index ? "" : "opacity-0 invisible"}`}
              style={{ left: `${index * 100}%` }}
            >
              <p className="text-center">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div
          className="flex transition-transform duration-500"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              role="button"
              className={`cursor-pointer p-1 mx-2 transition-all relative flex flex-col items-center gap-4`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={testimonial.img}
                alt={`Client ${index + 1}`}
                width={activeIndex === index ? 120:(Math.abs(activeIndex-index)>=2 ? 60:80)}
                height={activeIndex === index ? 120:80}
                className={`rounded-full transition-all ${activeIndex === index ? "ring-4 p-1.5 ring-yellow-500" : "ring-2 p-1 ring-main"}`}
              />
              <img alt="" src={arrowDownIcon.src} className={`absolute top-[97%] sm:top-[115px] left-1/2 -translate-x-1/2 sm:translate-y-3/4 ${activeIndex === index ? "":"hidden"}`} />
              <div className={activeIndex===index ? "absolute bottom-0 translate-y-[130%]":"hidden"}>
                <p className="text-center md:text-2xl font-bold">{testimonial.clientname}</p>
                <p className="text-center text-xs md:text-sm text-nowrap">{testimonial.clientdesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
