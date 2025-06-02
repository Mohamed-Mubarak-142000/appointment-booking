import { Box } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import { useTranslate } from "../../locales";
import { AnimatedTitle } from "../animate-title";

const HeroInfo = () => {
  const { t } = useTranslate("home");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        gap: { xs: 1, md: 2, lg: 3 },
        flexDirection: "column",
        width: "100%",
        height: "100%",
        p: { xs: 2, md: 4 },
      }}
    >
      <AnimatedTitle
        text={t("hero.title")}
        variant="h3"
        sx={{
          color: "common.white",
          fontSize: { xs: "1.5rem", md: "2rem", lg: "3.5rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          lineHeight: 1.2,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "start", lg: "center" },
          flexDirection: { xs: "column-reverse", lg: "row" },
          gap: { xs: 1, md: 2 },
        }}
      >
        <Box component="img" src={assets.group_profiles} alt="" />

        <Box sx={{ color: "common.white" }} component={"p"}>
          {t("hero.description")}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroInfo;
