import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import GetAppIcon from '@mui/icons-material/GetApp';

export type DetailsCompany = {
  name: string;
  ticker?: string;
  logo?: string;
  price?: string | number;
  lastUpdate?: string;
  sector?: string;
  overview?: string;
  dayRange?: string;
  week52Range?: string;
  volume?: number;
  marketCap?: string;
  pe?: string;
  divYield?: string;
  eps?: string;
  pb?: string;
  rsi?: string;
  macd?: string;
  dma50?: string;
  dma200?: string;
  techSummary?: string;
  roe?: string;
  debtEquity?: string;
  peg?: string;
  currentRatio?: string;
  roic?: string;
  ebitda?: string;
  ownership?: { inst?: number; insiders?: number; public?: number };
  news?: string[];
};

export default function CompanyDetailsModal({
  open,
  company,
  onClose,
}: {
  open: boolean;
  company?: DetailsCompany | null;
  onClose: () => void;
}) {
  if (!company) return null;

  const ownership = company.ownership ?? { inst: 40, insiders: 10, public: 50 };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {company.name}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={company.logo} alt={company.name} variant="rounded" sx={{ width: 72, height: 72, mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{company.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{company.sector}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">{company.price ?? '-'}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{company.lastUpdate}</Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{company.overview}</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Key Statistics</Typography>
            <Typography variant="body2"><strong>Day Range:</strong> {company.dayRange ?? '-'}</Typography>
            <Typography variant="body2"><strong>52W Range:</strong> {company.week52Range ?? '-'}</Typography>
            <Typography variant="body2"><strong>Volume:</strong> {company.volume ?? '-'}</Typography>
            <Typography variant="body2"><strong>Market Cap:</strong> {company.marketCap ?? '-'}</Typography>
          </Box>

          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Technical Indicators</Typography>
            <Typography variant="body2"><strong>RSI (14):</strong> {company.rsi ?? '-'}</Typography>
            <Typography variant="body2"><strong>MACD:</strong> {company.macd ?? '-'}</Typography>
            <Typography variant="body2"><strong>50-Day MA:</strong> {company.dma50 ?? '-'}</Typography>
            <Typography variant="body2"><strong>200-Day MA:</strong> {company.dma200 ?? '-'}</Typography>
            <Typography variant="body2"><strong>Summary:</strong> {company.techSummary ?? '-'}</Typography>
          </Box>

          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Fundamental Metrics</Typography>
            <Typography variant="body2"><strong>P/E Ratio:</strong> {company.pe ?? '-'}</Typography>
            <Typography variant="body2"><strong>Dividend Yield:</strong> {company.divYield ?? '-'}</Typography>
            <Typography variant="body2"><strong>EPS:</strong> {company.eps ?? '-'}</Typography>
            <Typography variant="body2"><strong>P/B Ratio:</strong> {company.pb ?? '-'}</Typography>
          </Box>

          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Ownership Structure</Typography>
            <Box sx={{ mb: 1 }}>
              <div style={{ height: 8, background: '#2b2b2b', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${ownership.inst}%`, height: '100%', background: '#6c757d' }} />
              </div>
              <Typography variant="caption">Institutional {ownership.inst}%</Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <div style={{ height: 8, background: '#2b2b2b', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${ownership.insiders}%`, height: '100%', background: '#28a745' }} />
              </div>
              <Typography variant="caption">Insiders {ownership.insiders}%</Typography>
            </Box>
            <Box>
              <div style={{ height: 8, background: '#2b2b2b', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${ownership.public}%`, height: '100%', background: '#17a2b8' }} />
              </div>
              <Typography variant="caption">Public {ownership.public}%</Typography>
            </Box>
          </Box>

          <Box sx={{ gridColumn: '1 / -1', bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Recent News</Typography>
            <ul>
              {(company.news ?? []).map((n, i) => (
                <li key={i}><Typography variant="body2">{n}</Typography></li>
              ))}
            </ul>
          </Box>

          <Box sx={{ gridColumn: '1 / -1', bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Announcements</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<GetAppIcon />}
                label="downlodable1.pdf"
                onClick={() => window.open('/documents/downlodable1.pdf', '_blank')}
                clickable
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<GetAppIcon />}
                label="downlodable2.pdf"
                onClick={() => window.open('/documents/downlodable2.pdf', '_blank')}
                clickable
                color="primary"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
