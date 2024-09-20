import { Box, Typography, Button, Divider } from '@mui/material';

const LeadsNotifier = () => {
  return (
    <Box
      className='w-full max-w-xs flex flex-col gap-2 p-6 bg-[#F2FAF2] rounded-lg'
    >
      <Box className="flex justify-between items-center" >
        <Typography className='text-lg font-bold'>Leads</Typography>
        <Button color='secondary'>
          View
        </Button>
      </Box>
      <Divider className='font-bold text-gray-400' />
      <Button
        variant="contained"
        color="secondary"
        className='mt-3'
      >
        10400
      </Button>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          marginTop: '8px',
        }}
      >
        Unread Leads
      </Typography>
    </Box>
  );
};

export default LeadsNotifier;
