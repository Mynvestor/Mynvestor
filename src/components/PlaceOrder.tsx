import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CompanySearchDropdown from './CompanySearchDropdown';
import SelectedCompanyDisplay from './SelectedCompanyDisplay';
import OrderCostSummary from './OrderCostSummary';

export type PlaceOrderProps = {
  companies: Array<{ symbol: string; name: string; price?: number }>;
  onPlaceOrder?: (orderData: {
    action: 'Buy' | 'Sell';
    company: string;
    orderType: string;
    quantity: number;
    totalCost: number;
  }) => void;
  /** optional initial company symbol or name to prefill the form (from navigation state) */
  initialCompany?: string;
  /** optional initial action (Buy or Sell) to prefill the action toggle */
  initialAction?: 'Buy' | 'Sell';
};

export default function PlaceOrder({ companies, onPlaceOrder, initialCompany, initialAction }: PlaceOrderProps) {
  const [selectedAction, setSelectedAction] = useState<'Buy' | 'Sell'>(initialAction ?? 'Buy');
  const findInitial = (val?: string) => {
    if (!val) return companies[0] || null;
    const bySymbol = companies.find((c) => c.symbol === val);
    if (bySymbol) return bySymbol;
    const byName = companies.find((c) => c.name === val);
    if (byName) return byName;
    // try a loose match by name (contains, case-insensitive)
    const loose = companies.find((c) => c.name.toLowerCase().includes(val.toLowerCase()));
    if (loose) return loose;
    return companies[0] || null;
  };

  const [selectedCompany, setSelectedCompany] = useState<{ symbol: string; name: string } | null>(
    findInitial(initialCompany)
  );

  useEffect(() => {
    // when companies or initialCompany change, update selectedCompany
    setSelectedCompany(findInitial(initialCompany));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, initialCompany]);
  const [orderType, setOrderType] = useState('Market Order');
  const [quantity, setQuantity] = useState('');
  const [openPreview, setOpenPreview] = useState(false);

  // Mock data - replace with real data
  const companyPrice = 128.11;
  const priceChange = 2.56;
  const commissionRate = 0.015; // 1.5%
  const transactionFee = 550;

  const sharesValue = selectedCompany && quantity ? parseFloat(quantity) * companyPrice : 0;
  const commission = sharesValue * commissionRate;
  const totalCost = sharesValue + commission + transactionFee;

  const handlePlaceOrder = () => {
    if (selectedCompany && quantity) {
      onPlaceOrder?.({
        action: selectedAction,
        company: selectedCompany.symbol,
        orderType,
        quantity: parseFloat(quantity),
        totalCost,
      });
      setOpenPreview(false);
      // Reset form
      setQuantity('');
    }
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <ShoppingCartRoundedIcon sx={{ fontSize: '1.8rem', color: 'primary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Place an Order
            </Typography>
          </Stack>

          {/* Company Search */}
          <Box sx={{ mb: 3 }}>
            <CompanySearchDropdown
              companies={companies}
              onSelectCompany={setSelectedCompany}
              placeholder="Search companies..."
            />
          </Box>

          {/* Selected Company Display */}
          {selectedCompany && (
            <SelectedCompanyDisplay
              symbol={selectedCompany.symbol}
              name={selectedCompany.name}
              price={companyPrice}
              priceChange={priceChange}
              priceChangePercent={2.56}
            />
          )}

          {/* Buy/Sell Toggle */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Action
            </Typography>
            <ButtonGroup fullWidth>
              <Button
                variant={selectedAction === 'Buy' ? 'contained' : 'outlined'}
                color="success"
                onClick={() => setSelectedAction('Buy')}
              >
                Buy
              </Button>
              <Button
                variant={selectedAction === 'Sell' ? 'contained' : 'outlined'}
                color="error"
                onClick={() => setSelectedAction('Sell')}
              >
                Sell
              </Button>
            </ButtonGroup>
          </Box>

          {/* Order Type Selection */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              select
              label="Order Type"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              size="small"
            >
              <MenuItem value="Market Order">Market Order</MenuItem>
              <MenuItem value="Limit Order">Limit Order</MenuItem>
              <MenuItem value="Stop Order">Stop Order</MenuItem>
            </TextField>
          </Box>

          {/* Quantity Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              size="small"
              inputProps={{ min: '1' }}
            />
          </Box>

          {/* Cost Summary */}
          <Box sx={{ mb: 3 }}>
            <OrderCostSummary
              sharesValue={sharesValue}
              commission={commission}
              transactionFee={transactionFee}
              totalCost={totalCost}
            />
          </Box>

          {/* Preview Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpenPreview(true)}
            disabled={!selectedCompany || !quantity}
          >
            Preview Order
          </Button>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Order Summary</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Company
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedCompany?.symbol}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Action
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: selectedAction === 'Buy' ? 'success.main' : 'error.main',
                }}
              >
                {selectedAction}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Order Type
              </Typography>
              <Typography variant="body2">{orderType}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Quantity
              </Typography>
              <Typography variant="body2">{quantity} shares</Typography>
            </Box>
            <OrderCostSummary
              sharesValue={sharesValue}
              commission={commission}
              transactionFee={transactionFee}
              totalCost={totalCost}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
