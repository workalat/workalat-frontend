'use client';
import { useUserContext } from '@/context/user_context';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircleChartProps {
    openLeads: number;
    awardedLeads: number;
    rejectedLeads: number;
    title: string;
    handleRangeChange2: any;
    rangeType: any;
    handleRangeTypeChange: any;
    range: any;
    ranges: any;
}

const CircleChart: React.FC<CircleChartProps> = ({ openLeads, awardedLeads, rejectedLeads, title, handleRangeChange2, rangeType, range, ranges, handleRangeTypeChange }) => {
    const totalLeads = openLeads + awardedLeads + rejectedLeads;
    const openPercentage =  openLeads> 0 ? (openLeads / totalLeads) * 100 : 0;
    const awardedPercentage = awardedLeads > 0 ? (awardedLeads / totalLeads) * 100 : 0;
    const rejectedPercentage = rejectedLeads > 0 ? (rejectedLeads / totalLeads) * 100 : 0;


    const {circleRef} : any  = useUserContext();
    
        const captureAndGeneratePDF = async () => {
        if (circleRef.current) {
            try {
                const dataUrl = await toPng(circleRef.current, {
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-[#192A3E] text-[13px] font-semibold">{title}</h3>
                <div className="mb-4 flex gap-4">
                    {/* Range Type Selector */}
                    <div>
                        <label className="block text-gray-700 font-medium text-xs">Range Type:</label>
                        <select
                            value={rangeType}
                            onChange={handleRangeTypeChange}
                            className="border-none outline-none text-xs"
                        >
                            <option value="Yearly">Yearly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>

                    {/* Range Selector */}
                    <div>
                        <label className="block text-gray-700 font-medium text-xs">Select Range:</label>
                        <select
                            value={range}
                            onChange={handleRangeChange2}
                            className="border-none outline-none text-xs"
                        >
                            {ranges[rangeType].map((rangeOption) => (
                                <option key={rangeOption} value={rangeOption}>
                                    {rangeOption}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="relative w-[200px] h-[200px] mx-auto mb-6">
                <div className="absolute inset-0">
                    <CircularProgressbar
                        value={rejectedPercentage + awardedPercentage + openPercentage}
                        strokeWidth={4}
                        styles={buildStyles({
                            pathColor: '#FE321F',
                            trailColor: 'transparent',
                        })}
                    />
                </div>
                <div className="absolute inset-0">
                    <CircularProgressbar
                        value={awardedPercentage + openPercentage}
                        strokeWidth={4}
                        styles={buildStyles({
                            pathColor: '#07242B',
                            trailColor: 'transparent',
                        })}
                    />
                </div>
                <div className="absolute inset-0">
                    <CircularProgressbar
                        value={openPercentage}
                        strokeWidth={4}
                        styles={buildStyles({
                            pathColor: '#FFB946',
                            trailColor: 'transparent',
                        })}
                    />
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <span className="text-[45px] font-semibold text-[#FFB946]">{`${Math.round(openPercentage)}%`}</span>
                </div>
            </div>
            <div className="text-center pt-5 flex justify-between items-end">
                <ul className="space-y-2">
                    <li className="flex items-center justify-start">
                        <span className="h-3 w-3 border-4 border-[#FFB946] rounded-full inline-block mr-2"></span>
                        <span className="text-[15px] text-black">Open Leads</span>
                    </li>
                    <li className="flex items-center justify-start">
                        <span className="h-3 w-3 border-4 border-[#07242B] rounded-full inline-block mr-2"></span>
                        <span className="text-[15px] text-black">Awarded Leads</span>
                    </li>
                    <li className="flex items-center justify-start">
                        <span className="h-3 w-3 border-4 border-[#FE321F] rounded-full inline-block mr-2"></span>
                        <span className="text-[15px] text-black">Rejected Leads</span>
                    </li>
                </ul>
                <button className='bg-yellow-400 px-3 py-1.5 rounded-md font-semibold mt-4 text-sm h-8'  onClick={captureAndGeneratePDF}>Download</button>
            </div>
        </div>
    );
};

export default CircleChart;