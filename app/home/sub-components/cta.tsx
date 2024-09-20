import { Box, Button } from "@mui/material";

import arrowRightIcon from "@/public/icons/arrow_right.svg"
import ctaImg from "@/public/images/cta.png"

const Cta = () => {
  return (
    <Box className="bg-main bg-[url('/images/bg_pattern.svg')] bg-cover rounded-xl p-8 lg:pl-20 md:p-4 flex justify-between items-center flex-wrap gap-y-6">
        <div className="text-white max-w-[584px] space-y-9">
            <h2 className="text-3xl md:text-5xl font-bold">Find the perfect professional for you.</h2>
            <p className="md:text-xl">
                Connects with talents that gts you, and hire them to take your business
                to the next level.
            </p>
            <Button variant="contained" className="group bg-secondary text-dark font-semibold py-2 px-8 hover:bg-secondary">
                Get Started
                <img src={arrowRightIcon.src} alt="" className="ml-2 group-hover:translate-x-2 transition-all" />
            </Button>
        </div>
        <img src={ctaImg.src} alt="" />
    </Box>
  );
};

export default Cta;
