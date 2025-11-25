import { useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export type WatchlistItem = {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
};

export interface WatchlistManagerProps {
  initialItems?: WatchlistItem[];
  onItemsChange?: (items: WatchlistItem[]) => void;
}

const mockWatchlistItems: WatchlistItem[] = [
  { id: '1', symbol: 'AIR', name: 'Airtel Malawi', price: 'MK 128.11', change: '+2.5%', isPositive: true },
  { id: '2', symbol: 'NBM', name: 'National Bank', price: 'MK 6200.11', change: '+1.2%', isPositive: true },
  { id: '3', symbol: 'TNM', name: 'Telekom Networks', price: 'MK 25.00', change: '+0.6%', isPositive: true },
];

export default function WatchlistManager({
  initialItems = mockWatchlistItems,
  onItemsChange,
}: WatchlistManagerProps) {
  const [items, setItems] = useState<WatchlistItem[]>(initialItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WatchlistItem, 'id'>>({
    symbol: '',
    name: '',
    price: '',
    change: '',
    isPositive: true,
  });

  const handleOpenDialog = (item?: WatchlistItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        change: item.change,
        isPositive: item.isPositive,
      });
    } else {
      setEditingId(null);
      setFormData({
        symbol: '',
        name: '',
        price: '',
        change: '',
        isPositive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleAddOrUpdate = () => {
    if (!formData.symbol || !formData.name || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    let updatedItems: WatchlistItem[];
    if (editingId) {
      updatedItems = items.map((item) =>
        item.id === editingId ? { ...item, ...formData } : item
      );
    } else {
      const newItem: WatchlistItem = {
        id: Date.now().toString(),
        ...formData,
      };
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    onItemsChange?.(updatedItems);
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 700 }}>Watchlist</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              onClick={() => handleOpenDialog()}
            >
              Add
            </Button>
          </Box>

          {items.length === 0 ? (
            <Alert severity="info">No items in watchlist. Click Add to create one.</Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Symbol</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Price
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Change
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{item.symbol}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: item.isPositive ? 'success.main' : 'error.main' }}
                      >
                        {item.change}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(item)}
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </CardContent>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Watchlist Item' : 'Add Watchlist Item'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Symbol"
              placeholder="e.g., AIR"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              fullWidth
            />
            <TextField
              label="Company Name"
              placeholder="e.g., Airtel Malawi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Current Price"
              placeholder="e.g., MK 128.11"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              fullWidth
            />
            <TextField
              label="Change"
              placeholder="e.g., +2.5%"
              value={formData.change}
              onChange={(e) => {
                const change = e.target.value;
                setFormData({
                  ...formData,
                  change,
                  isPositive: !change.startsWith('-'),
                });
              }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdate} variant="contained">
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
