import { Box, Chip, Typography } from "@mui/material";
import { getCurrentLang, useTranslate } from "../../locales";
import type { Governorate } from "../../apis/use-case/get-all-government";
import type { Specialty } from "../../apis/use-case/get-all-specialiste";

const TopSection = ({
  selectedGovernorate,
  selectedSpecialty,
  filters,
  clearFilter,
}: {
  selectedGovernorate: Governorate | undefined;
  selectedSpecialty: Specialty | undefined;
  filters: {
    name: string;
    specialty: string;
    governorate: string;
    page: number;
  };
  clearFilter: (filter: "specialty" | "governorate" | "name") => void;
}) => {
  const { t } = useTranslate("filter-doctor");
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t("find_doctor")}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        {filters.specialty && (
          <Chip
            label={
              getCurrentLang() === "ar"
                ? selectedSpecialty?.label.ar
                : selectedSpecialty?.label.en
            }
            onDelete={() => clearFilter("specialty")}
          />
        )}
        {filters.governorate && (
          <Chip
            label={
              getCurrentLang() === "ar"
                ? selectedGovernorate?.label.ar
                : selectedGovernorate?.label.en
            }
            onDelete={() => clearFilter("governorate")}
          />
        )}
        {filters.name && (
          <Chip
            label={`Name: ${filters.name}`}
            onDelete={() => clearFilter("name")}
          />
        )}
      </Box>
    </>
  );
};

export default TopSection;
