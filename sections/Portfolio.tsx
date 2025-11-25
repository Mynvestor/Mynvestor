import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header';
import PortfolioSummary from '../components/PortfolioSummary';
import PortfolioCharts from '../components/PortfolioCharts';
import PortfolioPositionCard, { PortfolioPosition } from '../components/PortfolioPositionCard';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();
  const [loading] = useState(false);
  
  // Mock data - replace with actual API calls
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
    { name: 'Airtel Malawi', value: 6405.50 },
    { name: 'National Bank', value: 12400.22 },
    { name: 'Telekom Networks', value: 2500.00 },
    { name: 'Illovo Sugar', value: 1791.69 },
    { name: 'Press Corp', value: 2500.03 },
  ];

  const positions: PortfolioPosition[] = [
    {
      id: 'airtel',
      name: 'Airtel Malawi Ltd',
      logo: '/images/logos/airtel.jpg',
      shares: 50,
      pricePerShare: 'MK 128.11',
      totalValue: 'MK 6,405.50',
      dailyChange: '+MK 160.00',
      dailyChangePercent: '+2.56%',
      isPositive: true,
    },
    {
      id: 'nbm',
      name: 'National Bank Ltd',
      logo: '/images/logos/nb.png',
      shares: 2,
      pricePerShare: 'MK 6,200.11',
      totalValue: 'MK 12,400.22',
      dailyChange: '+MK 300.00',
      dailyChangePercent: '+2.48%',
      isPositive: true,
    },
    {
      id: 'tnm',
      name: 'Telekom Networks Ltd',
      logo: '/images/logos/tnm.png',
      shares: 100,
      pricePerShare: 'MK 25.00',
      totalValue: 'MK 2,500.00',
      dailyChange: '+MK 62.00',
      dailyChangePercent: '+2.54%',
      isPositive: true,
    },
    {
      id: 'illovo',
      name: 'Illovo Sugar Ltd',
      logo: '/images/logos/illovo.png',
      shares: 1,
      pricePerShare: 'MK 1,791.69',
      totalValue: 'MK 1,791.69',
      dailyChange: '-MK 35.80',
      dailyChangePercent: '-1.96%',
      isPositive: false,
    },
    {
      id: 'pcl',
      name: 'Press Corp Ltd',
      logo: '/images/logos/pcl.png',
      shares: 1,
      pricePerShare: 'MK 2,500.03',
      totalValue: 'MK 2,500.03',
      dailyChange: '-MK 50.00',
      dailyChangePercent: '-1.96%',
      isPositive: false,
    },
  ];

  const handleBuy = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    if (pos) {
      // navigate to Trade with prefilled company and action
      navigate('/app/trade', { state: { prefill: { symbol: pos.name, name: pos.name, action: 'Buy' } } });
    }
  };

  const handleSell = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    if (pos) {
      navigate('/app/trade', { state: { prefill: { symbol: pos.name, name: pos.name, action: 'Sell' } } });
    }
  };

  if (loading) {
    return (
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
        <Typography>Loading portfolio...</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={3}
      sx={{
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Portfolio" />

      {/* Portfolio Summary */}
      <PortfolioSummary {...portfolioMetrics} />

      {/* Charts Section */}
      <PortfolioCharts
        performanceData={performanceData}
        assetAllocation={assetAllocation}
      />

      {/* Positions Section */}
      <Stack spacing={2}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              p: 0.75,
              borderRadius: 1,
              backgroundColor: (theme) => `${theme.palette.primary.main}20`,
            }}
          >
            📋
          </Box>
          Your Positions
        </Typography>

        {positions.length === 0 ? (
          <Alert severity="info">
            No positions found. Start building your portfolio by making your first trade!
          </Alert>
        ) : (
          <Stack spacing={2}>
            {positions.map((position) => (
              <PortfolioPositionCard
                key={position.id}
                position={position}
                onBuy={handleBuy}
                onSell={handleSell}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
