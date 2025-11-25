import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';

export default function Market() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: 'center',
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Market" />
      <MainGrid />
    </Stack>
  );
}
