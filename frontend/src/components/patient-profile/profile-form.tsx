import { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useTranslate } from "../../locales";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../../schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PatientData } from "../../apis/use-case/types";
import { useUpdatePatientProfile } from "../../apis/use-case/patient/profile";

const ProfileForm = ({ user }: { user: PatientData }) => {
  const { t } = useTranslate("profile");
  const { mutate: updatePatient } = useUpdatePatientProfile();

  const onSubmit = (data: UpdateProfileFormData) => {
    if (!user?._id) return;
    updatePatient({ _id: user._id, ...data });
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    // watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  // Watch for photo changes if you implement upload
  // const photoUrl = watch("photo") || user?.photo || assets.logo;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || undefined,
        gender:
          user.gender === "male" ||
          user.gender === "female" ||
          user.gender === "other"
            ? user.gender
            : undefined,
        photo: undefined,
      });
    }
  }, [user, reset]);

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile.profile_info")}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("profile.name")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("profile.email")}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("profile.phone")}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("profile.age")}
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("profile.gender")}
              select
              SelectProps={{ native: true }}
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              InputLabelProps={{ shrink: true }}
            >
              <option value=""></option>
              <option value="male">{t("profile.gender_male")}</option>
              <option value="female">{t("profile.gender_female")}</option>
              <option value="other">{t("profile.gender_other")}</option>
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {isSubmitting ? t("profile.saving") : t("profile.save_changes")}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileForm;
