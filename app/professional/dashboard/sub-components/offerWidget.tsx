'use client';

import React from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';

const OfferWidget = () => {
  const router = useRouter();
  return (
    <Card className='bg-white rounded-lg w-full border-1 border-gray-300 px-5 md:px-10'>
      <CardContent className='  text-center'>
        <Typography gutterBottom className='text-lg font-bold'>
          Get started
        </Typography>

        <Button
          variant="contained"
          className='w-full text-black text-center font-semibold bg-secondary px-8 py-2'
          onClick={() => router.push("/wallet")}
        >
          20% OFFSTARTER PACK OFFER
        </Button>

        <Typography sx={{ mt: 2, mb: 1 }} className='text-lg font-bold'>
          Starter pack offer
        </Typography>

        <Typography sx={{ mb: 1 }} className='text-sm text-black'>
          Respond to up to 10 customers
        </Typography>

        <Typography sx={{ mb: 1 }} className='text-sm text-black'>
          20% OFF and a get hired
        </Typography>

        <Typography className='text-sm text-black'>
          guarantee.
        </Typography>

        <Typography
          className='text-sm text-black mt-4 font-bold underline cursor-pointer'
          onClick={() => router.push('/wallet')}
        >
          More info
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OfferWidget;