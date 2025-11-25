import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export type Transaction = {
  id: string;
  date: string;
  method: string;
  type: 'Deposit' | 'Withdrawal';
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export default function TransactionHistory({ transactions }: { transactions?: Transaction[] }) {
  const [methodFilter, setMethodFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = useMemo(() => {
    let list = transactions ?? [];
    if (methodFilter) list = list.filter((t) => t.method === methodFilter);
    if (typeFilter) list = list.filter((t) => t.type === typeFilter);
    if (statusFilter) list = list.filter((t) => t.status === statusFilter);
    if (dateFilter) list = list.filter((t) => t.date === dateFilter);
    return list;
  }, [transactions, methodFilter, typeFilter, statusFilter, dateFilter]);

  const statusColor = (s: Transaction['status']) => {
    switch (s) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Transaction History
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2 }}>
        <TextField select size="small" label="Method" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All Methods</MenuItem>
          <MenuItem value="Mpamba">Mpamba</MenuItem>
          <MenuItem value="Airtel Money">Airtel Money</MenuItem>
        </TextField>

        <TextField select size="small" label="Type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ minWidth: 140 }}>
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Deposit">Deposit</MenuItem>
          <MenuItem value="Withdrawal">Withdrawal</MenuItem>
        </TextField>

        <TextField select size="small" label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 140 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </TextField>

        <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} sx={{ minWidth: 160 }} />
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>{t.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{t.method}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>{t.amount}</TableCell>
                  <TableCell align="center">
                    <Chip label={t.status} color={statusColor(t.status) as any} size="small" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
