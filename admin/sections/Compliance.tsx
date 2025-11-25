import React, { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type Rule = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high';
};

type Watchlist = {
  id: string;
  name: string;
  entries: string[]; // names or identifiers
};

type CaseItem = {
  id: string;
  title: string;
  status: 'open' | 'in_review' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  notes?: string;
  createdAt: string;
};

const sampleRules: Rule[] = [
  { id: 'R1', name: 'Transaction Velocity', description: 'Flag accounts with rapid deposits/withdrawals', enabled: true, severity: 'high' },
  { id: 'R2', name: 'High Value Deposit', description: 'Deposits above configured threshold', enabled: true, severity: 'medium' },
  { id: 'R3', name: 'Multiple Accounts', description: 'Multiple accounts from same device/IP', enabled: false, severity: 'low' },
];

const sampleWatchlists: Watchlist[] = [
  { id: 'W1', name: 'PEP List', entries: ['John Doe', 'Jane Citizen'] },
  { id: 'W2', name: 'Sanctions', entries: ['Bad Actor Ltd'] },
];

const sampleCases: CaseItem[] = [
  { id: 'C1', title: 'Suspicious Deposit - ACME', status: 'open', priority: 'high', assignedTo: 'compliance1', notes: 'Large deposit from new account', createdAt: '2025-04-10' },
  { id: 'C2', title: 'Potential PEP Match', status: 'in_review', priority: 'medium', assignedTo: 'compliance2', notes: 'Name matched PEP list', createdAt: '2025-04-08' },
];

