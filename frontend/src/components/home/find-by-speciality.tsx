import { CircularProgress, Stack } from "@mui/material";
import TitleSection from "../title-section";
import { useTranslate } from "../../locales";
import { useSpecialties } from "../../apis/use-case/get-all-specialiste";
import SpecialitySlider from "./speciality-slider";

const FindBySpecialty = () => {
  const { t } = useTranslate("home");
  const { data, isPending } = useSpecialties();

  if (isPending) {
    return <CircularProgress size={24} />;
  }

  return (
    <Stack spacing={5}>
      <TitleSection
        title={t("speciality.title")}
        subTitle={t("speciality.subtitle")}
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
          subTitle: {
            variant: "body1",
            sx: {
              fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />

      {data && <SpecialitySlider data={data.data} />}
    </Stack>
  );
};

export default FindBySpecialty;
