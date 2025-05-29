import { Box, Grid, Typography } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import { useTranslate } from "../../locales";

const VisionSection = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslate("about");
  return (
    <Box sx={{ mb: 6 }}>
      <Grid
        container
        spacing={{ xs: 0, lg: 3 }}
        alignItems="center"
        direction={isMobile ? "column" : "row-reverse"}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            {t("vision.title")}
          </Typography>
          <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t("vision.content")}
          </Typography>
        </Grid>

        {!isMobile && (
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={assets.appointment_img}
              alt="رؤيتنا"
              sx={{
                width: "100%",
                borderRadius: 2,
                // boxShadow: (theme) => theme.shadows[4],
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default VisionSection;
