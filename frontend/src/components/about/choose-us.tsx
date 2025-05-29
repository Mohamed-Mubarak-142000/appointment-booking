import {
  Box,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TitleSection from "../title-section";
import { useTranslate } from "../../locales";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[8],
  },
}));
const ChooseUs = () => {
  const { t } = useTranslate("about");
  return (
    <Box sx={{ mb: 6 }}>
      <TitleSection
        title={t("why_choose.title")}
        subTitle={t("why_choose.subtitle")}
        sx={{
          mb: 3,
          textAlign: "center",
        }}
        slotProps={{
          title: {
            sx: {
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
          subTitle: {
            sx: {
              fontSize: { xs: ".75rem", md: "1rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />

      <Grid container spacing={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <AccessTimeIcon color="primary" sx={{ fontSize: 50 }} />
              </Box>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                align="center"
              >
                {t("why_choose.efficiency")}
              </Typography>
              <Typography align="center">
                {t("why_choose.efficiency_desc")}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <MedicalServicesIcon color="primary" sx={{ fontSize: 50 }} />
              </Box>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                align="center"
              >
                {t("why_choose.comfort")}
              </Typography>
              <Typography align="center">
                {t("why_choose.comfort_desc")}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <PersonSearchIcon color="primary" sx={{ fontSize: 50 }} />
              </Box>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                align="center"
              >
                {t("why_choose.personalization")}
              </Typography>
              <Typography align="center">
                {t("why_choose.personalization_desc")}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <PersonalVideoIcon color="primary" sx={{ fontSize: 50 }} />
              </Box>
              <Typography
                gutterBottom
                variant="h6"
                component="h4"
                align="center"
              >
                {t("why_choose.technology")}
              </Typography>
              <Typography align="center">
                {t("why_choose.technology_desc")}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChooseUs;
