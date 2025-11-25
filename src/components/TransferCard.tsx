import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
export default function TransferCard({
  title,
  description,
  logo,
  color = 'primary',
  onDeposit,
  onWithdraw,
}: {
  title: string;
  description?: string;
  logo?: string;
  color?: 'primary' | 'success' | 'error' | 'warning';
  onDeposit?: () => void;
  onWithdraw?: () => void;
}) {

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={logo} variant="rounded" sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color={color as any}
              startIcon={<ArrowDownwardIcon />}
              onClick={onDeposit}
            >
              Deposit
            </Button>
            <Button
              variant={color === 'primary' ? 'contained' : 'outlined'}
              color={color as any}
              startIcon={<ArrowUpwardIcon />}
              onClick={onWithdraw}
            >
              Withdraw
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
