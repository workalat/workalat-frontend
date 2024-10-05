import { Box, Button } from "@mui/material";

import arrowRightIcon from "@/public/icons/arrow_right.svg";
import ctaImg from "@/public/images/third_section.png";

const Cta = ({ openModal }: {openModal: ()=>void}) => {
  return (
    <Box className="bg-main bg-[url('/images/bg_pattern.svg')] bg-cover rounded-xl p-8 lg:pl-20 md:p-4 flex justify-between items-center flex-wrap gap-y-6">
      <div className="text-white max-w-[584px] space-y-9">
        <h2 className="text-3xl md:text-5xl font-bold">
          Find the right expert for every job
        </h2>
        <p className="md:text-xl">
          WorkAlat connects you with the top freelancers and service providers
          to get the job done right.
        </p>
        <Box className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            className="w-full sm:max-w-max group bg-secondary text-dark font-semibold py-2 px-8 hover:bg-secondary"
            onClick={openModal}
          >
            Post a project
            <img
              src={arrowRightIcon.src}
              alt=""
              className="ml-2 group-hover:translate-x-2 transition-all"
            />
          </Button>
          <Button variant="outlined" className="w-full sm:max-w-max  ml-2">
            Join as a professional
            <img
              src={arrowRightIcon.src}
              alt=""
              className="ml-2 group-hover:translate-x-2 transition-all"
            />
          </Button>
        </Box>
      </div>
      <img src={ctaImg.src} alt="" className="rounded-md max-w-sm w-full" />
    </Box>
  );
};

export default Cta;
