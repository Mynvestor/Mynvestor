import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
// Chart/Tree/DataGrid components removed from this layout — keep file minimal
import StatCard, { StatCardProps } from './StatCard';
import CompanyList from './CompanyList';
import CompanyAccordion from './CompanyAccordion';
import StockQuoteModal from './StockQuoteModal';
import CompanyDetailsModal from './CompanyDetailsModal';
import { useState } from 'react';

const data: StatCardProps[] = [
  {
    title: 'MASI',
    value: '606,629',
    interval: '21 Trades',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'FSI',
    value: '454,917',
    interval: '12 Trades',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'DSI',
    value: '108,101',
    interval: '2 Trades',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid() {
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCompanyClick = (company: any) => {
    // populate a bit more sample fields if missing
    const enriched = {
      ...company,
      price: company.price ?? 'MK 0.00',
      open: company.open ?? company.price ?? 'MK 0.00',
      high: company.high ?? company.price ?? 'MK 0.00',
      low: company.low ?? company.price ?? 'MK 0.00',
      volume: company.volume ?? 0,
      overview: company.overview ?? 'No overview available.',
      lastUpdate: company.lastUpdate ?? new Date().toLocaleString(),
      sector: company.sector ?? 'Unknown',
      news: company.news ?? [],
    };
    setSelectedCompany(enriched);
    setQuoteOpen(true);
  };

  const handleOpenDetailsFromQuote = () => {
    setQuoteOpen(false);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Indices
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 4, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid columns={12} size={{ xs: 12, lg: 4 }}>
      </Grid>



      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <CompanyList onCompanyClick={handleCompanyClick} />

        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Overview
          </Typography>
          <CompanyAccordion />
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
      <StockQuoteModal
        open={quoteOpen}
        company={selectedCompany}
        onClose={() => setQuoteOpen(false)}
        onOpenDetails={handleOpenDetailsFromQuote}
      />
      <CompanyDetailsModal open={detailsOpen} company={selectedCompany} onClose={handleCloseDetails} />
    </Box>
  );
}
