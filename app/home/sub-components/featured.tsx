import { Box } from "@mui/material";
import Link from "next/link";

import arrowRightSmIcon from "@/public/icons/arrow_right_sm.svg";
import aiImg from "@/public/images/Artificial Intelligence.png";
import brandingImg from "@/public/images/Branding.png";
import cleaningImg from "@/public/images/House Cleaning 2.png";

const featured_services = [
  {
    img: aiImg,
    title: "Artificial Intelligence",
  },
  {
    img: brandingImg,
    title: "Branding",
  },
  {
    img: cleaningImg,
    title: "House Cleaning",
  },
];

const Featured = () => {
  return (
    <Box className="space-y-7 mt-20 border-b border-dotted border-black pb-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">Featured Services</h2>
        <Link href="/categories" className="flex gap-2 text-base sm:text-xl group text-nowrap">
          <p>View all</p>
          <img src={arrowRightSmIcon.src} alt="" className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
      <div className="flex gap-8 flex-wrap lg:flex-nowrap">
        {featured_services.map((service, index) => (
          <Link key={index} href={'/'} className="w-full sm:max-w-[442px] group">
            <img alt="" src={service.img.src} className="w-full lg:w-[442px] h-72 object-cover rounded-t-md border border-main" />
            <div className="bg-main text-white py-4 rounded-b-md group-hover:bg-opacity-90">
              <h3 className="text-center text-xl">{service.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default Featured;
