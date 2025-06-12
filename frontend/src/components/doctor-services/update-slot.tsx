import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useUpdateAvailableSlot } from "../../apis/use-case/doctor/dashboard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { daysOfWeek, slotTypes } from "./columns";
import type { AvailableSlot } from "../../apis/use-case/types";
import { getCurrentLang } from "../../locales";
import ButtonAction from "../button-action";

const UpdateSlotDialogSchema = z.object({
  day: z.string().min(1, "اليوم مطلوب"),
  type: z.enum(["consultation", "procedure", "test", "medication"], {
    required_error: "نوع الموعد مطلوب",
  }),
  startTime: z.string().min(1, "وقت البدء مطلوب"),
  endTime: z.string().min(1, "وقت النهاية مطلوب"),
  slotDuration: z
    .number({ invalid_type_error: "مدة الموعد مطلوبة" })
    .min(1, "مدة الموعد مطلوبة")
    .max(120, "يجب ألا تزيد مدة الموعد عن 120 دقيقة"),
});

type UpdateSlotDialogData = z.infer<typeof UpdateSlotDialogSchema>;

const UpdateSlotDialog = ({
  row,
  handleMenuClose,
}: {
  row: AvailableSlot;
  handleMenuClose: () => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const updateSlotMutation = useUpdateAvailableSlot();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateSlotDialogData>({
    resolver: zodResolver(UpdateSlotDialogSchema),
    defaultValues: {
      day: row.day,
      type: row.type,
      startTime: row.startTime,
      endTime: row.endTime,
      slotDuration: row.slotDuration,
    },
  });

  const onSubmit = async (data: UpdateSlotDialogData) => {
    try {
      await updateSlotMutation.mutateAsync({ slotId: row._id || "", data });
      handleCloseDialog();
      handleMenuClose();
    } catch (error) {
      console.error("فشل في تعديل الموعد", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
    handleMenuClose();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <ButtonAction
        title="تعديل موعد"
        icon="ic:baseline-edit"
        slotProps={{
          button: {
            variant: "text",
          },
        }}
        onClick={handleOpenDialog}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: "center" }}>تعديل موعد</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Controller
                name={"day"}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.day}>
                    <Select {...field} displayEmpty value={field.value || ""}>
                      <MenuItem value="">
                        {getCurrentLang() === "ar" ? "اليوم" : "Day"}
                      </MenuItem>
                      {daysOfWeek.map((day) => (
                        <MenuItem key={day.value} value={day.value}>
                          {day.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.day?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Controller
                name={"type"}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <Select {...field} displayEmpty value={field.value || ""}>
                      <MenuItem value="">
                        {getCurrentLang() === "ar" ? "نوع الموعد" : "Slot Type"}
                      </MenuItem>
                      {slotTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.type?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <TextField
                label="وقت البدء"
                type="time"
                {...register("startTime")}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minutes
                }}
                error={!!errors.startTime}
                helperText={errors.startTime?.message}
                variant="outlined"
                size="small"
              />

              <TextField
                label="وقت الانتهاء"
                type="time"
                {...register("endTime")}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minutes
                }}
                error={!!errors.endTime}
                helperText={errors.endTime?.message}
                variant="outlined"
                size="small"
              />

              <TextField
                label="مدة الموعد (بالدقائق)"
                type="number"
                {...register("slotDuration", { valueAsNumber: true })}
                fullWidth
                inputProps={{
                  min: 10,
                  max: 120,
                  step: 5,
                }}
                error={!!errors.slotDuration}
                helperText={errors.slotDuration?.message}
                variant="outlined"
                size="small"
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ padding: 3 }}>
            <ButtonAction
              title="اغلاق"
              isLoading={isSubmitting || updateSlotMutation.isPending}
              slotProps={{
                button: {
                  fullWidth: true,
                  variant: "outlined",
                },
              }}
              onClick={handleCloseDialog}
            />

            <ButtonAction
              type="submit"
              title="حفظ التعديلات"
              isLoading={isSubmitting || updateSlotMutation.isPending}
              slotProps={{
                button: {
                  fullWidth: true,
                  variant: "contained",
                  sx: {
                    color: "white",
                    backgroundColor: "primary.dark",
                    "&:hover": { backgroundColor: "primary.darker" },
                  },
                },
              }}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateSlotDialog;
