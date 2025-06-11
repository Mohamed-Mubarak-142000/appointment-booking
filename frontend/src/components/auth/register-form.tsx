// components/auth/patient-register-form.tsx
import {
  Box,
  Button,
  DialogActions,
  Stack,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslate } from "../../locales";

import { usePatientRegister } from "../../apis/use-case/patient/auth";

import { FormHeader } from "./header-form";
import {
  patientRegisterSchema,
  type PatientRegisterFormData,
} from "../../schemas/patient-schema";
import type { AuthTab } from "../../types";

interface PatientRegisterFormProps {
  onClose: () => void;
  setCurrentTab: (tab: AuthTab) => void;
}

export const PatientRegisterForm = ({
  onClose,
  setCurrentTab,
}: PatientRegisterFormProps) => {
  const { t } = useTranslate("common");
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
      onSuccess: () => setCurrentTab("login"),
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
      <Stack
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <FormHeader title={t("register_form.register_description")} />

        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t("register_form.name_placeholder")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t("register_form.email_placeholder")}
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
              placeholder={t("register_form.password_placeholder")}
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t("register_form.confirm_password_placeholder")}
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
              placeholder={t("register_form.phone_placeholder")}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t("register_form.age_placeholder")}
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
              placeholder={t("register_form.gender_placeholder")}
              select
              SelectProps={{ native: true }}
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              <option value=""></option>
              <option value="male">{t("register_form.gender_male")}</option>
              <option value="female">{t("register_form.gender_female")}</option>
              <option value="other">{t("register_form.gender_other")}</option>
            </TextField>
          </Grid>
        </Grid>
      </Stack>

      <DialogActions sx={{ px: 0, py: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
          {t("register_form.cancel_button")}
        </Button>

        <Button
          sx={{
            width: 200,
            borderRadius: 0.5,
            backgroundColor: "primary.darker",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={20} sx={{ color: "primary.darker" }} />
          ) : (
            t("register_form.register_button")
          )}
        </Button>
      </DialogActions>
    </Box>
  );
};
