"use client"

import { BsThreeDotsVertical } from "react-icons/bs"
import "./Message.css"

type PropsType = {
    data: any
}
export default function MessageBox({ data }: PropsType) {
    return (
        <div className="w-full h-full relative">
            {/* Header */}
            <div className="w-full flex justify-between bg-[#EDEDED] p-3 rounded-md">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 object-cover object-top rounded-full border shadow"
                        src={data?.photoURL}
                        alt=""
                    />
                    <div className="px-2">
                        <p className="text-[17px] text-[#989BA1] font-semibold tracking-wide capitalize">
                            {data?.projectTitle}
                        </p>
                        <p className="text-[13px] text-[#989BA1] font-semibold tracking-wide">
                            {data?.displayName}
                        </p>
                    </div>
                </div>
                <button>
                    <BsThreeDotsVertical className="size-[20px] text-[#989BA1]" />
                </button>
            </div>

            {/* Chat box with messages */}
            <div className="w-full h-[540px] justify-between bg-[#EDEDED] p-3 mt-3 rounded-md overflow-hidden relative">
                <div className="w-full h-full overflow-x-hidden overflow-y-scroll custom-scroll-of-message pb-12">
                    <div className="flex items-center gap-2 w-full justify-center">
                        <div className="w-[45%] h-[1px] bg-[#989BA1]"></div>
                        <p className="text-[13px] text-[#989BA1]">August 09</p>
                        <div className="w-[45%] h-[1px] bg-[#989BA1]"></div>
                    </div>

                    <div className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:flex-row md:w-[350px] flex items-start gap-5 py-2 max-md:mx-auto">
                        <img
                            className="w-10 h-10 rounded-full border shadow object-cover object-top flex-shrink-0"
                            src={data?.photoURL}
                            alt="work alat"
                        />
                        <div>
                            <div className="flex-grow flex flex-col bg-white ring-[2px] shadow ring-[#1D75DD]/50 rounded-md p-2 h-full overflow-hidden">
                                <p className="text-[15px] px-5">{data?.message}</p>
                            </div>
                            <p className="text-[#989BA1] text-[12px] pt-1">12:25 pm</p>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>
        </div>
    );
}