import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Header from '../components/Header';
import IntroductionCard from '../components/IntroductionCard';
import ConceptAccordion from '../components/ConceptAccordion';
import CourseCard from '../components/CourseCard';
import LessonCard from '../components/LessonCard';
import ResourceCard from '../components/ResourceCard';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FAQAccordion from '../components/FAQAccordion';
import FeedbackForm from '../components/FeedbackForm';
import SupportContacts from '../components/SupportContacts';

export default function Learn() {
  const conceptsData = [
    {
      title: 'Stocks',
      description:
        'Stocks represent ownership in a company. When you buy a stock, you own a small part of that company and may benefit from its growth and dividends.',
      icon: <TrendingUpIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />,
      points: [
        'Types: Common stocks (voting rights) and preferred stocks (priority in dividends)',
        'Risks: Stock prices can be volatile, influenced by market conditions and company performance',
        'Rewards: Potential for high returns through capital gains and dividends',
      ],
      example:
        'If you buy shares of Apple Inc., you own a portion of the company and benefit from its profits.',
      defaultExpanded: true,
    },
    {
      title: 'Diversification',
      description:
        'Diversification involves spreading your investments across different assets to reduce risk.',
      icon: <SchoolIcon sx={{ fontSize: '1.5rem', color: 'success.main' }} />,
      points: [
        'Why Diversify? If one investment performs poorly, others may perform well, balancing your portfolio',
        'How to Diversify? Invest in different sectors (technology, healthcare), asset classes (stocks, bonds), and regions',
        'Example: Instead of investing all your money in one company, spread it across multiple companies and bonds',
      ],
      example:
        'A balanced portfolio might include 40% stocks, 40% bonds, 15% real estate, and 5% cash equivalents.',
    },
    {
      title: 'Risk Management',
      description: 'Managing risk is crucial to protect your investments.',
      icon: <SecurityIcon sx={{ fontSize: '1.5rem', color: 'error.main' }} />,
      points: [
        'Assess Risk Tolerance: Determine how much risk you are comfortable with based on your goals',
        'Strategies: Use stop-loss orders, invest in low-volatility assets, maintain an emergency fund',
        'Key Metric: Understand the Price-to-Earnings (P/E) ratio to evaluate if a stock is overvalued',
      ],
      example:
        'A conservative investor might allocate 70% to bonds and 30% to stocks, reducing potential volatility.',
    },
  ];

  const coursesData = [
    {
      title: 'Stock Market Basics',
      description:
        'Learn the fundamentals of stocks, how markets work, and basic trading concepts.',
      price: 'Free',
      difficulty: 'Beginner' as const,
      lessons: 5,
      duration: '2 weeks',
      isFree: true,
      icon: <TrendingUpIcon sx={{ fontSize: '2.5rem' }} />,
      onEnroll: () => alert('Enrolled in Stock Market Basics!'),
    },
    {
      title: 'Portfolio Construction',
      description:
        'Master the art of building and managing a diversified investment portfolio.',
      price: '$49',
      difficulty: 'Intermediate' as const,
      lessons: 8,
      duration: '4 weeks',
      icon: <SchoolIcon sx={{ fontSize: '2.5rem' }} />,
      onEnroll: () => alert('Enrolled in Portfolio Construction!'),
    },
    {
      title: 'Advanced Trading Strategies',
      description:
        'Deep dive into technical analysis, options trading, and advanced investment strategies.',
      price: '$99',
      difficulty: 'Advanced' as const,
      lessons: 12,
      duration: '8 weeks',
      icon: <SecurityIcon sx={{ fontSize: '2.5rem' }} />,
      onEnroll: () => alert('Enrolled in Advanced Trading Strategies!'),
    },
    {
      title: 'Risk Management Essentials',
      description:
        'Learn how to identify, assess, and mitigate various types of investment risks.',
      price: '$39',
      difficulty: 'Intermediate' as const,
      lessons: 6,
      duration: '3 weeks',
      icon: <SchoolIcon sx={{ fontSize: '2.5rem' }} />,
      onEnroll: () => alert('Enrolled in Risk Management Essentials!'),
    },
  ];

  const lessonsData = [
    {
      title: 'Getting Started with Investing',
      summary:
        'Understand the basics of investing, why it matters, and how to get started with your first investment.',
      readTime: '15 min',
      articleCount: 3,
      isCompleted: true,
      lessonNumber: 1,
    },
    {
      title: 'Understanding Stock Markets',
      summary:
        'Learn how stock markets function, different stock exchanges, and market hours.',
      readTime: '20 min',
      articleCount: 4,
      isCompleted: true,
      lessonNumber: 2,
    },
    {
      title: 'Reading Stock Charts',
      summary:
        'Master the art of reading stock price charts, candlesticks, and technical indicators.',
      readTime: '25 min',
      articleCount: 5,
      isCompleted: false,
      lessonNumber: 3,
    },
    {
      title: 'Fundamental Analysis',
      summary:
        'Deep dive into company financial statements and how to evaluate stocks fundamentally.',
      readTime: '30 min',
      articleCount: 6,
      isLocked: true,
      lessonNumber: 4,
    },
  ];

  const resourcesData = [
    {
      title: 'Investopedia',
      description: 'Comprehensive articles and educational content on investing basics.',
      category: 'Learning Platform',
      url: 'https://www.investopedia.com',
      icon: <LanguageIcon />,
    },
    {
      title: 'Bloomberg Markets',
      description: 'Real-time market news, analysis, and financial data.',
      category: 'Market News',
      url: 'https://www.bloomberg.com',
      icon: <DescriptionIcon />,
    },
    {
      title: 'Morningstar',
      description: 'Stock and mutual fund research tools with detailed analysis.',
      category: 'Research Tools',
      url: 'https://www.morningstar.com',
      icon: <TrendingUpIcon />,
    },
    {
      title: 'The Intelligent Investor',
      description:
        'Download this classic investment guide by Benjamin Graham (PDF).',
      category: 'eBook',
      url: '#',
      isDownloadable: true,
      icon: <PictureAsPdfIcon />,
    },
    {
      title: 'Investment Guide 2024',
      description: 'Complete beginner to advanced investment guide with worksheets.',
      category: 'eBook',
      url: '#',
      isDownloadable: true,
      icon: <DownloadIcon />,
    },
    {
      title: 'Market Analysis Tools',
      description: 'Tools and calculators for portfolio analysis and returns calculation.',
      category: 'Tools',
      url: '#',
      icon: <SchoolIcon />,
    },
  ];

  return (
    <Stack
      spacing={4}
      sx={{
        alignItems: 'stretch',
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header section="Learn" />

      {/* Introduction Section */}
      <Box>
        <IntroductionCard />
      </Box>


      <Divider />

      {/* Courses Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Investment Courses
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Start with free courses for beginners and advance to premium courses for specialized knowledge.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {coursesData.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              price={course.price}
              difficulty={course.difficulty}
              lessons={course.lessons}
              duration={course.duration}
              icon={course.icon}
              isFree={course.isFree}
              onEnroll={course.onEnroll}
            />
          ))}
        </Box>
      </Box>

      {/* Lesson Sections */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Stock Market Basics - Lessons
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Progress through lessons to learn everything about stock market fundamentals.
        </Typography>
        <Stack spacing={1}>
          {lessonsData.map((lesson, index) => (
            <LessonCard
              key={index}
              title={lesson.title}
              summary={lesson.summary}
              readTime={lesson.readTime}
              articleCount={lesson.articleCount}
              isCompleted={lesson.isCompleted}
              isLocked={lesson.isLocked}
              lessonNumber={lesson.lessonNumber}
              onRead={() => alert(`Reading: ${lesson.title}`)}
            />
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Resources Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Recommended Resources & Downloads
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Explore these external resources and downloadable materials to deepen your investing knowledge.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {resourcesData.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              url={resource.url}
              icon={resource.icon}
              isDownloadable={resource.isDownloadable}
            />
          ))}
        </Box>
      </Box>

      {/* Tips Section */}
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(76, 175, 80, 0.05)'
              : 'rgba(76, 175, 80, 0.02)',
          p: 3,
          borderRadius: 2,
          borderLeft: '4px solid',
          borderColor: 'success.main',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
          💡 Pro Tips for Successful Investing
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            ✓ <strong>Start Early:</strong> The power of compounding rewards long-term investors.
          </Typography>
          <Typography variant="body2">
            ✓ <strong>Think Long-Term:</strong> Don't panic during market volatility; stay focused on your goals.
          </Typography>
          <Typography variant="body2">
            ✓ <strong>Diversify:</strong> Spread investments across different sectors and asset classes.
          </Typography>
          <Typography variant="body2">
            ✓ <strong>Educate Yourself:</strong> Continuously learn about markets, companies, and new opportunities.
          </Typography>
          <Typography variant="body2">
            ✓ <strong>Review Regularly:</strong> Monitor your portfolio quarterly and rebalance as needed.
          </Typography>
        </Stack>
      </Box>

      <Divider />
      
      {/* Key Concepts Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Key Investing Concepts
        </Typography>
        <Stack spacing={2}>
          {conceptsData.map((concept, index) => (
            <ConceptAccordion
              key={index}
              title={concept.title}
              description={concept.description}
              icon={concept.icon}
              points={concept.points}
              example={concept.example}
              defaultExpanded={concept.defaultExpanded}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
