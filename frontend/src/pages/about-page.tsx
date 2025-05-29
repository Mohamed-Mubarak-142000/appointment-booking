import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VisionSection from "../components/about/vision-section";
import ChooseUs from "../components/about/choose-us";
import TitleSection from "../components/title-section";
import MissionSection from "../components/about/mission-setion";
import { useTranslate } from "../locales";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslate("about");

  return (
    <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
      <TitleSection
        subTitle={t("subtitle")}
        slotProps={{
          subTitle: {
            sx: {
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              mb: 3,
              textAlign: "center",
              fontWeight: (theme) => theme.typography.fontWeightBold,
              color: (theme) => theme.palette.primary.darker,
            },
          },
        }}
      />
      <Container maxWidth="lg">
        <MissionSection isMobile={isMobile} />
        <VisionSection isMobile={isMobile} />
        <ChooseUs />
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h6" component="p" sx={{ mb: 3 }}>
            {t("cta")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
