// components/auth/patient-register-form.tsx
import {
  Box,
  Button,
  DialogActions,
  Stack,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslate } from "../../locales";

import { assets } from "../../assets/assets_frontend/assets";
import { usePatientRegister } from "../../apis/use-case/patient/auth";
import { patientRegisterSchema, type PatientRegisterFormData } from "./schema";

interface PatientRegisterFormProps {
  onClose: () => void;
}

export const PatientRegisterForm = ({ onClose }: PatientRegisterFormProps) => {
  const { t } = useTranslate();
  const { mutate: registerMutation, isPending } = usePatientRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientRegisterFormData>({
    resolver: zodResolver(patientRegisterSchema),
  });

  const onSubmit = (data: PatientRegisterFormData) => {
    registerMutation(data, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Stack spacing={3}>
        <Box
          component={"img"}
          src={assets.logo}
          alt={"logo"}
          sx={{
            width: 100,
            height: "auto",
            mx: "auto",
            display: "block",
          }}
        />
        <Typography variant="h6" textAlign="center">
          {t("patient.register.title")}
        </Typography>

        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.name_label")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.email_label")}
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {/* Password Fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.password_label")}
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.confirm_password_label")}
              type="password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.phone_label")}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t("patient.register.age_label")}
              type="number"
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>

          {/* Gender Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("patient.register.gender_label")}
              select
              SelectProps={{ native: true }}
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <option value=""></option>
              <option value="male">{t("patient.register.gender_male")}</option>
              <option value="female">
                {t("patient.register.gender_female")}
              </option>
              <option value="other">
                {t("patient.register.gender_other")}
              </option>
            </TextField>
          </Grid>
        </Grid>
      </Stack>

      <DialogActions sx={{ px: 0, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
          {t("common.cancel")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          fullWidth
          size="large"
        >
          {isPending
            ? t("common.loading")
            : t("patient.register.submit_button")}
        </Button>
      </DialogActions>
    </Box>
  );
};
