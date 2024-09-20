'use client'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircleChartProps {
    openLeads: any;
    awardedLeads: any;
    rejectedLeads: any;
    title: string;
    timeframe: string;
    setTimeFrame: any
}

const CircleChart: React.FC<CircleChartProps> = ({ openLeads, awardedLeads, rejectedLeads, title, setTimeFrame }) => {
    const totalLeads = openLeads + awardedLeads + rejectedLeads;
    const openPercentage = (openLeads / totalLeads) * 100;
    const awardedPercentage = (awardedLeads / totalLeads) * 100;
    const rejectedPercentage = (rejectedLeads / totalLeads) * 100;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-[#192A3E] text-[15px] font-semibold">{title}</h3>
                <div className='flex gap-2'>
                    <p className="text-[15px] text-[#6A707E]">Show:</p>
                    <select className='border-none outline-none text-[15px] text-[#6A707E] bg-transparent' name="timeFrame" onChange={(e: any) => setTimeFrame(e.target.value)}>
                        <option value="this month">This Month</option>
                        <option value="this year">This Year</option>
                    </select>
                </div>
            </div>
            <div className="relative w-[200px] h-[200px] mx-auto mb-6">
                {/* Rejected Leads */}
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

                {/* Awarded Leads */}
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

                {/* Open Leads */}
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

                {/* Center percentage */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <span className="text-[45px] font-semibold text-black">{`${Math.round(
                        (openLeads / totalLeads) * 100
                    )}%`}</span>
                </div>
            </div>

            <div className="text-center pt-5">
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
            </div>
        </div>
    );
};

export default CircleChart;