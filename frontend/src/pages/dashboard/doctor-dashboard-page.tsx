import { Grid } from "@mui/material";
import AllCards from "../../components/overview/all-cards";
import ChartWrapper from "../../components/overview/charts/chart-wrapper";
import AppointmentsChart from "../../components/overview/charts/appointments-charts";
import PatientsChart from "../../components/overview/charts/patients-chart";
import { RatingChart } from "../../components/overview/charts/rating-chart";
import AvailableSlots from "../../components/overview/charts/available-slots";
import RevenueChart from "../../components/overview/charts/revenue-chart";
import ShowVideo from "../../components/show-video";
import { videos } from "../../assets/videos";
import ShowLocation from "../../components/show-location";
import { useTranslate } from "../../locales";

const DoctorDashboardPage = () => {
  const { t } = useTranslate("overview");
  return (
    <>
      <AllCards />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartWrapper title={t("charts_titles.appointments_chart")}>
            <AppointmentsChart />
          </ChartWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartWrapper title={t("charts_titles.patients_chart")}>
            <PatientsChart />
          </ChartWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartWrapper title={t("charts_titles.rating_chart")}>
            <RatingChart />
          </ChartWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartWrapper title={t("charts_titles.slots_chart")}>
            <AvailableSlots />
          </ChartWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartWrapper title={t("charts_titles.revenue_chart")}>
            <RevenueChart />
          </ChartWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <ShowLocation />
        </Grid>

        <Grid item xs={12} md={6}>
          <ShowVideo video={videos.intro} />
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorDashboardPage;
