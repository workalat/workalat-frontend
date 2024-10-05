import { Button } from "@mui/material"

import Cta2 from "@/public/images/cta2.svg"
import arrowRightIcon from "@/public/icons/arrow_right.svg"

const CtaWorkers = ({ openModal }: {openModal: ()=>void}) => {
  return (
    <div className="flex justify-start items-center gap-x-10 gap-y-12 text-white flex-wrap lg:flex-nowrap">
        <img alt="" src={Cta2.src} />
        <div className="sm:mt-0 space-y-4 md:space-y-10 sm:text-lg">
            <h2 className="font-bold text-4xl">Why businesses turn to WorkAlat</h2>
            <p>Finding the right professional for your project has never been easier. Whether you need help with home repairs, creative projects, or business solutions, WorkAlat is your one-stop destination for reliable, expert services.</p>
            <ul className="list-disc ml-4 space-y-2">
                <li>We ensure only trusted and skilled professionals are part of our community.</li>
                <li>Your projects are matched with the right experts for a smooth and seamless experience.</li>
                <li>From personal services to business needs, we cover a wide range of industries.</li>
            </ul>
            <Button className="bg-secondary hover:bg-secondary text-base font-semibold text-black py-4 px-8 group hover:opacity-90" onClick={openModal}>
                Post a job now
                <img src={arrowRightIcon.src} alt="" className="ml-2 group-hover:translate-x-1 transition-all" />
            </Button>
        </div>
    </div>
  )
}

export default CtaWorkers
