"use client"
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  LinearProgress, 
  IconButton 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

const ProfileWidget = () => {
  const router = useRouter();

  return (
    <Card sx={{ width: '100%', maxWidth: 800, borderRadius: 2 }} className=' border-1 border-gray-300 p-2'>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography className='text-lg font-bold'>
            Anita Maika Services
          </Typography>
          <Box>
            <IconButton size="small" href='/profile' >
              <ShareIcon />
            </IconButton>
            <Button 
              variant="contained" 
              className="bg-secondary  text-black hover:bg-secondary-dark ml-1"
              onClick={()=>router.push("/account_settings")} 
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Typography className='text-md font-semibold mb-3' color="text.secondary" gutterBottom>
          Professional Dry Cleaner in Kent
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Rating value={2} readOnly />
          <Typography  className='text-sm' color="text.secondary" ml={1}>
            2.0 (3 reviews)
          </Typography>
        </Box>

        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography className='text-sm font-bold'>
              Your profile is 80% complete
            </Typography>
            <IconButton size="small" onClick={()=>router.push("/account_settings")} >
              <EditIcon />
            </IconButton>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={80} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'grey.300',
            }}
            classes={{
              bar: 'bg-secondary'
            }}
          />
        </Box>

        <Typography className='text-sm' variant="body1">
          I have extensive experience designing and developing using HTML5, CSS3,
          Javascript, JQuery, Angular, Flutter Dart, WordPress, Web fonts, Adobe After
          Effects, Adobe Illustrator and Adobe Photoshop, IT Security deployment,
          Vulnerability Asessemnet, Penetration testing.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileWidget;