import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

export type IntroductionCardProps = {
  title?: string;
  description?: string;
  whyInvest?: string[];
  commonAssets?: string[];
  keyPrinciple?: string;
  learnMoreUrl?: string;
};

export default function IntroductionCard({
  title = 'Introduction to Investing',
  description = 'Investing is the process of allocating money to assets with the expectation of generating a return over time. It\'s a powerful way to build wealth, but it requires knowledge and discipline.',
  whyInvest = [
    'To grow your wealth',
    'Beat inflation',
    'Achieve financial goals like retirement or buying a home',
  ],
  commonAssets = ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds'],
  keyPrinciple = 'The earlier you start, the more time your investments have to grow through compounding.',
  learnMoreUrl = 'https://www.investopedia.com/terms/i/investing.asp',
}: IntroductionCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, rgba(66, 165, 245, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)`
            : `linear-gradient(135deg, rgba(66, 165, 245, 0.05) 0%, rgba(156, 39, 176, 0.02) 100%)`,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <SchoolIcon sx={{ color: 'primary.main', fontSize: '1.8rem' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>

          {/* Why Invest Section */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <TrendingUpIcon sx={{ color: 'success.main', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Why Invest?
              </Typography>
            </Stack>
            <List sx={{ py: 0 }}>
              {whyInvest.map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 24, color: 'primary.main' }}>
                    <LightbulbIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Common Assets Section */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Common Assets:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {commonAssets.map((asset, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(66, 165, 245, 0.1)'
                        : 'rgba(66, 165, 245, 0.08)',
                    color: 'primary.main',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    border: `1px solid ${theme.palette.primary.main}20`,
                  }}
                >
                  {asset}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Key Principle Section */}
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 193, 7, 0.1)'
                  : 'rgba(255, 193, 7, 0.08)',
              p: 2,
              borderRadius: 1,
              borderLeft: '4px solid',
              borderColor: 'warning.main',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'warning.main',
                fontWeight: 600,
                display: 'block',
                mb: 0.5,
              }}
            >
              Key Principle:
            </Typography>
            <Typography variant="body2">{keyPrinciple}</Typography>
          </Box>

          {/* Learn More Button */}
          {learnMoreUrl && (
            <Link
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                endIcon={<OpenInNewIcon />}
                fullWidth
              >
                Learn More on Investopedia
              </Button>
            </Link>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
