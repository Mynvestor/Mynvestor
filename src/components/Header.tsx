import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import CircleIcon from '@mui/icons-material/Circle';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// removed unused Search and CustomDatePicker from header; replaced with status icons

interface HeaderProps {
  section?: string;
  // accountStatus can be provided by parent; defaults to 'new'
  accountStatus?: 'new' | 'pending' | 'active' | 'banned' | 'deactivated' | 'frozen';
}

const mockNotifications = [
  { id: 'n1', title: 'Order Executed', body: 'Your market order for ACME was executed.', time: '2h ago', unread: true },
  { id: 'n2', title: 'Deposit Received', body: 'A deposit of MK50,000 has been credited to your account.', time: '1d ago', unread: true },
  { id: 'n3', title: 'Policy Update', body: 'We updated our terms of service. Please review the changes.', time: '3d ago', unread: false },
];

export default function Header({ section = 'Market', accountStatus = 'new' }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [anchorAccount, setAnchorAccount] = useState<HTMLElement | null>(null);
  const [anchorMarket, setAnchorMarket] = useState<HTMLElement | null>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // mark all as read when opening
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleOpenAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccount(event.currentTarget);
  };

  const handleCloseAccount = () => setAnchorAccount(null);

  const handleOpenMarket = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMarket(event.currentTarget);
  };

  const handleCloseMarket = () => setAnchorMarket(null);

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // mapping for account statuses (colors are CSS-friendly hex codes)
  const accountStatusMeta: Record<NonNullable<HeaderProps['accountStatus']>, { label: string; color: string; desc: string }> = {
    new: { label: 'New', color: '#9e9e9e', desc: 'Account recently created. Complete KYC to proceed.' },
    pending: { label: 'Pending', color: '#ffb300', desc: 'KYC submitted. Awaiting admin verification.' },
    active: { label: 'Active', color: '#2e7d32', desc: 'Account verified and active.' },
    banned: { label: 'Banned', color: '#d32f2f', desc: 'Account banned due to policy violation.' },
    deactivated: { label: 'Deactivated', color: '#757575', desc: 'Account deactivated by user or admin.' },
    frozen: { label: 'Frozen', color: '#0288d1', desc: 'Account frozen temporarily.' },
  };

  // Market schedule and status determination
  type MarketPeriod = 'Pre-Open' | 'Open' | 'Close' | 'Post Close' | 'Closed';
  const marketSchedule: { period: MarketPeriod; start: string; end: string }[] = [
    { period: 'Pre-Open', start: '09:00', end: '09:30' },
    { period: 'Open', start: '09:30', end: '14:30' },
    { period: 'Close', start: '14:30', end: '15:00' },
    { period: 'Post Close', start: '15:00', end: '17:00' },
  ];

  const parseHM = (hm: string) => {
    const [h, m] = hm.split(':').map(Number);
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
    return d;
  };

  const getMarketPeriodNow = (): MarketPeriod => {
    const now = new Date();
    for (const s of marketSchedule) {
      const start = parseHM(s.start);
      const end = parseHM(s.end);
      if (now >= start && now < end) return s.period;
    }
    return 'Closed';
  };

  const marketNow = getMarketPeriodNow();

  const marketColor: Record<MarketPeriod, string> = {
    'Pre-Open': '#ffb300', // amber
    Open: '#2e7d32', // green
    Close: '#d84315', // red/orange
    'Post Close': '#1565c0', // blue
    Closed: '#9e9e9e',
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '100%',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          maxWidth: { sm: '100%', md: '1700px' },
          pt: 1.5,
        }}
        spacing={2}
      >
        <NavbarBreadcrumbs section={section} />
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          {/* Account status icon */}
          <MenuButton aria-label="Account status" onClick={handleOpenAccount}>
            <AccountCircleIcon sx={{ color: accountStatusMeta[accountStatus].color }} />
          </MenuButton>

          {/* Market status icon */}
          <MenuButton aria-label="Market status" onClick={handleOpenMarket}>
            <DonutLargeIcon sx={{ color: marketColor[marketNow] }} />
          </MenuButton>

          <MenuButton showBadge={unreadCount > 0} aria-label="Open notifications" onClick={handleOpenNotifications}>
            <NotificationsRoundedIcon />
          </MenuButton>
          <ColorModeIconDropdown />
        </Stack>
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ variant: 'outlined', elevation: 0, sx: { my: '4px', width: 320, p: 0 } }}
      >
        <Typography sx={{ p: 2, fontWeight: 700 }}>Notifications</Typography>
        <Divider />
        <List sx={{ maxHeight: 360, overflow: 'auto' }}>
          {notifications.map((n) => (
            <ListItemButton key={n.id} alignItems="flex-start" onClick={handleCloseNotifications}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: n.unread ? 'primary.main' : 'grey.400' }}>{n.title.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={n.title} secondary={<>{n.body}<Typography component="span" sx={{ display: 'block', color: 'text.disabled', mt: 0.5 }}>{n.time}</Typography></>} />
            </ListItemButton>
          ))}
        </List>
      </Popover>

      {/* Account status popover */}
      <Popover
        open={Boolean(anchorAccount)}
        anchorEl={anchorAccount}
        onClose={handleCloseAccount}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ variant: 'outlined', elevation: 0, sx: { my: '4px', width: 320, p: 0 } }}
      >
        <Typography sx={{ p: 1, fontWeight: 700 }}>Account Status</Typography>
        <Divider />
        <List>
          {Object.keys(accountStatusMeta).map((key) => {
            const k = key as keyof typeof accountStatusMeta;
            const meta = accountStatusMeta[k];
            return (
              <ListItem key={k} sx={{ pl: 1 }}>
                <ListItemIcon>
                  <CircleIcon fontSize="small" sx={{ color: meta.color }} />
                </ListItemIcon>
                <ListItemText primary={meta.label} secondary={meta.desc} sx={{ ml: -1 }} />
              </ListItem>
            );
          })}
        </List>
      </Popover>

      {/* Market status popover */}
      <Popover
        open={Boolean(anchorMarket)}
        anchorEl={anchorMarket}
        onClose={handleCloseMarket}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ variant: 'outlined', elevation: 0, sx: { my: '4px', width: 320, p: 0 } }}
      >
        <Typography sx={{ p: 1, fontWeight: 700 }}>Market Schedule</Typography>
        <Divider />
        <List>
          {marketSchedule.map((s) => (
            <ListItem key={s.period} sx={{ pl: 1 }}>
              <ListItemIcon>
                <CircleIcon fontSize="small" sx={{ color: marketColor[s.period] }} />
              </ListItemIcon>
              <ListItemText primary={s.period} secondary={`${s.start} hrs - ${s.end} hrs`} sx={{ ml: -1 }} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Typography variant="body2">Current status: <strong>{marketNow}</strong></Typography>
        </Box>
      </Popover>
    </>
  );
}
