"use client";
import React, { useState } from "react";

interface FAQAnnouncementGuideTabsProps {
  onTabClick: (section: string) => void; // Accept function prop to handle tab clicks
}

const FAQAnnouncementGuideTabs: React.FC<FAQAnnouncementGuideTabsProps> = ({
  onTabClick,
}) => {
  const [activeSection, setActiveSection] = useState("FAQ");

  const handleTabClick = (section: string) => {
    setActiveSection(section);
    onTabClick(section); // Call the passed function when tab is clicked
  };

  return (
    <div>
      {/* Navigation buttons */}
      <div className="flex items-center gap-8 text-sm sm:text-sm md:text-lg lg:text-lg xl:text-xl font-bold mt-[3%] mb-[3%]">
        <div
          className={`cursor-pointer ${activeSection === "FAQ" ? "text-yellow-500 border-b-4 border-yellow-500 inline-block w-[30px] sm:w-[30px] lg:w-[50px] md:w-[40px]" : ""}`}
          onClick={() => handleTabClick("FAQ")}
        >
          FAQ
        </div>
        <div
          className={`cursor-pointer ${activeSection === "Guides" ? "text-yellow-500 border-b-4 border-yellow-500 inline-block w-[60px] lg:w-[80px] md:w-[70px] sm:w-[60px]" : ""}`}
          onClick={() => handleTabClick("Guides")}
        >
          Guides
        </div>
        <div
          className={`cursor-pointer ${activeSection === "Announcements" ? "text-yellow-500 border-b-4 border-yellow-500 inline-block w-[120px] sm:w-[130px] md:w-[150px] lg:w-[168px]" : ""}`}
          onClick={() => handleTabClick("Announcements")}
        >
          Announcements
        </div>
      </div>
    </div>
  );
};

export default FAQAnnouncementGuideTabs;
