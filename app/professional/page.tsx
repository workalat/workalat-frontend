"use client"
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa6";

import Hero from "./sub-components/hero";
import Jobs from "./sub-components/jobs";
import HelpfulSection from "./sub-components/helpfulSection";
import Join from "./sub-components/join";
import { useRouter } from "next/navigation";

export default function Professional() {
  
  const router = useRouter()
  
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[clamp(50svh,631px,80svh)] sm:h-[680px] bg-white relative overflow-hidden">
        <Hero />
      </section>
      <section className="bg-[#eff1f2]  w-full bg-[url('/images/bg_pattern_3.svg')] bg-no-repeat bg-cover">
            <Jobs />
      </section>
      <section className="bg-white w-full h-max-441px">
        <HelpfulSection />
      </section>
      <section className="bg-[#eff1f2] w-full bg-[url('/images/bg_pattern_4.svg')] bg-no-repeat bg-right-top">
        <Join />
      </section>
      {/* <section className="w-full h-max-844px bg-main pb-6">
        <SuccessStories />
      </section> */}
      
      <section className="bg-secondary py-12 lg:py-20 mt-16">
        <div className="container mx-auto max-w-7xl flex flex-col gap-12 px-6">
          <h2 className="text-center text-2xl lg:text-5xl font-bold text-main pb-3 text-pretty">
          Join WorkAlat today and unlock the potential to expand your service business!
          </h2>
          <Button variant="contained" color="secondary" className="w-max mx-auto py-4 px-12" 
          onClick={() => router.push('/professional/signup')}
          >
            Get Started
            <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </>
  );
}
