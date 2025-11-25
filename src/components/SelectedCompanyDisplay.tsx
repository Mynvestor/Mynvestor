import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export type SelectedCompanyDisplayProps = {
  symbol: string;
  name?: string;
  price: string | number;
  priceChange: number;
  priceChangePercent?: number;
  chartData?: number[];
};

export default function SelectedCompanyDisplay({
  symbol,
  name,
  price,
  priceChange,
  priceChangePercent,
  chartData = [10, 14, 11, 18, 15, 20, 18],
}: SelectedCompanyDisplayProps) {
  const theme = useTheme();
  const isUp = priceChange >= 0;

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      }}
    >
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {symbol}
            </Typography>
            {name && (
              <Typography variant="caption" color="text.secondary">
                {name}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {typeof price === 'number' ? `MK${price.toLocaleString()}` : price}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {isUp ? (
                  <ArrowUpwardRoundedIcon color="success" sx={{ fontSize: '1.2rem' }} />
                ) : (
                  <ArrowDownwardRoundedIcon color="error" sx={{ fontSize: '1.2rem' }} />
                )}
                <Typography
                  variant="subtitle2"
                  sx={{ color: isUp ? 'success.main' : 'error.main', fontWeight: 600 }}
                >
                  {isUp ? '+' : ''}{priceChange}{priceChangePercent != null ? ` (${priceChangePercent > 0 ? '+' : ''}${priceChangePercent}%)` : ''}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Mini Chart */}
          <Box sx={{ width: { xs: '100%', sm: 120 }, height: 50 }}>
            <SparkLineChart
              data={chartData}
              width={120}
              height={50}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              color={isUp ? theme.palette.success.main : theme.palette.error.main}
              sx={{
                '& .MuiSparkLineChart-root': {
                  width: '100% !important',
                },
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
