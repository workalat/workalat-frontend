"use client";
import React, { useState } from "react";
import Image from "next/image";

import testimonialImg from "@/public/images/testimonial.png";
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
    text: "I was struggling to find a reliable contractor for my home renovation, but WorkAlat made the process so easy! Within hours of posting my project, I had multiple quotes from verified professionals. I ended up hiring a fantastic contractor who did an amazing job. The platform is user-friendly, and I loved the ability to compare reviews and prices before making a decision. I'll definitely be using WorkAlat again!",
    img: testimonialImg.src,
    clientname: "Sarah L.",
    clientdesc: "Home Renovation Client",
},
{
    text: "As a small business owner, finding affordable and quality marketing support is always a challenge. WorkAlat connected me with a digital marketing expert who completely transformed my online presence. The process was seamless, and I appreciated how transparent everything was. I found the perfect freelancer, and my business has seen a significant boost since. Highly recommended!",
    img: testimonialImg.src,
    clientname: "James M.",
    clientdesc: "Small Business Owner",
},
{
    text: "I used WorkAlat to find a caterer and photographer for my wedding, and I couldn't be happier! I got quotes from several vendors within minutes of submitting my request, and the reviews helped me feel confident about my choice. The caterer and photographer were professional and exceeded my expectations. WorkAlat made my big day stress-free and special. It's a fantastic platform for anyone looking for top-notch services.",
    img: testimonialImg.src,
    clientname: "Emily T.",
    clientdesc: "Event Planning Client",
},
{
    text: "Joining WorkAlat was one of the best decisions for my freelance career. Within the first week, I connected with multiple clients who were looking for high-quality design work. The platform makes it easy to showcase my portfolio, and the review system helps me stand out. Every client I've worked with has been real, verified, and ready to collaborate. WorkAlat has become my go-to for finding new business!",
    img: testimonialImg.src,
    clientname: "David S.",
    clientdesc: "Freelance Graphic Designer",
},
{
    text: "WorkAlat has been a game-changer for my event planning business. I used to struggle with finding consistent clients, but since I joined the platform, I've had a steady stream of verified leads. The ability to receive detailed job requests and communicate directly with clients makes the process so smooth. The clients I've worked with have been serious about their projects, and it's clear that WorkAlat only attracts people who value quality.",
    img: testimonialImg.src,
    clientname: "Maria K.",
    clientdesc: "Event Planner",
  },
{
    text: "As someone who offers local handyman services, WorkAlat has helped me expand my customer base beyond word-of-mouth. I've connected with real clients who need specific jobs done, and the quoting system allows me to offer competitive prices while showcasing my skills. What I appreciate most is that the platform vets clients, so I know the leads are legitimate and serious about hiring. I've secured multiple projects through WorkAlat, and it's boosted my business tremendously!",
    img: testimonialImg.src,
    clientname: "Alex T.",
    clientdesc: "Handyman Services",
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
