import { ReactNode } from "react";

import bgCircles from "@/public/images/bg_pattern_5.svg";

export default function ProfessionalOnboardLayout(
    { children } :
    { children: ReactNode }
) {
  return (
    <>
        <img src={bgCircles.src} alt="" className="absolute top-0 left-0 z-0" />
        <div className="min-h-[600px] relative">
            {children}
        </div>
    </>
  )
}
