import { useDashboardStats } from "../../apis/use-case/doctor/dashboard";
import { Grid } from "@mui/material";
import StatsCard from "./common/stats-card";
import StatsCardSkeleton from "./stats-card-skeleton";
import { useTranslate } from "../../locales";

const AllCards = () => {
  const { data: stats, isPending } = useDashboardStats();
  const { t } = useTranslate("overview");
  if (isPending)
    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[...Array(5)].map((_, i) => (
          <Grid item xs={12} md={6} lg={4} key={i}>
            <StatsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6} lg={4}>
        <StatsCard
          title={t("cards.totalAppointments")}
          value={stats?.totalAppointments || 0}
          change={stats?.appointmentsChange || 0}
          slotsProps={{
            sxCard: {
              sx: {
                backgroundColor: (theme) => theme.palette.success.light,
              },
            },
            change: {
              sx: {
                color: (theme) => theme.palette.success.darker,
              },
            },
            value: {
              sx: {
                color: (theme) => theme.palette.success.darker,
              },
            },
            title: {
              sx: {
                color: (theme) => theme.palette.success.darker,
              },
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <StatsCard
          title={t("cards.totalSlots")}
          value={stats?.availableSlotsCount || 0}
          change={stats?.appointmentsChange || 0}
          slotsProps={{
            sxCard: {
              sx: {
                backgroundColor: (theme) => theme.palette.info.light,
              },
            },
            change: {
              sx: {
                color: (theme) => theme.palette.info.darker,
              },
            },
            value: {
              sx: {
                color: (theme) => theme.palette.info.darker,
              },
            },
            title: {
              sx: {
                color: (theme) => theme.palette.info.darker,
              },
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <StatsCard
          title={t("cards.totalPatients")}
          value={stats?.totalPatients || 0}
          change={stats?.patientsChange || 0}
          slotsProps={{
            sxCard: {
              sx: {
                backgroundColor: (theme) => theme.palette.error.light,
              },
            },
            change: {
              sx: {
                color: (theme) => theme.palette.error.darker,
              },
            },
            value: {
              sx: {
                color: (theme) => theme.palette.error.darker,
              },
            },
            title: {
              sx: {
                color: (theme) => theme.palette.error.darker,
              },
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <StatsCard
          title={t("cards.revenue")}
          value={`$${stats?.totalRevenue || 0}`}
          change={stats?.revenueChange || 0}
          slotsProps={{
            sxCard: {
              sx: {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
            },
            change: {
              sx: {
                color: (theme) => theme.palette.primary.darker,
              },
            },
            value: {
              sx: {
                color: (theme) => theme.palette.primary.darker,
              },
            },
            title: {
              sx: {
                color: (theme) => theme.palette.primary.darker,
              },
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <StatsCard
          title={t("cards.rating")}
          value={stats?.averageRating?.toFixed(1) || "0.0"}
          change={stats?.ratingChange || 0}
          slotsProps={{
            sxCard: {
              sx: {
                backgroundColor: (theme) => theme.palette.warning.light,
              },
            },
            change: {
              sx: {
                color: (theme) => theme.palette.warning.darker,
              },
            },
            value: {
              sx: {
                color: (theme) => theme.palette.warning.darker,
              },
            },
            title: {
              sx: {
                color: (theme) => theme.palette.warning.darker,
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AllCards;
