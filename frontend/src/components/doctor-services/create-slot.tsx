import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAddAvailableSlot } from "../../apis/use-case/doctor/dashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { daysOfWeek, slotTypes } from "./columns";
import ButtonAction from "../button-action";
import { useTranslate } from "../../locales";

const CreateSlotSchema = z.object({
  day: z.string().min(1, "اليوم مطلوب"),
  type: z.enum(["consultation", "procedure", "test", "medication"], {
    required_error: "نوع الموعد مطلوب",
  }),
  startTime: z.string().min(1, "وقت البدء مطلوب"),
  endTime: z.string().min(1, "وقت النهاية مطلوب"),
  slotDuration: z
    .number({ invalid_type_error: "مدة الموعد مطلوبة" })
    .min(1, "مدة الموعد مطلوبة"),
});

type CreateSlotFormData = z.infer<typeof CreateSlotSchema>;

const CreateSlot = () => {
  const addSlotMutation = useAddAvailableSlot();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslate("overview");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSlotFormData>({
    resolver: zodResolver(CreateSlotSchema),
  });

  const onSubmit = async (data: CreateSlotFormData) => {
    try {
      await addSlotMutation.mutateAsync(data);
      reset();
      setOpenDialog(false);
    } catch (error) {
      console.error("فشل في إضافة الموعد", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  return (
    <>
      <ButtonAction
        title={t("doctorServices.addNewAppointment")}
        icon="material-symbols:add"
        onClick={() => setOpenDialog(true)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{t("add_appointment_dialog.title")}</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                select
                label={t("add_appointment_dialog.day_label")}
                {...register("day")}
                fullWidth
                error={!!errors.day}
                helperText={errors.day?.message}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label={t("add_appointment_dialog.type_label")}
                {...register("type")}
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                {slotTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label={t("add_appointment_dialog.start_time_label")}
                type="time"
                {...register("startTime")}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
              />

              <TextField
                label={t("add_appointment_dialog.end_time_label")}
                type="time"
                {...register("endTime")}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                error={!!errors.endTime}
                helperText={errors.endTime?.message}
              />

              <TextField
                label={t("add_appointment_dialog.duration_label")}
                type="number"
                {...register("slotDuration", { valueAsNumber: true })}
                fullWidth
                inputProps={{
                  min: 10,
                  max: 120,
                }}
                error={!!errors.slotDuration}
                helperText={errors.slotDuration?.message}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog}>
              {t("add_appointment_dialog.cancel_button")}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting || addSlotMutation.isPending}
            >
              {addSlotMutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                t("add_appointment_dialog.submit_button")
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateSlot;
