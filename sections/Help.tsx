import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Header from '../components/Header';
import FAQAccordion from '../components/FAQAccordion';
import FeedbackForm from '../components/FeedbackForm';
import SupportContacts from '../components/SupportContacts';

export default function Help() {
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
      <Header section="Help" />

      <Box sx={{ maxWidth: 1000, mx: 'auto', width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Need help? We’re here for you
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Find quick answers in our FAQs, send feedback, or contact customer support directly.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Frequently Asked Questions
            </Typography>
            <FAQAccordion />

            <Divider sx={{ my: 3 }} />

            <FeedbackForm />
          </Box>

          <Box>
            <SupportContacts />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
