import React from 'react';

// Array of category names
const categories = [
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
    "3D Modeling and CAD Services",
];

const ConsultancyCategory = () => {
    return (
        <div className='pt-4'>
            <h2 className='text-lg font-bold'>Consultancy</h2>

            <div className='w-full flex items-center pt-4'>
                <div className='flex flex-wrap font-bold'>
                    {categories.map((category, index) => (
                        <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 py-3 '>
                            <div key={index} className='w-full px-5 py-4 border-[#FFBE00] border-[1px] rounded'>
                                <p className='text-sm'>{category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



export default ConsultancyCategory;
