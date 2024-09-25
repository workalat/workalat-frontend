import { PiGlobeHemisphereWestThin, PiHandshakeThin, PiMedalThin, PiPuzzlePiece } from "react-icons/pi";

export default function OurValue() {
    return (
        <div className="w-full h-auto bg-[#07242B] mt-6 pt-6 pb-6 flex flex-col items-center">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <h1 className="text-white font-bold text-[26px] md:text-[30px] lg:text-[32px]">
                    Our Value
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
                    {/* Flexibility */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[302px]">
                            <div className="w-[68px] h-[61px] bg-[#FFBE00] rounded-[5px] flex items-center justify-center">
                                <PiPuzzlePiece className="text-[32px]" />
                            </div>
                            <div className="mt-3">
                                <h2 className="text-white font-bold text-[20px] md:text-[18px]">
                                    Flexibility
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                    Today's businesses are facing rapid changes, so they need to stay flexible in how they work. And they shouldn't be constrained by the four walls of an office, nine-to-five schedules, or traditional models that no longer fit.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Empowerment */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[302px]">
                            <div className="w-[68px] h-[61px] bg-[#FFBE00] rounded-[5px] flex items-center justify-center">
                                <PiMedalThin className="text-[32px]" />
                            </div>
                            <div className="mt-3">
                                <h2 className="text-white font-bold text-[20px] md:text-[18px]">
                                    Empowerment
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                    Career decisions shouldn't be left to corporate management alone. That's old-school. Each member of our team is an invaluable partner whose expertise and contributions make us stronger every day.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Inclusivity */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[302px]">
                            <div className="w-[68px] h-[61px] bg-[#FFBE00] rounded-[5px] flex items-center justify-center">
                                <PiHandshakeThin className="text-[32px]" />
                            </div>
                            <div className="mt-3">
                                <h2 className="text-white font-bold text-[20px] md:text-[18px]">
                                    Inclusivity
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                    Diversity delivers better outcomes for companies and talent alike. It&apos;s critical to cultivate workplace environments where people of all backgrounds and experiences are both valued and viewed as equal, so that everyone can excel in their careers and thrive.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Sustainability */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[302px]">
                            <div className="w-[68px] h-[61px] bg-[#FFBE00] rounded-[5px] flex items-center justify-center">
                                <PiGlobeHemisphereWestThin className="text-[32px]" />
                            </div>
                            <div className="mt-3">
                                <h2 className="text-white font-bold text-[20px] md:text-[18px]">
                                    Sustainability
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                    Today, more than ever, businesses must do their part to reverse climate change. So we're taking big steps to go carbon negative, becoming virtual-first, switching to energy-efficient tech, and building solar arrays in America's heartland.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
