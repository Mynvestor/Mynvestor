import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function KYCForm({ readOnly }: { readOnly?: boolean } = {}) {
  const [personal, setPersonal] = useState({ fullName: 'John Doe', nationality: 'Malawian', email: 'john@example.com', phone: '+265912345678', dob: '1990-01-01' });
  const [idInfo, setIdInfo] = useState({ idType: 'Passport', idNumber: 'A1234567', country: 'Malawi', expiry: '2030-01-01' });
  const [finance, setFinance] = useState({ annualIncome: 'MK 5,000,000', sourceOfFunds: 'Salary', experience: '2 years' });
  const [employment, setEmployment] = useState({ status: 'Employed', occupation: 'Software Engineer', employer: 'Acme Ltd', industry: 'Technology' });
  const [nextOfKin, setNextOfKin] = useState({ name: '', relationship: '', phone: '', email: '', address: '' });
  const [risk, setRisk] = useState({ objectives: 'Long-term growth', tolerance: 'Medium' });
  const [regulations, setRegulations] = useState({ taxId: '', isPEP: false });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');

  const handleSave = () => {
    setSnackbarSeverity('success');
    setSnackbarMessage('Your KYC details have been saved.');
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField label="Full legal name" value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Nationality" value={personal.nationality} onChange={(e) => setPersonal({ ...personal, nationality: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Date of Birth" type="date" value={personal.dob} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} disabled={!!readOnly} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Next of Kin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField label="Full name" value={nextOfKin.name} onChange={(e) => setNextOfKin({ ...nextOfKin, name: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Relationship" value={nextOfKin.relationship} onChange={(e) => setNextOfKin({ ...nextOfKin, relationship: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Phone" value={nextOfKin.phone} onChange={(e) => setNextOfKin({ ...nextOfKin, phone: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Email" value={nextOfKin.email} onChange={(e) => setNextOfKin({ ...nextOfKin, email: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Address" value={nextOfKin.address} onChange={(e) => setNextOfKin({ ...nextOfKin, address: e.target.value })} fullWidth multiline minRows={2} disabled={!!readOnly} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Identification Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select value={idInfo.idType} label="Document Type" onChange={(e) => setIdInfo({ ...idInfo, idType: e.target.value as string })} disabled={!!readOnly}>
                  <MenuItem value="Passport">Passport</MenuItem>
                  <MenuItem value="National ID">National ID</MenuItem>
                  <MenuItem value="Driver's License">Driver's License</MenuItem>
                </Select>
              </FormControl>
              <TextField label="ID Number" value={idInfo.idNumber} onChange={(e) => setIdInfo({ ...idInfo, idNumber: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Issuing Country" value={idInfo.country} onChange={(e) => setIdInfo({ ...idInfo, country: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Expiration Date" type="date" value={idInfo.expiry} onChange={(e) => setIdInfo({ ...idInfo, expiry: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} disabled={!!readOnly} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Financial Experience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField label="Annual Income" value={finance.annualIncome} onChange={(e) => setFinance({ ...finance, annualIncome: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Source of Funds" value={finance.sourceOfFunds} onChange={(e) => setFinance({ ...finance, sourceOfFunds: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Trading Experience" value={finance.experience} onChange={(e) => setFinance({ ...finance, experience: e.target.value })} fullWidth disabled={!!readOnly} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Employment Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Employment Status</InputLabel>
                <Select value={employment.status} label="Employment Status" onChange={(e) => setEmployment({ ...employment, status: e.target.value as string })} disabled={!!readOnly}>
                  <MenuItem value="Employed">Employed</MenuItem>
                  <MenuItem value="Self-employed">Self-employed</MenuItem>
                  <MenuItem value="Unemployed">Unemployed</MenuItem>
                  <MenuItem value="Retired">Retired</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Occupation" value={employment.occupation} onChange={(e) => setEmployment({ ...employment, occupation: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Employer" value={employment.employer} onChange={(e) => setEmployment({ ...employment, employer: e.target.value })} fullWidth disabled={!!readOnly} />
              <TextField label="Industry" value={employment.industry} onChange={(e) => setEmployment({ ...employment, industry: e.target.value })} fullWidth disabled={!!readOnly} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Risk & Objectives</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField label="Investment Objectives" value={risk.objectives} onChange={(e) => setRisk({ ...risk, objectives: e.target.value })} fullWidth disabled={!!readOnly} />
              <FormControl fullWidth>
                <InputLabel>Risk Tolerance</InputLabel>
                <Select value={risk.tolerance} label="Risk Tolerance" onChange={(e) => setRisk({ ...risk, tolerance: e.target.value as string })} disabled={!!readOnly}>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 700 }}>Regulations & Uploads</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField label="Tax ID" value={regulations.taxId} onChange={(e) => setRegulations({ ...regulations, taxId: e.target.value })} fullWidth disabled={!!readOnly} />
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={regulations.isPEP} onChange={(e) => setRegulations({ ...regulations, isPEP: e.target.checked })} disabled={!!readOnly} />} label="Politically Exposed Person (PEP)" />
              </FormGroup>

              <Divider />

              <Stack spacing={1}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Uploads</Typography>
                <input type="file" accept="image/*,.pdf" disabled={!!readOnly} />
                <input type="file" accept="image/*,.pdf" disabled={!!readOnly} />
                <input type="file" accept="image/*,.pdf" disabled={!!readOnly} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Upload ID, Utility Bill, and Proof of Income (Payslip or Bank Statement)</Typography>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {!readOnly && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save KYC</Button>
          </Box>
        )}
      </Stack>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Box>
  );
}
