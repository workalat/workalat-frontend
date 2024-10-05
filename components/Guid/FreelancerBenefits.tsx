"use client";
import Image from "next/image";
import React from "react";

import { useUserContext } from "@/context/user_context";

const FreelancerBenefits = () => {
  // const user = useUserContext();

  const user = {
    user: {
      role: "professional",
    }
  }

  return (
    <div className="pt-6 container mx-auto max-w-7xl px-6">
      <div className="flex flex-col lg:flex-row justify-center py-[2%]">
        <div className=" flex flex-col  w-full lg:w-[65%] mb-4 mt-3 lg:mb-0  lg:text-left">
          <h2 className=" w-full text-left lg:w-[70%] text-xl sm:text-xl md:text-3xl lg:text-3xl font-semibold text-gray-900 mb-[3%] leading-tight ">
            {user.user?.role === "client"
              ? "How  to post a job"
              : "How do I create a profile?"}
          </h2>
          <p className="text-gray-700 text-left w-full lg:w-[95%] sm:w-full text-base lg:text-lg">
            {user.user?.role === "client" ? (
              <>
                To post a job on WorkAlat, navigate to the homepage and enter
                the service you need and the location, follow the easy
                step-by-step dialogue and provide detailed description of your
                project so we can connect you with the right professionals
              </>
            ) : (
              <>
                The first step to success on WorkAlat is setting up a detailed
                and professional profile. Your profile acts as your online
                business card, make it count! Sign Up for Free: Create an
                account and fill out your profile with your skills, services,
                and experience.
              </>
            )}
          </p>
        </div>
        <div className="pic w-full lg:w-[35%] flex justify-center ">
          <Image
            width={1000}
            height={1000}
            src={ user.user?.role === "client" ? "/images/howworks2.png" : "/images/create-profile.png"}
            alt="Happy freelancers working"
            className="size-full sm:size-[60%] md:size-[90%] lg:size-full xl:size-full rounded-lg shadow-sm"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-center p-[2%] bg-[#F3F3F3] rounded-md gap-4 lg:gap-12">
        <div className=" flex flex-col  w-full lg:w-[65%] mb-4 mt-3 lg:mb-0  lg:text-left">
          <h2 className=" w-full text-left lg:w-[70%] text-xl sm:text-xl md:text-3xl lg:text-3xl font-semibold text-gray-900 mb-[3%] leading-tight mt-8">
            {user.user?.role === "client"
            ? "How to receive quotes"
              : "Finding a job on WorkAlat"}
          </h2>
          <div className="text-gray-700 text-left w-full lg:w-[95%] sm:w-full text-base lg:text-lg">
            {user.user?.role === "client" ? (
              <>
                After submitting your job request, qualified professionals will
                start sending you tailored quotes. Here&apos;s how to manage the
                process:
                <ul className="list-disc ml-4 space-y-2 mt-2">
                  <li>
                    <strong>Review Quotes:</strong> Check pricing, service details, and any
                    additional offers.
                  </li>
                  <li>
                    <strong>Compare Professionals:</strong> Look at their profiles, portfolios,
                    and past client reviews.
                  </li>
                  <li>
                    <strong>Ask Questions:</strong> Use the direct messaging feature to
                    communicate with service providers before making your
                    decision.
                  </li>
                </ul>
              </>
            ) : (
              <>
                Once your profile is ready, you&apos;ll start receiving
                notifications about relevant job leads based on your services
                and location.
                <ul className="list-disc ml-4 space-y-2 mt-2">
                  <li>
                    <strong>Browse Job Leads: </strong>Check the job board or receive
                    notifications for new opportunities that match your skills.
                  </li>
                  <li>
                    <strong>Submit Quotes:</strong> Send detailed quotes that explain your
                    pricing, timeline, and how you plan to complete the project.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="pic w-full lg:w-[35%] flex justify-center ">
          <Image
            width={1000}
            height={1000}
            src={ user.user?.role === "client" ? "/images/receive-quotes.png":"/images/find-job.png"}
            alt="Happy freelancers working"
            className="size-full sm:size-[60%] md:size-[90%] lg:size-full xl:size-full rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FreelancerBenefits;
