import React, { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import GroupIcon from '@mui/icons-material/Group';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';
import { getFeedbacks, seedMockFeedbacks, clearFeedbacks, FeedbackItem } from '../../lib/feedbackStore';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => getFeedbacks());

  function refresh() {
    setFeedbacks(getFeedbacks());
  }

  function onSeed() {
    seedMockFeedbacks();
    refresh();
  }

  function onClear() {
    // clearFeedbacks helper exists; remove all and refresh
    clearFeedbacks();
    refresh();
  }

  function exportFeedbacks() {
    try {
      const dataStr = JSON.stringify(getFeedbacks(), null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `feedbacks-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  }

  const total = feedbacks.length;
  const unreplied = feedbacks.filter((f) => !f.replied).length;

  const recent = useMemo(() => feedbacks.slice(0, 5), [feedbacks]);

  // Small mock numbers for other summaries until real backend is connected
  const mockOrdersToday = 12;
  const mockTransactionsToday = 48;
  const mockInvestors = 1243;

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Home" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StatCard title="Investors" value={String(mockInvestors)} interval="Total" trend="up" data={[10, 12, 14, 13, 15, 18, 20]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard title="Orders Today" value={String(mockOrdersToday)} interval="Today" trend="neutral" data={[5, 7, 6, 8, 12, 10, 12]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard title="Transactions Today" value={String(mockTransactionsToday)} interval="Today" trend="up" data={[20, 22, 30, 28, 40, 35, 48]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard title="User Feedbacks" value={String(total)} interval={`${unreplied} open`} trend={unreplied > 0 ? 'down' : 'neutral'} data={[2, 3, 1, 4, total]} />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Recent Feedback</Typography>
                <Box>
                  <IconButton size="small" title="Refresh" onClick={refresh}><RefreshIcon /></IconButton>
                  <Button size="small" startIcon={<HeadsetMicIcon />} sx={{ ml: 1 }} onClick={() => navigate('/admin/help')}>Open Help</Button>
                </Box>
              </Box>

              {recent.length === 0 ? (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No recent feedback.</Typography>
              ) : (
                <List>
                  {recent.map((f) => (
                    <React.Fragment key={f.id}>
                      <ListItem alignItems="flex-start" secondaryAction={(
                        <Button size="small" onClick={() => navigate('/admin/help')}>View / Reply</Button>
                      )}>
                        <ListItemAvatar>
                          <Avatar>
                            {f.name ? f.name.charAt(0).toUpperCase() : 'U'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={f.name || f.email || 'Anonymous'}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" sx={{ display: 'block' }}>
                                {f.message.length > 140 ? `${f.message.slice(0, 140)}…` : f.message}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{new Date(f.createdAt).toLocaleString()}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Quick Actions</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Common admin tasks</Typography>
              </Box>

              <Stack spacing={1}>
                <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={onSeed}>Seed Demo Feedbacks</Button>
                <Button variant="outlined" color="error" onClick={onClear}>Clear All Feedbacks</Button>
                <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={exportFeedbacks}>Export Feedbacks</Button>
                <Button variant="outlined" startIcon={<GroupIcon />} onClick={() => navigate('/admin/investors')}>Go to Investors</Button>
                <Button variant="outlined" startIcon={<LocalAtmIcon />} onClick={() => navigate('/admin/orders')}>Go to Orders</Button>
                <Button variant="contained" onClick={() => navigate('/admin/help')}>Manage Help & Replies</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
