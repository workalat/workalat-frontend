export type SiteConfig = typeof siteConfig;

import categoriesIcon from "@/public/icons/categories.svg";
import categoriesdarkIcon from "@/public/icons/categories_dark.svg";
import howitworksIcon from "@/public/icons/howitworks.svg";
import howitworksdarkIcon from "@/public/icons/howitworks_dark.svg";
import accountinImg from "@/public/images/Accounting.png";
import digitalMarketingImg from "@/public/images/Digital Marketing.png";
import gardeningImg from "@/public/images/Gardening.png";
import houseCleaningImg from "@/public/images/House Cleaning.png";
import mechanicImg from "@/public/images/mechanic.png";
import plumbingImg from "@/public/images/Plumbing.png";
import webDesignImg from "@/public/images/Web Design.png";

export const siteConfig = {
  name: "What Works",
  description: "Find the perfect professional for you",
  navItems: [
    {
      label: "Categories",
      href: "/categories",
      icon: categoriesIcon,
      icon_dark: categoriesdarkIcon,
      isDropdown: true,
    },
    {
      label: "How It Works",
      href: "/client/how-it-works",
      icon: howitworksIcon,
      icon_dark: howitworksdarkIcon,
      isDropdown: false,
    },
  ],
  navMenuItems: [
    {
      label: "Categories",
      href: "/categories",
      icon: categoriesIcon,
      icon_dark: categoriesdarkIcon,
    },
    {
      label: "How It Works",
      href: "/client/how-it-works",
      icon: howitworksIcon,
      icon_dark: howitworksdarkIcon,
    },
  ],
  links: {
    login: "/login",
    serviceProviderSignup: "/professional",
  },
  categories: [
    { label: "Dry Cleaning" },
    { label: "Commercial & Office Cleaning" },
    { label: "Pressure Washing" },
    { label: "End of Tenancy Cleaning" },
    { label: "Gutter Cleaning" },
    { label: "Carpet Cleaning" },
    { label: "Car Cleaning & Valet" },
    { label: "Office Cleaning" },
    { label: "Roof Cleaning" },
    { label: "Oven Cleaning" },
  ],
  services: [
    {
      name: "Accounting",
      description: "Manage finances",
      image: accountinImg,
    },
    {
      name: "Digital Marketing",
      description: "Get better reach",
      image: digitalMarketingImg,
    },
    {
      name: "House Cleaning",
      description: "Clean your house",
      image: houseCleaningImg,
    },
    {
      name: "Web Design",
      description: "Design Stunning Websites",
      image: webDesignImg,
    },
    {
      name: "Auto Mechanic",
      description: "Repair your Cars",
      image: mechanicImg,
    },
    {
      name: "Plumbing",
      description: "Get your plumbing fixed",
      image: plumbingImg,
    },
    {
      name: "Gardening",
      description: "Get your garden maintained",
      image: gardeningImg,
    },
  ],
  skillOptions: [
    { value: "web development", label: "Web Development" },
    { value: "mobile development", label: "Mobile Development" },
    { value: "backend development", label: "Backend Development" },
    { value: "database administration", label: "Database Administration" },
    { value: "cloud computing", label: "Cloud Computing" },
    { value: "artificial intelligence", label: "Artificial Intelligence" },
    { value: "machine learning", label: "Machine Learning" },
    { value: "data science", label: "Data Science" },
    { value: "cybersecurity", label: "Cybersecurity" },
  ],
};
