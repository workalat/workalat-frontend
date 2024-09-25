import { Box } from "@mui/material";
import Image from "next/image";

import arrowRightSmIcon from "@/public/images/browse_all.svg";
import graphicdesigner from "@/public/images/graphic_designer.png";
import housecleaning from "@/public/images/house_cleaning.png";
import lifecoaching from "@/public/images/life_coaching.png";
import webdevimg from "@/public/images/web_development.png";
import { useRouter } from "next/navigation";

const popular_services = [
  {
    img: graphicdesigner,
    title: "Graphics Designer",
    description: "Design great templates for prospective clients.",
  },
  {
    img: housecleaning,
    title: "House Cleaning",
    description: "Design great templates for prospective clients.",
  },
  {
    img: lifecoaching,
    title: "Life Coaching",
    description: "Design great templates for prospective clients.",
  },
  {
    img: webdevimg,
    title: "Web Development",
    description: "Design great templates for prospective clients.",
  },
];

const PopularServices = () => {
  const router = useRouter();
  return (
    <Box className="space-y-7 mt-20 pb-10 mx-10 sm:px-6 lg:px-8">
      <h2 className="font-extrabold text-3xl pb-3">Popular Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-350px mx-auto">
        {popular_services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md mx-auto">
            <Image src={service.img} alt={service.title} width={400} height={225} objectFit="cover" />
            <div className="p-4 bg-main text-white">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm mb-3">{service.description}</p>
              <button onClick={() => router.push("/professional/signup")} className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded hover:bg-yellow-400 hover:text-[#012B6D] transition-colors">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 text-base sm:text-xl group text-nowrap pt-8">
        <p className="text-black text-3xl">Browse All</p>
        <Image src={arrowRightSmIcon} alt="" className="group-hover:translate-x-1 transition-all" width={24} height={24} />
      </div>
    </Box>
  );
};

export default PopularServices;