import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export type OrderCostSummaryProps = {
  sharesValue: number | string;
  commission: number | string;
  transactionFee: number | string;
  totalCost: number | string;
  currency?: string;
};

export default function OrderCostSummary({
  sharesValue,
  commission,
  transactionFee,
  totalCost,
  currency = 'MK',
}: OrderCostSummaryProps) {
  const theme = useTheme();

  const formatValue = (value: number | string) => {
    if (typeof value === 'number') {
      return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return value;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          {/* Shares Value */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Total Shares Value:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatValue(sharesValue)}
            </Typography>
          </Stack>

          {/* Commission */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Commission (1-2%):
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatValue(commission)}
            </Typography>
          </Stack>

          {/* Transaction Fee */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Transaction Fee:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatValue(transactionFee)}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* Total Cost */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Total Cost:
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              {formatValue(totalCost)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
