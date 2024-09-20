import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';

interface SnackbarContextType {
  generateSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<{ message: string; severity?: AlertProps['severity'] }>({
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const generateSnackbar = (message: string, severity: AlertProps['severity'] = 'success') => {
    setSnackbarConfig({ message, severity });
    setOpenSnackbar(true);
  };

  return (
    <SnackbarContext.Provider value={{ generateSnackbar }}>
      {children}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          severity={snackbarConfig.severity} 
          sx={{ width: '100%' }}
          variant="filled"
          className='font-sans'
          onClose={handleCloseSnackbar} 
        >
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};
