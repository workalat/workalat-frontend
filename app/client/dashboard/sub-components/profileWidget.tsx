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
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';

const ProfileWidget = ({data, userType}) => {
  const router = useRouter();
  const sanitizedBio = DOMPurify.sanitize(data.userBio);
  let profile = 20;
  (data.isEmailVerify ? profile +=20 : profile +=0);
  (data.isPhoneVerify ? profile +=20 : profile +=0);
  (data.isProfileComplete ? profile +=20 : profile +=0);
  (data.isPaymentVerify ? profile +=20 : profile +=0);
 
  return (
    <Card sx={{ width: '100%', maxWidth: 800, borderRadius: 2 }} className=' border-1 border-gray-300 p-2'>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography className='text-lg font-bold capitalize'>
            {data.userName}
          </Typography>
          <Box className="flex flex-wrap justify-end sm:justify-start">
            <IconButton size="small" href='/profile' >
              <ShareIcon />
            </IconButton>
            <Button 
              variant="contained" 
              className="bg-secondary  text-black hover:bg-secondary-dark ml-1"
              onClick={()=>router.push(`/${userType}/account_settings`)} 
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Typography className='text-md font-semibold mb-3' color="text.secondary" gutterBottom>
          {
            (data.userService)
            ? 
            data.userService
            :
            ""
          }
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Rating precision={0.1} value={(data.totalRatings / data.totalReviews )} readOnly />
          <Typography  className='text-sm' color="text.secondary" ml={1}>
          {((data.totalRatings  === 0)? 0 :  data.totalRatings / data.totalReviews )} ( {(data.totalReviews)} reviews)
          </Typography>
        </Box>

        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography className='text-sm font-bold'>
              Your profile is {profile} complete
            </Typography>
            <IconButton size="small" onClick={()=>router.push(`/client/account_settings`)} >
              <EditIcon />
            </IconButton>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={profile} 
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
            
        <Typography className='text-sm capitalize' variant="body1"  dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
      </CardContent>
    </Card>
  );
};

export default ProfileWidget;