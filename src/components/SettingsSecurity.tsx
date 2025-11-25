import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';

export default function SettingsSecurity() {
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

  const handleChange = () => {
    // placeholder - implement validation/server call as needed
    setChangingPassword(false);
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <LockIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Security</Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Change your password and manage two-factor authentication (2FA).</Typography>

        {!changingPassword ? (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setChangingPassword(true)}>Change password</Button>
            <Button variant="contained">Enable 2FA</Button>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <TextField label="Current password" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} fullWidth />
            <TextField label="New password" type="password" value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} fullWidth />
            <TextField label="Confirm password" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} fullWidth />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setChangingPassword(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleChange}>Save</Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
