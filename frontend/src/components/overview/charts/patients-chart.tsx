import { Skeleton, Stack } from "@mui/material";
import { usePatientStats } from "../../../apis/use-case/doctor/dashboard";
import ChartCommon from "../../../components/overview/common/chart-component";
import { useTranslate } from "../../../locales";

const PatientsChart = () => {
  const { data: stats, isLoading } = usePatientStats();
  const { t } = useTranslate("overview");

  if (isLoading)
    return (
      <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
        <Skeleton variant="text" width={180} height={30} />
        <Skeleton variant="rectangular" width="100%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Stack>
    );

  if (!stats || !stats.labels?.length) return <div>{t("no_data_message")}</div>;

  const data = {
    labels: stats.labels,
    datasets: [
      {
        label: t("patient_types.new_archived"),
        data: stats.newPatients.archive,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: t("patient_types.returning_archived"),
        data: stats.returningPatients.archive,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
      {
        label: t("patient_types.new_active"),
        data: stats.newPatients.notArchive,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: t("patient_types.returning_active"),
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
      title={t("charts_titles.patients_chart")}
    />
  );
};

export default PatientsChart;
