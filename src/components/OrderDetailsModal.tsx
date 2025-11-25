import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';

export type OrderDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  orderData?: {
    id: string;
    date: string;
    company: string;
    action: 'Buy' | 'Sell';
    orderType: string;
    quantity: number;
    totalCost: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
  };
};

const statusConfig = {
  Completed: { color: 'success' as const, label: 'Completed' },
  Pending: { color: 'warning' as const, label: 'Pending' },
  Cancelled: { color: 'error' as const, label: 'Cancelled' },
};

export default function OrderDetailsModal({
  open,
  onClose,
  orderData,
}: OrderDetailsModalProps) {
  if (!orderData) return null;

  const isBuy = orderData.action === 'Buy';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptRoundedIcon color="primary" />
        Order Details
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          {/* Order ID and Status Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                {orderData.id}
              </Typography>
            </Box>
            <Chip
              label={statusConfig[orderData.status].label}
              color={statusConfig[orderData.status].color}
              size="small"
            />
          </Box>

          <Divider />

          {/* Details Grid */}
          <Stack spacing={1.5}>
            {/* Date */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {orderData.date}
              </Typography>
            </Box>

            {/* Company */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Company
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {orderData.company}
              </Typography>
            </Box>

            {/* Action */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Action
              </Typography>
              <Chip
                label={orderData.action}
                color={isBuy ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </Box>

            {/* Order Type */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Order Type
              </Typography>
              <Typography variant="body2">{orderData.orderType}</Typography>
            </Box>

            {/* Quantity */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Quantity
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {orderData.quantity} shares
              </Typography>
            </Box>

            <Divider />

            {/* Total Cost */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Total Cost
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {orderData.totalCost}
              </Typography>
            </Box>
          </Stack>

          {/* Status-specific messages */}
          {orderData.status === 'Pending' && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'warning.main',
                color: 'warning.contrastText',
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography variant="caption">
                ⏳ This order is pending. It will be processed soon.
              </Typography>
            </Box>
          )}
          {orderData.status === 'Cancelled' && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'error.main',
                color: 'error.contrastText',
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography variant="caption">
                ❌ This order has been cancelled.
              </Typography>
            </Box>
          )}
          {orderData.status === 'Completed' && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'success.main',
                color: 'success.contrastText',
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Typography variant="caption">
                ✅ This order has been completed successfully.
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} fullWidth variant="contained" color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
