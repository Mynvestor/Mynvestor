import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material/styles';

export default function BuySellButtons({
  onBuy,
  onSell,
  size = 'small',
}: {
  onBuy?: () => void;
  onSell?: () => void;
  size?: 'small' | 'medium' | 'large';
}) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        size={size}
        startIcon={<AddIcon />}
        onClick={onBuy}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Buy
      </Button>

      <Button
        variant="outlined"
        size={size}
        startIcon={<RemoveIcon />}
        onClick={onSell}
        sx={{
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: `${theme.palette.error.main}10`,
          },
        }}
      >
        Sell
      </Button>
    </Stack>
  );
}
