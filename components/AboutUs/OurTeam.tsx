import Image from "next/image";

export default function OurTeam() {
  return (
      <div className="container mx-auto max-w-7xl px-4 md:px-6 mt-12 mb-12 ">
          <h1 className=" text-lg font-normal leading-6 text-center  mt-4">
              #EXPLORE OUR TEAM
          </h1>
          <h2 className=" text-4xl font-bold leading-tight text-center mb-4">
              Meet our leadership team.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-start  rounded">
                  <div className="relative w-full h-[300px] md:h-[206px]" >
                      <Image
                          src="/images/team1.png"
                          alt="Phillip Lewis"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[5px]"
                      />
                  </div>
                  <h3 className="text-xl font-bold leading-[25.52px] text-left mt-4">
                      Phillip Lewis
                  </h3>
                  <p className=" text-md font-normal leading-[19.14px] text-left">
                      President, FreeAgent Enterprise
                  </p>
              </div>
              <div className="flex flex-col items-start  rounded">
                  <div className="relative w-full h-[300px] md:h-[206px]" >
                      <Image
                          src="/images/team2.png"
                          alt="Another Person"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[5px]"
                      />
                  </div>
                  <h3 className="text-xl font-bold leading-[25.52px] text-left mt-4">
                      Anita Backer
                  </h3>
                  <p className="text-md font-normal leading-[19.14px] text-left">
                      President, FreeAgent Enterprise
                  </p>
              </div>
              <div className="flex flex-col items-start  rounded">
                  <div className="relative w-full h-[300px] md:h-[206px]" >
                      <Image
                          src="/images/team3.png"
                          alt="Yet Another Person"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[5px]"
                      />
                  </div>
                  <h3 className=" text-xl font-bold leading-[25.52px] text-left mt-4">
                      Thomas Fred
                  </h3>
                  <p className=" text-md font-normal leading-[19.14px] text-left">
                      President, FreeAgent Enterprise
                  </p>
              </div>
              <div className="flex flex-col    rounded">
                  <div className="relative w-full h-[300px] md:h-[206px]" >
                      <Image
                          src="/images/team4.png"
                          alt="Final Person"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[5px]"
                      />
                  </div>
                  <h3 className=" text-xl font-bold leading-[25.52px] text-left mt-4">
                      Jessica Miland
                  </h3>
                  <p className="text-md font-normal leading-[19.14px] text-left">
                      President, FreeAgent Enterprise
                  </p>
              </div>
          </div>
      </div>
  )
}
