import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function SettingsDangerZone() {
  return (
    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,82,82,0.05)' : 'rgba(255,82,82,0.02)' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <WarningAmberIcon color="error" />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>Danger zone</Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Delete your account permanently. This action cannot be undone.</Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined">Disable account</Button>
          <Button variant="contained" color="error">Delete account</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
