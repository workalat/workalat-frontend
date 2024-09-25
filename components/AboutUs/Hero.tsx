import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
      <div className="relative pt-6 container mx-auto max-w-7xl px-6">
          <div className="relative">
              <Image
                  src="/images/about-img.png"
                  alt="Freelancers"
                  width={1000}
                  height={1000}
                  className="w-full h-[400px] lg:h-[450px] sm:h-[400px] md:h-[450px] rounded-[5px] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30 rounded-[5px]"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 lg:p-8 text-white">
                  <h1 className="text-[36px] lg:text-[40px] sm:text-[36px] md:text-[38px] font-bold leading-[36px] sm:leading-[50px] lg:leading-[63.8px]  font-space-grotesk">
                      About Us Testing
                  </h1>
                  <p className="text-[15px] sm:text-[15px] lg:text-[18px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[25.52px] mb-6 font-space-grotesk">
                      Worlds largest freelancing and crowdsourcing marketplace.
                  </p>
              </div>
          </div>
      </div>
  )
}
