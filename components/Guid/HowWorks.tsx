"use client";
import Image from "next/image";
import React from "react";

import { useUserContext } from "@/context/user_context";

const HowWorks = () => {
  const user = useUserContext().user;

  return (
    <div className="pt-6 container mx-auto max-w-7xl px-6">
      <div className="flex flex-col md:flex-row justify-center gap-x-10 py-5">
        <div className="w-[300px] sm:w-[300px] md:w-[406px] lg:w-[406px]">
          <Image
            src="/images/chat_pic.png"
            alt="Descriptive Alt Text"
            width={500}
            height={300}
          />
        </div>
        <div
          className="flex-1 py-4 text-gray-700 text-[14px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-[18px]"
          style={{ wordSpacing: "1px", lineHeight: "1.4" }}
        >
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            {user?.role === "client"
              ? "How to select best service provider"
              : "Winning jobs"}
          </h1>
          <div>
            {user?.role === "client" ? (
              <>
                Choose the professional that best fits your needs and budget.
                You can hire based on price, experience, or
                reviews—whatever&apos;s most important for your project.
                <ul className="list-disc ml-4 mt-2 space-y-2">
                  <li>
                    <strong>Make Your Choice:</strong> Hire the professional
                    with a click and begin working together.
                  </li>
                  <li>
                    <strong>Track Progress:</strong> Stay in touch with your
                    service provider through WorkAlat's messaging system to
                    ensure everything is on track.
                  </li>
                </ul>
              </>
            ) : (
              <>
                When a client chooses you for their project, it&apos;s time to
                get to work! Communicate directly through WorkAlat to ensure
                clarity and success.
                <ul className="list-disc ml-4 mt-2 space-y-2">
                  <li>
                    <strong>Communicate Clearly: </strong> Keep clients updated
                    on progress, ask questions, and confirm details.
                  </li>
                  <li>
                    <strong>Deliver Excellence: </strong> Complete the job to
                    the highest standard to ensure positive feedback and repeat
                    business. on track.
                  </li>
                </ul>
              </>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8">
            {user?.role === "client"
              ? "How do I manage my project?"
              : "Building a reputation on WorkAlat"}
          </h1>
          <div>
            {user?.role === "client" ? (
              <>
                On your dashboard, you can navigate to “My Project” page to see
                the list of jobs/project you have posted. Use any button like
                “Project details” to track your project. We also have features
                that can allow you upload files, tracklist and more to ensure
                your project is successfully.
              </>
            ) : (
              <>
                After each project, ask your clients to leave a review. Positive
                ratings help you rank higher on the platform and attract more
                clients.
                <ul className="list-disc ml-4 mt-2 space-y-2">
                  <li>
                    <strong>Request Reviews: </strong> A strong rating and good
                    reviews increase your chances of winning more jobs.
                  </li>
                  <li>
                    <strong>Grow Your Business: </strong> Use WorkAlat as a tool
                    to grow your client base and expand your offerings. on
                    track.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      {user?.role === "client" && (
        <div className="my-16">
          <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 text-gray-700">
            Do I need to leave a review?
          </h1>
          <p className="md:text-lg">
            Once the work is complete and you&apos;re satisfied, finalize the
            payment through WorkAlat. Don&apos;t forget to leave a review to
            help other clients make informed decisions.
          </p>
          <h1 className="text-xl md:text-2xl font-bold mb-4 mt-8 text-gray-700">
            How secure is the platform?
          </h1>
          <p className="md:text-lg">
            WorkAlat is secure and transparent. We have integrated sophisticated
            solutions to keep you safe. All professionals on our platform are
            verified.
          </p>
        </div>
      )}
    </div>
  );
};

export default HowWorks;
