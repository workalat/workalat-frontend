'use client'

export default function ProjectList() {
    // demo projects list
    const projectsList = [
        {
            id: 1,
            title: "Cleaning",
            desc: "Get professional cleaning service swiftly anytime you want.",
            img: "/clean.jpg"
        },
        {
            id: 2,
            title: "Graphics Design",
            desc: "Get professional cleaning service swiftly anytime you want.",
            img: "/graphics.jpg"
        },
        {
            id: 3,
            title: "Dry Cleaning",
            desc: "Get professional cleaning service swiftly anytime you want.",
            img: "/dry.jpg"
        },
        {
            id: 4,
            title: "Web Development",
            desc: "Get professional cleaning service swiftly anytime you want.",
            img: "/web.jpg"
        }
    ]
  return (
      <div className="pt-5">
          <h2 className="text-2xl font-bold text-[#07242B]">You may also need</h2>

          <div className="flex justify-center pt-5 lg:justify-between flex-wrap gap-2">
              {
                  projectsList?.map((project: any) => (
                      <div key={project?.id} className="w-full md:w-[48%] lg:w-[24%]">
                          <img className="w-full h-auto" src={project?.img} alt="workalat" />
                          <h4 className="font-bold text-black text-xl pt-2 pb-3 border-b border-black/50">{project?.title}</h4>
                          <p className="text-md text-black/70 pt-2">{project?.desc}</p>
                      </div>
                  ))
              }
          </div>
    </div>
  )
}
