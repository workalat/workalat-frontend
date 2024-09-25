import Image from 'next/image';
import React from 'react';
const FreelancerBenefits = () => {
    return (
        <div className='pt-6 container mx-auto max-w-7xl px-6'>
            <div className='flex flex-col lg:flex-row justify-center py-[2%]'>
                <div className=' flex flex-col  w-full lg:w-[65%] mb-4 mt-3 lg:mb-0  lg:text-left'>
                    <h2 className=" w-full text-left lg:w-[70%] text-[28px] sm:text-[28px] md:text-[30px] lg:text-[45px]   font-semibold  text-gray-900 mb-[3%] leading-tight ">
                        How can freelancers  help your business?
                    </h2>
                    <p className="text-gray-700 text-left w-full lg:w-[95%] sm:w-full  text-[14px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-[18px]">
                        The possibilities are endless. We have expert freelancers who work in every  technical, professional, and creative field imaginable. The possibilities are  endless. We have expert freelancers who work in every technical, professional, and creative field imaginable.
                        The possibilities are endless. We have expert freelancers who work in every technical, professional, and creative field imaginable. The possibilities are  endless. We have expert freelancers who work in every technical, professional, and creative field imaginable.
                    </p>
                </div>
                <div className='pic w-full lg:w-[35%] flex justify-center '>
                    <Image width={1000} height={1000} src="/images/freelancerBenefits.png" alt="Happy freelancers working" className="size-full sm:size-[60%] md:size-[90%] lg:size-full xl:size-full rounded-lg shadow-sm" />
                </div>
            </div>
        </div>
    );
};

export default FreelancerBenefits;
