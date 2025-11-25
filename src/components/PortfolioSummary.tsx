import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WalletIcon from '@mui/icons-material/Wallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export interface PortfolioMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: 'success' | 'error' | 'primary' | 'warning';
}

interface PortfolioSummaryProps {
  totalValue: string;
  cashBalance: string;
  dailyChange: string;
  dailyChangePercent: string;
  isPositive: boolean;
}

export default function PortfolioSummary({
  totalValue,
  cashBalance,
  dailyChange,
  dailyChangePercent,
  isPositive,
}: PortfolioSummaryProps) {
  const theme = useTheme();

  const metrics: PortfolioMetric[] = [
    {
      label: 'Total Value',
      value: totalValue,
      icon: <WalletIcon sx={{ fontSize: 24 }} />,
      color: 'primary',
    },
    {
      label: 'Cash Balance',
      value: cashBalance,
      icon: <AttachMoneyIcon sx={{ fontSize: 24 }} />,
      color: 'success',
    },
    {
      label: 'Daily Change',
      value: `${dailyChange} (${dailyChangePercent})`,
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
      color: isPositive ? 'success' : 'error',
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(33, 150, 243, 0.05) 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(33, 150, 243, 0.03) 100%)`,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: `${theme.palette.primary.main}20`,
              }}
            >
              <WalletIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            </Box>
            Portfolio Overview
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {metrics.map((metric, index) => (
              <Stack
                key={index}
                spacing={0.5}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? `rgba(255, 255, 255, 0.02)`
                      : `rgba(0, 0, 0, 0.02)`,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? `rgba(33, 150, 243, 0.08)`
                        : `rgba(33, 150, 243, 0.05)`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
                  <Box
                    sx={{
                      color:
                        metric.color === 'success'
                          ? 'success.main'
                          : metric.color === 'error'
                            ? 'error.main'
                            : 'primary.main',
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {metric.label}
                  </Typography>
                </Stack>
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      metric.color === 'success'
                        ? 'success.main'
                        : metric.color === 'error'
                          ? 'error.main'
                          : 'text.primary',
                    fontWeight: 700,
                  }}
                >
                  {metric.value}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
