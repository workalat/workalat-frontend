import { Box, Typography, Divider, Link } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Help = () => {
  return (
    <Box
      className="help-container bg-white rounded-lg border-2 border-gray-200  mt-6 p-8"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Help</Typography>
        <HelpOutlineIcon sx={{ fontSize: '1.5rem', color: '#1E2A32' }} />
      </Box>
      <Divider className='my-4' />
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Visit <Link href="#" sx={{ fontWeight: 'bold', color: 'inherit' }}>help centre</Link> for tips & advice.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Email <Link href="mailto:team@whatworks.com" sx={{ fontWeight: 'bold', color: 'inherit' }}>team@whatworks.com</Link>
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Call <Link href="tel:06036960234" sx={{ fontWeight: 'bold', color: 'inherit' }}>060 3696 0234</Link>
      </Typography>
      <Typography className='text-gray-500 text-sm mt-4'>
        open 24 hours a day, 7 days a week
      </Typography>
    </Box>
  );
};

export default Help;
