import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoctorLogin } from "../../../apis/use-case/doctor/auth";
import { Link } from "react-router-dom";
import { useTranslate } from "../../../locales";
import {
  doctorLoginSchema,
  type DoctorLoginFormData,
} from "../../../schemas/doctor-schema";

export const DoctorLoginForm = () => {
  const { mutate: login, isPending } = useDoctorLogin();
  const { t } = useTranslate("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorLoginFormData>({
    resolver: zodResolver(doctorLoginSchema),
  });

  const onSubmit = (data: DoctorLoginFormData) => {
    login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        padding: 3,
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder={t("login_form.login_doctor.email_placeholder")}
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />

      <TextField
        fullWidth
        placeholder={t("login_form.login_doctor.password_placeholder")}
        type="password"
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          backgroundColor: (theme) => theme.palette.primary.darker,
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
        disabled={isPending}
      >
        {isPending ? (
          <CircularProgress size={24} />
        ) : (
          t("login_form.login_doctor.login_button")
        )}
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        <Link to="/doctor/forget-password">
          {t("login_form.login_doctor.forgot_password")}
        </Link>
      </Typography>
    </Box>
  );
};
