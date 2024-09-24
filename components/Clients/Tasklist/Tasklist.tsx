import { projectsData } from "@/utils/projectClientsData";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import { useState } from "react";
import TaskListModal from "./TaskListModal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


export default function Tasklist({ params }: any) {
    const dynamicData = projectsData?.find((data) => data?.projectId == params?.id);

    // modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="bg-white relative">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            {/* Content */}
            {/* header for dynamic pages */}
            <ProjectsHeader isActive={"tasklist"} data={dynamicData} />
            <div className="relative z-10 container mx-auto max-w-7xl px-6">
                <div className="h-[450px] w-full flex items-center justify-center">
                    <div className="text-center">
                        <img src="/icons/tasksList.svg" className="size-12 mx-auto" alt="whatworks" />
                        <h4 className="font-semibold text-xl py-2">Get more done, faster</h4>
                        <p className="text-lg py-1">Organize your work, set deadlines, prioritize and assign tasks.</p>

                        <button onClick={openModal} className="bg-white text-md font-semibold py-2 px-5 mt-4 border-2 shadow border-black/40 rounded-md">Add Task-list</button>
                    </div>
                </div>
            </div>


            {isModalOpen && (
                <TaskListModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    content={
                        <div className="w-full max-h-[80vh] h-screen sm:max-h-full sm:h-auto overflow-y-auto">
                            <div className="bg-white w-full h-auto sm:w-[520px] p-4 rounded-md overflow-y-auto hiddenScroll mx-auto">
                                <button className="ms-auto block" onClick={closeModal}>
                                    <IoCloseCircleOutline className="size-[20px]" />
                                </button>
                                <div className="w-full text-start">
                                    <h4 className="font-semibold text-[20px] capitalize">Create New Task List</h4>
                                    
                                </div>
                                <div className="w-full border-t border-black mt-3 py-2 px-3">
                                    <form>
                                        <div className="py-2">
                                            <label className="block pb-1 font-semibold" htmlFor="name">
                                                Name <span className="font-normal">(required)</span>
                                            </label>
                                            <textarea required id="name" className="h-[70px] rounded-md shadow-lg ring-1 ring-black/30 outline-none border-none w-full appearance-none py-1 px-2" />
                                        </div>
                                        <div className="py-2">
                                            <label className="block pb-1 font-semibold" htmlFor="desc">
                                                Description
                                            </label>
                                            <textarea id="desc" className="h-[130px] rounded-md shadow-lg ring-1 ring-black/30 outline-none border-none w-full appearance-none py-1 px-2" />
                                        </div>

                                        <div className="flex gap-3 pt-3">
                                            <button type="button" className="px-5 py-2 text-white font-semibold bg-main flex gap-2 items-center justify-center rounded-md" onClick={closeModal}>Cancel <IoMdClose className="size-5 text-white" /></button>
                                            <button type="submit" className="px-5 py-2 text-black font-semibold bg-secondary flex gap-2 items-center justify-center rounded-md">Create</button>
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
