import { useState, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Header from '../components/Header';
import TransferCard from '../components/TransferCard';
import TransactionDetailsModal from '../components/TransactionDetailsModal';

type Transaction = {
  id: string;
  date: string;
  method: string;
  type: 'Deposit' | 'Withdrawal';
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export default function Transactions() {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [phoneOption, setPhoneOption] = useState('default'); // 'default' or 'custom'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionPage, setTransactionPage] = useState(1);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Transaction Details Modal state
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  // Mock registered phone numbers (from user profile)
  const registeredPhones = [
    { id: 'airtel', label: 'Airtel Money (+265 9 XXXX XXXX)', number: '+2659123456789' },
    { id: 'mpamba', label: 'TNM Mpamba (+265 8 XXXX XXXX)', number: '+2658987654321' },
  ];

  const mockTransactions: Transaction[] = [
    { id: '1', date: '2025-03-20', method: 'Mpamba', type: 'Deposit', amount: 'MK50,000', status: 'Completed' },
    { id: '2', date: '2025-03-19', method: 'Airtel Money', type: 'Withdrawal', amount: 'MK30,000', status: 'Pending' },
    { id: '3', date: '2025-03-18', method: 'Mpamba', type: 'Deposit', amount: 'MK25,000', status: 'Completed' },
    { id: '4', date: '2025-03-17', method: 'Airtel Money', type: 'Withdrawal', amount: 'MK15,000', status: 'Failed' },
    { id: '5', date: '2025-03-16', method: 'Mpamba', type: 'Deposit', amount: 'MK35,000', status: 'Completed' },
    { id: '6', date: '2025-03-15', method: 'Airtel Money', type: 'Withdrawal', amount: 'MK20,000', status: 'Completed' },
  ];

  // Pagination for transactions
  const itemsPerPage = 4;
  const paginatedTransactions = useMemo(() => {
    const startIndex = (transactionPage - 1) * itemsPerPage;
    return mockTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [transactionPage]);

  const totalTransactionPages = Math.ceil(mockTransactions.length / itemsPerPage);

  const openDepositFor = (method: string) => {
    setSelectedMethod(method);
    setPhoneOption('default');
    setPhoneNumber('');
    setOpenDeposit(true);
  };

  const openWithdrawFor = (method: string) => {
    setSelectedMethod(method);
    setPhoneOption('default');
    setPhoneNumber('');
    setOpenWithdraw(true);
  };

  const handleConfirm = () => {
    // Validate inputs
    if (!amount) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please enter an amount');
      setSnackbarOpen(true);
      return;
    }

    const selectedPhone = phoneOption === 'default' ? registeredPhones[0].number : phoneNumber;
    if (!selectedPhone) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please select or enter a phone number');
      setSnackbarOpen(true);
      return;
    }

    // Show success snackbar (simulating successful transfer)
    setSnackbarSeverity('success');
    setSnackbarMessage(`Transfer of ${amount} successful via ${selectedMethod}`);
    setSnackbarOpen(true);

    // Reset and close dialogs
    setAmount('');
    setPhoneOption('default');
    setPhoneNumber('');
    setOpenDeposit(false);
    setOpenWithdraw(false);
  };

  const handleSnackbarClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        mx: { xs: 2, sm: 3 },
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Transactions" />

      {/* Minimal Layout: Transfer Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 1.5, sm: 2 },
          width: '100%',
          maxWidth: '900px',
          mx: 'auto',
        }}
      >
        <TransferCard
          title="Airtel Money"
          description="Instant transfers"
          logo={'/images/logos/airtel.jpg'}
          color="error"
          onDeposit={() => openDepositFor('Airtel Money')}
          onWithdraw={() => openWithdrawFor('Airtel Money')}
        />

        <TransferCard
          title="TNM Mpamba"
          description="Instant transfers"
          logo={'/images/logos/tnm.png'}
          color="success"
          onDeposit={() => openDepositFor('Mpamba')}
          onWithdraw={() => openWithdrawFor('Mpamba')}
        />
      </Box>

      {/* Collapsible Transaction History */}
      <Accordion
        defaultExpanded={false}
        sx={{
          maxWidth: '900px',
          mx: 'auto',
          width: '100%',
          boxShadow: 0,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Recent Transfers
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} sx={{ width: '100%' }}>
            {/* Responsive Table */}
            <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 'auto', sm: 500 } }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                    <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Amount</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedTransactions.map((t) => (
                      <TableRow
                        key={t.id}
                        hover
                        onClick={() => {
                          setSelectedTransaction(t);
                          setOpenTransactionModal(true);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: 'inherit' } }}>
                        {t.date}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{t.method}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>
                        {t.type}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>
                        {t.amount}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={t.status}
                          size="small"
                          color={t.status === 'Completed' ? 'success' : t.status === 'Pending' ? 'warning' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {totalTransactionPages > 1 && (
              <Stack direction="row" justifyContent="center">
                <Pagination
                  count={totalTransactionPages}
                  page={transactionPage}
                  onChange={(_, page) => setTransactionPage(page)}
                  color="primary"
                  size="small"
                />
              </Stack>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Deposit Dialog */}
      <Dialog open={openDeposit} onClose={() => setOpenDeposit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Deposit - {selectedMethod}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {/* Amount Input */}
            <TextField
              autoFocus
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Phone Number Selection */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Phone Number
              </Typography>
              <RadioGroup value={phoneOption} onChange={(e) => setPhoneOption(e.target.value)}>
                {registeredPhones.map((phone) => (
                  <FormControlLabel
                    key={phone.id}
                    value="default"
                    control={<Radio />}
                    label={phone.label}
                  />
                ))}
                <FormControlLabel value="custom" control={<Radio />} label="Enter a different number" />
              </RadioGroup>

              {/* Custom Phone Number Input */}
              {phoneOption === 'custom' && (
                <TextField
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  placeholder="+265..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ mt: 1 }}
                />
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeposit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Withdraw - {selectedMethod}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {/* Amount Input */}
            <TextField
              autoFocus
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Phone Number Selection */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Phone Number
              </Typography>
              <RadioGroup value={phoneOption} onChange={(e) => setPhoneOption(e.target.value)}>
                {registeredPhones.map((phone) => (
                  <FormControlLabel
                    key={phone.id}
                    value="default"
                    control={<Radio />}
                    label={phone.label}
                  />
                ))}
                <FormControlLabel value="custom" control={<Radio />} label="Enter a different number" />
              </RadioGroup>

              {/* Custom Phone Number Input */}
              {phoneOption === 'custom' && (
                <TextField
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  placeholder="+265..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ mt: 1 }}
                />
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for transfer feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <TransactionDetailsModal
            open={openTransactionModal}
            onClose={() => {
              setOpenTransactionModal(false);
              setSelectedTransaction(null);
            }}
            transactionData={selectedTransaction}
          />
        )}
    </Stack>
  );
}
