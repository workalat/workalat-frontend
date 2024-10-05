"use client";
import { useState } from "react";

import Cta from "./sub-components/cta";
import CtaWorkers from "./sub-components/cta_workers";
import Featured from "./sub-components/featured";
import Hero from "./sub-components/hero";
import MobileAppCta from "./sub-components/mobile_app_cta";
import Partners from "./sub-components/partners";
import Services from "./sub-components/services";
import Testimonials from "./sub-components/testimonials";

import PlaceRequestModal from "@/components/Clients/PlaceRequestModal/PlaceRequestModal";

const HomePage = () => {
  const [openPlaceReqModal, setOpenPlaceReqModal] = useState(false);
  const closePlaceReqModal = () => setOpenPlaceReqModal(false);
  const doOpenPlaceReqModal =  () => setOpenPlaceReqModal(true);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[clamp(50svh,631px,80svh)] sm:h-[680px] bg-main relative overflow-hidden">
        <Hero openModal={doOpenPlaceReqModal}  />
      </section>
      <section className="bg-[#f2f2f2] pt-14 pb-9">
        <div className="container mx-auto max-w-7xl flex flex-col gap-14 px-6">
          <section className="bg-main bg-opacity-20 py-9">
            <Partners />
          </section>
          <Services />
          <Cta openModal={doOpenPlaceReqModal} />
        </div>
      </section>
      <section className="container mx-auto max-w-7xl flex flex-col gap-14 px-6">
        <Featured />
      </section>
      <section className="bg-main py-20 mt-10">
        <div className="container mx-auto max-w-7xl flex flex-col gap-14 px-6">
          <CtaWorkers openModal={doOpenPlaceReqModal} />
        </div>
      </section>
      <section className="container mx-auto max-w-7xl flex flex-col gap-14 px-6">
        <Testimonials />
      </section>
      <section className="bg-secondary mt-10 min-h-80 bg-[url('/images/bg_pattern_2.svg')] bg-cover">
        <div className="container mx-auto max-w-7xl flex flex-col justify-center h-full gap-14 px-6">
          <MobileAppCta />
        </div>
      </section>
      <PlaceRequestModal open={openPlaceReqModal} onClose={closePlaceReqModal} />
    </>
  );
};

export default HomePage;
