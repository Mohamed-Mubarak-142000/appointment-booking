import { Skeleton, Stack } from "@mui/material";
import { useRatingStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";

export const RatingChart = () => {
  const { data: stats, isPending } = useRatingStats();

  if (isPending)
    return (
      <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
        <Skeleton variant="text" width={180} height={30} />
        <Skeleton variant="rectangular" width="100%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Stack>
    );

  if (!stats?.ratings?.length) return <div>No rating data available</div>;

  const data = {
    labels: stats.labels || [],
    datasets: [
      {
        label: "Average Rating",
        data: stats.ratings || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "#4bc0c0",
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartCommon
      data={data}
      title="Doctor Ratings"
      defaultChartType="polarArea"
      options={{
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
      }}
    />
  );
};
