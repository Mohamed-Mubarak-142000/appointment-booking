// src/components/dashboard/charts/AppointmentsChart.tsx
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { useAppointmentStats } from "../../../apis/use-case/doctor/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TimeRangeSelector = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ width: "50%", mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Time Range</InputLabel>
        <Select value={value} label="Time Range" onChange={handleChange}>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const ChartTypeSelector = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newChartType: string | null
  ) => {
    if (newChartType !== null) {
      onChange(newChartType);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="chart type"
      size="small"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="line" aria-label="line chart">
        Line
      </ToggleButton>
      <ToggleButton value="bar" aria-label="bar chart">
        Bar
      </ToggleButton>
      <ToggleButton value="pie" aria-label="pie chart">
        Pie
      </ToggleButton>
      <ToggleButton value="doughnut" aria-label="doughnut chart">
        Doughnut
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const AppointmentsChart = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [chartType, setChartType] = useState("line");
  const { data: stats, isLoading } = useAppointmentStats();

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Appointments Trend",
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            return `${context.dataset.label}: ${
              context.parsed.y || context.raw
            }`;
          },
        },
      },
    },
  };

  const lineBarOptions = {
    ...commonOptions,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Appointments",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time Period",
        },
      },
    },
  };

  const pieDoughnutOptions = {
    ...commonOptions,
  };

  const getDataForRange = (range: string, type: string) => {
    if (!stats) return { labels: [], datasets: [] };

    const source = range === "weekly" ? stats.weekly : stats.monthly;

    if (type === "pie" || type === "doughnut") {
      // For pie/doughnut charts, we'll show totals for the selected period
      const totalScheduled = source.scheduled.reduce(
        (a: number, b: number) => a + b,
        0
      );
      const totalCompleted = source.completed.reduce(
        (a: number, b: number) => a + b,
        0
      );
      const totalCancelled = source.cancelled.reduce(
        (a: number, b: number) => a + b,
        0
      );

      return {
        labels: ["Scheduled", "Completed", "Cancelled"],
        datasets: [
          {
            data: [totalScheduled, totalCompleted, totalCancelled],
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    return {
      labels: source.labels,
      datasets: [
        {
          label: "Scheduled",
          data: source.scheduled,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: "Completed",
          data: source.completed,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: "Cancelled",
          data: source.cancelled,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.1,
          borderWidth: 2,
        },
      ],
    };
  };

  const renderChart = () => {
    const data = getDataForRange(timeRange, chartType);

    switch (chartType) {
      case "line":
        return <Line options={lineBarOptions} data={data} />;
      case "bar":
        return <Bar options={lineBarOptions} data={data} />;
      case "pie":
        return <Pie options={pieDoughnutOptions} data={data} />;
      case "doughnut":
        return <Doughnut options={pieDoughnutOptions} data={data} />;
      default:
        return <Line options={lineBarOptions} data={data} />;
    }
  };

  if (isLoading)
    return (
      <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
        <Skeleton variant="text" width={180} height={30} />
        <Skeleton variant="rectangular" width="100%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Stack>
    );
  if (!stats) return <div>No data available</div>;

  return (
    <Stack sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {(chartType === "line" || chartType === "bar") && (
          <TimeRangeSelector onChange={setTimeRange} value={timeRange} />
        )}
        <ChartTypeSelector onChange={setChartType} value={chartType} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 450,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderChart()}
      </Box>
    </Stack>
  );
};

export default AppointmentsChart;
