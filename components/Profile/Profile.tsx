'use client'

import { FaFacebookF, FaLink, FaStar, FaTwitter, FaWhatsapp } from "react-icons/fa6"
import { GiCheckedShield } from "react-icons/gi"
import { HiMiniCheckBadge } from "react-icons/hi2"
import { IoMdChatboxes, IoMdShare } from "react-icons/io"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Tooltip } from "@mui/material"
import { ReactNode, useState } from "react"

export default function Profile() {

    // user profile data
    const userData = {
        name: "Anita Backer",
        rate: 5,
        level: 2,
        location: "united kingdom",
        title: "Professional Dry Cleaner in Kent",
        joined: "September 6, 2024",
        userIdentity: true,
        phoneNumber: true,
        email: true,
        wallet: true,
        desc: [
            "My main goal is to provide you with 100% service and extra 50% one.",
            `I have extensive experience designing and developing using HTML5, CSS3, SASS, Javascript, JQuery, Angular, Flutter Dart, Kotlin, Node, Swift, Git, Grunt, Bootstrap, Canvas, WordPress, Web fonts, FlowPlayer, GSAP, Unity 3D Game Engine, C#, Augmented Reality, Kinect, Final Cut, Adobe After Effects, Maya, 3D printing, Rhino 3D, Adobe Illustrator and Adobe Photoshop. My main goal is to provide you with 100% service and extra 50% one.`,
            "I have extensive experience designing and developing using HTML5, CSS3, SASS, Javascript, JQuery, Angular, Flutter Dart, Kotlin, Node, Swift, Git, Grunt, Bootstrap, Canvas, WordPress, Web fonts, FlowPlayer, GSAP, Unity 3D Game Engine, C#, Augmented Reality, Kinect, Final Cut, Adobe After Effects, Maya, 3D printing, Rhino 3D, Adobe Illustrator and Adobe Photoshop."
        ],
        expertise: [
            "Website Design",
            "Website Design",
            "Website Design",
            "Website Design"
        ],
        reviews: [
            {
                id: 1,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            },
            {
                id: 2,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            },
            {
                id: 3,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            },
            {
                id: 4,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            },
            {
                id: 5,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            },
            {
                id: 6,
                rate: 5,
                profile: "P",
                name: "Amanda Fredrick",
                date: "3 days ago",
                title: "Dry Cleaner (New Ken Fort)",
                location: "united kingdom",
                comment: `Hello! I'm [Your Name], a passionate web developer with [X] years of experience creating modern and responsive websites. My journey into web development started [mention how you got started, e.g., "during my college days when I discovered my love for coding and design"]. Since then, I've been dedicated to crafting user-friendly, aesthetically pleasing websites that provide seamless navigation.`
            }
        ]
    }

    const VerifiedCell = ({
        isVerified,
        Icon,
        name,
    }: {
        isVerified: boolean | undefined;
        Icon: ReactNode;
        name: "email" | "payment" | "identity" | "phone";
    }) => {
        return (
            <Tooltip
                arrow
                title={
                    <span className="!font-mono capitalize flex items-center gap-2 !text-sm">
                        {Icon}
                        {name} {isVerified ? "Verified" : "Unverified"}
                        <DoneIcon className="text-green-600 w-4 h-4 -mt-0.5" />
                    </span>
                }
                classes={{
                    tooltip: "bg-[rgb(237,237,237)] text-main",
                    arrow: "text-[rgb(237,237,237)]",
                }}
            >
                <Box className={`flex justify-center items-center gap-1 cursor-pointer`}>
                    {Icon}
                </Box>
            </Tooltip>
        );
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        setIsOpen(false); // Close the dropdown after copying
    };
    return (
        <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            <div className="w-full bg-secondary h-[80px] sm:h-[100px]"></div>
            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto lg:px-12 2xl:px-36">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 px-2">
                        <div className="flex flex-col md:flex-row gap-5 md:gap-0 w-full">
                            <img className="w-[80px] mx-auto md:mx-0 h-[80px] sm:w-[100px] sm:h-[100px] object-cover object-top -mt-12 shadow rounded" src="https://img.freepik.com/free-photo/young-businesswoman-wearing-glasses_329181-11694.jpg?size=626&ext=jpg&ga=GA1.1.1819120589.1726704000&semt=ais_hybrid" alt="work alat" />

                            <div className="px-3 -mt-4 sm:flex-grow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h4 className="text-sm sm:text-lg font-semibold flex gap-2 items-center">{userData?.name}
                                            <span className="text-sm font-thin lowercase flex gap-1 items-center">
                                                <HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />
                                                <GiCheckedShield className="size-[12px] text-[#F76C10]" />
                                            </span>
                                        </h4>
                                        <div className="flex gap-2">
                                            <div className="flex gap-1 items-center">
                                                {
                                                    [...Array(userData?.rate)].map((_, i) => (
                                                        <FaStar className="size-3 text-secondary" key={i} />
                                                    ))
                                                }
                                                <p className="text-xs">{Number(userData?.rate).toFixed(1)}</p>
                                            </div>
                                            <div className="sm:flex gap-1 items-center hidden">
                                                <IoMdChatboxes className="size-4 text-[#EA740E]" />
                                                <p className="text-xs">553</p>
                                            </div>
                                            <div className="flex gap-2 flex-col sm:flex-row items-center">
                                                <p className="text-xs">Level {userData?.level}</p>
                                                <div className="flex space-x-2">
                                                    {[...Array(5)].map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={`w-[5px] h-[5px] sm:w-[8px] sm:h-[8px] rounded-sm border border-black rotate-45 overflow-hidden ${index < userData?.level ? 'bg-black' : 'bg-transparent'} transition-colors duration-300 ease-in-out`}
                                                        >
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-sm sm:text-md py-1">{userData?.title}</h4>
                                        <div className="flex justify-start">
                                            <p className="text-xs capitalize flex gap-1 items-center">

                                                <img className="size-[13px]" src="/flag.png" alt="workalat" />

                                                {userData?.location}</p>
                                            <p className="text-xs capitalize ps-4">joined on {userData?.joined}</p>
                                        </div>
                                    </div>

                                    {/* share button */}
                                    <div className="relative">
                                        <button onClick={toggleDropdown} className="flex items-center justify-center w-10 h-10">
                                            <IoMdShare className="text-2xl text-black" />
                                        </button>
                                        {isOpen && (
                                            <div className="absolute mt-2 w-[250px] bg-white shadow-lg rounded-lg py-2 z-10">
                                                <button
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                    onClick={handleCopyLink}
                                                >
                                                    <FaLink className="text-blue-500" />
                                                    Copy Link
                                                </button>
                                                <a
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaFacebookF className="text-blue-600" />
                                                    Share to Facebook
                                                </a>
                                                <a
                                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaTwitter className="text-blue-400" />
                                                    Share to Twitter
                                                </a>
                                                <a
                                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaWhatsapp className="text-green-500" />
                                                    Share to WhatsApp
                                                </a>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h4 className="font-semibold pb-3 pt-2">Verifications</h4>
                            <Box className="flex gap-4">
                                {userData?.userIdentity && (
                                    <VerifiedCell
                                        isVerified={userData?.userIdentity}
                                        Icon={
                                            <PersonOutlineOutlinedIcon className="text-[rgba(4,132,47,1)]" />
                                        }
                                        name="identity"
                                    />
                                )}
                                {userData?.phoneNumber && (
                                    <VerifiedCell
                                        isVerified={userData?.phoneNumber}
                                        Icon={
                                            <LocalPhoneOutlinedIcon className="text-[rgba(4,132,47,1)]" />
                                        }
                                        name="phone"
                                    />
                                )}
                                {userData?.email && (
                                    <VerifiedCell
                                        isVerified={userData?.email}
                                        Icon={<EmailOutlinedIcon className="text-[rgba(4,132,47,1)]" />}
                                        name="email"
                                    />
                                )}
                                {userData?.wallet && (
                                    <VerifiedCell
                                        isVerified={userData?.wallet}
                                        Icon={
                                            <CreditCardOutlinedIcon className="text-[rgba(4,132,47,1)]" />
                                        }
                                        name="payment"
                                    />
                                )}
                            </Box>

                            <div className="py-2">
                                {
                                    userData?.desc?.map((para, i) => (
                                        <p className="py-2 text-md text-justify" key={i}>{para}</p>
                                    ))
                                }
                            </div>

                            <div className="py-2">
                                <h2 className="text-lg font-semibold pb-3">Expertise</h2>

                                <ul className="list-disc ps-5">
                                    {
                                        userData?.expertise?.map((list, i) => (
                                            <li className="py-1" key={i}>{list}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-2">
                        <h5 className="text-end font-semibold pb-2 -mt-4">Reviews {userData?.reviews?.length}</h5>
                        <div className="w-full overflow-y-scroll hiddenScroll h-[800px]">
                            {
                                userData?.reviews?.map((review, i) => (
                                    <div key={i} className="w-full py-2 px-4">
                                        <div className="flex justify-between items-center flex-col gap-2 md:flex-row md:gap-0">
                                            <div className="flex">
                                                <div className="w-16 h-12 flex items-center justify-center bg-secondary">
                                                    <p className="text-xl font-bold">{review?.profile}</p>
                                                </div>
                                                <div className="px-3">
                                                    <div className="flex gap-2 items-center">
                                                        {
                                                            [...Array(review?.rate)].map((_, i) => (
                                                                <FaStar className="size-4 text-secondary" key={i} />
                                                            ))
                                                        }
                                                        <p className="text-md">{Number(review?.rate).toFixed(1)}</p>
                                                    </div>
                                                    <p className="font-bold">{review?.title}</p>
                                                    <p className="capitalize">{review?.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pb-2">
                                                <p className="font-bold text-sm">{review?.name}</p>
                                                <p className="text-sm">{review?.date}</p>
                                            </div>
                                        </div>

                                        <p>{review?.comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
