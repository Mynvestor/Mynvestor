import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { useNavigate, useLocation } from 'react-router-dom';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // default to admin when path starts with /admin
  const initial = location.pathname.startsWith('/admin') ? 'admin' : 'investor';
  const [appMode, setAppMode] = React.useState<string>(initial);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setAppMode(value);
    // navigate to the appropriate root for the selected app
    if (value === 'admin') {
      navigate('/admin');
    } else {
      // investor app
      navigate('/app');
    }
  };

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={appMode}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select app' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <MenuItem value="investor">
        <ListItemAvatar>
          <Avatar alt="Investor">
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Investor" secondary="Web app" />
      </MenuItem>
      <MenuItem value="admin">
        <ListItemAvatar>
          <Avatar alt="Admin ">
            <ConstructionRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Admin" secondary="Web app" />
      </MenuItem>
    </Select>
  );
}
