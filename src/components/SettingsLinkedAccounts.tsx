import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export default function SettingsLinkedAccounts() {
  return (
    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AccountBalanceIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Linked Accounts</Typography>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Bank Account</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Direct deposit and withdrawals</Typography>
            </Box>
            <Button variant="outlined">Manage</Button>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Mobile Money</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Airtel Money / TNM Mpamba</Typography>
            </Box>
            <Button startIcon={<PhoneAndroidIcon />} variant="contained">Link</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
