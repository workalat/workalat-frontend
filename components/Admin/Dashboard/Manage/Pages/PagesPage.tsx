"use client";

import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import PagesEditModal from "./PagesEditModal/PagesEditModal";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { PiUploadFill } from "react-icons/pi";

export default function PagesPage({ data }: any) {
    // modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [modalItem, setModalItem] = useState<any>();

    const openModal = (id: any) => {
        setModalItem(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal2 = () => {
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };

    const openModal3 = () => {
        setIsModalOpen3(true);
    };

    const closeModal3 = () => {
        setIsModalOpen3(false);
    };

    // Find the selected item from data.pageItems using modalItem (which stores the id)
    const selectedItem = data?.pageItems?.find((item: any) => item.id === modalItem);

    return (
        <div className="w-full py-2">
            {/* page heading */}
            <div className="flex justify-between items-center border-b border-black/40 px-3 pb-3">
                <h1 className="sm:text-[17px] text-[15px] font-semibold text-black uppercase">{data?.pageName}</h1>
                <button onClick={openModal3} className="sm:text-[17px] text-[12px] text-white bg-[#07242B] px-[20px] py-[10px] rounded-md flex gap-2 items-center">
                    Add New <IoArrowForwardOutline className="size-[17px] text-white" />
                </button>
            </div>

            {/* page items */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4"></th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.pageItems?.map((item: any, i: number) => (
                            <tr className="border-b border-black/10" key={i}>
                                <td className="p-4 uppercase text-black sm:text-[17px] text-[15px] font-semibold">
                                    <p
                                        className="cursor-pointer hover:bg-[#E6E6E6] w-fit px-2 rounded-md"
                                        onClick={() => openModal(item?.id)}
                                    >
                                        {item?.itemName}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end">
                                        <button
                                            onClick={() => openModal(item?.id)}
                                            className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button>
                                            <MdDelete className="size-[20px] text-[#F52933]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                    
            {/* for edit or delete items */}
            {isModalOpen && (
                <PagesEditModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] md:w-[650px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    {selectedItem && (
                                        <div className="pt-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold uppercase text-[17px]">{selectedItem?.itemName}</h4>
                                                <button onClick={openModal2} className="sm:text-[15px] text-[10px] text-white bg-[#07242B] px-[15px] py-[8px] rounded-md flex gap-2 items-center">
                                                    Add New <IoArrowForwardOutline className="size-[15px] text-white" />
                                                </button>
                                            </div>
                                            <div className="w-full h-full overflow-x-hidden overflow-y-scroll hiddenScroll">
                                                {
                                                    selectedItem?.itemData?.map((itmDt: any, i: number) => (
                                                        <div className="flex justify-between px-3 py-4 border border-black/30 my-4 shadow-lg rounded-md" key={i}>
                                                            <p>{itmDt?.title}</p>
                                                            <button
                                                                className="px-2 text-[#FFBE00] sm:text-[17px] text-[12px] font-semibold"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

            {/* for add new items */}
            {isModalOpen2 && (
                <PagesEditModal
                    isOpen={isModalOpen2}
                    onRequestClose={closeModal2}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal2}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    {selectedItem && (
                                        <div className="pt-4">
                                            <div className="text-center">
                                                <h4 className="font-semibold uppercase text-[17px]">Add New {selectedItem?.itemName}</h4>
                                            </div>

                                            <div className="w-full h-full">
                                                <form className="w-full">
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="title" className="block pb-2 font-semibold">Title</label>
                                                        <input type="text" id="title" name="title" className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md" placeholder="Enter Title" />
                                                    </div>
                                                    <div className="py-2 text-start">
                                                        <label htmlFor="desc" className="block pb-2 font-semibold">Content</label>
                                                        <textarea id="desc" name="description" className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none h-[100px] shadow-md" placeholder="Enter Content Here" />
                                                    </div>
                                                    {
                                                        selectedItem?.itemData?.some((data: any) => data.img) && (
                                                            <div className="py-2 text-start">
                                                                <label htmlFor="img" className="block pb-2 font-semibold">Featured Image</label>

                                                                <label htmlFor="img" className="flex items-center gap-3 text-black/20 w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md">
                                                                    <PiUploadFill className="size-[20px] text-black" />
                                                                    <input
                                                                        type="file"
                                                                        id="img"
                                                                        name="title"
                                                                        className="hidden"
                                                                        placeholder="Enter Title"
                                                                    />
                                                                    Click here to upload image
                                                                </label>
                                                            </div>
                                                        )
                                                    }


                                                    <div className="py-2 text-start">
                                                        <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">Save <FaArrowRight className="size-[15px] text-black" /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                />
            )}

            {/* for add new page */}
            {isModalOpen3 && (
                <PagesEditModal
                    isOpen={isModalOpen3}
                    onRequestClose={closeModal3}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[420px] py-3 px-3 md:px-7 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal3}>
                                    <AiFillCloseSquare className="size-[20px]" />
                                </button>
                                <div className="w-full text-center">
                                    <div className="pt-4">
                                        <div className="text-center">
                                            <h4 className="font-semibold uppercase text-[17px]">Add New Page</h4>
                                        </div>

                                        <div className="w-full h-full">
                                            <form className="w-full">
                                                <div className="py-2 text-start">
                                                    <label htmlFor="name" className="block pb-2 font-semibold">Name</label>
                                                    <input type="text" id="name" name="name" className="w-full ring-[1px] ring-gray-400 rounded-md px-3 py-3 outline-none border-none shadow-md" placeholder="Enter page name" />
                                                </div>


                                                <div className="py-2 text-start">
                                                    <button className="py-3 px-5 rounded-md text-[15px] font-semibold flex justify-center mx-auto items-center gap-2 bg-[#FFBE00]">Save <FaArrowRight className="size-[15px] text-black" /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            )}
        </div>
    );
}
