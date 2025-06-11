import { useRatingStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";

export const RatingChart = () => {
  const { data: stats } = useRatingStats();

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
