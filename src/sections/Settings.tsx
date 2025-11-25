import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import SettingsAccount from '../components/SettingsAccount';
import SettingsSecurity from '../components/SettingsSecurity';
import SettingsNotifications from '../components/SettingsNotifications';
import SettingsLinkedAccounts from '../components/SettingsLinkedAccounts';
import SettingsDangerZone from '../components/SettingsDangerZone';

export default function Settings() {
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
      <Header section="Settings" />

      <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Account Settings</Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            alignItems: 'start',
          }}
        >
          <Box>
            <SettingsAccount />
          </Box>

          <Box>
            <SettingsSecurity />
          </Box>

          <Box>
            <SettingsNotifications />
          </Box>

          <Box>
            <SettingsLinkedAccounts />
          </Box>

          <Box sx={{ gridColumn: '1 / -1' }}>
            <SettingsDangerZone />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
