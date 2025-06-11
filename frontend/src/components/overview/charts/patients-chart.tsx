import { usePatientStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";

const PatientsChart = () => {
  const { data: stats, isLoading } = usePatientStats();

  if (isLoading) return <div>Loading...</div>;
  if (!stats || !stats.labels?.length) return <div>No data available</div>;

  // تحضير البيانات للمخطط
  const data = {
    labels: stats.labels,
    datasets: [
      // مرضى الأرشيف - جدد
      {
        label: "New Archived Patients",
        data: stats.newPatients.archive,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      // مرضى الأرشيف - عائدون
      {
        label: "Returning Archived Patients",
        data: stats.returningPatients.archive,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
      // مرضى غير الأرشيف - جدد
      {
        label: "New Active Patients",
        data: stats.newPatients.notArchive,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      // مرضى غير الأرشيف - عائدون
      {
        label: "Returning Active Patients",
        data: stats.returningPatients.notArchive,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  return (
    <ChartCommon
      defaultChartType="bar"
      data={data}
      title="Patients Statistics (Archived vs Active)"
    />
  );
};

export default PatientsChart;
