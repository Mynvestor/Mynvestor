import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import OrderDetailsModal from './OrderDetailsModal';

export type OrderRow = {
  id: string;
  date: string;
  company: string;
  action: 'Buy' | 'Sell';
  orderType: 'Market Order' | 'Limit Order' | 'Stop Order';
  quantity: number;
  totalCost: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
};

export type OrdersHistoryTableProps = {
  orders: OrderRow[];
  onRowClick?: (order: OrderRow) => void;
  showFilters?: boolean;
  onFilterChange?: (filters: {
    orderType?: string;
    action?: string;
    status?: string;
    date?: string;
  }) => void;
};

const statusConfig = {
  Completed: { color: 'success' as const, label: 'Completed' },
  Pending: { color: 'warning' as const, label: 'Pending' },
  Cancelled: { color: 'error' as const, label: 'Cancelled' },
};

export default function OrdersHistoryTable({
  orders,
  onRowClick,
  showFilters = true,
  onFilterChange,
}: OrdersHistoryTableProps) {
  const theme = useTheme();
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (field: string, value: string) => {
    setCurrentPage(1); // Reset to page 1 on filter change
    onFilterChange?.({ [field]: value });
  };

  // Paginate the orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  }, [orders, currentPage]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <Box>
      {showFilters && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ mb: 2, flexWrap: 'wrap' }}
        >
          <TextField
            select
            label="Order Type"
            defaultValue=""
            size="small"
            onChange={(e) => handleFilterChange('orderType', e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 150 } }}
          >
            <MenuItem value="">All Order Types</MenuItem>
            <MenuItem value="Market Order">Market Order</MenuItem>
            <MenuItem value="Limit Order">Limit Order</MenuItem>
            <MenuItem value="Stop Order">Stop Order</MenuItem>
          </TextField>

          <TextField
            select
            label="Action"
            defaultValue=""
            size="small"
            onChange={(e) => handleFilterChange('action', e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 120 } }}
          >
            <MenuItem value="">All Actions</MenuItem>
            <MenuItem value="Buy">Buy</MenuItem>
            <MenuItem value="Sell">Sell</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            defaultValue=""
            size="small"
            onChange={(e) => handleFilterChange('status', e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 120 } }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(e) => handleFilterChange('date', e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 150 } }}
          />
        </Stack>
      )}

      <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: 'auto', sm: 650 } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
              <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Action</TableCell>
              <TableCell sx={{ fontWeight: 700, display: { xs: 'none', md: 'table-cell' } }}>Order Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setOpenDetailsModal(true);
                    onRowClick?.(order);
                  }}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{order.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{order.company}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.action}
                      size="small"
                      color={order.action === 'Buy' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{order.orderType}</TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{order.quantity}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>
                    {order.totalCost}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={statusConfig[order.status].label}
                      size="small"
                      color={statusConfig[order.status].color}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No orders found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Stack>
      )}
        {selectedOrder && (
          <OrderDetailsModal
            open={openDetailsModal}
            onClose={() => {
              setOpenDetailsModal(false);
              setSelectedOrder(null);
            }}
            orderData={selectedOrder}
          />
        )}
      </Box>
    );
  }
