import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

export type KYCFeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  sx?: SxProps;
};

export default function KYCFeatureCard({ title, description, icon, sx }: KYCFeatureCardProps) {
  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, ...((sx as any) || {}) }}>
      <Box sx={{ color: 'success.main', fontSize: '1.75rem' }}>{icon}</Box>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
      </CardContent>
    </Card>
  );
}
