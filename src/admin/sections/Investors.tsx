import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PortfolioCharts from '../../components/PortfolioCharts';

type InvestorStatus = 'new' | 'pending' | 'active' | 'frozen' | 'deactivated';

type Investor = {
  id: string;
  name: string;
  email: string;
  status: InvestorStatus;
  broker?: string;
  lastActive?: string;
  // portfolio fields for active users
  cash?: number;
  portfolioValue?: number;
  positions?: Array<{ symbol: string; shares: number; value: number }>;
  // kyc details for pending users
  kyc?: Record<string, string>;
};

// Local order/transaction types & sample data used for the modal tables
type Order = {
  id: string;
  investor: string;
  order: string;
  status: string;
  action: string;
  type: string;
  symbol?: string;
  quantity?: number;
  price?: number;
  date?: string;
};

type Transaction = {
  id: string;
  investor: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  status: string;
  date: string;
};

const sampleOrders: Order[] = [
  { id: 'OR001', investor: 'John Mwale', order: 'Buy NBM', status: 'new', action: 'buy', type: 'market', symbol: 'NBM', quantity: 50, price: 1200, date: '2025-04-12 14:30' },
  { id: 'OR002', investor: 'Grace Banda', order: 'Sell AIRTEL', status: 'pending', action: 'sell', type: 'limit', symbol: 'AIRTEL', quantity: 100, price: 220, date: '2025-04-12 10:15' },
  { id: 'OR003', investor: 'Peter Kumwenda', order: 'Buy ILLOVO', status: 'executed', action: 'buy', type: 'market', symbol: 'ILLOVO', quantity: 30, price: 800, date: '2025-04-11 16:45' },
];

const sampleTransactions: Transaction[] = [
  { id: 'TR001', investor: 'John Mwale', type: 'Deposit', amount: 50000, status: 'new', date: '2025-04-12 14:30' },
  { id: 'TR002', investor: 'Grace Banda', type: 'Withdrawal', amount: 20000, status: 'new', date: '2025-04-12 10:15' },
  { id: 'TR003', investor: 'Peter Kumwenda', type: 'Deposit', amount: 30000, status: 'verified', date: '2025-04-11 16:45' },
];

const sampleInvestors: Investor[] = [
  {
    id: 'CL001',
    name: 'John Mwale',
    email: 'john.mwale@example.com',
    status: 'active',
    broker: 'Cedar Capital Ltd',
    lastActive: '2025-04-10 16:45',
    cash: 50000,
    portfolioValue: 250000,
    positions: [
      { symbol: 'NBM', shares: 200, value: 100000 },
      { symbol: 'AIRTEL', shares: 100, value: 50000 },
    ],
  },
  {
    id: 'CL002',
    name: 'Grace Banda',
    email: 'grace.banda@example.com',
    status: 'pending',
    broker: 'Cedar Capital Ltd',
    lastActive: '2025-04-10 16:45',
    kyc: { idType: 'ID Card', idNumber: 'ID-998877' },
  },
  {
    id: 'CL003',
    name: 'Peter Kumwenda',
    email: 'peter.k@example.com',
    status: 'new',
    broker: 'Cedar Capital Ltd',
    lastActive: '2025-04-10 16:45',
  },
  {
    id: 'CL005',
    name: 'Peter Kumwenda',
    email: 'peter.k@example.com',
    status: 'active',
    broker: 'Cedar Capital Ltd',
    lastActive: '2025-04-10 16:45',
    cash: 20000,
    portfolioValue: 180000,
    positions: [{ symbol: 'AIRTEL', shares: 150, value: 63000 }],
  },
  {
    id: 'CL004',
    name: 'James Phiri',
    email: 'james.phiri@example.com',
    status: 'pending',
    broker: 'Cedar Capital Ltd',
    lastActive: '2025-04-09 11:20',
    kyc: { idType: 'Passport', idNumber: 'P-445566' },
  },
];

