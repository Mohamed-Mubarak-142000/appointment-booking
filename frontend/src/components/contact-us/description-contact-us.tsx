import { Box, Grid, Typography } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import { useTranslate } from "../../locales";

const DescriptionContactPage = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslate("contact-us");
  return (
    <Grid
      container
      spacing={{ xs: 0, lg: 3 }}
      sx={{ mb: 6 }}
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {t("contact_page.title")}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {t("contact_page.subtitle")}
        </Typography>
        <Typography paragraph sx={{ mb: 3, fontSize: "1.1rem" }}>
          {t("contact_page.description1")}{" "}
        </Typography>
        <Typography paragraph sx={{ fontSize: "1.1rem" }}>
          {" "}
          {t("contact_page.description2")}{" "}
        </Typography>
      </Grid>

      {!isMobile && (
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={assets.contact_image}
            alt="تواصل معنا"
            sx={{
              width: "100%",
              borderRadius: 2,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default DescriptionContactPage;
