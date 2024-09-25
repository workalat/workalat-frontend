'use client';

import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const VerificationWidget = () => {
  const theme = useTheme();
  const verifications = [
    { name: 'Top Professional', status: 'join' },
    { name: 'Identity Verified', status: 'verified' },
    { name: 'Phone Verified', status: 'verified' },
    { name: 'Email Verified', status: 'verified' },
    { name: 'Payment Verified', status: 'unverified' },
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
        ))}
      </List>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          
          marginTop: 2,
        }}
        className='bg-secondary text-black'
      >
        Get Certified
      </Button>
    </Box>
  );
};

export default VerificationWidget;