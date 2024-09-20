'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";
import { BsClipboard2Data, BsSend, BsTicket } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoCashOutline, IoMenu, IoPersonOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { PiCertificate, PiPause } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

export default function Menus() {
    const pathname = usePathname();

    // menu bar
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full h-fit transition-all duration-300 lg:h-full bg-[#07242B] lg:overflow-y-scroll lg:overflow-x-hidden hiddenScroll">
            <div className="p-3 block lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="py-2 px-4 ms-auto bg-[#FFBE00] rounded-md flex items-center justify-center gap-2">Menu <IoMenu className="size-[20px] text-black" /></button>
            </div>
            <ul className={`flex flex-col transition-all duration-300 gap-2 w-full lg:visible lg:h-full p-2 ${isMenuOpen ? "h-auto visible" : "invisible h-0"}`}>
                <li className={`${pathname == "/admin" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin"><MdOutlineDashboard className="size-[20px]" /> Dashboard</Link>
                </li>
                <li className={`${pathname == "/admin/leads" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/leads"><PiPause className="size-[20px] rotate-90" /> Leads</Link>
                </li>
                <li className={`${pathname == "/admin/user" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/user"><IoPersonOutline className="size-[20px]" /> User</Link>
                </li>
                <li className={`${pathname == "/admin/administrator" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/administrator"><IoPersonOutline className="size-[20px]" /> Administrator</Link>
                </li>
                <li className={`${pathname == "/admin/messages" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/messages"><LuMail className="size-[20px]" /> Messages</Link>
                </li>
                <li className={`${pathname.startsWith("/admin/activities/") || pathname == "/admin/activities" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/activities">
                        {
                            pathname.startsWith("/admin/activities/") || pathname == "/admin/activities" ?
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.625 14.375H15.6119C15.4784 14.3719 15.3493 14.3262 15.2436 14.2446C15.138 14.1629 15.0611 14.0496 15.0244 13.9213L13.0438 6.99375L11.8344 10.2188C11.7899 10.3379 11.7101 10.4406 11.6057 10.5132C11.5012 10.5858 11.3772 10.6248 11.25 10.625H8.75V9.375H10.8169L12.54 4.78063C12.5861 4.65744 12.67 4.55195 12.7795 4.47918C12.8891 4.40641 13.0189 4.37007 13.1503 4.37533C13.2817 4.38059 13.4082 4.42719 13.5116 4.50849C13.615 4.58979 13.6901 4.70164 13.7262 4.82812L15.6706 11.6356L16.9075 7.9275C16.9489 7.80305 17.0283 7.69477 17.1347 7.61804C17.241 7.5413 17.3689 7.50001 17.5 7.5H20V8.75H17.95L16.2175 13.9475C16.1762 14.072 16.0968 14.1803 15.9904 14.2571C15.884 14.3338 15.7562 14.3751 15.625 14.375ZM9.375 18.75H8.125V14.375C8.1245 13.8779 7.9268 13.4012 7.57528 13.0497C7.22375 12.6982 6.74713 12.5005 6.25 12.5H3.75C3.25287 12.5005 2.77625 12.6982 2.42472 13.0497C2.0732 13.4012 1.8755 13.8779 1.875 14.375V18.75H0.625V14.375C0.625992 13.5465 0.955551 12.7522 1.54139 12.1664C2.12722 11.5806 2.9215 11.251 3.75 11.25H6.25C7.0785 11.251 7.87278 11.5806 8.45861 12.1664C9.04445 12.7522 9.37401 13.5465 9.375 14.375V18.75ZM5 5C5.37084 5 5.73335 5.10997 6.04169 5.31599C6.35004 5.52202 6.59036 5.81486 6.73227 6.15747C6.87419 6.50008 6.91132 6.87708 6.83897 7.24079C6.76663 7.60451 6.58805 7.9386 6.32583 8.20083C6.0636 8.46305 5.72951 8.64163 5.36579 8.71397C5.00208 8.78632 4.62508 8.74919 4.28247 8.60727C3.93986 8.46536 3.64702 8.22504 3.44099 7.91669C3.23497 7.60835 3.125 7.24584 3.125 6.875C3.125 6.37772 3.32254 5.90081 3.67417 5.54917C4.02581 5.19754 4.50272 5 5 5ZM5 3.75C4.38193 3.75 3.77775 3.93328 3.26384 4.27666C2.74994 4.62004 2.3494 5.1081 2.11288 5.67911C1.87635 6.25013 1.81447 6.87847 1.93505 7.48466C2.05562 8.09085 2.35325 8.64767 2.79029 9.08471C3.22733 9.52175 3.78415 9.81938 4.39034 9.93995C4.99653 10.0605 5.62487 9.99865 6.19589 9.76212C6.7669 9.5256 7.25496 9.12506 7.59834 8.61116C7.94172 8.09725 8.125 7.49307 8.125 6.875C8.125 6.0462 7.79576 5.25134 7.20971 4.66529C6.62366 4.07924 5.8288 3.75 5 3.75Z" fill="#000" />
                                </svg> :
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.625 14.375H15.6119C15.4784 14.3719 15.3493 14.3262 15.2436 14.2446C15.138 14.1629 15.0611 14.0496 15.0244 13.9213L13.0438 6.99375L11.8344 10.2188C11.7899 10.3379 11.7101 10.4406 11.6057 10.5132C11.5012 10.5858 11.3772 10.6248 11.25 10.625H8.75V9.375H10.8169L12.54 4.78063C12.5861 4.65744 12.67 4.55195 12.7795 4.47918C12.8891 4.40641 13.0189 4.37007 13.1503 4.37533C13.2817 4.38059 13.4082 4.42719 13.5116 4.50849C13.615 4.58979 13.6901 4.70164 13.7262 4.82812L15.6706 11.6356L16.9075 7.9275C16.9489 7.80305 17.0283 7.69477 17.1347 7.61804C17.241 7.5413 17.3689 7.50001 17.5 7.5H20V8.75H17.95L16.2175 13.9475C16.1762 14.072 16.0968 14.1803 15.9904 14.2571C15.884 14.3338 15.7562 14.3751 15.625 14.375ZM9.375 18.75H8.125V14.375C8.1245 13.8779 7.9268 13.4012 7.57528 13.0497C7.22375 12.6982 6.74713 12.5005 6.25 12.5H3.75C3.25287 12.5005 2.77625 12.6982 2.42472 13.0497C2.0732 13.4012 1.8755 13.8779 1.875 14.375V18.75H0.625V14.375C0.625992 13.5465 0.955551 12.7522 1.54139 12.1664C2.12722 11.5806 2.9215 11.251 3.75 11.25H6.25C7.0785 11.251 7.87278 11.5806 8.45861 12.1664C9.04445 12.7522 9.37401 13.5465 9.375 14.375V18.75ZM5 5C5.37084 5 5.73335 5.10997 6.04169 5.31599C6.35004 5.52202 6.59036 5.81486 6.73227 6.15747C6.87419 6.50008 6.91132 6.87708 6.83897 7.24079C6.76663 7.60451 6.58805 7.9386 6.32583 8.20083C6.0636 8.46305 5.72951 8.64163 5.36579 8.71397C5.00208 8.78632 4.62508 8.74919 4.28247 8.60727C3.93986 8.46536 3.64702 8.22504 3.44099 7.91669C3.23497 7.60835 3.125 7.24584 3.125 6.875C3.125 6.37772 3.32254 5.90081 3.67417 5.54917C4.02581 5.19754 4.50272 5 5 5ZM5 3.75C4.38193 3.75 3.77775 3.93328 3.26384 4.27666C2.74994 4.62004 2.3494 5.1081 2.11288 5.67911C1.87635 6.25013 1.81447 6.87847 1.93505 7.48466C2.05562 8.09085 2.35325 8.64767 2.79029 9.08471C3.22733 9.52175 3.78415 9.81938 4.39034 9.93995C4.99653 10.0605 5.62487 9.99865 6.19589 9.76212C6.7669 9.5256 7.25496 9.12506 7.59834 8.61116C7.94172 8.09725 8.125 7.49307 8.125 6.875C8.125 6.0462 7.79576 5.25134 7.20971 4.66529C6.62366 4.07924 5.8288 3.75 5 3.75Z" fill="#fff" />
                                </svg>
                        }
                        Activities</Link>
                </li>
                <li className={`${pathname == "/admin/manage" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/manage"><SlCalender className="size-[20px]" /> Manage</Link>
                </li>
                <li className={`${pathname == "/admin/responses" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/responses"><BsSend className="size-[20px]" /> Responses</Link>
                </li>
                <li className={`${pathname == "/admin/wallet" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/wallet"><HiOutlineBanknotes className="size-[20px]" /> Credit/Wallet</Link>
                </li>
                <li className={`${pathname.startsWith("/admin/support-tickets/") || pathname == "/admin/support-tickets" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/support-tickets"><BsTicket className="size-[20px]" /> Support Tickets</Link>
                </li>
                <li className={`${pathname == "/admin/reviews" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/reviews"><BsClipboard2Data className="size-[20px]" /> Reviews</Link>
                </li>
                <li className={`${pathname == "/admin/kyc" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/kyc"><IoCashOutline className="size-[20px]" /> KYC</Link>
                </li>
                <li className={`${pathname == "/admin/certificate" ? "bg-white text-black font-bold" : "text-white"} p-2 rounded-lg text-[14px] leading-[17.86px] tracking-[1%]`}>
                    <Link className="flex gap-[26px]" href="/admin/certificate"><PiCertificate className="size-[20px]" /> Certificate</Link>
                </li>
            </ul>
        </div>
    )
}
