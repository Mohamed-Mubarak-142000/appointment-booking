import TitleSection from "../title-section";
import { useTranslate } from "../../locales";

const TopSection = () => {
  const { t } = useTranslate("common");
  return (
    <TitleSection
      title={t("all_doctors.title")}
      subTitle={t("all_doctors.subtitle")}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        mt: 3,
      }}
      slotProps={{
        title: {
          variant: "h3",
          sx: {
            fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
          },
        },
      }}
    />
  );
};

export default TopSection;
