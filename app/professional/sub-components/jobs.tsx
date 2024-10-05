import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

import img1 from "@/public/images/verified-client.png";
import img2 from "@/public/images/boost-presence.png";
import img3 from "@/public/images/flexible-opportunities.png";
import img4 from "@/public/images/zero-commission.png";

const popular_services = [
  {
    img: img1,
    title: "Verified Clients",
    description: "We connect you with clients who are actively seeking services, ensuring you only get legitimate leads.",
  },
  {
    img: img2,
    title: "Boost your online presence ",
    description: "Showcase your skills, experience and stand out to attract more clients",
  },
  {
    img: img3,
    title: "Flexible opportunities",
    description: "Browse projects that fit your availability and expertise, from short term gigs or long-term contracts.",
  },
  {
    img: img4,
    title: "Pay zero commission",
    description: "You only pay a token to bid for a project on our platform. If you don't win it, you get a 50% refund. ",
  },
];

const PopularServices = () => {
  const router = useRouter();

  return (
    <Box className="space-y-7 mt-20 pb-10 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto px-6">
      <h2 className="font-extrabold text-3xl pb-3">Why choose WorkAlat?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-350px mx-auto">
        {popular_services.map((service, index) => (
          <div key={index} className="h-96 rounded-lg overflow-hidden shadow-md mx-auto">
            <Image src={service.img} alt={service.title} width={400} height={225} objectFit="cover" className="w-full h-1/2 object-cover border border-b-4 border-white" />
            <div className="p-4 bg-main text-white w-full h-full">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm mb-3">{service.description}</p>
              <Button
                variant="outlined"
                onClick={() => router.push("/professional/signup")}
              >
                Explore
                <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center items-center gap-2 text-base sm:text-xl group text-nowrap pt-8">
        <p className="text-black text-3xl">Browse All</p>
        <Image src={arrowRightSmIcon} alt="" className="group-hover:translate-x-1 transition-all" width={24} height={24} />
      </div> */}
    </Box>
  );
};

export default PopularServices;