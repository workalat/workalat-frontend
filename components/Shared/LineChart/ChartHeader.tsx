'use client'
import React, { useState } from 'react';

const ChartHeader: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState('Nov - July');

    return (
        <div className="flex justify-between items-center px-4 rounded-xl mb-6">
            {/* Left Section */}
            <div className="block">
                <h2 className="text-[15px] font-medium text-black/80 pb-[1px]">Users statistics</h2>
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
                        value={selectedRange}
                        onChange={(e) => setSelectedRange(e.target.value)}
                    >
                        <option value="Nov - July">Nov - July</option>
                        <option value="Aug - Dec">Aug - Dec</option>
                        <option value="Jan - June">Jan - June</option>
                    </select>
            </div>

            {/* Right Section */}
            <div className="flex space-x-4">
                {/* Clients */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">CLIENTS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">475273</p>
                </div>

                {/* Professionals */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">PROFESSIONALS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">782396</p>
                </div>
            </div>
        </div>
    );
};


export default ChartHeader;
