import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

export interface PerformanceDataPoint {
  date: string;
  value: number;
}

export interface AssetAllocationItem {
  name: string;
  value: number;
  color?: string;
}

interface PortfolioChartsProps {
  performanceData: PerformanceDataPoint[];
  assetAllocation: AssetAllocationItem[];
}

export default function PortfolioCharts({
  performanceData,
  assetAllocation,
}: PortfolioChartsProps) {
  const theme = useTheme();

  // Generate default colors if not provided
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
  ];

  const allocationWithColors = assetAllocation.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  // Transform allocation data for pie chart
  const pieChartData = allocationWithColors.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      {/* Performance Chart */}
      <Card
        variant="outlined"
        sx={{
          flex: 1,
          minHeight: 400,
        }}
      >
        <CardContent>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
              }}
            >
              <Box
                sx={{
                  p: 0.75,
                  borderRadius: 1,
                  backgroundColor: `${theme.palette.primary.main}20`,
                }}
              >
                📈
              </Box>
              Portfolio Performance
            </Typography>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {performanceData && performanceData.length > 0 ? (
                <LineChart
                  xAxis={[
                    {
                      data: performanceData.map((_, idx) => idx),
                      label: 'Days',
                    },
                  ]}
                  series={[
                    {
                      data: performanceData.map((d) => d.value),
                      label: 'Portfolio Value (MK)',
                      curve: 'catmullRom',
                    },
                  ]}
                  width={500}
                  height={300}
                  margin={{ top: 10, bottom: 20, left: 60, right: 10 }}
                  slotProps={{
                    legend: { hidden: false, position: 'top' as const },
                  }}
                  sx={{
                    '& .MuiLineElement-root': {
                      stroke: theme.palette.primary.main,
                      strokeWidth: 2.5,
                    },
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No performance data available
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Asset Allocation Chart */}
      <Card
        variant="outlined"
        sx={{
          flex: 1,
          minHeight: 400,
        }}
      >
        <CardContent>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
              }}
            >
              <Box
                sx={{
                  p: 0.75,
                  borderRadius: 1,
                  backgroundColor: `${theme.palette.warning.main}20`,
                }}
              >
                🎯
              </Box>
              Asset Allocation
            </Typography>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {pieChartData.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: pieChartData,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray',
                      },
                      valueFormatter: (value) => `MK ${value.toLocaleString()}`,
                    },
                  ]}
                  width={400}
                  height={300}
                  slotProps={{
                    legend: { hidden: false, position: 'bottom' as const },
                  }}
                  colors={allocationWithColors.map((a) => a.color!)}
                />
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No allocation data available
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
