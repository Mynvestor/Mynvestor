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
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

export type TransactionDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  transactionData?: {
    id: string;
    date: string;
    method: string;
    type: 'Deposit' | 'Withdrawal';
    amount: string;
    status: 'Completed' | 'Pending' | 'Failed';
  };
};

const statusConfig = {
  Completed: { color: 'success' as const, label: 'Completed' },
  Pending: { color: 'warning' as const, label: 'Pending' },
  Failed: { color: 'error' as const, label: 'Failed' },
};

const typeConfig = {
  Deposit: { color: 'success' as const, label: 'Deposit' },
  Withdrawal: { color: 'error' as const, label: 'Withdrawal' },
};

export default function TransactionDetailsModal({
  open,
  onClose,
  transactionData,
}: TransactionDetailsModalProps) {
  if (!transactionData) return null;

  const isDeposit = transactionData.type === 'Deposit';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SwapVertRoundedIcon color="primary" />
        Transaction Details
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          {/* Transaction ID and Status Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Transaction ID
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                {transactionData.id}
              </Typography>
            </Box>
            <Chip
              label={statusConfig[transactionData.status].label}
              color={statusConfig[transactionData.status].color}
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
                {transactionData.date}
              </Typography>
            </Box>

            {/* Method */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Method
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {transactionData.method}
              </Typography>
            </Box>

            {/* Type */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Type
              </Typography>
              <Chip
                label={transactionData.type}
                color={typeConfig[transactionData.type].color}
                size="small"
                variant="outlined"
              />
            </Box>

            <Divider />

            {/* Amount */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Amount
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: isDeposit ? 'success.main' : 'error.main',
                }}
              >
                {isDeposit ? '+' : '-'} {transactionData.amount}
              </Typography>
            </Box>
          </Stack>

          {/* Status-specific messages */}
          {transactionData.status === 'Pending' && (
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
                ⏳ This transaction is pending. Please wait for confirmation.
              </Typography>
            </Box>
          )}
          {transactionData.status === 'Failed' && (
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
                ❌ This transaction has failed. Please try again or contact support.
              </Typography>
            </Box>
          )}
          {transactionData.status === 'Completed' && (
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
                ✅ This transaction has been completed successfully.
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
