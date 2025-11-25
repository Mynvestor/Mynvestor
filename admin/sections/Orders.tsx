import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

type OrderStatus = 'new' | 'pending' | 'executed' | 'cancelled' | 'expired';

type Order = {
  id: string;
  investor: string;
  order: string; // e.g. "Buy NBM"
  status: OrderStatus;
  action: 'buy' | 'sell';
  type: 'market' | 'limit';
  symbol?: string;
  quantity?: number;
  price?: number;
  date?: string;
};

const sampleOrders: Order[] = [
  { id: 'OR001', investor: 'John Mwale', order: 'Buy NBM', status: 'new', action: 'buy', type: 'market', symbol: 'NBM', quantity: 50, price: 1200, date: '2025-04-12 14:30' },
  { id: 'OR002', investor: 'Grace Banda', order: 'Sell AIRTEL', status: 'pending', action: 'sell', type: 'limit', symbol: 'AIRTEL', quantity: 100, price: 220, date: '2025-04-12 10:15' },
  { id: 'OR003', investor: 'Peter Kumwenda', order: 'Buy ILLOVO', status: 'executed', action: 'buy', type: 'market', symbol: 'ILLOVO', quantity: 30, price: 800, date: '2025-04-11 16:45' },
  { id: 'OR004', investor: 'James Phiri', order: 'Sell SUNBIRD', status: 'cancelled', action: 'sell', type: 'limit', symbol: 'SUNBIRD', quantity: 40, price: 450, date: '2025-04-11 09:00' },
];

