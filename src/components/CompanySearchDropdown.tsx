import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export type CompanySearchDropdownProps = {
  companies: Array<{ symbol: string; name: string }>;
  onSelectCompany: (company: { symbol: string; name: string }) => void;
  placeholder?: string;
};

export default function CompanySearchDropdown({
  companies,
  onSelectCompany,
  placeholder = 'Search companies...',
}: CompanySearchDropdownProps) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const filteredCompanies = companies.filter(
    (company) =>
      company.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
      company.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelectCompany = (company: { symbol: string; name: string }) => {
    onSelectCompany(company);
    setSearchValue(company.symbol);
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        InputProps={{
          startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          },
        }}
      />

      {open && filteredCompanies.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: 300,
            overflow: 'auto',
            zIndex: 1000,
          }}
        >
          <List sx={{ p: 0 }}>
            {filteredCompanies.map((company) => (
              <ListItemButton
                key={company.symbol}
                onClick={() => handleSelectCompany(company)}
                sx={{
                  py: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={company.symbol}
                  secondary={company.name}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {searchValue && filteredCompanies.length === 0 && open && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            p: 2,
            textAlign: 'center',
            zIndex: 1000,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No companies found
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
