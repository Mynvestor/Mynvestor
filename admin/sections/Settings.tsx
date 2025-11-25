import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';

type NotificationSettings = {
  investorActivity: boolean;
  transactionVerification: boolean;
  marketUpdates: boolean;
  systemAlerts: boolean;
};

type SecuritySettings = {
  twoFactor: 'disabled' | 'sms' | 'email' | 'app';
  sessionTimeout: boolean;
};

type ComplianceSettings = {
  autoKYCFlagging: boolean;
  pepScreening: boolean;
  transactionMonitoring: boolean;
  kycReminderDays: number | 'never';
};

type TransactionSettings = {
  flatFee: number;
  percentFee: number;
  minFee: number;
  maxFee: number;
  autoApprove: boolean;
  autoApproveThreshold: number;
};

type OrdersSettings = {
  defaultOrderType: 'Market' | 'Limit';
  minQuantity: number;
  maxQuantity: number;
  flatCommission: number;
  percentCommission: number;
  flatFee: number;
  percentFee: number;
  expirationDays: number;
  autoApprove: boolean;
  autoApproveThreshold: number;
  restrictMarketHours: boolean;
};

export default function Settings() {
  const [notif, setNotif] = useState<NotificationSettings>({ investorActivity: true, transactionVerification: true, marketUpdates: false, systemAlerts: true });
  const [security, setSecurity] = useState<SecuritySettings>({ twoFactor: 'disabled', sessionTimeout: true });
  const [compliance, setCompliance] = useState<ComplianceSettings>({ autoKYCFlagging: true, pepScreening: true, transactionMonitoring: true, kycReminderDays: 30 });
  const [tx, setTx] = useState<TransactionSettings>({ flatFee: 500, percentFee: 1.5, minFee: 100, maxFee: 10000, autoApprove: false, autoApproveThreshold: 50000 });
  const [orders, setOrders] = useState<OrdersSettings>({ defaultOrderType: 'Market', minQuantity: 100, maxQuantity: 100000, flatCommission: 1000, percentCommission: 0.5, flatFee: 500, percentFee: 0.25, expirationDays: 30, autoApprove: false, autoApproveThreshold: 100000, restrictMarketHours: false });

  // Appearance & misc
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [themeAccent, setThemeAccent] = useState<string>('primary');
  const [timezone, setTimezone] = useState<string>('UTC');
  const [currency, setCurrency] = useState<string>('MWK');

  // Email / SMTP
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState<number | ''>('');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');

  // Change password dialog
  const [openChangePw, setOpenChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });

  function saveNotificationSettings() {
    console.log('Saved notification settings', notif);
  }

  function saveSecuritySettings() {
    console.log('Saved security settings', security);
  }

  function saveComplianceSettings() {
    console.log('Saved compliance settings', compliance);
  }

  function saveTransactionSettings(e?: React.FormEvent) {
    e?.preventDefault();
    console.log('Saved transaction settings', tx);
  }

  function saveOrdersSettings(e?: React.FormEvent) {
    e?.preventDefault();
    console.log('Saved orders settings', orders);
  }

  function saveAppearance() {
    console.log('Saved appearance', { darkMode, themeAccent, timezone, currency });
  }

  function saveEmailSettings() {
    console.log('Saved email settings', { smtpHost, smtpPort, smtpUser });
  }

  function changePassword() {
    if (!pwForm.next || pwForm.next !== pwForm.confirm) {
      alert('Passwords do not match');
      return;
    }
    console.log('Change password', pwForm);
    setOpenChangePw(false);
    setPwForm({ current: '', next: '', confirm: '' });
  }

  return (
    <Stack spacing={3} sx={{ mx: 3, mt: { xs: 6, md: 0 }, pb: 5 }}>
      <Header section="Settings" />

      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Notification Preferences</Typography>
            <FormControlLabel control={<Switch checked={notif.investorActivity} onChange={(e) => setNotif((s) => ({ ...s, investorActivity: e.target.checked }))} />} label="Investor Activity (new orders, KYC submissions)" />
            <FormControlLabel control={<Switch checked={notif.transactionVerification} onChange={(e) => setNotif((s) => ({ ...s, transactionVerification: e.target.checked }))} />} label="Transaction Verification Requests" />
            <FormControlLabel control={<Switch checked={notif.marketUpdates} onChange={(e) => setNotif((s) => ({ ...s, marketUpdates: e.target.checked }))} />} label="Market Updates (index changes, top gainers)" />
            <FormControlLabel control={<Switch checked={notif.systemAlerts} onChange={(e) => setNotif((s) => ({ ...s, systemAlerts: e.target.checked }))} />} label="System Alerts (maintenance)" />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={saveNotificationSettings}>Save Notification Settings</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Security Settings</Typography>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Two-Factor Authentication (2FA)</Typography>
              <Select value={security.twoFactor} onChange={(e) => setSecurity((s) => ({ ...s, twoFactor: e.target.value as any }))} fullWidth>
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="sms">SMS</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="app">Authenticator App</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => setOpenChangePw(true)}>Change Password</Button>
            </Box>
            <FormControlLabel control={<Switch checked={security.sessionTimeout} onChange={(e) => setSecurity((s) => ({ ...s, sessionTimeout: e.target.checked }))} />} label="Enable Auto-Logout After 15 Minutes of Inactivity" />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={saveSecuritySettings}>Save Security Settings</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Compliance Settings</Typography>
            <FormControlLabel control={<Switch checked={compliance.autoKYCFlagging} onChange={(e) => setCompliance((s) => ({ ...s, autoKYCFlagging: e.target.checked }))} />} label="Auto-Flag Incomplete KYC Submissions" />
            <FormControlLabel control={<Switch checked={compliance.pepScreening} onChange={(e) => setCompliance((s) => ({ ...s, pepScreening: e.target.checked }))} />} label="Enable Automatic PEP Screening" />
            <FormControlLabel control={<Switch checked={compliance.transactionMonitoring} onChange={(e) => setCompliance((s) => ({ ...s, transactionMonitoring: e.target.checked }))} />} label="Enable Transaction Monitoring for Suspicious Activity" />
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">KYC Review Reminder Frequency</Typography>
              <Select value={compliance.kycReminderDays} onChange={(e) => setCompliance((s) => ({ ...s, kycReminderDays: e.target.value as any }))} fullWidth>
                <MenuItem value={30}>Every 30 Days</MenuItem>
                <MenuItem value={60}>Every 60 Days</MenuItem>
                <MenuItem value={90}>Every 90 Days</MenuItem>
                <MenuItem value={'never'}>Never</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={saveComplianceSettings}>Save Compliance Settings</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box component="form" onSubmit={saveTransactionSettings} sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Transaction Settings</Typography>
            <TextField label="Flat Transaction Fee (MWK)" type="number" value={tx.flatFee} onChange={(e) => setTx((s) => ({ ...s, flatFee: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} InputProps={{ startAdornment: <InputAdornment position="start">MK</InputAdornment> }} />
            <TextField label="Percentage-Based Fee (%)" type="number" value={tx.percentFee} onChange={(e) => setTx((s) => ({ ...s, percentFee: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Minimum Transaction Fee (MWK)" type="number" value={tx.minFee} onChange={(e) => setTx((s) => ({ ...s, minFee: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Maximum Transaction Fee (MWK)" type="number" value={tx.maxFee} onChange={(e) => setTx((s) => ({ ...s, maxFee: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <FormControlLabel control={<Switch checked={tx.autoApprove} onChange={(e) => setTx((s) => ({ ...s, autoApprove: e.target.checked }))} />} label="Enable Automatic Approval for Deposits Below Threshold" />
            <TextField label="Auto-Approval Threshold (MWK)" type="number" value={tx.autoApproveThreshold} onChange={(e) => setTx((s) => ({ ...s, autoApproveThreshold: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <Box sx={{ mt: 1 }}>
              <Button type="submit" variant="contained">Save Transaction Settings</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box component="form" onSubmit={saveOrdersSettings} sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Orders Settings</Typography>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">Default Order Type</Typography>
              <Select value={orders.defaultOrderType} onChange={(e) => setOrders((s) => ({ ...s, defaultOrderType: e.target.value as any }))} fullWidth>
                <MenuItem value="Market">Market</MenuItem>
                <MenuItem value="Limit">Limit</MenuItem>
              </Select>
            </Box>
            <TextField label="Minimum Order Quantity (Shares)" type="number" value={orders.minQuantity} onChange={(e) => setOrders((s) => ({ ...s, minQuantity: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Maximum Order Quantity (Shares)" type="number" value={orders.maxQuantity} onChange={(e) => setOrders((s) => ({ ...s, maxQuantity: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Flat Order Commission (MWK)" type="number" value={orders.flatCommission} onChange={(e) => setOrders((s) => ({ ...s, flatCommission: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Percentage-Based Order Commission (%)" type="number" value={orders.percentCommission} onChange={(e) => setOrders((s) => ({ ...s, percentCommission: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <TextField label="Order Expiration Period (Days)" type="number" value={orders.expirationDays} onChange={(e) => setOrders((s) => ({ ...s, expirationDays: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <FormControlLabel control={<Switch checked={orders.autoApprove} onChange={(e) => setOrders((s) => ({ ...s, autoApprove: e.target.checked }))} />} label="Enable Automatic Approval for Orders Below Threshold" />
            <TextField label="Auto-Approval Threshold (MWK)" type="number" value={orders.autoApproveThreshold} onChange={(e) => setOrders((s) => ({ ...s, autoApproveThreshold: Number(e.target.value) }))} fullWidth sx={{ mb: 1 }} />
            <FormControlLabel control={<Switch checked={orders.restrictMarketHours} onChange={(e) => setOrders((s) => ({ ...s, restrictMarketHours: e.target.checked }))} />} label="Restrict Orders to Market Hours" />
            <Box sx={{ mt: 1 }}>
              <Button type="submit" variant="contained">Save Orders Settings</Button>
            </Box>
          </Box>
        </Grid>

        {/* Additional settings: Appearance, Email, Integrations, Localization, Support */}
        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Appearance & Localization</Typography>
            <FormControlLabel control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />} label="Dark Mode" />
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">Theme Accent</Typography>
              <Select value={themeAccent} onChange={(e) => setThemeAccent(e.target.value as string)} fullWidth>
                <MenuItem value="primary">Primary</MenuItem>
                <MenuItem value="secondary">Secondary</MenuItem>
                <MenuItem value="success">Success</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField label="Default Timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} fullWidth sx={{ mb: 1 }} />
              <TextField label="Default Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} fullWidth />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={saveAppearance}>Save Appearance</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Email / SMTP</Typography>
            <TextField label="SMTP Host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="SMTP Port" type="number" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value ? Number(e.target.value) : '')} fullWidth sx={{ mb: 1 }} />
            <TextField label="SMTP User" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="SMTP Password" type="password" value={smtpPass} onChange={(e) => setSmtpPass(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={saveEmailSettings}>Save Email Settings</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Integrations & Feature Flags</Typography>
            <FormControlLabel control={<Switch checked={false} onChange={() => {}} />} label="Enable External Reporting Service" />
            <FormControlLabel control={<Switch checked={false} onChange={() => {}} />} label="Enable Webhooks" />
            <FormControlLabel control={<Switch checked={false} onChange={() => {}} />} label="Enable API Access" />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained">Save Integrations</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Support & Backup</Typography>
            <TextField label="Support Email" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} fullWidth sx={{ mb: 1 }} />
            <Button variant="outlined" sx={{ mr: 1 }}>Export Settings</Button>
            <Button variant="outlined">Import Settings</Button>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained">Trigger Backup</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Change password dialog */}
      <Dialog open={openChangePw} onClose={() => setOpenChangePw(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: 420, mt: 1 }}>
            <TextField label="Current Password" type="password" value={pwForm.current} onChange={(e) => setPwForm((s) => ({ ...s, current: e.target.value }))} fullWidth />
            <TextField label="New Password" type="password" value={pwForm.next} onChange={(e) => setPwForm((s) => ({ ...s, next: e.target.value }))} fullWidth />
            <TextField label="Confirm New Password" type="password" value={pwForm.confirm} onChange={(e) => setPwForm((s) => ({ ...s, confirm: e.target.value }))} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePw(false)}>Cancel</Button>
          <Button variant="contained" onClick={changePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
