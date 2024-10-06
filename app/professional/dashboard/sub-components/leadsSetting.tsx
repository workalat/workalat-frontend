'use client';

import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

const LeadsSetting = () => {
  const services = [
    'Search Engine Optimization (SEO) Specialists',
    'E Commerce',
    'Development',
    '+23481234567'
  ];

  const locations = ['Nationwide', 'Newport'];

  const router = useRouter();

  return (
    <Box className=" bg-[#EEEEEE] p-8 rounded-lg w-full max-w-2xl max-h-[600px] overflow-hidden">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography className='text-lg font-bold'>Leads Settings</Typography>
        <Button onClick={() => router.push("/professional/account_settings")} className='text-sm' color='secondary'>Edit</Button>
      </Box>

      <Divider />

      <Box mt={2} mb={3}>
        <Typography gutterBottom className='text-lg font-bold'>Services</Typography>
        <Typography className='text-sm mt-3' mb={1}>
          You&apos;ll receive leads in these categories
        </Typography>
        <Box className='mt-3 flex flex-wrap gap-2'>
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-main text-white text-sm rounded-lg px-3 py-1"
            >
              {service}
            </div>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box mt={2} mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography className='text-lg font-bold' gutterBottom>Locations</Typography>
          <Button onClick={() => router.push("/professional/account_settings")} className='text-sm' color='secondary'>Edit</Button>
        </Box>
        <Typography className='text-sm mt-3' mb={1}>
          You&apos;re receiving customers within these locations
        </Typography>
        <Box className='mt-3 flex flex-wrap gap-2'>
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-main text-white text-sm rounded-lg px-3 py-1"
            >
              {location}
            </div>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box mt={2}>
        <Typography className='text-lg font-bold' gutterBottom>
          Estimated 1027 leads per day
        </Typography>
        <Box display="flex" alignItems="center" gap={2} className='mt-3'>
          <Typography className='text-sm'>info@anitamika.site</Typography>
          <Button onClick={() => router.push("/professional/account_settings")} className='bg-main text-white rounded-lg text-sm'>
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadsSetting;
