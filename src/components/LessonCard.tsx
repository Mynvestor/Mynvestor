import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';

export type LessonCardProps = {
  title: string;
  summary: string;
  readTime: string;
  articleCount: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onRead?: () => void;
  lessonNumber?: number;
};

export default function LessonCard({
  title,
  summary,
  readTime,
  articleCount,
  isCompleted = false,
  isLocked = false,
  onRead,
  lessonNumber,
}: LessonCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? isCompleted
              ? 'rgba(76, 175, 80, 0.05)'
              : 'inherit'
            : isCompleted
            ? 'rgba(76, 175, 80, 0.02)'
            : 'inherit',
        opacity: isLocked ? 0.6 : 1,
      }}
      variant="outlined"
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 600,
              fontSize: '1rem',
              opacity: isLocked ? 0.5 : 1,
            }}
          >
            {lessonNumber}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="h6" component="div">
                {title}
              </Typography>
              {isCompleted && (
                <Chip label="Completed" size="small" color="success" />
              )}
              {isLocked && (
                <Chip label="Locked" size="small" variant="outlined" />
              )}
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {summary}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {readTime}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ArticleIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      {!isLocked && (
        <CardActions sx={{ pt: 0 }}>
          <Button
            size="small"
            color="primary"
            onClick={onRead}
            startIcon={<ArticleIcon />}
          >
            Read Articles
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
