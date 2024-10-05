import React from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';

// Update with the correct path to your image
const statsImageUrl = '/images/scores.svg';

const StatsComponent = () => {
  const router = useRouter();

  return (
    <Box className=" text-black py-10 px-5 lg:px-20 flex flex-col lg:flex-row justify-between items-center max-w-screen-2xl mx-auto">
      <div className="max-w-xl mb-10 lg:mb-0">
        <h2 className="text-4xl font-extrabold mb-4">Ready to grow your business?</h2>
        <p className="text-lg mb-6">
        Sign up with WorkAlat today and start connecting with clients who need your skills. It&apos;s easy, secure, and built to help you succeed!
        </p>
        <Button
          variant="contained"
          className="font-semibold text-main py-4 px-12"
          size="large"
          onClick={() => router.push('/professional/signup')}
        >
          Join now <FaArrowRight className='ml-2' />
        </Button>
      </div>
      <div className="flex justify-center items-center mt-10 lg:mt-0 lg:ml-10">
        <Image src={statsImageUrl} alt="Stats Image" width={400} height={400} />
      </div>
    </Box>
  );
};

export default StatsComponent;
