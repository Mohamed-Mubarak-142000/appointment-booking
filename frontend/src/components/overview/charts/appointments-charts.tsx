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
import { useTranslate } from "../../../locales";

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
  const { t } = useTranslate("overview");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ width: "50%", mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{t("others.time_range")}</InputLabel>
        <Select
          value={value}
          label={t("others.time_range")}
          onChange={handleChange}
        >
          <MenuItem value="weekly">{t("others.weekly")}</MenuItem>
          <MenuItem value="monthly">{t("others.monthly")}</MenuItem>
          <MenuItem value="quarterly">{t("others.quarterly")}</MenuItem>
          <MenuItem value="yearly">{t("others.yearly")}</MenuItem>
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
  const { t } = useTranslate("overview");
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
        {t("chart_types.line")}
      </ToggleButton>
      <ToggleButton value="bar" aria-label="bar chart">
        {t("chart_types.bar")}
      </ToggleButton>
      <ToggleButton value="pie" aria-label="pie chart">
        {t("chart_types.pie")}
      </ToggleButton>
      <ToggleButton value="doughnut" aria-label="doughnut chart">
        {t("chart_types.doughnut")}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const AppointmentsChart = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [chartType, setChartType] = useState("line");
  const { data: stats, isLoading } = useAppointmentStats();
  const { t } = useTranslate("overview");

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        rtl: true, // Right-to-left for Arabic
      },
      title: {
        display: true,
        text: t("charts_titles.appointments_chart"),
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
        rtl: true, // Right-to-left for Arabic
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
          text: t("appointments_count_label"),
        },
      },
      x: {
        title: {
          display: true,
          text: t("time_period_label"),
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
        labels: [
          t("status.scheduled"),
          t("status.completed"),
          t("status.cancelled"),
        ],
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
          label: t("status.scheduled"),
          data: source.scheduled,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: t("status.completed"),
          data: source.completed,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          tension: 0.1,
          borderWidth: 2,
        },
        {
          label: t("status.cancelled"),
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
  if (!stats) return <div>{t("no_data_message")}</div>;

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
