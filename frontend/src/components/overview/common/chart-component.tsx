import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Tabs, Tab, useTheme, Box } from "@mui/material";
import { useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Title,
  Tooltip,
  Legend
);

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    tension?: number;
    fill?: boolean;
  }[];
};

export type ChartOptions = {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: "top" | "bottom" | "left" | "right" | "center" | "chartArea";
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
  scales?: {
    y?: {
      beginAtZero?: boolean;
      min?: number;
      max?: number;
      stepSize?: number;
      ticks?: {
        stepSize?: number;
      };
    };
  };
};

export type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "doughnut"
  | "radar"
  | "polarArea";

const chartComponents = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
  polarArea: PolarArea,
};

const singleDatasetCharts: ChartType[] = [
  "pie",
  "doughnut",
  "radar",
  "polarArea",
];

interface ChartComponentProps {
  data: ChartData;
  title?: string;
  height?: number;
  defaultChartType?: ChartType;
  showTabs?: boolean;
  options?: ChartOptions;
}

const ChartCommon = ({
  data,
  title = "Chart",
  height = 400,
  defaultChartType = "bar",
  showTabs = true,
  options = {},
}: ChartComponentProps) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<ChartType>(defaultChartType);

  const ChartComponent = chartComponents[selectedTab];
  const isSingleDatasetChart = singleDatasetCharts.includes(selectedTab);

  // Prepare the data based on chart type
  const preparedData = isSingleDatasetChart
    ? {
        labels: data.labels,
        datasets: [
          {
            label: data.datasets[0]?.label || "Data",
            data: data.datasets[0]?.data || [],
            backgroundColor:
              data.datasets[0]?.backgroundColor ||
              [
                "#4bc0c0",
                "#36a2eb",
                "#ffcd56",
                "#ff6384",
                "#9966ff",
                "#ff9f40",
              ].slice(0, data.labels.length),
            borderColor:
              data.datasets[0]?.borderColor || theme.palette.primary.main,
            borderWidth: data.datasets[0]?.borderWidth || 1,
          },
        ],
      }
    : data;

  // Prepare options
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
      ...options.plugins,
    },
    scales: !isSingleDatasetChart
      ? {
          y: {
            beginAtZero: true,
            ...options.scales?.y,
          },
          ...options.scales,
        }
      : {},
  };

  return (
    <>
      {showTabs && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue: ChartType) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(chartComponents).map((key) => (
              <Tab
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={key}
                sx={{ flexShrink: 0 }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      <Box sx={{ height, position: "relative" }}>
        <ChartComponent data={preparedData} options={chartOptions} />
      </Box>
    </>
  );
};

export default ChartCommon;
