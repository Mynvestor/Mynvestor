import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';

export default function SupportContacts() {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Customer Support
      </Typography>

      <Stack spacing={2}>
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <EmailIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Email Support</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>support@mynvestor.com</Typography>
          </Box>
          <Button href="mailto:support@mynvestor.com" variant="outlined">Email</Button>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <PhoneIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Phone</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>+265 888 123 456</Typography>
          </Box>
          <Button href="tel:+265888123456" variant="outlined">Call</Button>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'warning.main' }}>
            <ChatIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Live Chat</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Available 9am — 5pm (M-W-F)</Typography>
          </Box>
          <Button variant="contained" color="primary">Start Chat</Button>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'info.main' }}>
            <AccessTimeIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Business Hours</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Mon — Fri, 9:00 — 17:00</Typography>
          </Box>
          <Button variant="outlined">View Hours</Button>
        </Paper>
      </Stack>
    </Box>
  );
}
