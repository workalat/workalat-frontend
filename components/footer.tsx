"use client"
import { Button } from "@mui/material";

import arrowRightWhiteIcon from "@/public/icons/arrow_right_white.svg";
import facebookIcon from "@/public/icons/facebook.svg";
import instagramIcon from "@/public/icons/instagram.svg";
import linkedinIcon from "@/public/icons/linkedin.svg";
import scrollToTopIcon from "@/public/icons/scroll_to_top.svg";
import twitterIcon from "@/public/icons/twitter.svg";

const footer_links = [
  {
    title: "For Clients",
    links: [
      { title: "How to hire", href: "/guide" },
      { title: "Post a project", href: "/" },
      { title: "Login", href: "/login" },
      { title: "Download app", href: "/" },
    ]
  },
  {
    title: "For Professionals",
    links: [
      { title: "Join as a professional", href: "/professional" },
      { title: "How it works", href: "/guide" },
      { title: "Pricing", href: "/wallet" },
      { title: "Login", href: "/login" },
      { title: "Download app", href: "/" },
    ]
  },
  {
    title: "Resources",
    links: [
      { title: "Help & Support", href: "/help" },
      { title: "About us", href: "/about" },
      // { title: "Categories", href: "/" },
      { title: "Guides", href: "/guide" },
      { title: "Contact Us", href: "/contact" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Privacy policy", href: "/privacy" },
      // { title: "Cookie policy", href: "/" },
    ]
  }
]

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <footer className="footer w-full flex items-center justify-center py-3 bg-main">
      <div className="text-white w-full relative pt-6">
        <hr className="w-full opacity-20 absolute top-16 hidden md:block" />
        <div className="flex justify-between gap-y-8 flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap max-w-7xl mx-auto px-6">
          {footer_links.map((link, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold mb-4">{link.title}</h2>
              {link.links.map((item, index) => (
                <a key={index} href={item.href} className="text-sm sm:text-base hover:text-secondary transition-colors">
                  {item.title}
                </a>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-6 relative">
            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
            <div className="bg-black bg-opacity-50 p-2 max-w-[328px] rounded-lg">
              <input
                placeholder="Your email address"
                className="pl-4 pr-2 bg-transparent focus:outline-none sm:border-r border-r-[rgba(255,255,255,0.3)]"
              />
              <Button
                type="submit"
                className=" !capitalize text-white font-normal font-mono"
              >
                Send
              </Button>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-y-3">
              <p className="text-xl font-bold">Follow Us</p>
              <div className="flex gap-7 items-center">
                <a href="/">
                  <img src={facebookIcon.src} alt="" />
                </a>
                <a href="/">
                  <img src={twitterIcon.src} alt="" />
                </a>
                <a href="/">
                  <img src={instagramIcon.src} alt="" />
                </a>
                <a href="/">
                  <img src={linkedinIcon.src} alt="" />
                </a>
              </div>
            </div>
            <Button className="bg-white hover:bg-secondary rounded-full absolute bottom-10 right-0 w-16 h-16" onClick={scrollToTop}>
              <img src={scrollToTopIcon.src} alt="" />
            </Button>
          </div>
        </div>
        <hr className="w-full opacity-20 mt-6" />
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
          <p className="text-sm">© WorkAlat. 2024. All rights reserved</p>
          <Button className="!capitalize text-fadedwhite bg-black bg-opacity-50 rounded-lg px-4">
            English
            <img alt="" src={arrowRightWhiteIcon.src} className="ml-1" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
