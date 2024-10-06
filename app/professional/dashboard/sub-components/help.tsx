import { Box, Typography, Divider, Link } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouter } from 'next/navigation';

const Help = () => {
  const router = useRouter();
  return (
    <Box
      className="help-container bg-white rounded-lg border-2 border-gray-200  mt-6 p-8"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Help</Typography>
        <HelpOutlineIcon onClick={() => router.push("/help")} sx={{ fontSize: '1.5rem', color: '#1E2A32' }} />
      </Box>
      <Divider className='my-4' />
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Visit <Link href="/help" sx={{ fontWeight: 'bold', color: 'inherit' }}>help centre</Link> for tips & advice.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Email <Link href="mailto:provider@workalat.com" sx={{ fontWeight: 'bold', color: 'inherit' }}>provider@workalat.com</Link>
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Call <Link href="tel:07888859677" sx={{ fontWeight: 'bold', color: 'inherit' }}>078 888 59677</Link>
      </Typography>
      <Typography className='text-gray-500 text-sm mt-4'>
        open 24 hours a day, 7 days a week
      </Typography>
    </Box>
  );
};

export default Help;
