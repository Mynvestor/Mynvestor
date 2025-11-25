import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Routes, Route } from 'react-router-dom';
import AppTheme from '../theme/AppTheme';
import AdminSideMenu from './components/AdminSideMenu';
import AppNavbar from '../components/AppNavbar';
import AdminSideMenuMobile from './components/AdminSideMenuMobile';
import Home from './sections/Home';
import Investors from './sections/Investors';
import Orders from './sections/Orders';
import Transactions from './sections/Transactions';
import Help from './sections/Help';
import Compliance from './sections/Compliance';
import Settings from './sections/Settings';

export default function AdminDashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <AdminSideMenu />
        <AppNavbar renderMobileMenu={(open, toggleDrawer) => (
          <AdminSideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        )} />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)` : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="investors" element={<Investors />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="help" element={<Help />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </AppTheme>
  );
}
