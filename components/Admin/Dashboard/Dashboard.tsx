"use client"

import LineChart from "@/components/Shared/LineChart/LineChart"
import Menus from "./Menus/Menus"
import ChartHeader from "@/components/Shared/LineChart/ChartHeader";
import { IoIosNotifications } from "react-icons/io";
import CircleChart from "@/components/Shared/CircleChart/CircleChart";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setWeek } from "date-fns";

export default function Dashboard() {

    // demo data of the day's statics 
    // const staticsDataDemo = [
    //     {
    //         id: 1,
    //         title: "total leads today",
    //         amount: 1259
    //     },
    //     {
    //         id: 2,
    //         title: "open leads",
    //         amount: 23
    //     },
    //     {
    //         id: 3,
    //         title: "awarded leads",
    //         amount: 123
    //     },
    //     {
    //         id: 4,
    //         title: "total users",
    //         amount: 123
    //     }
    // ]

    // // these chart data will be connect with backend and dynamic. here it is demo for example
    // const clientData = [25, 5, 90, 20, 10, 80, 35, 60, 95, 10, 30, 85];
    // const professionalData = [20, 40, 35, 45, 55, 50, 60, 10, 76, 20, 70, 30];
    // const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // the circular data example
    // const leadsStatus = {
    //     thisMonth: {
    //         title: "this month",
    //         openLead: 50,
    //         awarded: 30,
    //         rejected: 60
    //     },
    //     thisYear: {
    //         title: "this year",
    //         openLead: 300,
    //         awarded: 200,
    //         rejected: 100
    //     },
    // }

    const [timeFrame, setTimeFrame] = useState<string>("this month");






     // BACKEND INTEGRATION
     const {dashboarData, filterLineChart,componentRef, circleChartFilter,circleRef} : any  = useUserContext();
     const [loading2, setLoading2] : any  = useState(true);
     let [allDashboardData, setAllDashboardData] : any = useState([]);

     let [clientData, setClientData] : any = useState([25, 5, 90, 20, 10, 80, 35, 60, 95, 10, 30, 85]);
     let [professionalData, setProfessionalData] : any = useState([20, 40, 35, 45, 55, 50, 60, 10, 76, 20, 70, 30]);
     let [clientsDataWeekly, setClientsDataWeekly] : any = useState([]);
     let [professionalsDataWeekly, setProfessionalsDataWeekly] : any = useState([]);
     let [totalNoClients, setTotalNoClients] : any = useState(0);
     let [totalNoProfessionals, setTotalNoProfessionals] : any = useState(0);
     const { generateSnackbar } : any  = useSnackbar();
     let router = useRouter();
 
     useEffect(() => {
         async function getData() {
             setLoading2(true);
           try {
            const currentYear = new Date().getFullYear();
             let res = await dashboarData();
             handleYearChange(`${currentYear}`, false);
             
            let circle = await circleChartFilter({year : parseInt(`${currentYear}`)})
             if (res?.status === 200  || res?.data?.status === "success" ) {
                setAllDashboardData(res?.data?.data);
                setTotalNoClients(res?.data?.data?.numberTotalClient);
                setTotalNoProfessionals(res?.data?.data?.numerTotalProfessionals);
                setCurrentYearData(circle?.data?.data);
                setCircleChartData(circle?.data?.data[0]);
                setLoading2(false);
               } else {
                 generateSnackbar(res?.response?.data?.message || "Some error occurred, Please Try Again.", "error");
               }
           } catch (e) {
             generateSnackbar("Some error occurred, Please Try Again.", "error");
           }
         }
         getData();
       }, []);


//UPDATED DASHBOARD


    // these chart data will be connect with backend and dynamic. here it is demo for example
    // const clientData = [25, 5, 90, 20, 10, 80, 35, 60, 95, 10, 30, 85];
    // const professionalData = [20, 40, 35, 45, 55, 50, 60, 10, 76, 20, 70, 30];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    
    const [filteredClientData, setFilteredClientData] : any = useState<number[]>(clientData);
    const [filteredProfessionalData, setFilteredProfessionalData] : any = useState<number[]>(professionalData);
    const [filteredLabels, setFilteredLabels] : any = useState<string[]>(labels);

    let [currentWeek, setCurrentWeek] : any = useState(0); //week 1, week 2
    let [currentRange, setCurrentRange] : any = useState([]); // jan-march, july-sept
    let [currentYear, setCurrentYear] : any = useState(0); // 2022, 2023, 2024
    let[year, setYear] : any = useState("");
    let[month, setMonth] : any = useState("");
    let [circleChartData, setCircleChartData] : any = useState({
        openLead: 0, awarded: 0, rejected: 0
    });
    let [currentYearData, setCurrentYearData] : any = useState([]);

    const handleRangeChange = (range: string) => {
        const rangeMapping: Record<string, [number, number]> = {
            'jan - march': [0, 2],
            'april - june': [3, 5],
            'july - sept': [6, 8],
            'oct - dec': [9, 11],
        };

        const [start, end] = rangeMapping[range];
        setFilteredClientData(clientData.slice(start, end + 1));
        setFilteredProfessionalData(professionalData.slice(start, end + 1));
        setFilteredLabels(labels.slice(start, end + 1));
        setCurrentRange([start, end]);

        
        let tc = clientData.slice(start, end + 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        let tp = professionalData.slice(start, end + 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        setTotalNoClients(tc)
        setTotalNoProfessionals(tp);
    };

    const handleYearChange = async (year: string, condition = true) => {
        try{
            let y = parseInt(year);
            setCurrentYear(y);
            let data = await filterLineChart({year : y});
            setClientData(data?.data?.data?.clientMonthlyData);
            setFilteredClientData(data?.data?.data?.clientMonthlyData);
            setProfessionalData(data?.data?.data?.professionalMonthlyData);
            setFilteredProfessionalData(data?.data?.data?.professionalMonthlyData);
            setProfessionalsDataWeekly(data?.data?.data?.professionalWeeklyQuarterlyData);
            setClientsDataWeekly(data?.data?.data?.clientWeeklyQuarterlyData)
            setFilteredLabels(labels);
            
            const currentYear = new Date().getFullYear();
            if(condition){
                let tc = data?.data?.data?.clientMonthlyData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                let tp = data?.data?.data?.professionalMonthlyData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                setTotalNoClients(tc)
                setTotalNoProfessionals(tp);
            }
        }
        catch(e){
            // console.log(e);
        }
    };

    const handleWeekChange = (week: string) => {
    //     console.log(week);
    //     const weekMapping: Record<string, [number, number]> = {
    //         'week 1': [0, 0],
    //         'week 2': [1, 1],
    //         'week 3': [2, 2],
    //         'week 4': [3, 3],
    //         'week 5': [4, 4],
    //         'week 6': [5, 5],
    //         'week 7': [6, 6],
    //         'week 8': [7, 7],
    //         'week 9': [8, 8],
    //         'week 10': [9, 9],
    //         'week 11': [10, 10],
    //         'week 12': [11, 11],
    //     };

    //     const [start, end] = weekMapping[week];
    //     setCurrentWeek(start);
    //     setFilteredClientData(clientData.slice(start, end + 1));
    //     setFilteredProfessionalData(professionalData.slice(start, end + 1));
    //     setFilteredLabels(labels.slice(start, end + 1));

    //     console.log("Clients data" ,clientData.slice(start, end + 1));
    //     console.log("Clients data all" ,clientData);
    //     console.log("Professionals data", professionalData.slice(start, end + 1));
    //     console.log("Professionals data All",professionalData);
    //     console.log("Labels data", labels.slice(start, end + 1));
    //     console.log("Week Mappin" ,weekMapping);

    //     // console.log(currentRange);
    //     console.log( "Start and ",start, end);
    //     console.log(clientsDataWeekly);
    //     console.log(professionalsDataWeekly)
    //     console.log("Current Range ",currentRange);

    //     if(currentRange[0] == 0){
    //         console.log("Jan");
    //         setFilteredClientData([0, clientsDataWeekly[0][end]]);
    //         setFilteredProfessionalData([0, professionalsDataWeekly[0][end]]);
    //         setFilteredLabels(labels.slice(start, end + 1));
    //     }
    //     else if(currentRange[0] == 3){
    //         console.log("March");
    //         setFilteredClientData([0, clientsDataWeekly[1][end]]);
    //         setFilteredProfessionalData([1, professionalsDataWeekly[1][end]]);
    //         setFilteredLabels(labels.slice(start, end + 1));

    //     }
    //     else if(currentRange[0] == 6){
    //         console.log("June");
    //         setFilteredClientData([0, clientsDataWeekly[2][end]]);
    //         setFilteredProfessionalData([0, professionalsDataWeekly[2][end]]);
    //         setFilteredLabels(labels.slice(start, end + 1));
            
    //     }
    //     else if(currentRange[0] == 9){
            
    //         console.log("Oct");
    //         setFilteredClientData(clientsDataWeekly[3]);
    //         setFilteredProfessionalData(professionalsDataWeekly[3]);
    //         setFilteredLabels(labels.slice(start, end + 1));
    //         console.log([0, clientsDataWeekly[3][end]]);
    //         console.log([0, professionalsDataWeekly[3][end]]);

    //     }
    };


    // // the circular data example
    // const leadsStatus = {
    //     "Jan-Mar": { openLead: 50, awarded: 30, rejected: 20 },
    //     "Apr-Jun": { openLead: 80, awarded: 40, rejected: 30 },
    //     "Jul-Sep": { openLead: 70, awarded: 60, rejected: 50 },
    //     "Oct-Dec": { openLead: 90, awarded: 80, rejected: 40 },
    //     "2023": { openLead: 300, awarded: 200, rejected: 150 },
    //     "2022": { openLead: 250, awarded: 180, rejected: 120 },
    //     "2024": { openLead: 250, awarded: 180, rejected: 120 },
    // };


    const [rangeType, setRangeType] = useState<"Monthly" | "Yearly" | "Weekly">("Yearly");
    const [range, setRange] = useState<string>("Jan-Mar");

    const ranges = {
        Monthly: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
        Yearly: ["2025","2024","2023", "2022"],
        // Weekly: ["Week 1", "Week 2"],
    };

    const handleRangeTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as "Monthly" | "Yearly" ;
        setRangeType(newType);
        setRange(ranges[newType][0]); // Set the first range as default
        

        if(newType === "Yearly"){
            let res = await circleChartFilter({year : parseInt(ranges[newType][0])})
            setCurrentYearData(res?.data?.data);
            setCircleChartData(res?.data?.data[0]);
        }
        else{
            if(ranges[newType][0] === "Jan-Mar"){
                setCircleChartData(currentYearData[1]);
            }
            else if(ranges[newType][0] === "Apr-Jun"){
                setCircleChartData(currentYearData[2]);
            }
            else if(ranges[newType][0] === "Jul-Sep"){
                setCircleChartData(currentYearData[3]);
            }
            else if(ranges[newType][0] === "Oct-Dec"){
                setCircleChartData(currentYearData[4]);
            }

        }

    };

    const handleRangeChange2 = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRange(e.target.value);
        if(rangeType === "Yearly"){
            let res = await circleChartFilter({year : parseInt(e.target.value)})
            setCurrentYearData(res?.data?.data);
            setCircleChartData(res?.data?.data[0]);
        }
        else{
            if(e.target.value === "Jan-Mar"){
                setCircleChartData(currentYearData[1]);
            }
            else if(e.target.value === "Apr-Jun"){
                setCircleChartData(currentYearData[2]);
            }
            else if(e.target.value === "Jul-Sep"){
                setCircleChartData(currentYearData[3]);
            }
            else if(e.target.value === "Oct-Dec"){
                setCircleChartData(currentYearData[4]);
            }

        }
        setYear(e.target.value);
    };

    // const chartData = leadsStatus[range];




    return (
        <>

{loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-5 overflow-y-scroll relative hiddenScroll">

                {/* statics details */}
                <div className="flex flex-wrap gap-5 pb-5">
                    {
                        allDashboardData?.uppercards?.map((data, i) => (
                            <div key={i} className="w-full md:w-[180px] lg:w-[18%] h-[130px] bg-[#07242B] px-4 pb-4 pt-10 rounded-md">
                                <h3 className="text-[25px] font-bold text-white">{data?.amount}</h3>
                                <p className="text-[15px] text-[#FFBE00] capitalize">{data?.title}</p>
                            </div>
                        ))
                    }
                    <div className="w-full md:w-[180px] lg:w-[18%] h-[130px] relative bg-[#07242B] rounded-md overflow-hidden">
                        <div className="z-[2] absolute px-4 pt-3">
                            <h3 className="text-white text-start pb-[10px] font-bold text-[15px]">Total Upgrades</h3>
                            <h3 className="text-[25px] font-bold text-white">{allDashboardData?.totalPremiumProfessional}</h3>
                            <p className="text-[15px] text-[#FFBE00] capitalize">Users</p>
                        </div>
                        <div className="w-[200px] absolute pt-14 lg:pt-16 ps-12 -right-1/2 lg:-right-[120px] z-[1] -top-[25%] h-[200px] bg-[#FFBE00] rounded-full">
                            <IoIosNotifications className="size-[20px] text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-between flex-col lg:flex-row">
                    <div className="w-full lg:w-2/3">
                        {/* <div className="bg-white shadow-lg border border-black/10 w-full p-4 rounded-lg">
                            <ChartHeader totalClients={allDashboardData?.numberTotalClient} totalProfessionals={allDashboardData?.numerTotalProfessionals} />
                            <LineChart
                                clientData={allDashboardData?.totalClientsArray}
                                professionalData={allDashboardData?.totalProfessionalsArray}
                                labels={labels}
                            />
                        </div> */}

                            <div className="bg-white shadow-lg border border-black/10 w-full p-4 rounded-lg" ref={componentRef}>
                            <ChartHeader
                                onRangeChange={handleRangeChange}
                                onYearChange={handleYearChange}
                                onWeekChange={handleWeekChange}
                                totalClient={totalNoClients}
                                totalProfessional={totalNoProfessionals}
                            />
                            <LineChart
                                clientData={filteredClientData}
                                professionalData={filteredProfessionalData}
                                labels={filteredLabels}
                            />
                        </div>

                        {/* this notification will be dynamically from backend later */}
                        <div className="pt-4">
                            <div className="bg-white shadow-lg border border-black/10 w-full px-4 pt-4 pb-7 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[15px] text-black/70 font-semibold tracking-wide">Support Tickets</h3>
                                        <p className="text-[15px] text-black/70 py-3">You have {allDashboardData?.totalAdminTickets} pending support tickets today</p>
                                    </div>

                                    <Link href={"/admin/support-tickets"} className="text-[15px] px-5 py-2 bg-[#FE321F] rounded-md text-white font-semibold">View Support</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3" ref={circleRef}>
                        <div className="w-full">
                                <CircleChart
                                openLeads={circleChartData.openLead}
                                awardedLeads={circleChartData.awarded}
                                rejectedLeads={circleChartData.rejected}
                                title={`Leads Status (${range})`}
                                handleRangeChange2={handleRangeChange2}
                                rangeType={rangeType}
                                handleRangeTypeChange={handleRangeTypeChange}
                                range={range}
                                ranges={ranges}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
        </>
    )
}
