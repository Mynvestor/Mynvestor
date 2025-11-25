import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CompanyCard from './CompanyCard';

type Company = {
  name: string;
  ticker?: string;
  logo?: string;
  price: string | number;
  change: number;
  changePercent?: number;
  volume?: number;
};

const SAMPLE_COMPANIES: Company[] = [
  {
    name: 'Airtel Malawi',
    ticker: 'AIRTEL',
    logo: '/images/logos/airtel.jpg',
    price: 'MK 52.30',
    change: 5.5,
    changePercent: 11.76,
    volume: 1250000,
  },
  {
    name: 'Blantyre Hotels',
    ticker: 'BHL',
    logo: '/images/logos/bhl.png',
    price: 'MK 52.30',
    change: 3.2,
    changePercent: 6.51,
    volume: 850000,
  },
  {
    name: 'FDH Bank',
    ticker: 'FDHB',
    logo: '/images/logos/fdhlogo.webp',
    price: 'MK 52.30',
    change: 2.8,
    changePercent: 5.65,
    volume: 920000,
  },
  {
    name: 'FMB Capital',
    ticker: 'FMBCH',
    logo: '/images/logos/fmbch.jpg',
    price: 'MK 52.30',
    change: -1.2,
    changePercent: -2.35,
    volume: 450000,
  },
  {
    name: 'ICON Properties',
    ticker: 'ICON',
    logo: '/images/logos/icon.png',
    price: 'MK 52.30',
    change: -2.5,
    changePercent: -4.58,
    volume: 320000,
  },
  {
    name: 'Illovo Sugar',
    ticker: 'ILLOVO',
    logo: '/images/logos/illovo.png',
    price: 'MK 52.30',
    change: -3.8,
    changePercent: -6.79,
    volume: 210000,
  },
  {
    name: 'MPICO plc',
    ticker: 'MPICO',
    logo: '/images/logos/mpico.png',
    price: 'MK 52.30',
    change: 4.2,
    changePercent: 8.85,
    volume: 1100000,
  },
  {
    name: 'Nbs Bank Plc',
    ticker: 'NBS',
    logo: '/images/logos/nbs.png',
    price: 'MK 52.30',
    change: 1.5,
    changePercent: 2.95,
    volume: 550000,
  },
  {
    name: 'NICO Holdings',
    ticker: 'NICO',
    logo: '/images/logos/nico.png',
    price: 'MK 52.30',
    change: 6.3,
    changePercent: 13.64,
    volume: 780000,
  },
  {
    name: 'Old Mutual',
    ticker: 'OMU',
    logo: '/images/logos/omu.jpg',
    price: 'MK 52.30',
    change: -0.8,
    changePercent: -1.52,
    volume: 640000,
  },
  {
    name: 'Press',
    ticker: 'PRESS',
    logo: '/images/logos/pcl.png',
    price: 'MK 52.30',
    change: 0.5,
    changePercent: 0.98,
    volume: 290000,
  },
  {
    name: 'Standard Bank',
    ticker: 'STANDARD',
    logo: '/images/logos/std.jpg',
    price: 'MK 52.30',
    change: -4.2,
    changePercent: -7.46,
    volume: 380000,
  },
];

interface CompanyAccordionProps {
  companies?: Company[];
}

export default function CompanyAccordion({ companies }: CompanyAccordionProps) {
  const data = companies ?? SAMPLE_COMPANIES;

  // Sort by change (descending) and get top 5 gainers
  const topGainers = [...data].sort((a, b) => (b.change ?? 0) - (a.change ?? 0)).slice(0, 5);

  // Sort by change (ascending) and get top 5 losers
  const topLosers = [...data]
    .filter((c) => (c.change ?? 0) < 0)
    .sort((a, b) => (a.change ?? 0) - (b.change ?? 0))
    .slice(0, 5);

  // Sort by volume (descending) and get top 5 volume gainers
  const volumeGainers = [...data].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)).slice(0, 5);

  const accordionSx = {
    mb: 1,
    '&.MuiAccordion-root': {
      boxShadow: 'none',
    },
  };

  const accordionSummarysx = {
    backgroundColor: 'background.default',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  };

  return (
    <Box>
      {/* Top Gainers */}
      <Accordion  sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={accordionSummarysx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            🔝 Top Gainers
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 1 }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            {topGainers.map((c, i) => (
              <CompanyCard
                key={i}
                name={c.name}
                ticker={c.ticker}
                logo={c.logo}
                price={c.price}
                change={c.change}
                changePercent={c.changePercent}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Top Losers */}
      <Accordion  sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={accordionSummarysx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            📉 Top Losers
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 1 }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            {topLosers.length > 0 ? (
              topLosers.map((c, i) => (
                <CompanyCard
                  key={i}
                  name={c.name}
                  ticker={c.ticker}
                  logo={c.logo}
                  price={c.price}
                  change={c.change}
                  changePercent={c.changePercent}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', p: 2, textAlign: 'center' }}>
                No losers today
              </Typography>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Volume Gainers */}
      <Accordion  sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={accordionSummarysx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            📊 Volume Gainers
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 1 }}>
          <Stack spacing={1} sx={{ width: '100%' }}>
            {volumeGainers.map((c, i) => (
              <CompanyCard
                key={i}
                name={c.name}
                ticker={c.ticker}
                logo={c.logo}
                price={c.price}
                change={c.change}
                changePercent={c.changePercent}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
