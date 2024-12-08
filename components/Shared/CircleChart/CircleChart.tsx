'use client'
import { useEffect, useState } from 'react';
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

const CircleChart: React.FC<CircleChartProps> = ({data, title, setTimeFrame } : any) => {
    // const totalLeads = data[1]?.openLead + data[0]?.awarded + data[0]?.rejected;
    // const openPercentage = (data[0]?.openLead / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100;
    // const awardedPercentage = (data[0]?.awarded / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100;
    // const rejectedPercentage = (data[0]?.rejected / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100;

    // console.log(totalLeads,openPercentage,awardedPercentage,rejectedPercentage)

    let [totalLeads, setTotalLeads] = useState(0);
    let [openPercentage, setOpenPercentage] = useState(0);
    let [awardedPercentage, setAwardedPercentage] = useState(0);
    let [rejectedPercentage, setRejectedPercentage] = useState(0);


    useEffect(()=>{
        setTotalLeads(data[0]?.openLead + data[0]?.awarded + data[0]?.rejected);
        setOpenPercentage((data[0]?.openLead / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
        setAwardedPercentage((data[0]?.awarded / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
        setRejectedPercentage((data[0]?.rejected / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
    }, [])

    return ( 
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-[#192A3E] text-[15px] font-semibold">{title}</h3>
                <div className='flex gap-2'>
                    <p className="text-[15px] text-[#6A707E]">Show:</p>
                    <select className='border-none outline-none text-[15px] text-[#6A707E] bg-transparent' name="timeFrame" onChange={(e: any) =>{
                        console.log(e.target.value);

                        if(e.target.value == "this month"){
                            setTotalLeads(data[0]?.openLead + data[0]?.awarded + data[0]?.rejected);
                            setOpenPercentage((data[0]?.openLead / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
                            setAwardedPercentage((data[0]?.awarded / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
                            setRejectedPercentage((data[0]?.rejected / ( data[0]?.openLead + data[0]?.awarded + data[0]?.rejected)) * 100);
                        }
                        else{
                            setTotalLeads(data[1]?.openLead + data[1]?.awarded + data[1]?.rejected);
                            setOpenPercentage((data[1]?.openLead / ( data[1]?.openLead + data[1]?.awarded + data[1]?.rejected)) * 100);
                            setAwardedPercentage((data[1]?.awarded / ( data[1]?.openLead + data[1]?.awarded + data[1]?.rejected)) * 100);
                            setRejectedPercentage((data[1]?.rejected / ( data[1]?.openLead + data[1]?.awarded + data[1]?.rejected)) * 100);

                        }
                    }}>
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
                        openPercentage
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