import { useLocation, Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Home', path: '/app', icon: <HomeRoundedIcon /> },
  { text: 'Market', path: '/app/market', icon: <StoreRoundedIcon /> },
  { text: 'Portfolio', path: '/app/portfolio', icon: <AccountBalanceWalletRoundedIcon /> },
  { text: 'Trade', path: '/app/trade', icon: <TrendingUpRoundedIcon /> },
  { text: 'Transactions', path: '/app/transactions', icon: <CompareArrowsRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', path: '/app/settings', icon: <SettingsRoundedIcon /> },
  { text: 'Profile', path: '/app/profile', icon: <PersonRoundedIcon /> },
  { text: 'Help', path: '/app/help', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
