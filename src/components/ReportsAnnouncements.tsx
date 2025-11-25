import { useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export type Report = {
  id: string;
  title: string;
  date: string;
  type: 'report' | 'announcement';
  size: string;
  url: string;
};

export interface ReportsAnnouncementsProps {
  initialReports?: Report[];
  onDownload?: (report: Report) => void;
}

const mockReports: Report[] = [
  {
    id: 'r1',
    title: 'Monthly Market Report - October 2025',
    date: '2025-10-31',
    type: 'report',
    size: '2.5 MB',
    url: '/documents/market-report-oct-2025.pdf',
  },
  {
    id: 'r2',
    title: 'Quarterly Financial Summary Q3 2025',
    date: '2025-10-15',
    type: 'report',
    size: '1.8 MB',
    url: '/documents/quarterly-q3-2025.pdf',
  },
  {
    id: 'a1',
    title: 'New Listing: XYZ Ltd - Trading Begins Today',
    date: '2025-11-10',
    type: 'announcement',
    size: '0.5 MB',
    url: '/documents/xyz-listing-announcement.pdf',
  },
  {
    id: 'a2',
    title: 'Market Holiday: November 25, 2025',
    date: '2025-11-09',
    type: 'announcement',
    size: '0.3 MB',
    url: '/documents/market-holiday-notice.pdf',
  },
  {
    id: 'a3',
    title: 'Regulatory Update: New KYC Requirements',
    date: '2025-11-08',
    type: 'announcement',
    size: '1.2 MB',
    url: '/documents/kyc-requirements-update.pdf',
  },
];

export default function ReportsAnnouncements({
  initialReports = mockReports,
  onDownload,
}: ReportsAnnouncementsProps) {
  const [reports] = useState<Report[]>(initialReports);
  const [filterType, setFilterType] = useState<'all' | 'report' | 'announcement'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = (report: Report) => {
    onDownload?.(report);
    // Simulate download - in a real app, this would fetch from the server
    const link = document.createElement('a');
    link.href = report.url;
    link.download = report.title;
    link.click();
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700 }}>Reports & Announcements</Typography>

          {/* Filters */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              placeholder="Search reports..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value as 'all' | 'report' | 'announcement')}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="report">Reports</MenuItem>
                <MenuItem value="announcement">Announcements</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {filteredReports.length === 0 ? (
            <Alert severity="info">No reports or announcements found.</Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Size</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell sx={{ fontWeight: 500 }}>{report.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.type === 'report' ? 'Report' : 'Announcement'}
                          size="small"
                          variant="outlined"
                          color={report.type === 'report' ? 'primary' : 'success'}
                        />
                      </TableCell>
                      <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell align="center">
                        <Button
                          startIcon={<FileDownloadIcon />}
                          size="small"
                          onClick={() => handleDownload(report)}
                          variant="outlined"
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ color: 'text.secondary', fontSize: 'small' }}>
            Showing {filteredReports.length} of {reports.length} items
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
