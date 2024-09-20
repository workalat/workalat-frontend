import { Button } from "@mui/material"

import Cta2 from "@/public/images/cta2.png"
import arrowRightIcon from "@/public/icons/arrow_right.svg"

const CtaWorkers = () => {
  return (
    <div className="flex justify-start items-center gap-x-10 gap-y-12 text-white flex-wrap lg:flex-nowrap">
        <img alt="" src={Cta2.src} />
        <div className="sm:mt-0 space-y-4 md:space-y-10 sm:text-lg">
            <h2 className="font-bold text-4xl">Join World&apos;s Best Marketplace for Workers</h2>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <ul className="list-disc ml-4 space-y-2">
                <li>Connect to freelancers with proven business experience.</li>
                <li>Get matched with the perfect talent by a customer success manager.</li>
                <li>Unmatched quality of remote, hybrid, and flexible jobs</li>
            </ul>
            <Button className="bg-secondary hover:bg-secondary text-base font-semibold text-black py-4 px-8 group hover:opacity-90">
                Get Started
                <img src={arrowRightIcon.src} alt="" className="ml-2 group-hover:translate-x-1 transition-all" />
            </Button>
        </div>
    </div>
  )
}

export default CtaWorkers
