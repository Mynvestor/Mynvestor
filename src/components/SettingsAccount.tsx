import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function SettingsAccount() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' });

  return (
    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>{profile.name.charAt(0)}</Avatar>
        <Box sx={{ flex: 1 }}>
          {!editing ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{profile.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{profile.email}</Typography>
            </>
          ) : (
            <Stack spacing={1}>
              <TextField label="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} fullWidth />
              <TextField label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} fullWidth />
            </Stack>
          )}
        </Box>

        {!editing ? (
          <Button startIcon={<EditIcon />} onClick={() => setEditing(true)}>
            Edit
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => setEditing(false)}>Cancel</Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={() => setEditing(false)}>Save</Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
