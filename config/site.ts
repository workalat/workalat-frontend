export type SiteConfig = typeof siteConfig;

import categoriesIcon from "@/public/icons/categories.svg";
import categoriesdarkIcon from "@/public/icons/categories_dark.svg";
import howitworksIcon from "@/public/icons/howitworks.svg";
import howitworksdarkIcon from "@/public/icons/howitworks_dark.svg";
import socialMediaImg from "@/public/images/social_media.png";
import cleanerImg from "@/public/images/cleaner.png";
import nannyImg from "@/public/images/nanny.png";
import webDevelopmentImg from "@/public/images/web_dev.png";
import mechanicImg from "@/public/images/mechanic.png";

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
      href: "/how-it-works",
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
      href: "/how-it-works",
      icon: howitworksIcon,
      icon_dark: howitworksdarkIcon,
    },
  ],
  links: {
    login: "/login",
    serviceProviderSignup: "/professional/signup",
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
      name: "Social Media",
      description: "Read more customers",
      image: socialMediaImg,
    },
    {
      name: "Cleaner",
      description: "Care for your Home",
      image: cleanerImg,
    },
    {
      name: "Nanny",
      description: "Hire for your Kids",
      image: nannyImg,
    },
    {
      name: "Web Development",
      description: "Design Stunning Websites",
      image: webDevelopmentImg,
    },
    {
      name: "Mechanic",
      description: "Repair your Cars",
      image: mechanicImg,
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
