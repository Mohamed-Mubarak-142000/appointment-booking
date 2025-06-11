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
import type { AvailableSlot, DoctorData } from "../../apis/use-case/types";
import { useEffect, useState } from "react";

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

const AppointmentBooking = ({ doctor }: { doctor: DoctorData }) => {
  const { mutateAsync: createAppointment, isPending } = useCreateAppointment();
  const { patient } = usePatientAuth();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      doctorId: doctor._id,
      type: "consultation",
      reason: "",
    },
    mode: "onChange",
  });

  const selectedDay = watch("day");
  const selectedType = watch("type");

  useEffect(() => {
    if (doctor?.availableSlots) {
      const filteredSlots = doctor.availableSlots.filter(
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
  }, [selectedDay, selectedType, doctor?.availableSlots, setValue]);

  function calculatePrice(type: string, doctor: DoctorData): number {
    const fees = {
      consultation: doctor.consultationFee || 100,
      procedure: doctor.procedureFee || 200,
      test: doctor.testFee || 150,
      medication: doctor.medicationFee || 50,
    };
    return fees[type as keyof typeof fees] || 100;
  }

  const getAppointmentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      consultation: "استشارة",
      procedure: "إجراء طبي",
      test: "فحص",
      medication: "وصفة طبية",
    };
    return types[type.toLowerCase()] || type;
  };

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
        doctor: doctor._id,
        slot: selectedSlot._id,
        patient: patient._id,
        type: data.type,
        reason: data.reason,
        day: selectedDay as string,
        startTime: data.startTime,
        endTime: selectedSlot.endTime,
        price: calculatePrice(data.type, doctor),
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
            حجز موعد مع د. {doctor.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            تخصص: {doctor.specialty}
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
            <MenuItem value="consultation">
              استشارة ({doctor.consultationFee || 100} ريال)
            </MenuItem>
            <MenuItem value="procedure">
              إجراء طبي ({doctor.procedureFee || 200} ريال)
            </MenuItem>
            <MenuItem value="test">فحص ({doctor.testFee || 150} ريال)</MenuItem>
            <MenuItem value="medication">
              وصفة طبية ({doctor.medicationFee || 50} ريال)
            </MenuItem>
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
                doctor?.availableSlots
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
          <TextField
            select
            label="المواعيد المتاحة"
            {...register("startTime")}
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            fullWidth
            required
            disabled={!selectedDay || availableSlots.length === 0}
          >
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <MenuItem key={slot._id} value={slot.startTime}>
                  من {slot.startTime} إلى {slot.endTime} (
                  {getAppointmentTypeLabel(slot.type || "consultation")})
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                {selectedDay
                  ? "لا توجد مواعيد متاحة لهذا اليوم"
                  : "الرجاء اختيار يوم أولاً"}
              </MenuItem>
            )}
          </TextField>
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
