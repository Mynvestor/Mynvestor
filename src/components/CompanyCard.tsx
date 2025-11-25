import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

export type CompanyCardProps = {
  name: string;
  ticker?: string;
  logo?: string; // path or URL to image
  price: string | number;
  change: number; // absolute change (e.g. +3.2 or -1.5)
  changePercent?: number; // e.g. 2.56
  onClick?: () => void;
};

export default function CompanyCard({
  name,
  ticker,
  logo,
  price,
  change,
  changePercent,
  onClick,
}: CompanyCardProps) {
  const isUp = change > 0;

  return (
    <Card variant="outlined" sx={{ p: 0 }}>
      <CardActionArea
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={logo}
            alt={`${name} logo`}
            variant="rounded"
            sx={{ width: 48, height: 48, mr: 1 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            {ticker && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {ticker}
              </Typography>
            )}
          </Box>
        </Stack>

        <Box sx={{ textAlign: 'right', ml: 2, minWidth: 110 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {typeof price === 'number' ? price.toLocaleString() : price}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
            {isUp ? (
              <ArrowUpwardRoundedIcon color="success" sx={{ fontSize: '1rem' }} />
            ) : (
              <ArrowDownwardRoundedIcon color="error" sx={{ fontSize: '1rem' }} />
            )}
            <Typography
              variant="body2"
              sx={{ color: isUp ? 'success.main' : 'error.main', fontWeight: 600 }}
            >
              {change > 0 ? `+${change}` : change}
              {changePercent != null ? ` (${changePercent > 0 ? '+' : ''}${changePercent}%)` : ''}
            </Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
