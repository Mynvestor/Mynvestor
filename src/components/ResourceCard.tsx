import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@mui/material/styles';

export type ResourceCardProps = {
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
  isDownloadable?: boolean;
};

export default function ResourceCard({
  title,
  description,
  category,
  url,
  icon,
  isDownloadable = false,
}: ResourceCardProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 16px rgba(66, 165, 245, 0.2)'
            : '0 4px 16px rgba(66, 165, 245, 0.1)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
          {icon && <Box sx={{ mt: 0.5, color: 'primary.main' }}>{icon}</Box>}
          <Stack direction="column" sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', mb: 1 }}>
              {category}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            textDecoration: 'none',
            color: 'primary.main',
            fontSize: 'inherit',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {isDownloadable ? 'Download' : 'Visit'} <OpenInNewIcon sx={{ fontSize: '0.9rem' }} />
        </Link>
      </CardActions>
    </Card>
  );
}
