import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function DocumentDownloads() {
  const docs = [
    { id: 'tax2023', title: 'Tax Document 2023', url: '#', size: '120 KB' },
    { id: 'tax2024', title: 'Tax Document 2024', url: '#', size: '135 KB' },
    { id: 'account-summary', title: 'Account Summary', url: '#', size: '95 KB' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Downloads</Typography>
      <Stack spacing={2}>
        {docs.map((d) => (
          <Card key={d.id} variant="outlined">
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{d.title}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{d.size}</Typography>
              </Box>
              <Button href={d.url} target="_blank" rel="noopener noreferrer" startIcon={<DownloadIcon />}>
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
