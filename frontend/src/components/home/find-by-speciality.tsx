import { Box, Stack } from "@mui/material";
import TitleSection from "../title-section";
import { assets } from "../../assets/assets_frontend/assets";
import ItemSpecial from "./item-special";
import type { Speciality } from "../../types";
import { tFn, useTranslate } from "../../locales";

export const specialityData: Speciality[] = [
  {
    speciality: tFn("home:speciality.specialities.General_physician"),
    image: assets.General_physician,
  },
  {
    speciality: tFn("home:speciality.specialities.Gynecologist"),
    image: assets.Gynecologist,
  },
  {
    speciality: tFn("home:speciality.specialities.Dermatologist"),
    image: assets.Dermatologist,
  },
  {
    speciality: tFn("home:speciality.specialities.Pediatricians"),
    image: assets.Pediatricians,
  },
  {
    speciality: tFn("home:speciality.specialities.Neurologist"),
    image: assets.Neurologist,
  },
  {
    speciality: tFn("home:speciality.specialities.Gastroenterologist"),
    image: assets.Gastroenterologist,
  },
];

const FindBySpecialty = () => {
  const { t } = useTranslate("home");
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: { xs: 3, md: 2, lg: 3 },
        }}
      >
        {specialityData.map((item, index) => (
          <ItemSpecial item={item} key={index} />
        ))}
      </Box>
    </Stack>
  );
};

export default FindBySpecialty;
