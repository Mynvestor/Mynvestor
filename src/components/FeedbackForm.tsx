import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { addFeedback } from '../lib/feedbackStore';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number | null>(4);
  const [message, setMessage] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps['severity']>('success');

  const handleSubmit = () => {
    if (!message) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please enter your feedback message');
      setSnackbarOpen(true);
      return;
    }

    // persist to localStorage-backed feedback store so admins can see it
    try {
      addFeedback({ name: name || undefined, email: email || undefined, rating, message });
      setSnackbarSeverity('success');
      setSnackbarMessage('Thank you for your feedback — we appreciate it!');
      setSnackbarOpen(true);

      // Reset
      setName('');
      setEmail('');
      setRating(4);
      setMessage('');
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to submit feedback. Try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Stack spacing={2} sx={{ maxWidth: 640 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Send us your feedback
        </Typography>

        <TextField label="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            How was your experience?
          </Typography>
          <Rating value={rating} onChange={(_, v) => setRating(v)} />
        </Box>

        <TextField
          label="Message"
          multiline
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => { setName(''); setEmail(''); setMessage(''); setRating(4); }}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>

      <Snackbar open={snackbarOpen} autoHideDuration={3500} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
