import {
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useGetAvailableSlotsForPatient } from "../../apis/use-case/doctor/get-available-slots";
import type { AvailableSlot } from "../../apis/use-case/types";

export function GetAvailableSlotsSelector({
  control,
  name = "startTime",
  placeholder,
  error,
  helperText,
  doctorId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  doctorId?: string;
}) {
  const {
    data,
    isPending,
    error: apiError,
  } = useGetAvailableSlotsForPatient({
    id: doctorId || "",
    showAll: false,
  });

  const getAppointmentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      consultation: "استشارة",
      procedure: "إجراء طبي",
      test: "فحص",
      medication: "وصفة طبية",
    };
    return types[type.toLowerCase()] || type;
  };

  if (isPending) {
    return <CircularProgress size={24} />;
  }

  if (apiError) {
    return <Typography color="error">Error loading available slots</Typography>;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={error}>
          <Select {...field} displayEmpty value={field.value || ""}>
            <MenuItem value="">
              {placeholder || "Select Available Slots"}
            </MenuItem>
            {data?.slots?.map((slot: AvailableSlot) => (
              <MenuItem key={slot._id} value={slot.startTime}>
                من {slot.startTime} إلى {slot.endTime} (
                {getAppointmentTypeLabel(slot.type || "consultation")})
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
