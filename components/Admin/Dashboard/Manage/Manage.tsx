"use client"

import { manageData } from "@/utils/manageData"
import Menus from "../Menus/Menus"
import { useEffect, useState } from "react"
import PagesPage from "./Pages/PagesPage";
import CategoriesPage from "./Categories/CategoriesPage";
import ServicesPage from "./Services/ServicesPage";
import WalletPage from "./Wallet/WalletPage";
import PointsPage from "./Points/PointsPage";
import BadgesPage from "./Badges/BadgesPage";
import RankingPage from "./Ranking/RankingPage";
import JobDialogue from "./JobDialogue/JobDialogue";
import JobAssign from "./JobAssign/JobAssign";

export default function Manage() {

    // here must need to connect with backend and database for page collection page adding or something else


    // for selectPage
    const [selectedItems, setSelectedItems] = useState<any>();

    useEffect(() => {
        const item = manageData && manageData?.find(data => data?.pageName == "pages");
        setSelectedItems(item);
    }, [])

    return (
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>

            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative bg-slate-100 hiddenScroll">

                {/* heading of the manage dashboard */}
                <div className="flex justify-between items-start">
                    <h4 className="text-[17px] font-bold">Manage</h4>

                    <button className="text-[18px] border ps-3 pe-24 shadow bg-white block rounded-md py-1" onClick={() => window.location.reload()}>All</button>
                </div>

                <div className="bg-white w-full h-full rounded-md shadow border border-black/40 mt-8">
                    <div className="flex w-full max-sm:h-[80vh] h-full">
                        {/* menus */}
                        <div className="w-[250px] h-full overflow-y-scroll hiddenScroll overflow-x-hidden p-4 border-e border-black/40">
                            <ul>
                                {
                                    manageData && manageData?.map((data: any, i: number) => (
                                        <li key={i} className="pb-3">
                                            <button onClick={() => setSelectedItems(data)} className={`text-[#07242B] text-[15px] sm:text-[17px] font-semibold py-[8px] px-4 rounded-md ${data?.pageName == (selectedItems?.pageName) ? "bg-[#E6E6E6]" : "bg-transparent"} uppercase`}>{data?.pageName}</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* pages */}
                        <div className="flex flex-grow w-auto h-full overflow-y-scroll hiddenScroll overflow-x-hidden">
                            {
                                selectedItems && selectedItems?.pageName == "pages" && <PagesPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "categories" && <CategoriesPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "services" && <ServicesPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "wallet" && <WalletPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "points" && <PointsPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "badges" && <BadgesPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "ranking" && <RankingPage data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "job dialogue" && <JobDialogue data={selectedItems} />
                            }
                            {
                                selectedItems && selectedItems?.pageName == "job assign" && <JobAssign data={selectedItems} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
