import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { getCurrentLang, useTranslate } from "../../locales";
import type { Governorate } from "../../apis/use-case/get-all-government";
import type { Specialty } from "../../apis/use-case/get-all-specialiste";

const FilterOPtions = ({
  governorateData,
  specialtyData,
  filters,
  onFilterChange,
}: {
  governorateData: Governorate[];
  specialtyData: Specialty[];
  onFilterChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => void;
  filters: {
    name: string;
    specialty: string;
    governorate: string;
    page: number;
  };
}) => {
  const { t } = useTranslate("filter-doctor");
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
      <TextField
        label={t("search_placeholder")}
        variant="outlined"
        name="name"
        value={filters.name}
        onChange={onFilterChange}
        sx={{ minWidth: 200 }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>{t("specialty")}</InputLabel>
        <Select
          name="specialty"
          value={filters.specialty}
          onChange={onFilterChange}
          label={t("specialty")}
        >
          {specialtyData.map((specialty: Specialty) => (
            <MenuItem key={specialty.id} value={specialty.value}>
              {getCurrentLang() === "ar"
                ? specialty.label.ar
                : specialty.label.en}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>{t("governorate")}</InputLabel>
        <Select
          name="governorate"
          value={filters.governorate}
          onChange={onFilterChange}
          label={t("governorate")}
        >
          {governorateData.map((gov: Governorate) => (
            <MenuItem key={gov.id} value={gov.value}>
              {getCurrentLang() === "ar" ? gov.label.ar : gov.label.en}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterOPtions;
