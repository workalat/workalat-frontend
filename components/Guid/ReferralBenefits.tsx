import Image from 'next/image';
import React from 'react';

const ReferralBenifits = () => {
    return (
        <div className='pt-6 container mx-auto max-w-7xl px-6 mb-5'>
            <div className='flex flex-col md:flex-row lg:flex-row justify-around bg-[#F3F3F3] py-[4%] rounded-md'>
            <div className='flex flex-col items-center text-center w-full lg:w-[30%] mb-6 lg:mb-0'>
                    <div className='bg-[#2D7AF1] size-12 flex items-center justify-center rounded-md mb-4'>
                        <Image width={500} height={500} src="/men_two.png" alt="Description 1" className='size-4' />
                </div>
                <p className='text-[16px] '>
                    Refer a friend using <br/> your referral link
                </p>
            </div>
            <div className='flex flex-col items-center text-center w-full lg:w-[30%] mb-6 lg:mb-0'>
                    <div className='bg-[#6CBC9E] size-12 rounded-md mb-4 flex items-center justify-center'>
                        <Image width={500} height={500} src="/arrow_top.png" alt="Description 2" className='h-5 w-6' />
                </div>
                    <p className='text-[16px] '>
                    Friend signs up and <br /> buys starter pack
                </p>
            </div>
            <div className='flex flex-col items-center text-center w-full lg:w-[30%]'>
                <div className='bg-[#F7BF53] size-12 rounded-md mb-4 flex items-center justify-center'>
                        <Image width={500} height={500} src="/coupon.png" alt="Description 3" className='w-8 h-6' />
                </div>
                    <p className='text-[16px]'>
                    We send you both a coupon <br /> code for 2 free responses
                </p>
            </div>
        </div>
        </div>
    );
};

export default ReferralBenifits;
