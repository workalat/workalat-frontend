'use client';

import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const VerificationWidget = ({ isClientDashboard ,data, userType}) => {
  const theme = useTheme();
  let router = useRouter();
  console.log(data);
  const verifications = [
    { name: 'Top Professional', status: 'join' },
    { name: 'Identity Verified', status: (data.isProfileComplete ? 'verified' :'unverified') },
    { name: 'Phone Verified', status: (data.isPhoneVerify ? 'verified' :'unverified') },
    { name: 'Email Verified', status: (data.isEmailVerify ? 'verified' :'unverified') },
    { name: 'Payment Verified', status: (data.isPaymentVerify ? 'verified' :'unverified') },
  ];

  return (
    <Box
      sx={{
        
        borderRadius: 2,
        padding: 2,
        color: 'white',
        width: '100%',
        maxWidth: 350, // Increased from 300
      }}
      className='bg-main'
    >
      <Typography  className='text-white font-semibold text-lg' gutterBottom>
        Verifications
      </Typography>
      <List className='font-light'>
        {verifications.map((item, index) => (
          isClientDashboard && index === 0 ? null : (
          <ListItem key={index} disablePadding>
            <ListItemText primary={item.name} />
            <ListItemIcon>
              {item.status === 'verified' && (
                <CheckIcon className='text-secondary' />
              )}
              {item.status === 'unverified' && (
                <CloseIcon className='text-secondary' />
              )}
              {item.status === 'join' && (
                <Button
                  variant="text"
                  
                  className='text-secondary text-md mr-3'
                >
                  Join
                </Button>
              )}
            </ListItemIcon>
          </ListItem>
        )))}
      </List>
      {
        (userType === "client")
        ?
        
      <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        
        marginTop: 2,
      }}
      className='bg-secondary text-black'
      onClick={()=>{router.push(`/client/account_settings`)}}
    >
      Get Verified
    </Button>
    :
    
    <Button
    variant="contained"
    fullWidth
    sx={{
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      
      marginTop: 2,
    }}
    className='bg-secondary text-black'
    onClick={()=>{router.push(`/professional/account_settings`)}}
  >
    Get Verified
  </Button>
      }
    </Box>
  );
};

export default VerificationWidget;