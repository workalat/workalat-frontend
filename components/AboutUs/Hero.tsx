import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
      <div className="relative pt-6 container mx-auto max-w-7xl px-6">
          <div className="relative">
              <Image
                  src="/images/how-it-works-professional.png"
                  alt="Freelancers"
                  width={1000}
                  height={1000}
                  className="w-full h-[400px] lg:h-[450px] sm:h-[400px] md:h-[450px] rounded-[5px] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-[5px]" />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 lg:p-8 text-white">
                  <h1 className="text-[36px] lg:text-[40px] sm:text-[36px] md:text-[38px] font-bold">
                      About Us
                  </h1>
                  <p className="text-base lg:text-lg font-normal mb-6 max-w-xl text-pretty">
                  A community-driven marketplace where talent meets opportunity, fostering seamless collaboration between skilled professionals and innovative businesses.
                  </p>
              </div>
          </div>
      </div>
  )
}
