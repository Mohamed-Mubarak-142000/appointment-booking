import { Box, Grid, Paper, Typography } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import { useTranslate } from "../../locales";

const MissionSection = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslate("about");

  return (
    <Paper
      sx={{
        mb: 6,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={{ xs: 0, lg: 3 }} alignItems="center">
        <Grid item xs={12} md={6} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            {t("mission.title")}
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            {t("mission.content1")}
          </Typography>
          <Typography paragraph> {t("mission.content2")}</Typography>
        </Grid>

        {!isMobile && (
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={assets.about_image}
              alt="مهمتنا"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[4],
              }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default MissionSection;
