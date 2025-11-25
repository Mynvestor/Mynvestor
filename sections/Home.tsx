import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PortfolioSummary from '../components/PortfolioSummary';
import PortfolioCharts from '../components/PortfolioCharts';
import WatchlistManager from '../components/WatchlistManager';
import ReportsAnnouncements from '../components/ReportsAnnouncements';
import NewLessons from '../components/NewLessons';

export default function Home() {
  const navigate = useNavigate();
  // Portfolio metrics (can be fetched from API)
  const portfolioMetrics = {
    totalValue: 'MK 26,185.56',
    cashBalance: 'MK 4,364.26',
    dailyChange: '+MK 576.87',
    dailyChangePercent: '+2.51%',
    isPositive: true,
  };

  const performanceData = [
    { date: 'Mon', value: 25609 },
    { date: 'Tue', value: 25784 },
    { date: 'Wed', value: 25821 },
    { date: 'Thu', value: 25892 },
    { date: 'Fri', value: 26003 },
    { date: 'Sat', value: 26108 },
    { date: 'Sun', value: 26185 },
  ];

  const assetAllocation = [
    { name: 'Airtel Malawi', value: 6405.5 },
    { name: 'National Bank', value: 12400.22 },
    { name: 'Telekom Networks', value: 2500.0 },
  ];

  const marketHighlights = [
    { title: 'MASI', value: '+1.2%', trend: 'up' },
    { title: 'FSI', value: '-0.4%', trend: 'down' },
    { title: 'DSI', value: '+0.1%', trend: 'up' },
  ];

  return (
    <Stack
      spacing={3}
      sx={{
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Home" />

      <Alert
        severity="info"
        action={<Button color="inherit" size="small" onClick={() => navigate('/kyc')}>Complete KYC</Button>}
        sx={{ mb: 2 }}
      >
        Complete KYC to unlock all features
      </Alert>

      {/* Main content grid */}
      <Grid container spacing={3} columns={12}>
        {/* Left column - Account & Portfolio */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Account Overview */}
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Account Overview</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Status: <Box component="span" sx={{ fontWeight: 700, color: 'success.main' }}>Active</Box>
                </Typography>
                <PortfolioSummary {...portfolioMetrics} />
              </CardContent>
            </Card>

            {/* Portfolio Performance */}
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Portfolio Performance</Typography>
                <PortfolioCharts performanceData={performanceData} assetAllocation={assetAllocation} />
              </CardContent>
            </Card>

            {/* Reports & Announcements - Interactive with downloads */}
            <ReportsAnnouncements />
          </Stack>
        </Grid>

        {/* Right column - Market Overview, Watchlist, Lessons */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Market Overview */}
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Market Overview</Typography>
                <Stack spacing={1}>
                  {marketHighlights.map((h) => (
                    <Box
                      key={h.title}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      <Typography sx={{ fontWeight: 500 }}>{h.title}</Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: h.trend === 'up' ? 'success.main' : 'error.main',
                        }}
                      >
                        {h.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Editable Watchlist */}
            <WatchlistManager />

            {/* New Lessons - Interactive enrollment */}
            <NewLessons />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}