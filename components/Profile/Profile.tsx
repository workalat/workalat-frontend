'use client'

import { AiOutlineMail } from "react-icons/ai"
import { FaStar } from "react-icons/fa6"
import { GiCheckedShield } from "react-icons/gi"
import { HiMiniCheckBadge } from "react-icons/hi2"
import { IoMdChatboxes, IoMdShare } from "react-icons/io"
import { IoPersonOutline } from "react-icons/io5"
import { BsTelephone } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri"

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

    return (
        <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            <div className="w-full bg-secondary h-[80px] sm:h-[100px]"></div>
            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 px-2">
                        <div className="flex w-full">
                            <img className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] object-cover object-top -mt-16 shadow rounded" src="https://img.freepik.com/free-photo/young-businesswoman-wearing-glasses_329181-11694.jpg?size=626&ext=jpg&ga=GA1.1.1819120589.1726704000&semt=ais_hybrid" alt="work alat" />

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
                                        <div className="flex justify-between">
                                            <p className="text-xs capitalize">{userData?.location}</p>
                                            <p className="text-xs capitalize ps-4">joined on {userData?.joined}</p>
                                        </div>
                                    </div>
                                    <button className="ms-5"><IoMdShare className="size-5 text-black" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h4 className="font-semibold pb-3 pt-2">Verifications</h4>
                            <div className="flex gap-5 items-center">
                                <IoPersonOutline className={`size-5 font-bold ${userData?.userIdentity ? "text-green-700" : "text-red"}`} />
                                <BsTelephone className={`size-[17px] font-bold ${userData?.phoneNumber ? "text-green-700" : "text-red"}`} />
                                <AiOutlineMail className={`size-5 font-bold ${userData?.email ? "text-green-700" : "text-red"}`} />
                                <RiWallet3Line className={`size-5 font-bold ${userData?.wallet ? "text-green-700" : "text-red"}`} />
                            </div>

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
