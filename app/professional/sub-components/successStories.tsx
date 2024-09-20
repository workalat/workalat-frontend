import React from 'react';
import Image from "next/image";
import { Box } from "@mui/material";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: 'Helen Mina',
      title: 'Gigial Marketer',
      imageUrl: '/images/customer1.png', // Replace with actual image path
      quote: "Our biggest client contacted us through Bark and we’ll continue to bring on new clients through the platform."
    },
    {
      id: 2,
      name: 'Stefan Wesley',
      title: 'Sigma Digital',
      imageUrl: '/images/customer2.png', // Replace with actual image path
      quote: "Bark has been far the most effective website I’ve used. It gives me a solid flow of potential work.It has been great"
    },
    {
      id: 3,
      name: 'Mike Jonah',
      title: 'Marketing Executive',
      imageUrl: '/images/customer3.png', // Replace with actual image path
      quote: "We get 82% of our clients through Bark. They are coming to us and we can choose who we want to take on."
    }
  ];

  return (
    <Box className="space-y-7 mt-20 pb-14 mx-10 sm:px-6 lg:px-8 bg-main ">
      <div className="flex flex-col justify-center items-center text-white">
        <h2 className="font-extrabold text-5xl pb-3">Customer success stories</h2>
        <p className="text-2xl pb-3 font-light mt-3">See what other small businesses have to say about Whatworks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-7 ">
        {stories.map((story) => (
          <div key={story.id} className="bg-white text-black rounded-lg overflow-hidden shadow-md mx-auto w-full max-w-md">
            <div className="relative w-full h-64">
              <Image src={story.imageUrl} alt={story.name} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 text-center">
              <p className="text-medium mb-6">{story.quote}</p>
              <div className="max-w-xs h-1 bg-secondary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">{story.name}</h3>
              <p className="text-xl text-gray-400">{story.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default SuccessStories;