export default function Orders() {
  const [orders, setOrders] = React.useState<Order[]>(sampleOrders);
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string>('');
  const [filterAction, setFilterAction] = React.useState<string>('');
  const [filterType, setFilterType] = React.useState<string>('');
  const [selected, setSelected] = React.useState<Order | null>(null);
  const [open, setOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    return orders.filter((o) => {
      if (search) {
        const s = search.toLowerCase();
        if (!(o.id.toLowerCase().includes(s) || o.investor.toLowerCase().includes(s) || o.order.toLowerCase().includes(s))) {
          return false;
        }
      }
      if (filterStatus && o.status !== filterStatus) return false;
      if (filterAction && o.action !== filterAction) return false;
      if (filterType && o.type !== filterType) return false;
      return true;
    });
  }, [orders, search, filterStatus, filterAction, filterType]);

  const openOrder = (id: string) => {
    const o = orders.find((x) => x.id === id) || null;
    setSelected(o);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  const exportOrders = (list: Order[]) => {
    // stub: replace with real export (CSV/XLSX) implementation
    // eslint-disable-next-line no-console
    console.log('Export', list);
    alert(`Exported ${list.length} orders (stub)`);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    alert(`Order ${id} updated to ${status}`);
    close();
  };

  const stats = React.useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const executedToday = orders.filter((o) => o.status === 'executed').length;
    const cancelledToday = orders.filter((o) => o.status === 'cancelled').length;
    return { total, pending, executedToday, cancelledToday };
  }, [orders]);

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Orders" />

      <Typography variant="h5">Order Overview</Typography>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField size="small" placeholder="Search by Order ID, investor, or order..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ maxWidth: 400 }} />
          <Button variant="contained" onClick={() => exportOrders(filtered)}>Export</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Investor</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.investor}</TableCell>
                  <TableCell>{o.order}</TableCell>
                  <TableCell>{o.status === 'new' ? <Chip label="New" color="info" size="small" /> : o.status === 'pending' ? <Chip label="Pending" color="warning" size="small" /> : o.status === 'executed' ? <Chip label="Executed" color="success" size="small" /> : <Chip label={o.status} size="small" />}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => openOrder(o.id)} sx={{ mr: 1 }}>View</Button>
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
            <Typography variant="h6">Order Management</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 2 }}>
              <TextField size="small" placeholder="Search by Order ID, investor, or order..." sx={{ maxWidth: 300 }} value={search} onChange={(e) => setSearch(e.target.value)} />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                <Select labelId="status-filter-label" value={filterStatus} label="Filter by Status" onChange={(e) => setFilterStatus(e.target.value)}>
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="executed">Executed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="action-filter-label">Filter by Action</InputLabel>
                <Select labelId="action-filter-label" value={filterAction} label="Filter by Action" onChange={(e) => setFilterAction(e.target.value)}>
                  <MenuItem value="">All Actions</MenuItem>
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="type-filter-label">Filter by Type</InputLabel>
                <Select labelId="type-filter-label" value={filterType} label="Filter by Type" onChange={(e) => setFilterType(e.target.value)}>
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="market">Market</MenuItem>
                  <MenuItem value="limit">Limit</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ flexGrow: 1 }} />
              <Button variant="contained" onClick={() => exportOrders(filtered)}>Export</Button>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Investor</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((o) => (
                    <TableRow key={o.id} hover>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.investor}</TableCell>
                      <TableCell>{o.order}</TableCell>
                      <TableCell>{o.status}</TableCell>
                      <TableCell>{o.action}</TableCell>
                      <TableCell>{o.type}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => openOrder(o.id)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <Box sx={{ width: 360 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Order Statistics</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Total Orders</Typography>
                <Typography variant="h6">{stats.total}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Pending Orders</Typography>
                <Typography variant="h6">{stats.pending}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Executed Today</Typography>
                <Typography variant="h6">{stats.executedToday}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Cancelled Today</Typography>
                <Typography variant="h6">{stats.cancelledToday}</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Order Activity Log</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, mt: 1 }}>
              <li><Typography variant="body2"><small className="text-muted">2025-04-12 14:30</small> John Mwale placed a buy order for NBM.</Typography></li>
              <li><Typography variant="body2"><small className="text-muted">2025-04-12 10:15</small> Grace Banda’s sell order for AIRTEL approved.</Typography></li>
              <li><Typography variant="body2"><small className="text-muted">2025-04-11 16:45</small> Peter Kumwenda’s buy order for ILLOVO executed.</Typography></li>
              <li><Typography variant="body2"><small className="text-muted">2025-04-11 09:00</small> James Phiri’s sell order for SUNBIRD cancelled.</Typography></li>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => {
                const ids = orders.filter((o) => o.status === 'pending').map((o) => o.id);
                ids.forEach((id) => updateOrderStatus(id, 'executed'));
              }}>Approve All Pending</Button>
              <Button variant="outlined" onClick={() => exportOrders(orders)}>Export Order Data</Button>
              <Button variant="outlined" onClick={() => alert('Contact investor (stub)')}>Contact Investor</Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {!selected && <Typography>Loading...</Typography>}
          {selected && (
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <Typography variant="body2">Order ID</Typography>
                <Typography variant="body2">{selected.id}</Typography>
                <Typography variant="body2">Investor</Typography>
                <Typography variant="body2">{selected.investor}</Typography>
                <Typography variant="body2">Type</Typography>
                <Typography variant="body2">{selected.type}</Typography>
                <Typography variant="body2">Stock</Typography>
                <Typography variant="body2">{selected.symbol}</Typography>
                <Typography variant="body2">Quantity</Typography>
                <Typography variant="body2">{selected.quantity}</Typography>
                <Typography variant="body2">Price</Typography>
                <Typography variant="body2">{selected.price}</Typography>
                <Typography variant="body2">Status</Typography>
                <Typography variant="body2">{selected.status}</Typography>
                <Typography variant="body2">Date</Typography>
                <Typography variant="body2">{selected.date}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {(selected.status === 'new' || selected.status === 'pending') && (
                  <>
                    <Button variant="contained" onClick={() => updateOrderStatus(selected.id, 'executed')}>Execute</Button>
                    <Button variant="outlined" color="error" onClick={() => updateOrderStatus(selected.id, 'cancelled')}>Cancel</Button>
                  </>
                )}
                {selected.status === 'executed' && (
                  <Button variant="contained" onClick={() => exportOrders([selected])}>Export</Button>
                )}
              </Box>
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

