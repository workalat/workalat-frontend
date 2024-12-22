// 'use client'
// import React, { useState } from 'react';

// const ChartHeader = ({totalClients, totalProfessionals} : any) => {
//     const [selectedRange, setSelectedRange] = useState('Nov - July');

//     return (
//         <div className="flex justify-between items-center px-4 rounded-xl mb-6">
//             {/* Left Section */}
//             <div className="block">
//                 <h2 className="text-[15px] font-medium text-black/80 pb-[1px]">Users statistics</h2>
//                     <select
//                         className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
//                         value={selectedRange}
//                         onChange={(e) => setSelectedRange(e.target.value)}
//                     >
//                         <option value="Nov - July">Nov - July</option>
//                         <option value="Aug - Dec">Aug - Dec</option>
//                         <option value="Jan - June">Jan - June</option>
//                     </select>
//             </div>

//             {/* Right Section */}
//             <div className="flex space-x-4">
//                 {/* Clients */}
//                 <div className="w-auto">
//                     <div className="flex items-center gap-2">
//                         <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
//                         <span className="text-[10px] text-gray-400 font-semibold">CLIENTS</span>
//                     </div>
//                     <p className="text-[17px] font-semibold text-gray-800 text-end">{totalClients}</p>
//                 </div>

//                 {/* Professionals */} 
//                 <div className="w-auto">
//                     <div className="flex items-center gap-2">
//                         <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
//                         <span className="text-[10px] text-gray-400 font-semibold">PROFESSIONALS</span>
//                     </div>
//                     <p className="text-[17px] font-semibold text-gray-800 text-end">{totalProfessionals}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default ChartHeader;

'use client';
import React from 'react';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useUserContext } from '@/context/user_context';

interface ChartHeaderProps {
    onRangeChange: (range: string) => void;
    onYearChange: (year: string) => void;
    onWeekChange: (week: string) => void;
    totalClient : any;
    totalProfessional : any;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ onRangeChange, onYearChange, onWeekChange, totalClient, totalProfessional } : any) => {
    const ranges = ['jan - march', 'april - june', 'july - sept', 'oct - dec'];
    const years = [ '2024', '2023','2022'];
    const weeks = [
        'week 1', 'week 2', 'week 3', 'week 4',
        'week 5', 'week 6', 'week 7', 'week 8',
        'week 9', 'week 10', 'week 11', 'week 12',
    ];
    const { componentRef }  : any  = useUserContext();


    const captureAndGeneratePDF = async () => {
    if (componentRef.current) {
        try {
            const dataUrl = await toPng(componentRef.current, {
                backgroundColor: 'white', // Ensures background is clear
                cacheBust: true, // Clears dynamic content issues
                pixelRatio: 2, // Improves clarity
                style: {
                    transform: 'scale(1)', // Prevent scaling issues
                    transformOrigin: 'top left', // Ensures correct positioning
                },
            });

            // Resize and save to PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('component-snapshot.pdf');
        } catch (error) {
            // console.error('Error capturing snapshot:', error);
        }
    };
}


    return (
        <div className="flex justify-between items-start px-4 rounded-xl mb-6">
            {/* Left Section */}
            <div className="flex items-end">
                <div className="block">
                    <h2 className="text-[15px] font-medium text-black/80 pb-[1px]">Users statistics</h2>
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent capitalize text-gray-400"
                        onChange={(e) => onRangeChange(e.target.value)}
                    >
                        {ranges.map((range) => (
                            <option className='capitalize' key={range} value={range}>
                                {range}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="block ml-4">
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
                        onChange={(e) => onYearChange(e.target.value)}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="block ml-4">
                    <select
                        className="text-[13px] border-none rounded-md focus:outline-none bg-transparent text-gray-400"
                        onChange={(e) => onWeekChange(e.target.value)}
                    >
                        {weeks.map((week) => (
                            <option key={week} value={week}>
                                {week}
                            </option>
                        ))}
                    </select>
                </div> */}
            </div>

            {/* Right Section */}
            <div className="flex space-x-4">
                {/* Clients */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">CLIENTS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">{totalClient}</p>
                </div>

                {/* Professionals */}
                <div className="w-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="text-[10px] text-gray-400 font-semibold">PROFESSIONALS</span>
                    </div>
                    <p className="text-[17px] font-semibold text-gray-800 text-end">{totalProfessional}</p>

                    <button className='bg-yellow-400 px-3 py-1.5 rounded-md font-semibold mt-4 text-sm' onClick={captureAndGeneratePDF}>Download</button>
                </div>
            </div>
        </div>
    );
};

export default ChartHeader;