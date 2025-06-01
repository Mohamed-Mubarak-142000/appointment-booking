// components/auth/patient-login-form.tsx
import {
  Box,
  Button,
  DialogActions,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslate } from "../../locales";
import { usePatientLogin } from "../../apis/use-case/patient/auth";
import { patientLoginSchema, type PatientLoginFormData } from "./schema";

interface PatientLoginFormProps {
  onClose: () => void;
}

export const PatientLoginForm = ({ onClose }: PatientLoginFormProps) => {
  const { t } = useTranslate();
  const { mutate: login, isPending } = usePatientLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientLoginFormData>({
    resolver: zodResolver(patientLoginSchema),
  });

  const onSubmit = (data: PatientLoginFormData) => {
    login(data, {
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
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <Box
          component={"img"}
          src={assets.logo}
          alt={"logo"}
          sx={{
            width: 100,
            height: "auto",
            objectFit: "contain",
          }}
        />
        <Typography variant="h6" textAlign="center" color="text.secondary">
          {t("patient.login.welcome_message")}
        </Typography>

        <TextField
          fullWidth
          label={t("patient.login.email_label")}
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="username"
        />

        <TextField
          fullWidth
          label={t("patient.login.password_label")}
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="current-password"
        />
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
          {isPending ? t("common.loading") : t("patient.login.submit_button")}
        </Button>
      </DialogActions>
    </Box>
  );
};
