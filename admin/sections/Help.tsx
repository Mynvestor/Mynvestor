import React, { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/Header';
import Divider from '@mui/material/Divider';
import { getFeedbacks, updateFeedback, FeedbackItem } from '../../lib/feedbackStore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReplyIcon from '@mui/icons-material/Reply';

type QA = {
  id: string;
  question: string;
  answer: string;
  updatedAt?: string;
};

type Article = {
  id: string;
  title: string;
  category: string;
  audience: string;
  content: string;
  updatedAt?: string;
  qas?: QA[];
};

const sampleArticles: Article[] = [
  {
    id: 'H001',
    title: 'How to Verify KYC',
    category: 'Account Setup',
    audience: 'Investor',
    content: 'Step-by-step guide to submitting KYC documents and what to expect.',
    updatedAt: '2025-04-10',
    qas: [
      { id: 'Q1', question: 'What documents are required?', answer: 'Government ID and proof of address.', updatedAt: '2025-04-10' },
    ],
  },
  {
    id: 'H002',
    title: 'Managing Investor Orders',
    category: 'Trading',
    audience: 'Broker',
    content: 'Guide for brokers on placing and managing investor orders.',
    updatedAt: '2025-04-09',
    qas: [
      { id: 'Q2', question: 'How do I cancel an order?', answer: 'Use the Orders page to select and cancel pending orders.', updatedAt: '2025-04-09' },
    ],
  },
];

export default function Help() {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [query, setQuery] = useState('');

  // Article dialog
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState({ title: '', category: 'Account Setup', audience: 'Investor', content: '' });

  // Q&A dialog
  const [openQADialog, setOpenQADialog] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [qaForm, setQaForm] = useState({ question: '', answer: '' });
  const [editingQa, setEditingQa] = useState<QA | null>(null);

  const filtered = useMemo(() => articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())), [articles, query]);

  function openAddArticle() {
    setEditingArticle(null);
    setArticleForm({ title: '', category: 'Account Setup', audience: 'Investor', content: '' });
    setOpenArticleDialog(true);
  }

  function openEditArticle(a: Article) {
    setEditingArticle(a);
    setArticleForm({ title: a.title, category: a.category, audience: a.audience, content: a.content });
    setOpenArticleDialog(true);
  }

  function saveArticle() {
    if (!articleForm.title.trim()) return;
    if (editingArticle) {
      setArticles((prev) => prev.map((p) => (p.id === editingArticle.id ? { ...p, ...articleForm, updatedAt: new Date().toISOString().slice(0, 10) } : p)));
    } else {
      const id = `H${Date.now()}`;
      setArticles((prev) => [...prev, { id, ...articleForm, updatedAt: new Date().toISOString().slice(0, 10), qas: [] }]);
    }
    setOpenArticleDialog(false);
  }

  function deleteArticle(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  // Q&A management
  function openManageQA(articleId: string) {
    setActiveArticleId(articleId);
    setEditingQa(null);
    setQaForm({ question: '', answer: '' });
    setOpenQADialog(true);
  }

  function startEditQa(q: QA) {
    setEditingQa(q);
    setQaForm({ question: q.question, answer: q.answer });
  }

  function saveQa() {
    if (!activeArticleId) return;
    setArticles((prev) => prev.map((a) => {
      if (a.id !== activeArticleId) return a;
      const qas = a.qas ? [...a.qas] : [];
      if (editingQa) {
        const updated = qas.map((qq) => qq.id === editingQa.id ? { ...qq, ...qaForm, updatedAt: new Date().toISOString().slice(0, 10) } : qq);
        return { ...a, qas: updated };
      }
      const id = `Q${Date.now()}`;
      const newQa: QA = { id, question: qaForm.question, answer: qaForm.answer, updatedAt: new Date().toISOString().slice(0, 10) };
      return { ...a, qas: [...qas, newQa] };
    }));
    setQaForm({ question: '', answer: '' });
    setEditingQa(null);
  }

  function deleteQa(qaId: string) {
    if (!activeArticleId) return;
    setArticles((prev) => prev.map((a) => {
      if (a.id !== activeArticleId) return a;
      return { ...a, qas: (a.qas || []).filter((q) => q.id !== qaId) };
    }));
  }

  const activeArticle = articles.find((a) => a.id === activeArticleId) || null;

  // Feedbacks from investors (localStorage-backed)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => getFeedbacks());
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<FeedbackItem | null>(null);
  const [replyText, setReplyText] = useState('');

  function refreshFeedbacks() {
    setFeedbacks(getFeedbacks());
  }

  function openReply(f: FeedbackItem) {
    setActiveFeedback(f);
    setReplyText(f.reply || '');
    setOpenReplyDialog(true);
  }

  function sendReply() {
    if (!activeFeedback) return;
    updateFeedback(activeFeedback.id, { reply: replyText, replied: true });
    setOpenReplyDialog(false);
    setActiveFeedback(null);
    setReplyText('');
    refreshFeedbacks();
    // In a real app you'd call an API to send the email/notification
  }

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Help" />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField size="small" placeholder="Search help articles..." value={query} onChange={(e) => setQuery(e.target.value)} sx={{ width: 360 }} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAddArticle}>Add Article</Button>
        </Box>

        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Audience</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id} data-article-id={a.id}>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.category}</TableCell>
                  <TableCell>{a.audience}</TableCell>
                  <TableCell>{a.updatedAt || new Date().toISOString().slice(0, 10)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => openEditArticle(a)} title="Edit"><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => deleteArticle(a.id)} title="Delete"><DeleteIcon fontSize="small" /></IconButton>
                    <Button size="small" sx={{ ml: 1 }} onClick={() => openManageQA(a.id)}>Manage Q&A</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Divider />

      {/* Feedbacks from investors */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>User Feedback & Complaints</Typography>
        {feedbacks.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>No feedback submitted yet.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>When</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Reply</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((f) => (
                <TableRow key={f.id} data-feedback-id={f.id}>
                  <TableCell>{new Date(f.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{f.name || f.email || 'Anonymous'}</TableCell>
                  <TableCell sx={{ maxWidth: 480, whiteSpace: 'pre-wrap' }}>{f.message}</TableCell>
                  <TableCell>{f.rating ?? '-'}</TableCell>
                  <TableCell>{f.replied ? (`Replied: ${f.reply}`) : (<em>Not replied</em>)}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<ReplyIcon />} onClick={() => openReply(f)}>Reply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>

      {/* Add/Edit Article Dialog */}
      <Dialog open={openArticleDialog} onClose={() => setOpenArticleDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingArticle ? 'Edit Help Article' : 'Add Help Article'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={articleForm.title} onChange={(e) => setArticleForm((s) => ({ ...s, title: e.target.value }))} fullWidth />
            <TextField select SelectProps={{ native: true }} label="Category" value={articleForm.category} onChange={(e) => setArticleForm((s) => ({ ...s, category: e.target.value }))}>
              <option value="Account Setup">Account Setup</option>
              <option value="Trading">Trading</option>
              <option value="Payments">Payments</option>
              <option value="Technical">Technical</option>
            </TextField>
            <TextField select SelectProps={{ native: true }} label="Audience" value={articleForm.audience} onChange={(e) => setArticleForm((s) => ({ ...s, audience: e.target.value }))}>
              <option value="Investor">Investor</option>
              <option value="Broker">Broker</option>
              <option value="Both">Both</option>
            </TextField>
            <TextField label="Content" value={articleForm.content} onChange={(e) => setArticleForm((s) => ({ ...s, content: e.target.value }))} fullWidth multiline rows={4} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArticleDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveArticle}>{editingArticle ? 'Update Article' : 'Add Article'}</Button>
        </DialogActions>
      </Dialog>

      {/* Q&A Dialog */}
      <Dialog open={openQADialog} onClose={() => setOpenQADialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Manage Q&A {activeArticle ? `– ${activeArticle.title}` : ''}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1}>
              <TextField size="small" placeholder="Question" value={qaForm.question} onChange={(e) => setQaForm((s) => ({ ...s, question: e.target.value }))} sx={{ flex: 1 }} />
              <TextField size="small" placeholder="Answer" value={qaForm.answer} onChange={(e) => setQaForm((s) => ({ ...s, answer: e.target.value }))} sx={{ flex: 2 }} />
              <Button variant="contained" startIcon={<AddIcon />} onClick={saveQa}>{editingQa ? 'Save' : 'Add'}</Button>
            </Stack>

            <Divider />

            <Stack spacing={1}>
              {(activeArticle?.qas || []).map((q) => (
                <Box key={q.id} sx={{ p: 1, borderRadius: 1, bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{q.question}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{q.answer}</Typography>
                  </Box>
                  <Box>
                    <Button size="small" onClick={() => startEditQa(q)} startIcon={<EditIcon />}>Edit</Button>
                    <Button size="small" color="error" onClick={() => deleteQa(q.id)} startIcon={<DeleteIcon />}>Delete</Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQADialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Reply Dialog for feedback */}
      <Dialog open={openReplyDialog} onClose={() => setOpenReplyDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Reply to feedback {activeFeedback ? `– ${activeFeedback.id}` : ''}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>From</Typography>
              <Typography variant="body2">{activeFeedback ? (activeFeedback.name || activeFeedback.email || 'Anonymous') : ''}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{activeFeedback ? new Date(activeFeedback.createdAt).toLocaleString() : ''}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Message</Typography>
              <Typography variant="body2">{activeFeedback?.message}</Typography>
            </Box>

            <TextField label="Reply" multiline minRows={4} value={replyText} onChange={(e) => setReplyText(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReplyDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<MailOutlineIcon />} onClick={sendReply}>Send Reply</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