export default function Investors() {
  const [investors, setInvestors] = React.useState<Investor[]>(sampleInvestors);
  const [selected, setSelected] = React.useState<Investor | null>(null);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filteredInvestors = React.useMemo(() => {
    if (!search) return investors;
    const s = search.toLowerCase();
    return investors.filter((i) => i.name.toLowerCase().includes(s) || i.id.toLowerCase().includes(s) || (i.email || '').toLowerCase().includes(s));
  }, [investors, search]);

  const openFor = (investorId: string) => {
    const inv = investors.find((i) => i.id === investorId) || null;
    setSelected(inv);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  const sendMessage = (investor: Investor, message?: string) => {
    // stub: integrate email/notification service here
    // eslint-disable-next-line no-console
    console.log('Send message to', investor.email, message || 'Hello');
    alert(`Message sent to ${investor.email}`);
  };

  const verifyInvestor = (investorId: string) => {
    setInvestors((prev) =>
      prev.map((p) => (p.id === investorId ? { ...p, status: 'active' } : p))
    );
    alert('Investor verified');
    close();
  };

  const freezeAccount = (investorId: string) => {
    setInvestors((prev) => prev.map((p) => (p.id === investorId ? { ...p, status: 'frozen' } : p)));
    alert('Account frozen');
    close();
  };

  const deactivateAccount = (investorId: string) => {
    setInvestors((prev) => prev.map((p) => (p.id === investorId ? { ...p, status: 'deactivated' } : p)));
    alert('Account deactivated');
    close();
  };

  const renderStatusChip = (status: InvestorStatus) => {
    switch (status) {
      case 'active':
        return <Chip label="Active" color="success" size="small" />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" />;
      case 'new':
        return <Chip label="New" color="default" size="small" />;
      case 'frozen':
        return <Chip label="Frozen" color="error" size="small" />;
      case 'deactivated':
        return <Chip label="Deactivated" color="default" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const pendingUsers = investors.filter((i) => i.status === 'pending');
  const activeUsers = investors.filter((i) => i.status === 'active');
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [selectedTrans, setSelectedTrans] = React.useState<Transaction | null>(null);
  const [transOpen, setTransOpen] = React.useState(false);

  function handleTabChange(_e: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue);
  }

  // Reset tab index whenever a different investor is opened
  React.useEffect(() => {
    setTabIndex(0);
  }, [selected && selected.id]);

  // Compute tab labels based on selected investor status
  const tabs = React.useMemo(() => {
    if (!selected) return [];
    if (selected.status === 'active') return ['Portfolio', 'Transactions', 'Orders', 'Profile'];
    if (selected.status === 'pending') return ['KYC'];
    return ['Profile'];
  }, [selected?.status]);

  // Ensure tabIndex is always within bounds when tabs change
  React.useEffect(() => {
    if (tabs.length === 0) return;
    if (tabIndex >= tabs.length) setTabIndex(0);
  }, [tabs.length, tabIndex]);

  // Helper to render file links and fetch KYC values with placeholders
  const FileLink = ({ url, label }: { url?: string; label: string }) => (
    url ? (
      <Button size="small" onClick={() => window.open(url, '_blank')}>{label}</Button>
    ) : (
      <Typography variant="body2">{label}: Not uploaded</Typography>
    )
  );

  const getKycVal = (key: string) => {
    const p = (selected && selected.kyc) || {} as Record<string, any>;
    const placeholder: Record<string, any> = {
      fullLegalName: selected?.name || 'Jane Doe',
      dob: '1990-01-15',
      nationality: 'Zambian',
      address: '1234 Freedom Way, Lusaka',
      phone: '+260 97 123 4567',
      email: selected?.email || 'jane.doe@example.com',
      idType: 'Passport',
      idNumber: 'P1234567',
      issuingCountry: 'Zambia',
      idExpiry: '2030-01-01',
      nokName: 'Samuel Doe',
      nokRelationship: 'Brother',
      nokPhone: '+260 97 765 4321',
      nokEmail: 'sam.doe@example.com',
      nokAddress: '1234 Freedom Way, Lusaka',
      annualIncome: '1,200,000',
      sourceOfFunds: 'Salary',
      tradingExperience: '3',
      investmentKnowledge: 'Intermediate',
      employmentStatus: 'Employed',
      occupation: 'Accountant',
      employerName: 'Acme Ltd',
      industry: 'Finance',
      investmentGoals: 'Long-term growth',
      riskTolerance: 'Medium',
      taxId: 'TAX-998877',
      isPep: false,
      isSanctioned: false,
      idDocument: undefined,
      utilityBill: undefined,
      bankStatement: undefined,
    };
    return p[key] ?? placeholder[key] ?? '-';
  };

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Investors" />

      <Typography variant="h5">Investor Overview</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <TextField size="small" placeholder="Search investors by name, ID or email..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ maxWidth: 400 }} />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Investor ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Broker</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvestors.map((inv) => (
              <TableRow key={inv.id} hover>
                <TableCell>{inv.name}</TableCell>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{renderStatusChip(inv.status)}</TableCell>
                <TableCell>{inv.broker}</TableCell>
                <TableCell>{inv.lastActive}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openFor(inv.id)} sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button size="small" onClick={() => sendMessage(inv)}>
                    Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">KYC Management (Pending)</Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Investor</TableCell>
                  <TableCell>Document</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingUsers.map((inv) => (
                  <TableRow key={inv.id} hover>
                    <TableCell>{inv.name}</TableCell>
                    <TableCell>{inv.kyc?.idType || 'N/A'}</TableCell>
                    <TableCell>{renderStatusChip(inv.status)}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => openFor(inv.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Activity Monitoring</Typography>
          <Paper sx={{ p: 2, mt: 1 }}>
            <List>
              <ListItem disableGutters>
                <ListItemText primary="2025-04-12 14:30 — John Mwale placed a buy order for NBM." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="2025-04-11 09:15 — Grace Banda submitted KYC documents." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="2025-04-10 16:45 — Peter Kumwenda deposited MK 30,000." />
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Portfolio Management (Active)</Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Investor</TableCell>
                  <TableCell>Total Value</TableCell>
                  <TableCell>Top Holding</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeUsers.map((inv) => (
                  <TableRow key={inv.id} hover>
                    <TableCell>{inv.name}</TableCell>
                    <TableCell>{inv.portfolioValue ? `MK ${inv.portfolioValue.toLocaleString()}` : 'MK 0'}</TableCell>
                    <TableCell>{inv.positions && inv.positions.length ? `${inv.positions[0].symbol} (${Math.round((inv.positions[0].value / (inv.portfolioValue || 1)) * 100)}%)` : '-'}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => openFor(inv.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            View All Portfolios
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={close} maxWidth="lg" fullWidth>
        <DialogTitle>Investor Details</DialogTitle>
        <DialogContent dividers>
          {!selected && <Typography>Loading...</Typography>}

          {selected && (
            <Box>
              {/* Tabs: for 'new' and 'pending' show a single Profile/KYC tab; for 'active' show Portfolio/Transactions/Orders/Profile */}
              <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
                {tabs.map((t, i) => (
                  <Tab key={t} label={t} value={i} />
                ))}
              </Tabs>

              {/* Tab panels */}
              {selected.status === 'new' && (
                <Box role="tabpanel">
                  <Typography variant="h6">Profile</Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Full Name</Typography>
                      <Typography>{selected.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Phone Number</Typography>
                      <Typography>{(selected as any).phone || selected.kyc?.phone || '-'}</Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" size="small" onClick={() => sendMessage(selected)}>Send Email / Notification</Button>
                  </Box>
                </Box>
              )}

              {selected.status === 'pending' && (
                <Box role="tabpanel">
                  <Typography variant="h6" sx={{ mb: 1 }}>KYC Submission</Typography>

                  {/* Provide placeholder values if KYC fields are missing */}
                  {(() => {
                    const p = selected.kyc || {} as Record<string, any>;
                    const placeholder = {
                      fullLegalName: 'Jane Doe',
                      dob: '1990-01-15',
                      nationality: 'Zambian',
                      address: '1234 Freedom Way, Lusaka',
                      phone: '+260 97 123 4567',
                      email: selected.email || 'jane.doe@example.com',
                      idType: 'Passport',
                      idNumber: 'P1234567',
                      issuingCountry: 'Zambia',
                      idExpiry: '2030-01-01',
                      nokName: 'Samuel Doe',
                      nokRelationship: 'Brother',
                      nokPhone: '+260 97 765 4321',
                      nokEmail: 'sam.doe@example.com',
                      nokAddress: '1234 Freedom Way, Lusaka',
                      annualIncome: '1,200,000',
                      sourceOfFunds: 'Salary',
                      tradingExperience: '3',
                      investmentKnowledge: 'Intermediate',
                      employmentStatus: 'Employed',
                      occupation: 'Accountant',
                      employerName: 'Acme Ltd',
                      industry: 'Finance',
                      investmentGoals: 'Long-term growth',
                      riskTolerance: 'Medium',
                      taxId: 'TAX-998877',
                      isPep: false,
                      isSanctioned: false,
                      idDocument: p.idDocument || 'https://example.com/mock-id.pdf',
                      utilityBill: p.utilityBill || 'https://example.com/mock-utility.pdf',
                      bankStatement: p.bankStatement || 'https://example.com/mock-bank.pdf',
                    } as Record<string, any>;

                    const get = (key: string) => p[key] ?? placeholder[key] ?? '-';

                    const FileLink = ({ url, label }: { url?: string; label: string }) => (
                      url ? (
                        <Button size="small" onClick={() => window.open(url, '_blank')}>
                          {label}
                        </Button>
                      ) : <Typography variant="body2">{label}: Not uploaded</Typography>
                    );

                    return (
                      <Grid container spacing={2}>
                        {/** Each card should stretch to fill its grid cell for consistent height */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Personal Information</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Full Legal Name" secondary={get('fullLegalName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Date of Birth" secondary={get('dob')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Nationality" secondary={get('nationality')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Residential Address" secondary={get('address')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Phone Number" secondary={get('phone')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Email Address" secondary={get('email')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Identification Details</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="ID Type" secondary={get('idType')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="ID Number" secondary={get('idNumber')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Issuing Country" secondary={get('issuingCountry')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Expiration Date" secondary={get('idExpiry')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Next of Kin</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Full Name" secondary={get('nokName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Relationship" secondary={get('nokRelationship')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Phone" secondary={get('nokPhone')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Email" secondary={get('nokEmail')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Address" secondary={get('nokAddress')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Financial & Trading Experience</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Annual Income (MK)" secondary={get('annualIncome')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Source of Funds" secondary={get('sourceOfFunds')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Trading Experience (Years)" secondary={get('tradingExperience')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Investment Knowledge" secondary={get('investmentKnowledge')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Employment & Occupation</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Employment Status" secondary={get('employmentStatus')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Occupation" secondary={get('occupation')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Employer Name" secondary={get('employerName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Industry" secondary={get('industry')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Risk Tolerance & Objectives</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Investment Goals" secondary={get('investmentGoals')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Risk Tolerance" secondary={get('riskTolerance')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent sx={{ height: '100%' }}>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Regulatory Compliance</Typography>
                              <List sx={{ maxHeight: 220, overflow: 'auto' }}>
                                <ListItem disableGutters><ListItemText primary="Tax Identification Number" secondary={get('taxId')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Politically Exposed Person (PEP)" secondary={(p.isPep ? 'Yes' : p.isPep === false ? 'No' : '-') } /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Subject to Sanctions" secondary={(p.isSanctioned ? 'Yes' : p.isSanctioned === false ? 'No' : '-') } /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex' }}>
                          <Card variant="outlined" sx={{ bgcolor: 'grey.900', color: 'common.white', width: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Uploads</Typography>
                              <Stack direction="row" spacing={1}>
                                <FileLink url={get('idDocument')} label="Open ID Document" />
                                <FileLink url={get('utilityBill')} label="Open Utility Bill" />
                                <FileLink url={get('bankStatement')} label="Open Bank Statement" />
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    );
                  })()}

                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" size="small" onClick={() => sendMessage(selected)} sx={{ mr: 1 }}>Send Email / Notification</Button>
                    <Button variant="contained" color="success" size="small" onClick={() => verifyInvestor(selected.id)} sx={{ mr: 1 }}>Verify Investor</Button>
                    <Button variant="outlined" size="small" onClick={() => close()}>Close</Button>
                  </Box>
                </Box>
              )}

              {selected.status === 'active' && (
                <Box>
                  {/* Portfolio Tab */}
                  {tabIndex === 0 && (
                    <Box role="tabpanel">
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2">Total Value</Typography>
                              <Typography variant="h5">MK {selected.portfolioValue?.toLocaleString() ?? '0'}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Cash: MK {selected.cash?.toLocaleString() ?? '0'}</Typography>
                              <Box sx={{ mt: 2 }}>
                                <Typography variant="caption">Daily Change</Typography>
                                <Typography sx={{ color: 'success.main' }}>+1.2%</Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                          <PortfolioCharts
                            performanceData={(selected.portfolioValue ? Array.from({ length: 7 }).map((_, i) => ({ date: `D-${6 - i}`, value: Math.round((selected.portfolioValue! / 7) * (i + 1)) })) : [])}
                            assetAllocation={(selected.positions || []).map((p) => ({ name: p.symbol, value: p.value }))}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Positions</Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Shares</TableCell>
                                <TableCell>Value (MK)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(selected.positions || []).map((p) => (
                                <TableRow key={p.symbol}>
                                  <TableCell>{p.symbol}</TableCell>
                                  <TableCell>{p.shares}</TableCell>
                                  <TableCell>{p.value.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Transactions Tab */}
                  {tabIndex === 1 && (
                    <Box role="tabpanel">
                      <Typography variant="h6">Transactions</Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sampleTransactions.filter((t) => t.investor === selected.name).map((t) => (
                            <TableRow key={t.id} hover>
                              <TableCell>{t.id}</TableCell>
                              <TableCell>{t.type}</TableCell>
                              <TableCell>{`MK ${t.amount.toLocaleString()}`}</TableCell>
                              <TableCell>{t.status}</TableCell>
                              <TableCell>{t.date}</TableCell>
                              <TableCell>
                                <Button size="small" onClick={() => { setSelectedTrans(t); setTransOpen(true); }}>View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  )}

                  {/* Orders Tab */}
                  {tabIndex === 2 && (
                    <Box role="tabpanel">
                      <Typography variant="h6">Orders</Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sampleOrders.filter((o) => o.investor === selected.name).map((o) => (
                            <TableRow key={o.id} hover>
                              <TableCell>{o.id}</TableCell>
                              <TableCell>{o.order}</TableCell>
                              <TableCell>{o.type}</TableCell>
                              <TableCell>{o.status}</TableCell>
                              <TableCell>{o.date}</TableCell>
                              <TableCell>
                                <Button size="small" onClick={() => { setSelectedOrder(o); setOrderOpen(true); }}>View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  )}

                  {/* Profile Tab */}
                  {tabIndex === 3 && (
                    <Box role="tabpanel">
                      <Typography variant="h6">Profile & KYC</Typography>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Personal Information</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Full Legal Name" secondary={getKycVal('fullLegalName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Date of Birth" secondary={getKycVal('dob')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Nationality" secondary={getKycVal('nationality')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Residential Address" secondary={getKycVal('address')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Phone Number" secondary={getKycVal('phone')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Email Address" secondary={getKycVal('email')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Identification Details</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="ID Type" secondary={getKycVal('idType')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="ID Number" secondary={getKycVal('idNumber')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Issuing Country" secondary={getKycVal('issuingCountry')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Expiration Date" secondary={getKycVal('idExpiry')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Next of Kin</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Full Name" secondary={getKycVal('nokName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Relationship" secondary={getKycVal('nokRelationship')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Phone" secondary={getKycVal('nokPhone')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Email" secondary={getKycVal('nokEmail')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Address" secondary={getKycVal('nokAddress')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Financial & Trading Experience</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Annual Income (MK)" secondary={getKycVal('annualIncome')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Source of Funds" secondary={getKycVal('sourceOfFunds')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Trading Experience (Years)" secondary={getKycVal('tradingExperience')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Investment Knowledge" secondary={getKycVal('investmentKnowledge')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Employment & Occupation</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Employment Status" secondary={getKycVal('employmentStatus')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Occupation" secondary={getKycVal('occupation')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Employer Name" secondary={getKycVal('employerName')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Industry" secondary={getKycVal('industry')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Risk Tolerance & Objectives</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Investment Goals" secondary={getKycVal('investmentGoals')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Risk Tolerance" secondary={getKycVal('riskTolerance')} /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Regulatory Compliance</Typography>
                              <List>
                                <ListItem disableGutters><ListItemText primary="Tax Identification Number" secondary={getKycVal('taxId')} /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Politically Exposed Person (PEP)" secondary={(getKycVal('isPep') ? 'Yes' : getKycVal('isPep') === false ? 'No' : '-') } /></ListItem>
                                <ListItem disableGutters><ListItemText primary="Subject to Sanctions" secondary={(getKycVal('isSanctioned') ? 'Yes' : getKycVal('isSanctioned') === false ? 'No' : '-') } /></ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        <Grid item xs={12}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Uploads</Typography>
                              <Stack direction="row" spacing={1}>
                                <FileLink url={getKycVal('idDocument')} label="Open ID Document" />
                                <FileLink url={getKycVal('utilityBill')} label="Open Utility Bill" />
                                <FileLink url={getKycVal('bankStatement')} label="Open Bank Statement" />
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" size="small" onClick={() => sendMessage(selected)}>Send Email / Notification</Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => freezeAccount(selected.id)}>Freeze Account</Button>
                        <Button variant="outlined" size="small" onClick={() => deactivateAccount(selected.id)}>Deactivate Account</Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        {/* Order details dialog (mirrors Orders.tsx) */}
        <Dialog open={orderOpen} onClose={() => { setOrderOpen(false); setSelectedOrder(null); }} maxWidth="sm" fullWidth>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent dividers>
            {!selectedOrder && <Typography>Loading...</Typography>}
            {selectedOrder && (
              <Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <Typography variant="body2">Order ID</Typography>
                  <Typography variant="body2">{selectedOrder.id}</Typography>
                  <Typography variant="body2">Investor</Typography>
                  <Typography variant="body2">{selectedOrder.investor}</Typography>
                  <Typography variant="body2">Type</Typography>
                  <Typography variant="body2">{selectedOrder.type}</Typography>
                  <Typography variant="body2">Stock</Typography>
                  <Typography variant="body2">{selectedOrder.symbol}</Typography>
                  <Typography variant="body2">Quantity</Typography>
                  <Typography variant="body2">{selectedOrder.quantity}</Typography>
                  <Typography variant="body2">Price</Typography>
                  <Typography variant="body2">{selectedOrder.price}</Typography>
                  <Typography variant="body2">Status</Typography>
                  <Typography variant="body2">{selectedOrder.status}</Typography>
                  <Typography variant="body2">Date</Typography>
                  <Typography variant="body2">{selectedOrder.date}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOrderOpen(false); setSelectedOrder(null); }}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Transaction details dialog (mirrors Transactions.tsx) */}
        <Dialog open={transOpen} onClose={() => { setTransOpen(false); setSelectedTrans(null); }} maxWidth="sm" fullWidth>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogContent dividers>
            {!selectedTrans && <Typography>Loading...</Typography>}
            {selectedTrans && (
              <Box>
                <List>
                  <ListItem disableGutters><ListItemText primary="Transaction ID" secondary={selectedTrans.id} /></ListItem>
                  <ListItem disableGutters><ListItemText primary="Investor" secondary={selectedTrans.investor} /></ListItem>
                  <ListItem disableGutters><ListItemText primary="Type" secondary={selectedTrans.type} /></ListItem>
                  <ListItem disableGutters><ListItemText primary="Amount" secondary={`MK ${selectedTrans.amount.toLocaleString()}`} /></ListItem>
                  <ListItem disableGutters><ListItemText primary="Date" secondary={selectedTrans.date} /></ListItem>
                  <ListItem disableGutters><ListItemText primary="Status" secondary={selectedTrans.status} /></ListItem>
                </List>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setTransOpen(false); setSelectedTrans(null); }}>Close</Button>
          </DialogActions>
        </Dialog>

        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
