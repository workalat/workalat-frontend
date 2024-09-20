import React from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';

// Update with the correct path to your image
const statsImageUrl = '/images/scores.png';

const StatsComponent = () => {
  return (
    <Box className=" text-black py-10 px-5 lg:px-20 flex flex-col lg:flex-row justify-between items-center">
      <div className="max-w-lg mb-10 lg:mb-0">
        <h2 className="text-5xl  font-extrabold mb-4 pb-5">Join a buzzing marketplace</h2>
        <p className="text-xl mb-6">
          Hundreds of thousands of small businesses have found new customers on Whatworks
        </p>
        <Button
          variant="contained"
          className="bg-secondary text-black px-6 py-2  hover:bg-yellow-500"
          size="large"
        >
          Join now →
        </Button>
      </div>
      <div className="flex justify-center items-center mt-10 lg:mt-0 lg:ml-10">
        <Image src={statsImageUrl} alt="Stats Image" width={500} height={500} />
      </div>
    </Box>
  );
};

export default StatsComponent;
