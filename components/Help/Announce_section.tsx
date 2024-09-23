import React from 'react';

const AnnounceSection = () => {
    return (
        <div className='bg-[#07242B] text-white pt-4 sm:pt-6 pb-4 sm:pb-6'>
            <div className="pt-6 container mx-auto max-w-7xl px-6">
                <div className='pt-3'>
                    <div className='w-[200px] border-b-8 border-yellow-400 mb-4 sm:mb-6'>
                        <h1 className="text-[20px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-2">Announcements</h1>
                    </div>
                    <div className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[18px] xl:text-[18px] mb-4 sm:mb-6 pb-5' >
                        <p>
                            We've designed this so you can very quickly find all the answers to any questions you may have. 
                            We regularly update the help centre so do keep an eye for new posts, tips & tricks and exciting announcements.
                        </p>
                        <p>
                            If you need any assistance at all then please{' '}
                            <span className='relative underline cursor-pointer group'>
                                contact the customer success team.
                                {/* Tooltip */}
                               
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Bottom line */}
            <div className='flex justify-start'>
                <div className='w-full h-[10px] bg-yellow-400'></div>
            </div>
        </div>
    );
};

export default AnnounceSection;
