"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import boomerangIcon from "@/public/images/boomerangIcon.svg";
import avatarIcon from "@/public/images/avatarIcon.svg";
import graphIcon from "@/public/images/graphIcon.svg";

const features = [
  {
    icon: boomerangIcon,
    title: "Create your profile",
    points: [
      "Sign up and create a detailed profile that showcases your skills, services and coverage areas.",
    ],
    buttonText: "How it works",
    isParagraph: true,
    link: "/professional/how-it-works",
  },
  {
    icon: avatarIcon,
    title: "Browse and bid on projects",
    points: [
      "Browse through job listings from clients looking for professionals like you.",
      "Filter opportunities based on location, service type, and project size.",
      "Send your proposals directly to clients and start building relationships.",
    ],
    buttonText: "See an example lead",
    isParagraph: false,
    link: "/leads",
  },
  {
    icon: graphIcon,
    title: "Grow your business",
    points: [
      "Once hired, communicate with your client through the platform to discuss project details and timelines. Provide top-notch service to earn positive reviews and grow your reputation.",
    ],
    buttonText: "See more about pricing",
    isParagraph: true,
    link: "/wallet",
  },
];

const HelpfulSection = () => {
  const router = useRouter();

  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <h1 className="text-main md:text-3xl text-xl text-center mt-24 font-bold">
        How it works
      </h1>
      <div className="flex flex-col md:flex-row justify-between my-14 gap-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex-1 w-full flex flex-col justify-between ${index < features.length - 1 ? "md:border-r md:border-gray-300 md:pr-8" : ""} ${index > 0 ? "md:pl-8" : ""}`}
          >
            <div>
              <div className="bg-secondary w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={20}
                  height={20}
                />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <ul
                className={`${feature.isParagraph ? "" : "list-disc pl-5"} mb-4`}
              >
                {feature.points.map((point, idx) => (
                  <>
                    <li key={idx} className="mb-1 text-semibold">
                      {point}
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <button
              className="w-full bg-main text-white py-2 rounded hover:bg-secondary hover:text-main transition-colors h-16"
              onClick={() => router.push(feature.link)}
            >
              {feature.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpfulSection;