export default function Compliance() {
  const [rules, setRules] = useState<Rule[]>(sampleRules);
  const [watchlists, setWatchlists] = useState<Watchlist[]>(sampleWatchlists);
  const [cases, setCases] = useState<CaseItem[]>(sampleCases);

  // UI state
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [ruleForm, setRuleForm] = useState({ name: '', description: '', enabled: true, severity: 'medium' as Rule['severity'] });

  const [watchlistDialogOpen, setWatchlistDialogOpen] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState<Watchlist | null>(null);
  const [watchlistForm, setWatchlistForm] = useState({ name: '', entriesText: '' });

  const [caseDialogOpen, setCaseDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [caseForm, setCaseForm] = useState({ title: '', priority: 'medium' as CaseItem['priority'], assignedTo: '', notes: '' });

  // Global toggles and thresholds
  const [autoPepScreening, setAutoPepScreening] = useState(true);
  const [autoFlagging, setAutoFlagging] = useState(true);
  const [suspiciousAmountThreshold, setSuspiciousAmountThreshold] = useState<number>(50000);

  const openAddRule = () => { setEditingRule(null); setRuleForm({ name: '', description: '', enabled: true, severity: 'medium' }); setRuleDialogOpen(true); };
  const openEditRule = (r: Rule) => { setEditingRule(r); setRuleForm({ name: r.name, description: r.description || '', enabled: r.enabled, severity: r.severity }); setRuleDialogOpen(true); };
  const saveRule = () => {
    if (!ruleForm.name.trim()) return;
    if (editingRule) {
      setRules((prev) => prev.map((p) => p.id === editingRule.id ? { ...p, ...ruleForm } : p));
    } else {
      const id = `R${Date.now()}`;
      setRules((prev) => [...prev, { id, ...ruleForm } as Rule]);
    }
    setRuleDialogOpen(false);
  };
  const deleteRule = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id));

  const openAddWatchlist = () => { setEditingWatchlist(null); setWatchlistForm({ name: '', entriesText: '' }); setWatchlistDialogOpen(true); };
  const openEditWatchlist = (w: Watchlist) => { setEditingWatchlist(w); setWatchlistForm({ name: w.name, entriesText: w.entries.join('\n') }); setWatchlistDialogOpen(true); };
  const saveWatchlist = () => {
    if (!watchlistForm.name.trim()) return;
    const entries = watchlistForm.entriesText.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
    if (editingWatchlist) {
      setWatchlists((prev) => prev.map((p) => p.id === editingWatchlist.id ? { ...p, name: watchlistForm.name, entries } : p));
    } else {
      const id = `W${Date.now()}`;
      setWatchlists((prev) => [...prev, { id, name: watchlistForm.name, entries }]);
    }
    setWatchlistDialogOpen(false);
  };
  const deleteWatchlist = (id: string) => setWatchlists((prev) => prev.filter((w) => w.id !== id));

  const openAddCase = () => { setEditingCase(null); setCaseForm({ title: '', priority: 'medium', assignedTo: '', notes: '' }); setCaseDialogOpen(true); };
  const openEditCase = (c: CaseItem) => { setEditingCase(c); setCaseForm({ title: c.title, priority: c.priority, assignedTo: c.assignedTo || '', notes: c.notes || '' }); setCaseDialogOpen(true); };
  const saveCase = () => {
    if (!caseForm.title.trim()) return;
    if (editingCase) {
      setCases((prev) => prev.map((p) => p.id === editingCase.id ? { ...p, ...caseForm } as CaseItem : p));
    } else {
      const id = `CASE${Date.now()}`;
      setCases((prev) => [{ id, title: caseForm.title, status: 'open', priority: caseForm.priority, assignedTo: caseForm.assignedTo || undefined, notes: caseForm.notes, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    }
    setCaseDialogOpen(false);
  };
  const deleteCase = (id: string) => setCases((prev) => prev.filter((c) => c.id !== id));

  const exportAudit = () => {
    const payload = { rules, watchlists, cases, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `compliance-audit-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url);
  };

  const highPriorityCount = useMemo(() => cases.filter((c) => c.priority === 'high' && c.status !== 'closed').length, [cases]);

  return (
    <Stack spacing={3} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Compliance" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Automated Screening</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Enable automatic screening of customers against PEP & sanctions lists.</Typography>
              <FormControlLabel control={<Switch checked={autoPepScreening} onChange={(e) => setAutoPepScreening(e.target.checked)} />} label="Enable PEP/Sanctions Screening" />
              <FormControlLabel control={<Switch checked={autoFlagging} onChange={(e) => setAutoFlagging(e.target.checked)} />} label="Auto-flag suspicious activity" />
              <Box sx={{ mt: 1 }}>
                <TextField label="Suspicious Amount Threshold (MWK)" type="number" value={suspiciousAmountThreshold} onChange={(e) => setSuspiciousAmountThreshold(Number(e.target.value || 0))} fullWidth />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Actions</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={openAddCase}>New Case</Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportAudit}>Export Audit</Button>
                <Button variant="outlined" color="error" startIcon={<WarningAmberIcon />}>{highPriorityCount} High Priority</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Watchlists</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Manage PEP and sanctions watchlists.</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<AddIcon />} onClick={openAddWatchlist}>Add Watchlist</Button>
                <Button size="small">Import List</Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box>
                {watchlists.map((w) => (
                  <Box key={w.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                    <Typography>{w.name} ({w.entries.length})</Typography>
                    <Box>
                      <IconButton size="small" onClick={() => openEditWatchlist(w)}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => deleteWatchlist(w.id)}><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Rules Engine</Typography>
                <Button startIcon={<AddIcon />} onClick={openAddRule}>Add Rule</Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Enabled</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rules.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.name}</TableCell>
                      <TableCell>{r.description}</TableCell>
                      <TableCell>{r.severity}</TableCell>
                      <TableCell>
                        <Switch checked={r.enabled} onChange={(e) => setRules((prev) => prev.map((p) => p.id === r.id ? { ...p, enabled: e.target.checked } : p))} />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => openEditRule(r)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => deleteRule(r.id)}><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Case Management</Typography>
                <Button startIcon={<AddIcon />} onClick={openAddCase}>New Case</Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cases.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>{c.priority}</TableCell>
                      <TableCell>{c.status}</TableCell>
                      <TableCell>{c.assignedTo}</TableCell>
                      <TableCell>{c.createdAt}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => openEditCase(c)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => deleteCase(c.id)}><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Rule dialog */}
      <Dialog open={ruleDialogOpen} onClose={() => setRuleDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingRule ? 'Edit Rule' : 'Add Rule'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" value={ruleForm.name} onChange={(e) => setRuleForm((s) => ({ ...s, name: e.target.value }))} fullWidth />
            <TextField label="Description" value={ruleForm.description} onChange={(e) => setRuleForm((s) => ({ ...s, description: e.target.value }))} fullWidth multiline rows={3} />
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select value={ruleForm.severity} onChange={(e) => setRuleForm((s) => ({ ...s, severity: e.target.value as any }))} label="Severity">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Switch checked={ruleForm.enabled} onChange={(e) => setRuleForm((s) => ({ ...s, enabled: e.target.checked }))} />} label="Enabled" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRuleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveRule}>{editingRule ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Watchlist dialog */}
      <Dialog open={watchlistDialogOpen} onClose={() => setWatchlistDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingWatchlist ? 'Edit Watchlist' : 'Add Watchlist'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" value={watchlistForm.name} onChange={(e) => setWatchlistForm((s) => ({ ...s, name: e.target.value }))} fullWidth />
            <TextField label="Entries (one per line or comma-separated)" value={watchlistForm.entriesText} onChange={(e) => setWatchlistForm((s) => ({ ...s, entriesText: e.target.value }))} fullWidth multiline rows={6} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWatchlistDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveWatchlist}>{editingWatchlist ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Case dialog */}
      <Dialog open={caseDialogOpen} onClose={() => setCaseDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingCase ? 'Edit Case' : 'New Case'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={caseForm.title} onChange={(e) => setCaseForm((s) => ({ ...s, title: e.target.value }))} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select value={caseForm.priority} onChange={(e) => setCaseForm((s) => ({ ...s, priority: e.target.value as any }))} label="Priority">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Assigned To" value={caseForm.assignedTo} onChange={(e) => setCaseForm((s) => ({ ...s, assignedTo: e.target.value }))} fullWidth />
            <TextField label="Notes" value={caseForm.notes} onChange={(e) => setCaseForm((s) => ({ ...s, notes: e.target.value }))} fullWidth multiline rows={4} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCaseDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveCase}>{editingCase ? 'Save' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
