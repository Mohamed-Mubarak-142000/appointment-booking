import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import { useCreateAppointment } from "../../apis/use-case/patient/appointments";
import { usePatientAuth } from "../../context/auth-context";
import type {
  AvailableSlot,
  AvailableSlotsData,
} from "../../apis/use-case/types";
import { useEffect, useState } from "react";
import { GetAvailableSlotsSelector } from "./select-available-slots";
import { tFn, useTranslate } from "../../locales";

// Create schema with translated error messages
const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, tFn("appointment:appointment.errors.doctorId")),
  day: z.enum(
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    {
      required_error: tFn("appointment:appointment.errors.day"),
    }
  ),
  startTime: z.string().min(1, tFn("appointment:appointment.errors.timeSlot")),
  type: z.enum(["consultation", "procedure", "test", "medication"], {
    required_error: tFn("appointment:appointment.errors.appointmentType"),
  }),
  reason: z
    .string()
    .min(10, tFn("appointment:appointment.errors.reason.min"))
    .max(500, tFn("appointment:appointment.errors.reason.max")),
});

type AppointmentFormValues = z.infer<typeof createAppointmentSchema>;

const AppointmentBooking = ({
  doctorId,
  data,
}: {
  doctorId: string;
  data: AvailableSlotsData;
}) => {
  const { t } = useTranslate("appointment");
  const { mutateAsync: createAppointment, isPending } = useCreateAppointment();
  const { patient } = usePatientAuth();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
    reset,
    control,
    setValue,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      doctorId,
      type: "consultation",
      reason: "",
    },
    mode: "onChange",
  });

  const selectedDay = watch("day");
  const selectedType = watch("type");

  useEffect(() => {
    if (data) {
      const filteredSlots = data?.slots?.filter(
        (slot) =>
          slot.day.toLowerCase() === selectedDay?.toLowerCase() &&
          slot.isAvailable &&
          (!slot.type || slot.type.toLowerCase() === selectedType.toLowerCase())
      );
      setAvailableSlots(filteredSlots);
      if (filteredSlots.length === 0) {
        setValue("startTime", "");
      }
    }
  }, [selectedDay, selectedType, data, setValue]);

  function calculatePrice(type: string): number {
    const fees = {
      consultation: 100,
      procedure: 200,
      test: 150,
      medication: 50,
    };
    return fees[type as keyof typeof fees] || 100;
  }

  const getDayLabel = (day: string) => {
    return t(`form.days.${day.toLowerCase()}`, { defaultValue: day });
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      if (!patient?._id) {
        toast.error(t("appointment.errors.loginRequired"));
        return;
      }

      const selectedSlot = availableSlots.find(
        (slot) => slot.startTime === data.startTime
      );

      if (!selectedSlot || !selectedSlot._id) {
        toast.error(t("appointment.errors.slotUnavailable"));
        return;
      }

      await createAppointment({
        doctor: doctorId,
        slot: selectedSlot._id,
        patient: patient._id,
        type: data.type,
        reason: data.reason,
        day: selectedDay as string,
        startTime: data.startTime,
        endTime: selectedSlot.endTime,
        price: calculatePrice(data.type),
      });

      reset();
      toast.success(t("appointment.success.bookingSuccess"));
    } catch (error) {
      console.error("Error details:", error);
      toast.error(t("appointment.failure.bookingFailed"));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t("appointment.form.doctorName")}
            {data?.doctor?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t(`appointment.form.specialty`)}
            {data?.doctor?.specialty}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label={t("appointment.form.appointmentType")}
            {...register("type")}
            error={!!errors.type}
            helperText={errors.type?.message}
            fullWidth
            required
          >
            {Object.entries(
              t("appointment.form.appointmentTypes", { returnObjects: true })
            ).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label={t("appointment.form.day")}
            {...register("day")}
            error={!!errors.day}
            helperText={errors.day?.message}
            fullWidth
            required
          >
            {Array.from(
              new Set(
                data?.slots
                  ?.filter((slot) => slot.isAvailable)
                  .map((slot) => slot.day.toLowerCase())
              )
            ).map((day) => (
              <MenuItem key={day} value={day}>
                {getDayLabel(day)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <GetAvailableSlotsSelector
            control={control}
            name="startTime"
            placeholder={t("appointment.form.selectTimeSlot")}
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            doctorId={doctorId}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={t("appointment.form.reason")}
            {...register("reason")}
            error={!!errors.reason}
            helperText={errors.reason?.message}
            multiline
            rows={4}
            fullWidth
            required
            placeholder={t("appointment.form.reasonPlaceholder")}
          />
        </Grid>

        {!patient?._id && (
          <Grid item xs={12}>
            <Alert severity="error">
              {t("appointment.errors.loginRequired")}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending || !isValid || !patient?._id}
            fullWidth
            size="large"
            sx={{ py: 2 }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("appointment.form.submit")
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentBooking;
