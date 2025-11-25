import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CompanyCard from './CompanyCard';

type Company = {
  name: string;
  ticker?: string;
  logo?: string;
  price: string | number;
  change: number;
  changePercent?: number;
};

const SAMPLE: Company[] = [
  {
    name: 'Airtel Malawi',
    ticker: 'AIRTEL',
    logo: '/images/logos/airtel.jpg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Blantyre Hotels',
    ticker: 'BHL',
    logo: '/images/logos/bhl.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'FDH Bank',
    ticker: 'FDHB',
    logo: '/images/logos/fdhlogo.webp',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'FMB Capital',
    ticker: 'FMBCH',
    logo: '/images/logos/fmbch.jpg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'ICON Properties',
    ticker: 'ICON',
    logo: '/images/logos/icon.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Illovo Sugar',
    ticker: 'ILLOVO',
    logo: '/images/logos/illovo.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'MPICO plc',
    ticker: 'MPICO',
    logo: '/images/logos/mpico.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
    {
    name: 'National Bank',
    ticker: 'NBM',
    logo: '/images/logos/nb.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Nbs Bank Plc',
    ticker: 'NBS',
    logo: '/images/logos/nbs.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'NICO Holdings',
    ticker: 'NICO',
    logo: '/images/logos/nico.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Investment Trust',
    ticker: 'NITL',
    logo: '/images/logos/nitl.jpg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Old Mutual',
    ticker: 'OMU',
    logo: '/images/logos/omu.jpg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Press',
    ticker: 'PRESS',
    logo: '/images/logos/pcl.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Standard Bank',
    ticker: 'STANDARD',
    logo: '/images/logos/std.jpg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Sunbird Tourism',
    ticker: 'SUNBIRD',
    logo: '/images/logos/sunbird.svg',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
  {
    name: 'Telekom',
    ticker: 'TNM',
    logo: '/images/logos/tnm.png',
    price: 'MK 52.30',
    change: 34.50,
    changePercent: 2.87,
  },
];

export default function CompanyList({
  companies,
  onCompanyClick,
}: {
  companies?: Company[];
  onCompanyClick?: (company: Company) => void;
}) {
  const list = companies ?? SAMPLE;

  return (
    <Box>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Main Board
      </Typography>
      <Grid container spacing={2} columns={12}>
        {list.map((c, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <CompanyCard
              name={c.name}
              ticker={c.ticker}
              logo={c.logo}
              price={c.price}
              change={c.change}
              changePercent={c.changePercent}
              onClick={() => onCompanyClick?.(c)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
