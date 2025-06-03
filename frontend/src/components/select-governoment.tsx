import {
  useGovernorates,
  type Governorate,
} from "../apis/use-case/get-all-government";
import { getCurrentLang, useTranslate } from "../locales";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

export function GovernorateSelector({
  control,
  name = "governorate",
  placeholder,
  error,
  helperText,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}) {
  const { t } = useTranslate("common");
  const { data, isPending, error: apiError } = useGovernorates();

  if (isPending) {
    return <CircularProgress size={24} />;
  }

  if (apiError) {
    return <Typography color="error">Error loading governorates</Typography>;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={error}>
          <Select {...field} displayEmpty value={field.value || ""}>
            <MenuItem value="">
              {placeholder ||
                t("register_form.doctor_register.governorate_placeholder")}
            </MenuItem>
            {data?.data.map((governorate: Governorate) => (
              <MenuItem key={governorate.id} value={governorate.value}>
                {getCurrentLang() === "ar"
                  ? governorate.label.ar
                  : governorate.label.en}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
