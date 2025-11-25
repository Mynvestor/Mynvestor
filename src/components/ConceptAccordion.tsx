import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

export type ConceptAccordionProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  points?: string[];
  example?: string;
  defaultExpanded?: boolean;
};

export default function ConceptAccordion({
  title,
  description,
  icon,
  points = [],
  example,
  defaultExpanded = false,
}: ConceptAccordionProps) {
  const theme = useTheme();

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
          {icon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.02)'
              : 'rgba(0, 0, 0, 0.02)',
          pt: 2,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>

          {points.length > 0 && (
            <List sx={{ py: 0 }}>
              {points.map((point, index) => (
                <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: 'success.main' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={point}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {example && (
            <Stack
              sx={{
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                p: 1.5,
                borderRadius: 1,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Example:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {example}
              </Typography>
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
