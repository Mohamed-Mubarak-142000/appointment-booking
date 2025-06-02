// components/auth/patient-login-form.tsx
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslate } from "../../locales";
import { usePatientLogin } from "../../apis/use-case/patient/auth";
import { patientLoginSchema, type PatientLoginFormData } from "./schema";
import { FormHeader } from "./header-form";

interface PatientLoginFormProps {
  onClose: () => void;
}

export const PatientLoginForm = ({ onClose }: PatientLoginFormProps) => {
  const { t } = useTranslate("common");
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
        <FormHeader title={t("login_form.login_description")} />

        <TextField
          fullWidth
          placeholder={t("login_form.email_placeholder")}
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="username"
        />

        <TextField
          fullWidth
          placeholder={t("login_form.password_placeholder")}
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="current-password"
        />
      </Stack>

      <DialogActions sx={{ px: 0, py: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
          {t("login_form.cancel_button")}
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
            t("login_form.login_button")
          )}
        </Button>
      </DialogActions>
    </Box>
  );
};
