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

const appointmentSchema = z.object({
  doctorId: z.string().min(1, "معرف الطبيب مطلوب"),
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
      required_error: "الرجاء اختيار يوم",
    }
  ),
  startTime: z.string().min(1, "الرجاء اختيار موعد"),
  type: z.enum(["consultation", "procedure", "test", "medication"], {
    required_error: "الرجاء اختيار نوع الموعد",
  }),
  reason: z
    .string()
    .min(10, "يجب أن يكون السبب 10 أحرف على الأقل")
    .max(500, "يجب أن يكون السبب أقل من 500 حرف"),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const AppointmentBooking = ({
  doctorId,
  data,
}: {
  doctorId: string;
  data: AvailableSlotsData;
}) => {
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
    resolver: zodResolver(appointmentSchema),
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
    const days: Record<string, string> = {
      monday: "الإثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
      sunday: "الأحد",
    };
    return days[day.toLowerCase()] || day;
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      if (!patient?._id) {
        toast.error("يجب تسجيل الدخول أولاً");
        return;
      }

      const selectedSlot = availableSlots.find(
        (slot) => slot.startTime === data.startTime
      );

      if (!selectedSlot || !selectedSlot._id) {
        toast.error("الفترة الزمنية غير متاحة. يرجى اختيار فترة أخرى");
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
      toast.success("تم حجز الموعد بنجاح!");
    } catch (error) {
      console.error("Error details:", error);
      toast.error("فشل في حجز الموعد");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            حجز موعد مع د. {data?.doctor?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            تخصص: {data?.doctor?.specialty}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="نوع الموعد"
            {...register("type")}
            error={!!errors.type}
            helperText={errors.type?.message}
            fullWidth
            required
          >
            <MenuItem value="consultation">استشارة ( 100 ريال)</MenuItem>
            <MenuItem value="procedure">إجراء طبي (200 ريال)</MenuItem>
            <MenuItem value="test">فحص (150 ريال)</MenuItem>
            <MenuItem value="medication">وصفة طبية (50 ريال)</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="اليوم"
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
            placeholder="اختر فترة زمنية"
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            doctorId={doctorId}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="سبب الحجز"
            {...register("reason")}
            error={!!errors.reason}
            helperText={errors.reason?.message}
            multiline
            rows={4}
            fullWidth
            required
            placeholder="الرجاء وصف سبب الحجز بالتفصيل"
          />
        </Grid>

        {!patient?._id && (
          <Grid item xs={12}>
            <Alert severity="error">
              يجب تسجيل الدخول كـ مريض لإتمام عملية الحجز
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
              "تأكيد الحجز"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentBooking;
