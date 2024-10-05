import { categoriesServices } from "@/utils/allCategories";

export default function Services() {
    return (
        <div className="pt-5">
            <h1 className='text-2xl font-bold'>All Services</h1>
            {
                categoriesServices?.map((category, i) => (
                    <div key={i} className='pt-4'>
                        <h2 className='text-lg font-bold'>{category?.title}</h2>

                        <div className='w-full pt-4'>
                            <div className='flex flex-wrap font-bold'>
                                {category?.items?.map((data, index) => (
                                    <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 py-3 '>
                                        <div key={index} className='w-full px-5 py-4 border-[#FFBE00] border-[1px] rounded'>
                                            <p className='text-sm'>{data}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
