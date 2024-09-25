'use client'

import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";

export default function Manage() {
    // demo lists
    const membershipHistory = [
        {
            id: 1,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        },
        {
            id: 2,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        },
        {
            id: 3,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        },
        {
            id: 4,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        },
        {
            id: 5,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        },
        {
            id: 6,
            date: "9/9/2024",
            invoice: "",
            transitionId: "0123DSY4",
            total: {
                price: "£ 34.99",
                vat: "£ 34.99 (+£6.998)"
            }
        }
    ]
    return (
        <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
                    <Link
                        href="/client/dashboard"
                        className="flex gap-2 absolute left-0 font-bold"
                    >
                        <Image
                            src={arrowRightSm}
                            alt="Back to dashboard"
                            className="rotate-180"
                        />
                        <span>
                            Back <span className="hidden md:inline-flex">to dashboard</span>
                        </span>
                    </Link>
                    <Typography gutterBottom className="text-3xl font-bold text-center">
                        Manage Membership
                    </Typography>
                </Box>

                <div className="w-full border border-black/30 rounded-md px-0 py-4 mt-12">
                    <div className="py-2 border-b border-black/30 mx-4">
                        <h1 className="text-2xl font-bold">Alat Pro</h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch">
                        <div className="w-full md:w-1/3 border-e border-black/30 py-2">
                            <div className="rounded-r-full py-1 px-3 text-white font-semibold w-11/12 md:w-4/5 bg-gradient-to-r from-[#07242B] to-[#187991]">
                                <p>Member since September 2024</p>
                            </div>

                            <div className="py-4 border-b border-black/30 ps-2">
                                <div className="flex">
                                    <div className="w-4 mt-1">
                                        <GoDotFill className="size-4 text-secondary" />
                                    </div>
                                    <div className="px-1 w-auto">
                                        <h4 className="text-lg font-semibold">Standard Plan</h4>
                                        <p className="text-md text-[#909090]">Next payment 9 October 2024</p>
                                    </div>
                                </div>

                                <div className="flex px-4 gap-3 items-center pt-4">
                                    <img className="w-12" src="/images/mastercard.png" alt="work alat" />
                                    <p>****   ****   ****   125</p>
                                </div>
                            </div>

                            <div className="px-4 py-5">
                                <button className="text-white bg-red px-4 py-2 rounded-md font-semibold gap-2 flex items-center justify-center">
                                    Cancel Membership <FaArrowRight className="size-4 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 py-2">
                            <div className="rounded-l-full ms-auto py-1 px-4 text-white font-semibold w-fit bg-gradient-to-l from-[#07242B] to-[#187991]">
                                <p>Payment History</p>
                            </div>

                            <div className="w-full pt-5">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-end">Date</th>
                                                <th className="px-4 py-2 text-end">Invoice</th>
                                                <th className="px-4 py-2 text-end">Transaction ID</th>
                                                <th className="px-4 py-2 text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                membershipHistory?.map((data: any, i: number) => (
                                                    <tr key={i}>
                                                        <td className="px-4 text-end">{data?.date}</td>
                                                        <td className="px-4 text-end flex text-secondary items-center gap-2 justify-end">
                                                            <IoMdEye className="size-4 text-secondary" />
                                                            View
                                                        </td>
                                                        <td className="px-4 text-end">{data?.transitionId}</td>
                                                        <td className="px-4 text-end">
                                                            <p className="font-semibold">{data?.total?.price}</p>
                                                            <p className="text-xs">{data?.total?.vat} VAT</p>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
