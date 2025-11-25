import { useLocation, Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const adminListItems = [
  { text: 'Home', path: '/admin', icon: <HomeRoundedIcon /> },
  { text: 'Investors', path: '/admin/investors', icon: <PeopleRoundedIcon /> },
  { text: 'Orders', path: '/admin/orders', icon: <ListAltRoundedIcon /> },
  { text: 'Transactions', path: '/admin/transactions', icon: <ReceiptRoundedIcon /> },
  { text: 'Help', path: '/admin/help', icon: <HelpRoundedIcon /> },
  { text: 'Compliance', path: '/admin/compliance', icon: <GavelRoundedIcon /> },
  { text: 'Settings', path: '/admin/settings', icon: <SettingsRoundedIcon /> },
];

export default function AdminMenuContent() {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {adminListItems.map((item, index) => (
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
