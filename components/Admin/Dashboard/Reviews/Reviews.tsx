'use client'

import { reviewsData } from "@/utils/reviewsData";
import { useEffect, useState } from "react";
import { MdDelete, MdOutlineStarOutline } from "react-icons/md";
import Menus from "../Menus/Menus";

export default function Reviews() {
    // here reviews will be dynamically from the backend. for now i using "import { reviewsData } from "@/utils/reviewsData";" as a demo review data

    // States for user data, filtering
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userType, setUserType] = useState('all'); // Filter by user type
    const [filteredUsers, setFilteredUsers] = useState(reviewsData); // Filtered data

    // Toggle select all users
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map((user: any) => user.id));
        }
        setSelectAll(!selectAll);
    };

    // Toggle individual user selection
    const toggleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    // Filter users based on selected user type
    useEffect(() => {
        let result = reviewsData;

        // Filter by user type
        if (userType !== 'all') {
            result = result.filter((user: any) => user.userType.toLowerCase() === userType);
        }

        setFilteredUsers(result);
    }, [userType]);

    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the reviews dashboard */}
                <h4 className="text-[20px] font-bold">Reviews</h4>

                {/* header */}
                <div className="flex justify-end items-center pt-5">
                    {/* users type selector */}
                    <select
                        name="users"
                        className="bg-transparent text-[15px] py-2 font-semibold rounded-md px-2 ring-[1px] ring-[#7e7e7e85] outline-none border-none cursor-pointer"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option className="bg-[#07242B] text-white" value="all">All</option>
                        <option className="bg-[#07242B] text-white" value="client">Client</option>
                        <option className="bg-[#07242B] text-white" value="professional">Professional</option>
                    </select>
                </div>
                <div className="h-[1px] w-full bg-black mt-5"></div>


                <div className="w-full pt-7">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="py-2 border-b border-black/20">
                                <tr>
                                    <th className="p-4 text-left">
                                        {selectedUsers.length > 0 ? (
                                            <div className="flex items-center">
                                                <span className="text-slate-600 font-semibold mr-2 text-[15px] text-nowrap">{selectedUsers.length} selected</span>
                                                {/* here will be functional for selected data for delete method for backend */}
                                                <MdDelete className="text-slate-500 cursor-pointer" size={15} />
                                            </div>
                                        ) : (
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4"
                                            />
                                        )}
                                    </th>
                                    <th className="p-6 text-left"></th>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Project title</th>
                                    <th className="p-4 text-left">Review description</th>
                                    <th className="p-4 text-left">Review</th>
                                    <th className="p-4 text-left">User</th>
                                    <th className="p-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: any) => (
                                    <tr key={user?.id} className="border-b border-black/20">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user?.id)}
                                                onChange={() => toggleSelectUser(user?.id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-0">
                                            <img src={user?.userPhoto} alt={user?.userDisplayName} className="w-12 h-12 rounded-full mr-2 object-cover" />
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold capitalize">{user?.firstName} {user?.lastName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{user?.projectTitle}</p>
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.description}</td>
                                        <td className="p-4 text-[15px] capitalize w-[110px]">{Array(user?.review || 0)
                                            .fill(0)
                                            .map((_, index) => (
                                                <MdOutlineStarOutline key={index} className="inline-block size-[15px] text-black/50" />
                                            ))}
                                        </td>
                                        <td className="p-4 text-[15px] capitalize">{user?.userType}</td>
                                        <td className="p-4">
                                            {/* this buttons will be connected with backend for some function or operation */}
                                            <div className="flex items-center gap-2">
                                                <button className="text-[17px] text-[#FFBE00] font-semibold">Edit</button>
                                                <button><MdDelete className="text-[#F52933] cursor-pointer" size={17} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
