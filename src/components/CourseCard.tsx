import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import SchoolIcon from '@mui/icons-material/School';
import { useTheme } from '@mui/material/styles';

export type CourseCardProps = {
  title: string;
  description: string;
  price: number | string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  icon?: React.ReactNode;
  progress?: number;
  isFree?: boolean;
  onEnroll?: () => void;
  thumbnail?: string;
};

export default function CourseCard({
  title,
  description,
  price,
  difficulty,
  lessons,
  duration,
  icon,
  progress,
  isFree,
  onEnroll,
  thumbnail,
}: CourseCardProps) {
  const theme = useTheme();

  const difficultyColors: {
    [key in 'Beginner' | 'Intermediate' | 'Advanced']: any;
  } = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {thumbnail ? (
        <CardMedia
          component="img"
          height="200"
          image={thumbnail}
          alt={title}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.grey[100],
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}
        >
          {icon || <SchoolIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />}
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={difficulty}
            size="small"
            color={difficultyColors[difficulty]}
            variant="outlined"
          />
          <Chip label={`${lessons} Lessons`} size="small" variant="outlined" />
          <Chip label={duration} size="small" variant="outlined" />
        </Stack>
        {progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Progress: {progress}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 0.5 }} />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          onClick={onEnroll}
          startIcon={isFree ? <SchoolIcon /> : undefined}
        >
          {isFree ? 'Enroll Free' : `Enroll - ${price}`}
        </Button>
      </CardActions>
    </Card>
  );
}
