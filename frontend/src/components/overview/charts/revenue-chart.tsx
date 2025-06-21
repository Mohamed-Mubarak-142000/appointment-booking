// src/components/dashboard/charts/RevenueChart.tsx
import { Skeleton, Stack } from "@mui/material";
import { useRevenueStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";

const RevenueChart = () => {
  const { data: stats, isLoading } = useRevenueStats();

  const data = {
    labels: stats?.labels || [],
    datasets: [
      {
        label: "Revenue by Category",
        data: stats?.data || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading)
    return (
      <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
        <Skeleton variant="text" width={180} height={30} />
        <Skeleton variant="rectangular" width="100%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Stack>
    );
  if (!stats?.data?.length)
    return (
      <Stack
        sx={{ width: "100%", height: "100%" }}
        color={"text.secondary"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        No data available
      </Stack>
    );
  console.log("data", stats);
  return (
    <ChartCommon
      data={data}
      title="Revenue by Category"
      defaultChartType="pie"
      showTabs={true}
    />
  );
};

export default RevenueChart;
