'use client'

import { useEffect, useState } from "react"
import { FaArrowRight, FaSquarePlus } from "react-icons/fa6"
import CertificationModal from "./CertificationsModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { formatDateTime } from "@/utils/helper";

export default function Certifications() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddNewOpen, setIsAddNewOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }
    const addCertification = () => {
        setIsAddNewOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const closeCertification = () => {
        setIsAddNewOpen(false);
    }

    const [currentTime, setCurrentTime] = useState<string>(
        formatDateTime(new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatDateTime(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <div className="flex justify-between items-center py-3 border-b border-black/30">
                    <h3 className="text-md font-bold">Certifications</h3>
                    <h3 className="text-md font-bold">{currentTime}</h3>
                </div>

                <div className="flex flex-col md:flex-row items-stretch gap-2">
                    <div className="w-full md:w-1/2 p-3">
                        <div className="w-full h-full bg-[#F2F2F2] p-4 rounded-md flex flex-col">
                            <div className="flex-grow flex flex-col justify-center items-center px-3 py-12">
                                <img className="w-20 h-20" src="/icons/certification.svg" alt="certificate" />
                                <h3 className="text-center text-black font-bold text-lg py-3">Upload your certificate or license</h3>
                                <p className="text-center text-black pb-3">To get our preferred badge, you can upload your certificate or license</p>
                                <button onClick={openModal} className="bg-secondary mt-3 py-2 px-4 rounded-md flex justify-center gap-2 items-center font-semibold">
                                    Manage <FaArrowRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-3">
                        <div className="w-full h-full bg-[#F2F2F2] p-4 rounded-md flex flex-col">
                            <div className="flex-grow flex flex-col justify-center items-center px-3 py-12">
                                <img className="w-20 h-20" src="/icons/certification.svg" alt="certificate" />
                                <h3 className="text-center text-black font-bold text-lg py-3">Take a Course</h3>
                                <p className="text-center text-black pb-3">Stand out to prospective clients by certifying your skills.</p>
                                <button className="bg-secondary mt-3 py-2 px-4 rounded-md flex justify-center gap-2 items-center font-semibold">
                                    Take a Test Now <FaArrowRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




            {isModalOpen && (
                <CertificationModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <IoCloseCircleOutline className="size-[20px]" />
                                </button>
                                <div className="w-full text-start">
                                    <h4 className="font-semibold text-[20px] capitalize">Certification / Licence</h4>

                                </div>
                                <div className="w-full mt-3 py-2 px-3">
                                    <ul>
                                        <li className="flex border-y border-black/30 py-3 justify-between items-center">
                                            <div>
                                                <h4 className="text-lg font-semibold">CompTIA Security</h4>
                                                <p className="text-sm">September 2024</p>
                                            </div>
                                            <button><MdEditSquare className="size-5 text-secondary" /></button>
                                        </li>
                                        <li className="flex py-3 justify-between items-center border-b">
                                            <div className="px-3">
                                                <p className="text-sm text-[#7A7A7A]">Add another certification / licence</p>
                                            </div>
                                            <button onClick={addCertification} className="py-2 rounded-md px-4 bg-secondary text-back font-semibold flex items-center justify-center">
                                                Add <FaArrowRight className="size-3 text-black" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

            {isAddNewOpen && (
                <CertificationModal
                    isOpen={isAddNewOpen}
                    onRequestClose={closeCertification}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeCertification}>
                                    <IoCloseCircleOutline className="size-[20px]" />
                                </button>
                                <div className="w-full text-start">
                                    <h4 className="font-semibold text-[20px] capitalize">Add Another Certification / Licence</h4>

                                </div>
                                <div className="w-full mt-3 py-2 px-3">
                                    <form className="border-t p-2">
                                        <div className="py-2">
                                            <label className="block pb-2" htmlFor="certificate">Certification / Licence Name</label>
                                            <input type="text" id="certificate" placeholder="Thomas" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                        </div>
                                        <div className="py-2">
                                            <div className="flex flex-col md:flex-row gap-3 items-end">
                                                <div className="w-full md:w-1/2">
                                                    <label className="block pb-2" htmlFor="date">Expiration Date</label>
                                                    <input type="text" id="date" placeholder="Month" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                                </div>
                                                <div className="w-full md:w-1/2">
                                                    <input type="text" placeholder="Year" className="w-full px-3 py-2 rounded-md shadow-md border outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <div className="flex flex-col md:flex-row gap-2 items-center">
                                                <div className="w-full md:w-1/3">
                                                    <div className="flex items-center gap-2">
                                                        <input className="h-5 w-5 shadow" id="check" type="checkbox" />
                                                        <label className="block text-xs" htmlFor="check">Does not expire</label>
                                                   </div>
                                                </div>
                                                <div className="w-full md:w-2/3">
                                                    <label className="flex items-center gap-2 cursor-pointer bg-[#07242B66] justify-center px-2 py-2 rounded-md shadow">
                                                        <FaSquarePlus className="size-4 text-black" /> Upload certificate / licence
                                                        <input className="hidden" type="file" />
                                                   </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t">
                                            <div className="flex justify-center gap-3 pt-7">
                                                <button type="button" className="flex items-center justify-normal px-4 py-2 text-black bg-white border-2 border-secondary rounded-md gap-2" onClick={closeCertification}>Cancel <FaArrowRight className="size-3" /></button>
                                                <button type="submit" className="flex items-center justify-normal px-4 py-2 text-black bg-secondary border-2 border-secondary rounded-md gap-2">Save <FaArrowRight className="size-3" /></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

        </div>
    )
}
