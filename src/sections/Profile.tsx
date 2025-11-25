import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import KYCForm from '../components/KYCForm';
import DocumentDownloads from '../components/DocumentDownloads';

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'stretch',
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Profile" />

      <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
        <Alert
          severity="info"
          action={<Button color="inherit" size="small" onClick={() => navigate('/kyc')}>Complete KYC</Button>}
          sx={{ mb: 2 }}
        >
          Complete KYC to unlock all features
        </Alert>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Your KYC & Account</Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            alignItems: 'start',
          }}
        >
          <Box>
            <KYCForm readOnly />
          </Box>
          <Box>
            <DocumentDownloads />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
