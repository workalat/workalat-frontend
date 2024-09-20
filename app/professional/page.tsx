"use client"

import Hero from "./sub-components/hero";
import Partners from "./sub-components/partners";
import Jobs from "./sub-components/jobs";
import HelpfulSection from "./sub-components/helpfulSection";
import SuccessStories from "./sub-components/successStories";
import Join from "./sub-components/join";

export default function Professional() {
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
      <section className="w-full h-max-844px bg-main pb-6">
        <SuccessStories />
      </section>
      
      <section className="bg-[#f2f2f2] pt-14 pb-9">
        <div className="container mx-auto max-w-7xl flex flex-col gap-14 px-6">
          <h2 className="text-center text-5xl text-wrap font-bold text-main pb-3">Larger businesses use WhatWorks too</h2>
          <section className="bg-main bg-opacity-20 py-9">
            <Partners />
          </section>
        </div>
      </section>
    </>
  );
}
