import React, { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import LessonCard from '../../components/LessonCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';

type Course = {
  id: string;
  title: string;
  description: string;
  price?: string;
  difficulty?: string;
  lessonsCount?: number;
  duration?: string;
  isFree?: boolean;
  lessons?: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  summary?: string;
  readTime?: string;
  articleCount?: number;
  lessonNumber?: number;
};

const sampleCourses: Course[] = [
  {
    id: 'C1',
    title: 'Stock Market Basics',
    description: 'Learn the fundamentals of stocks, how markets work, and basic trading concepts.',
    price: 'Free',
    difficulty: 'Beginner',
    lessonsCount: 5,
    duration: '2 weeks',
    isFree: true,
    lessons: [
      { id: 'L1', title: 'Getting Started with Investing', summary: 'Understand the basics of investing', readTime: '15 min', articleCount: 3, lessonNumber: 1 },
      { id: 'L2', title: 'Understanding Stock Markets', summary: 'How stock markets function', readTime: '20 min', articleCount: 4, lessonNumber: 2 },
    ],
  },
  {
    id: 'C2',
    title: 'Portfolio Construction',
    description: 'Master the art of building and managing a diversified investment portfolio.',
    price: '$49',
    difficulty: 'Intermediate',
    lessonsCount: 8,
    duration: '4 weeks',
    isFree: false,
    lessons: [],
  },
];

export default function Learn() {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [query, setQuery] = useState('');

  // Course dialog state
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', difficulty: 'Beginner', price: '', isFree: true });

  // Lessons dialog state
  const [openLessonsDialog, setOpenLessonsDialog] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', summary: '', readTime: '', articleCount: 1 });

  const filteredCourses = useMemo(() => courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())), [courses, query]);

  function openAddCourse() {
    setEditingCourse(null);
    setCourseForm({ title: '', description: '', difficulty: 'Beginner', price: '', isFree: true });
    setOpenCourseDialog(true);
  }

  function openEditCourse(c: Course) {
    setEditingCourse(c);
    setCourseForm({ title: c.title, description: c.description, difficulty: c.difficulty || 'Beginner', price: c.price || '', isFree: !!c.isFree });
    setOpenCourseDialog(true);
  }

  function saveCourse() {
    if (!courseForm.title.trim()) return;
    if (editingCourse) {
      setCourses((prev) => prev.map((p) => (p.id === editingCourse.id ? { ...p, ...courseForm } as Course : p)));
    } else {
      const id = `C${Date.now()}`;
      setCourses((prev) => [...prev, { id, ...courseForm, lessons: [], lessonsCount: 0 } as Course]);
    }
    setOpenCourseDialog(false);
  }

  function deleteCourse(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  // Lessons handling
  function openManageLessons(courseId: string) {
    setActiveCourseId(courseId);
    setEditingLesson(null);
    setLessonForm({ title: '', summary: '', readTime: '', articleCount: 1 });
    setOpenLessonsDialog(true);
  }

  function startEditLesson(l: Lesson) {
    setEditingLesson(l);
    setLessonForm({ title: l.title, summary: l.summary || '', readTime: l.readTime || '', articleCount: l.articleCount || 1 });
  }

  function saveLesson() {
    if (!activeCourseId) return;
    setCourses((prev) => prev.map((c) => {
      if (c.id !== activeCourseId) return c;
      const lessons = c.lessons ? [...c.lessons] : [];
      if (editingLesson) {
        const updated = lessons.map((ls) => ls.id === editingLesson.id ? { ...ls, ...lessonForm } as Lesson : ls);
        return { ...c, lessons: updated, lessonsCount: updated.length };
      }
      const id = `L${Date.now()}`;
      const newLesson: Lesson = { id, ...lessonForm, lessonNumber: lessons.length + 1 } as Lesson;
      const updated = [...lessons, newLesson];
      return { ...c, lessons: updated, lessonsCount: updated.length };
    }));
    setEditingLesson(null);
    setLessonForm({ title: '', summary: '', readTime: '', articleCount: 1 });
  }

  function deleteLesson(lessonId: string) {
    if (!activeCourseId) return;
    setCourses((prev) => prev.map((c) => {
      if (c.id !== activeCourseId) return c;
      const updated = (c.lessons || []).filter((l) => l.id !== lessonId).map((l, idx) => ({ ...l, lessonNumber: idx + 1 }));
      return { ...c, lessons: updated, lessonsCount: updated.length };
    }));
  }

  const activeCourse = courses.find((c) => c.id === activeCourseId) || null;

  return (
    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, pb: 5 }}>
      <Header section="Learn" />

      {/* Top: Course Cards and Add/Search */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField size="small" placeholder="Search courses..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAddCourse}>Add Course</Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: 2 }}>
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              title={c.title}
              description={c.description}
              price={c.price || (c.isFree ? 'Free' : undefined)}
              difficulty={(c.difficulty as any) || 'Beginner'}
              lessons={c.lessonsCount || (c.lessons ? c.lessons.length : 0)}
              duration={c.duration}
              icon={<BookIcon sx={{ fontSize: '2.5rem' }} />}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Management table */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Manage Learn Content</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((c) => (
              <TableRow key={c.id} data-content-id={c.id}>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.difficulty}</TableCell>
                <TableCell>{new Date().toISOString().slice(0, 10)}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => openEditCourse(c)} title="Edit course"><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteCourse(c.id)} title="Delete course"><DeleteIcon fontSize="small" /></IconButton>
                  <Button size="small" sx={{ ml: 1 }} onClick={() => openManageLessons(c.id)}>Manage Lessons</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Course Dialog */}
      <Dialog open={openCourseDialog} onClose={() => setOpenCourseDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={courseForm.title} onChange={(e) => setCourseForm((s) => ({ ...s, title: e.target.value }))} fullWidth />
            <TextField label="Description" value={courseForm.description} onChange={(e) => setCourseForm((s) => ({ ...s, description: e.target.value }))} fullWidth multiline rows={3} />
            <TextField label="Difficulty" value={courseForm.difficulty} onChange={(e) => setCourseForm((s) => ({ ...s, difficulty: e.target.value }))} />
            <TextField label="Price" value={courseForm.price} onChange={(e) => setCourseForm((s) => ({ ...s, price: e.target.value }))} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCourseDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveCourse}>{editingCourse ? 'Update Course' : 'Add Course'}</Button>
        </DialogActions>
      </Dialog>

      {/* Lessons Dialog */}
      <Dialog open={openLessonsDialog} onClose={() => setOpenLessonsDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Manage Lessons {activeCourse ? `– ${activeCourse.title}` : ''}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField size="small" placeholder="Lesson title" value={lessonForm.title} onChange={(e) => setLessonForm((s) => ({ ...s, title: e.target.value }))} sx={{ flex: 1 }} />
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => { saveLesson(); }}>{editingLesson ? 'Save' : 'Add'}</Button>
            </Stack>
            <Divider sx={{ mb: 1 }} />
            <Stack spacing={1}>
              {(activeCourse?.lessons || []).map((l) => (
                <Box key={l.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{l.lessonNumber}. {l.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{l.summary}</Typography>
                  </Box>
                  <Box>
                    <Button size="small" onClick={() => { startEditLesson(l); }} startIcon={<EditIcon />}>Edit</Button>
                    <Button size="small" color="error" onClick={() => deleteLesson(l.id)} startIcon={<DeleteIcon />}>Delete</Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLessonsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
