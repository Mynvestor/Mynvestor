import { useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: boolean;
};

export interface NewLessonsProps {
  initialLessons?: Lesson[];
  onEnroll?: (lesson: Lesson) => void;
}

const mockLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Understanding Market Orders',
    description: 'Learn the basics of market orders and how to place them effectively.',
    duration: '15 mins',
    level: 'beginner',
    enrolled: false,
  },
  {
    id: 'l2',
    title: 'Reading Financial Statements',
    description: 'Understand how to read and analyze balance sheets, income statements, and cash flow statements.',
    duration: '25 mins',
    level: 'intermediate',
    enrolled: false,
  },
  {
    id: 'l3',
    title: 'Technical Analysis Fundamentals',
    description: 'Introduction to technical analysis and how to use charts to identify trading opportunities.',
    duration: '30 mins',
    level: 'intermediate',
    enrolled: false,
  },
];

const levelColors: Record<Lesson['level'], 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

export default function NewLessons({
  initialLessons = mockLessons,
  onEnroll,
}: NewLessonsProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleEnroll = (lesson: Lesson) => {
    const updatedLessons = lessons.map((l) =>
      l.id === lesson.id ? { ...l, enrolled: !l.enrolled } : l
    );
    setLessons(updatedLessons);
    onEnroll?.(lesson);
  };

  const handleOpenDetails = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 700 }}>New Lessons</Typography>

            {lessons.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No lessons available at the moment.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {lessons.map((lesson) => (
                  <Grid key={lesson.id} size={{ xs: 12 }}>
                    <Card variant="outlined" sx={{ bgcolor: lesson.enrolled ? 'action.selected' : 'background.paper' }}>
                      <CardContent>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                <SchoolIcon fontSize="small" />
                                <Typography sx={{ fontWeight: 700 }}>{lesson.title}</Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {lesson.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Chip
                                  label={lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                                  size="small"
                                  color={levelColors[lesson.level]}
                                  variant="outlined"
                                />
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  {lesson.duration}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleOpenDetails(lesson)}
                            >
                              View Details
                            </Button>
                            <Button
                              size="small"
                              variant={lesson.enrolled ? 'contained' : 'outlined'}
                              onClick={() => handleEnroll(lesson)}
                            >
                              {lesson.enrolled ? 'Enrolled ✓' : 'Enroll'}
                            </Button>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Lesson Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedLesson?.title}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Description
              </Typography>
              <Typography variant="body2">{selectedLesson?.description}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Duration
              </Typography>
              <Typography variant="body2">{selectedLesson?.duration}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Level
              </Typography>
              {selectedLesson && (
                <Chip
                  label={selectedLesson.level.charAt(0).toUpperCase() + selectedLesson.level.slice(1)}
                  size="small"
                  color={levelColors[selectedLesson.level]}
                  variant="outlined"
                />
              )}
            </Box>

            {selectedLesson?.enrolled && (
              <Box sx={{ bgcolor: 'success.lighter', p: 1.5, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ color: 'success.main' }}>
                  ✓ You are enrolled in this lesson. Access it from your learning dashboard.
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
          {selectedLesson && !selectedLesson.enrolled && (
            <Button
              variant="contained"
              onClick={() => {
                handleEnroll(selectedLesson);
                handleCloseDetails();
              }}
            >
              Enroll Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
