import {
  useSpecialties,
  type Specialty,
} from "../apis/use-case/get-all-specialiste";
import { useTranslate } from "../locales";
import { CircularProgress, MenuItem, Select, Typography } from "@mui/material";

export function SpecialtySelector() {
  const { t } = useTranslate();
  const { data, isPending, error } = useSpecialties();

  if (isPending) {
    return <CircularProgress size={24} />;
  }

  if (error) {
    return <Typography color="error">Error loading specialties</Typography>;
  }

  return (
    <Select fullWidth>
      <MenuItem value="">{t("specialty.select")}</MenuItem>
      {data?.data.map((specialty: Specialty) => (
        <MenuItem key={specialty.id} value={specialty.value}>
          {t(`specialty.${specialty.value}`)}
        </MenuItem>
      ))}
    </Select>
  );
}
