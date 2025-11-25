import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Header from '../components/Header';
import PlaceOrder from '../components/PlaceOrder';
import OrdersHistoryTable, { OrderRow } from '../components/OrdersHistoryTable';

// Mock companies data
const MOCK_COMPANIES = [
  { symbol: 'AIRTEL', name: 'Airtel Malawi' },
  { symbol: 'BHL', name: 'Blue Logistics' },
  { symbol: 'FDH', name: 'FDH Financial Holdings' },
  { symbol: 'FMBCH', name: 'First Merchant Bank' },
  { symbol: 'ICON', name: 'Icon Malawi' },
  { symbol: 'ILLOVO', name: 'Illovo Sugar' },
  { symbol: 'MPICO', name: 'Mpico PLC' },
  { symbol: 'NBM', name: 'National Bank of Malawi' },
  { symbol: 'NBS', name: 'National Oil Company' },
  { symbol: 'NICO', name: 'NICO Holdings' },
  { symbol: 'NITL', name: 'Nico Tanzania Limited' },
  { symbol: 'OMU', name: 'Oryx Minerals' },
  { symbol: 'PCL', name: 'Press Corporation' },
  { symbol: 'STANDARD', name: 'Standard Bank' },
  { symbol: 'SUNBIRD', name: 'Sunbird Mining' },
  { symbol: 'TNM', name: 'Telecom Networks Malawi' },
];

// Mock orders history
const MOCK_ORDERS: OrderRow[] = [
  {
    id: '1',
    date: '2025-03-20',
    company: 'AIRTEL',
    action: 'Buy',
    orderType: 'Market Order',
    quantity: 100,
    totalCost: 'MK12,911.00',
    status: 'Completed',
  },
  {
    id: '2',
    date: '2025-03-19',
    company: 'NBM',
    action: 'Sell',
    orderType: 'Limit Order',
    quantity: 5,
    totalCost: 'MK31,556.55',
    status: 'Pending',
  },
  {
    id: '3',
    date: '2025-03-18',
    company: 'FDH',
    action: 'Buy',
    orderType: 'Stop Order',
    quantity: 50,
    totalCost: 'MK16,314.50',
    status: 'Completed',
  },
  {
    id: '4',
    date: '2025-03-17',
    company: 'TNM',
    action: 'Sell',
    orderType: 'Market Order',
    quantity: 200,
    totalCost: 'MK5,555.00',
    status: 'Cancelled',
  },
];

export default function Trade() {
  const [orders, setOrders] = useState<OrderRow[]>(MOCK_ORDERS);
  const [filteredOrders, setFilteredOrders] = useState<OrderRow[]>(MOCK_ORDERS);
  const [orderPage, setOrderPage] = useState(1);
  const location = useLocation();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Prefill state passed from navigation (StockQuoteModal or Portfolio)
  const [prefillCompany, setPrefillCompany] = useState<string | undefined>(undefined);
  const [prefillAction, setPrefillAction] = useState<'Buy' | 'Sell' | undefined>(undefined);

  // Pagination for orders
  const itemsPerPage = 5;
  const paginatedOrders = useMemo(() => {
    const startIndex = (orderPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, orderPage]);

  const totalOrderPages = Math.ceil(filteredOrders.length / itemsPerPage);

  useEffect(() => {
    const state = (location && (location as any).state) || undefined;
    if (state?.prefill) {
      const p = state.prefill as { symbol?: string; name?: string; action?: 'Buy' | 'Sell' };
      // prefer symbol, fallback to name
      setPrefillCompany(p.symbol ?? p.name);
      if (p.action) setPrefillAction(p.action);
    }
  // run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSnackbarClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handlePlaceOrder = (orderData: any) => {
    const newOrder: OrderRow = {
      id: String(orders.length + 1),
      date: new Date().toISOString().split('T')[0],
      company: orderData.company,
      action: orderData.action,
      orderType: orderData.orderType,
      quantity: orderData.quantity,
      totalCost: `MK${orderData.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: 'Pending',
    };
    setOrders([newOrder, ...orders]);
    setFilteredOrders([newOrder, ...orders]);

    // show success snackbar
    setSnackbarSeverity('success');
    setSnackbarMessage(`${orderData.action} order placed for ${orderData.company}`);
    setSnackbarOpen(true);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = orders;

    if (filters.orderType) {
      filtered = filtered.filter((order) => order.orderType === filters.orderType);
    }
    if (filters.action) {
      filtered = filtered.filter((order) => order.action === filters.action);
    }
    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }
    if (filters.date) {
      filtered = filtered.filter((order) => order.date === filters.date);
    }

    setOrderPage(1); // Reset to page 1 on filter change
    setFilteredOrders(filtered);
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
      <Header section="Trade" />

      {/* Minimal Layout: Place Order Prominent */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '700px',
          mx: 'auto',
        }}
      >
        <PlaceOrder
          companies={MOCK_COMPANIES}
          onPlaceOrder={handlePlaceOrder}
          initialCompany={prefillCompany}
          initialAction={prefillAction}
        />
      </Box>

      {/* Collapsible Orders History */}
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
            Order History
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} sx={{ width: '100%' }}>
            {/* Orders Table with Pagination */}
            <OrdersHistoryTable
              orders={paginatedOrders}
              showFilters={true}
              onFilterChange={handleFilterChange}
            />

            {/* Pagination Controls */}
            {totalOrderPages > 1 && (
              <Stack direction="row" justifyContent="center">
                <Pagination
                  count={totalOrderPages}
                  page={orderPage}
                  onChange={(_, page) => setOrderPage(page)}
                  color="primary"
                  size="small"
                />
              </Stack>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Snackbar for order feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
}
