import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function SettingsNotifications() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [inApp, setInApp] = useState(true);

  const handleSave = () => {
    // placeholder for saving preferences
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <NotificationsActiveIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Notifications</Typography>
        </Stack>

        <FormControlLabel control={<Switch checked={email} onChange={(e) => setEmail(e.target.checked)} />} label="Email notifications" />
        <FormControlLabel control={<Switch checked={sms} onChange={(e) => setSms(e.target.checked)} />} label="SMS notifications" />
        <FormControlLabel control={<Switch checked={inApp} onChange={(e) => setInApp(e.target.checked)} />} label="In-app notifications" />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Stack>
    </Box>
  );
}
