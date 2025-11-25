import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

type TransactionStatus = 'new' | 'verified' | 'rejected';

type Transaction = {
  id: string;
  investor: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  status: TransactionStatus;
  date: string;
};

const sampleTransactions: Transaction[] = [
  { id: 'TR001', investor: 'John Mwale', type: 'Deposit', amount: 50000, status: 'new', date: '2025-04-12 14:30' },
  { id: 'TR002', investor: 'Grace Banda', type: 'Withdrawal', amount: 20000, status: 'new', date: '2025-04-12 10:15' },
  { id: 'TR003', investor: 'Peter Kumwenda', type: 'Deposit', amount: 30000, status: 'verified', date: '2025-04-11 16:45' },
  { id: 'TR004', investor: 'James Phiri', type: 'Withdrawal', amount: 15000, status: 'verified', date: '2025-04-11 09:00' },
  { id: 'TR005', investor: 'Mary Chirwa', type: 'Deposit', amount: 40000, status: 'new', date: '2025-04-10 12:30' },
];

export default function Transactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>(sampleTransactions);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<Transaction | null>(null);
  const [open, setOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    if (!search) return transactions;
    const s = search.toLowerCase();
    return transactions.filter((t) => t.investor.toLowerCase().includes(s) || t.status.toLowerCase().includes(s) || t.id.toLowerCase().includes(s));
  }, [transactions, search]);

  const openTrans = (id: string) => {
    setSelected(transactions.find((t) => t.id === id) || null);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  const exportTransactions = (list: Transaction[]) => {
    // stub
    // eslint-disable-next-line no-console
    console.log('Export', list);
    alert(`Exported ${list.length} transactions (stub)`);
  };

  const verifyTransaction = (id: string) => {
    setTransactions((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'verified' } : p)));
    alert('Transaction verified');
    close();
  };

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Transactions" />

      <Typography variant="h5">Transaction Overview</Typography>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField size="small" placeholder="Search transactions by investor or status..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ maxWidth: 480 }} />
          <Button variant="contained" onClick={() => exportTransactions(filtered)}>Export</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Investor</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>{t.investor}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{`MK ${t.amount.toLocaleString()}`}</TableCell>
                  <TableCell>{t.status === 'new' ? <Chip label="New" color="info" size="small" /> : <Chip label="Verified" color="success" size="small" />}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>
                    {t.status === 'new' && <Button size="small" onClick={() => verifyTransaction(t.id)} sx={{ mr: 1 }}>Verify</Button>}
                    <Button size="small" onClick={() => openTrans(t.id)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Transaction Verification</Typography>
            <TextField size="small" placeholder="Search by investor or transaction ID..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mt: 1, mb: 2, maxWidth: 360 }} />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Investor</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.filter((t) => t.status === 'new').map((t) => (
                    <TableRow key={t.id} hover>
                      <TableCell>{t.investor}</TableCell>
                      <TableCell>{t.type}</TableCell>
                      <TableCell>{`MK ${t.amount.toLocaleString()}`}</TableCell>
                      <TableCell><Chip label="New" color="info" size="small" /></TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => verifyTransaction(t.id)} sx={{ mr: 1 }}>Verify</Button>
                        <Button size="small" onClick={() => openTrans(t.id)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={() => exportTransactions(filtered)}>Export</Button>
          </Paper>
        </Box>

        <Box sx={{ width: 360 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Transaction Statistics</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Total Transactions</Typography>
                <Typography variant="h6">{transactions.length}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">New Transactions</Typography>
                <Typography variant="h6">{transactions.filter((t) => t.status === 'new').length}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Verified Today</Typography>
                <Typography variant="h6">{transactions.filter((t) => t.status === 'verified').length}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Deposits Today</Typography>
                <Typography variant="h6">MK {transactions.filter((t) => t.type === 'Deposit').reduce((s, t) => s + t.amount, 0).toLocaleString()}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Transaction Activity Log</Typography>
            <List>
              <ListItem disableGutters>
                <ListItemText primary="2025-04-12 14:30 — John Mwale initiated a deposit of MK 50,000." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="2025-04-12 10:15 — Grace Banda initiated a withdrawal of MK 20,000." />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>

      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent dividers>
          {!selected && <Typography>Loading...</Typography>}
          {selected && (
            <Box>
              <List>
                <ListItem disableGutters><ListItemText primary="Transaction ID" secondary={selected.id} /></ListItem>
                <ListItem disableGutters><ListItemText primary="Investor" secondary={selected.investor} /></ListItem>
                <ListItem disableGutters><ListItemText primary="Type" secondary={selected.type} /></ListItem>
                <ListItem disableGutters><ListItemText primary="Amount" secondary={`MK ${selected.amount.toLocaleString()}`} /></ListItem>
                <ListItem disableGutters><ListItemText primary="Date" secondary={selected.date} /></ListItem>
                <ListItem disableGutters><ListItemText primary="Status" secondary={selected.status} /></ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

