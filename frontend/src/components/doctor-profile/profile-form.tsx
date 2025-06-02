import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import { useTranslate } from "../../locales";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DoctorData } from "../../apis/use-case/types";
import { useEffect } from "react";
import {
  doctorUpdateSchema,
  type DoctorUpdateFormData,
} from "../auth/doctor/schema";
import { useUpdateDoctorProfile } from "../../apis/use-case/doctor/profile";

const ProfileForm = ({ user }: { user: DoctorData }) => {
  const { t } = useTranslate("profile");
  const { mutate: updateDoctor, isPending } = useUpdateDoctorProfile();

  const onSubmit = (data: DoctorUpdateFormData) => {
    if (!user?._id) return;
    updateDoctor({ _id: user._id, ...data });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    // watch,
  } = useForm<DoctorUpdateFormData>({
    resolver: zodResolver(doctorUpdateSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      age: user.age || undefined,
      specialty: user.specialty || "",
      governorate: user.governorate || "",
      address: user.address || "",
      bio: user.bio || "",
      experience: user.experience || 0,
      photo: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || undefined,
        specialty: user.specialty || "",
        governorate: user.governorate || "",
        address: user.address || "",
        bio: user.bio || "",
        experience: user.experience || 0,
        photo: undefined, // Reset photo if you implement upload
      });
    }
  }, [user, reset]);

  // Watch for photo changes if you implement upload

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.name")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.email")}
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
              label={t("doctor_profile.phone")}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.age")}
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={!!errors.age}
              helperText={errors.age?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1, max: 120 } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.specialty")}
              {...register("specialty")}
              error={!!errors.specialty}
              helperText={errors.specialty?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("doctor_profile.governorate")}
              {...register("governorate")}
              error={!!errors.governorate}
              helperText={errors.governorate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.address")}
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.experience")}
              type="number"
              {...register("experience", { valueAsNumber: true })}
              error={!!errors.experience}
              helperText={errors.experience?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={t("doctor_profile.gender")}
              select
              SelectProps={{ native: true }}
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              InputLabelProps={{ shrink: true }}
            >
              <option value=""></option>
              <option value="male">{t("doctor_profile.gender_male")}</option>
              <option value="female">
                {t("doctor_profile.gender_female")}
              </option>
              <option value="other">{t("doctor_profile.gender_other")}</option>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("doctor_profile.bio")}
              multiline
              rows={3}
              {...register("bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || isSubmitting || isPending}
            sx={{ minWidth: 300, p: 1.5 }}
          >
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "primary.darker" }} />
            ) : (
              t("doctor_profile.save_changes")
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileForm;
