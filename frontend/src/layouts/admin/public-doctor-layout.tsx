import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { FormHeader } from "../../components/auth/header-form";
import { CustomerLanguagePopover } from "../../components/lang-switch";
import { useTranslate } from "../../locales";

const PublicDoctorLayout = () => {
  const { t } = useTranslate("common");
  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.darker,
          padding: 2,
          height: "100%",
        }}
      >
        <FormHeader
          title={t("logo.tagline")}
          subtitle={t("logo.description")}
          slotProps={{
            title: {
              variant: "h3",
              sx: {
                color: "primary.light",
                fontSize: { xs: ".5rem", md: "1rem", lg: "1.5rem" },
              },
            },
            subtitle: {
              variant: "h3",
              sx: {
                color: "white",
                fontWeight: "normal",
                fontSize: { xs: ".6rem", md: "1rem", lg: "1rem" },
              },
            },
          }}
          widthImage={200}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12} md={8} sx={{ padding: 2, overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: 1,
          }}
        >
          <CustomerLanguagePopover />
        </Box>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default PublicDoctorLayout;
