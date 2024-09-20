import React from 'react';
import Image from 'next/image';

import boomerangIcon from "@/public/images/boomerangIcon.svg";
import avatarIcon from "@/public/images/avatarIcon.svg";
import graphIcon from "@/public/images/graphIcon.svg";

const features = [
  {
    icon: boomerangIcon,
    title: "Get quality leads",
    points: [
      "View leads locally or nationwide",
      "Review leads for free",
      "Get leads sent to you in real time"
    ],
    buttonText: "How it works"
  },
  {
    icon: avatarIcon,
    title: "Win new clients",
    points: [
      "Pick the best leads for your business",
      "Unlock verified contact details",
      "Call or email them to win the job"
    ],
    buttonText: "See an example lead"
  },
  {
    icon: graphIcon,
    title: "Grow your business",
    points: [
      "Keep 100% of what you earn",
      "No commission or hidden fees",
      "Get Hired Guarantee on first leads"
    ],
    buttonText: "See more about pricing"
  }
];

const HelpfulSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between mx-20 my-14 mt-24">
      {features.map((feature, index) => (
        <div key={index} className={`flex-1 ${index < features.length - 1 ? 'md:border-r md:border-gray-300 md:pr-8' : ''} ${index > 0 ? 'md:pl-8' : ''}`}>
          <div className="bg-secondary w-16 h-14 flex items-center justify-center rounded-lg mb-4">
            <Image src={feature.icon} alt={feature.title} width={30} height={30} />
          </div>
          <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
          <ul className="list-disc pl-5 mb-4">
            {feature.points.map((point, idx) => (
              <li key={idx} className="mb-2 text-lg text-semibold">{point}</li>
            ))}
          </ul>
          <button className="w-full bg-main text-white py-2 rounded hover:bg-secondary hover:text-main transition-colors h-16">
            {feature.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HelpfulSection;