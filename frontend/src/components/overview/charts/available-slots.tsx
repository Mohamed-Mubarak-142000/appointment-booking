import { useAvailableSlotsStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";

const AvailableSlots = () => {
  const { data: stats, isLoading } = useAvailableSlotsStats();

  if (isLoading) return <div>Loading...</div>;
  if (!stats) return <div>No data available</div>;

  const data = {
    labels: ["Available", "Unavailable"],
    datasets: [
      {
        label: "Slots",
        data: [stats?.available || 0, stats?.unavailable || 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <ChartCommon
      data={data}
      title="Available vs Unavailable Slots"
      defaultChartType="bar"
    />
  );
};

export default AvailableSlots;
