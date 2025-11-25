import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BuySellButtons from './BuySellButtons';

export interface PortfolioPosition {
  id: string;
  name: string;
  logo: string;
  shares: number;
  pricePerShare: string;
  totalValue: string;
  dailyChange: string;
  dailyChangePercent: string;
  isPositive: boolean;
}

interface PortfolioPositionCardProps {
  position: PortfolioPosition;
  onBuy?: (id: string) => void;
  onSell?: (id: string) => void;
}

export default function PortfolioPositionCard({
  position,
  onBuy,
  onSell,
}: PortfolioPositionCardProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(33, 150, 243, 0.15)'
            : '0 8px 24px rgba(33, 150, 243, 0.1)',
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Company Info */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Box
              component="img"
              src={position.logo}
              alt={position.name}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                objectFit: 'cover',
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {position.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {position.shares} shares @ {position.pricePerShare} each
              </Typography>
            </Stack>
          </Stack>

          {/* Stats Row */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              p: 2,
              borderRadius: 1.5,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? `rgba(255, 255, 255, 0.02)`
                  : `rgba(0, 0, 0, 0.02)`,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {/* Total Value */}
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Total Value
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                {position.totalValue}
              </Typography>
            </Stack>

            {/* Daily Change */}
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Daily Change
              </Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <Chip
                  size="small"
                  icon={
                    position.isPositive ? (
                      <TrendingUpIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 16 }} />
                    )
                  }
                  label={`${position.dailyChange} (${position.dailyChangePercent})`}
                  color={position.isPositive ? 'success' : 'error'}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Action Buttons */}
          <Box>
            {/* Reuse the shared buy/sell buttons UI and forward callbacks */}
            <BuySellButtons
              onBuy={() => onBuy?.(position.id)}
              onSell={() => onSell?.(position.id)}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
