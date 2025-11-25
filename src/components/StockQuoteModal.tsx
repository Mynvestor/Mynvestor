import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import BuySellButtons from './BuySellButtons';

export type Company = {
  name: string;
  ticker?: string;
  logo?: string;
  price?: string | number;
  change?: number;
  changePercent?: number;
  open?: string | number;
  high?: string | number;
  low?: string | number;
  volume?: number;
};

export default function StockQuoteModal({
  open,
  company,
  onClose,
  onOpenDetails,
}: {
  open: boolean;
  company?: Company | null;
  onClose: () => void;
  onOpenDetails?: () => void;
}) {
  if (!company) return null;
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>
        <Typography variant="h6">{company.name} Stock Quote</Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: 'background.default' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={company.logo} alt={company.name} variant="rounded" sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {company.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {company.ticker}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Current Price
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {company.price ?? '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Daily Change
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: (company.change ?? 0) > 0 ? 'success.main' : 'error.main' }}
            >
              {company.change != null ? `${company.change > 0 ? '+' : ''}${company.change}` : '-'}
              {company.changePercent != null ? ` (${company.changePercent > 0 ? '+' : ''}${company.changePercent}%)` : ''}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Open
            </Typography>
            <Typography variant="body2">{company.open ?? '-'}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              High
            </Typography>
            <Typography variant="body2">{company.high ?? '-'}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Low
            </Typography>
            <Typography variant="body2">{company.low ?? '-'}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Volume
            </Typography>
            <Typography variant="body2">{company.volume ?? '-'}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: 'background.paper' }}>
        <BuySellButtons
          onBuy={() => {
            // navigate to trade with prefill
            navigate('/trade', {
              state: { prefill: { symbol: company.ticker ?? company.name, name: company.name, action: 'Buy' } },
            });
            onClose();
          }}
          onSell={() => {
            navigate('/trade', {
              state: { prefill: { symbol: company.ticker ?? company.name, name: company.name, action: 'Sell' } },
            });
            onClose();
          }}
        />
        <Button variant="text" onClick={() => { onOpenDetails?.(); onClose(); }}>
          Full Details
        </Button>
      </DialogActions>
    </Dialog>
  );
}
