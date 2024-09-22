"use client"
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { siteConfig } from "@/config/site";
import prevIcon from "@/public/icons/prev.svg";

const Services = () => {
  return (
    <div className="relative">
      <Typography component={"h2"} className="font-semibold text-3xl">
        Popular professional services
      </Typography>
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Autoplay]}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        className="mySwiper mt-7"
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {siteConfig.services.map((service, index) => (
          <SwiperSlide key={index} className="rounded-xl min-w-[263px]">
            <CarouselItem service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="arrow-left arrow absolute top-1/2 left-0 -translate-x-1/4 z-10">
        <img alt="" src={prevIcon.src} />
      </button>
      <button className="arrow-right arrow absolute top-1/2 right-0 rotate-180 translate-x-1/4 z-10">
        <img alt="" src={prevIcon.src} />
      </button>
    </div>
  );
};

const CarouselItem = ({
  service,
}: {
  service: {
    name: string;
    description: string;
    image: {
      src: string;
    };
  };
}) => {
  return (
    <div className="relative z-0 h-[366px]">
      <img
        src={service.image.src}
        alt={service.name}
        className="absolute w-full h-full object-cover rounded-xl"
      />
      <div className="space-y-1 relative z-10 text-white py-11 pl-3">
        <Typography component={"p"} className="">
          {service.description}
        </Typography>
        <Typography component={"h3"} className="font-semibold text-2xl">
          {service.name}
        </Typography>
      </div>
    </div>
  );
};

export default Services;