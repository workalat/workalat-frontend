import { PiGlobeHemisphereWestThin, PiHandshakeThin, PiMedalThin, PiPuzzlePiece } from "react-icons/pi";

export default function OurValue() {
    return (
        <div className="w-full h-auto bg-[#07242B] mt-6 pt-6 pb-6 flex flex-col items-center">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <h1 className="text-white font-bold text-[26px] md:text-[30px] lg:text-[32px]">
                    What makes us different?
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
                                Verified Professionals
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                ·We carefully screen and verify each service provider on our platform. Trust is our top priority, and we ensure that only qualified experts are part of the WorkAlat community.
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
                                    Transparent Platform
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                Real Jobs, clear terms, straightforward pricing, and a commitment to fostering trust between freelancers and clients.
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
                                    Tailored Matches
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                By using a smart matching system, we help you find professionals who not only meet your budget but also have the right skills and experience for your project.
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
                                    Commitment to Excellence
                                </h2>
                                <p className="text-white text-[15px] md:text-[14px] mt-3">
                                Our team is constantly working behind the scenes to improve the user experience. We listen to feedback, innovate regularly, and always strive to deliver the best possible service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
