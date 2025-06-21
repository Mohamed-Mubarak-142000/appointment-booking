import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { useResetDoctorPasswordWithOTP } from "../../../apis/use-case/doctor/auth";
import { useLocation } from "react-router-dom";
import { useTranslate } from "../../../locales";

import ButtonAction from "../../button-action";
import { resetPasswordSchema, type ResetPasswordFormData } from "./schema";

function ResetPasswordFormDoctor() {
  const { t } = useTranslate("common");
  const location = useLocation();
  const email = location.state?.email || "";
  console.log("email", email);
  const { mutate, isPending } = useResetDoctorPasswordWithOTP();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    mutate(data);
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
        placeholder={t("register_form.reset_form.otp_placeholder")}
        margin="normal"
        {...register("otp")}
        error={!!errors.otp}
        helperText={errors.otp?.message}
      />

      <TextField
        fullWidth
        placeholder={t("register_form.reset_form.new_password_placeholder")}
        type="password"
        margin="normal"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        autoComplete="new-password"
      />

      <input type="hidden" {...register("email")} />

      <ButtonAction
        slotProps={{
          button: {
            fullWidth: true,
            variant: "contained",
            size: "large",
            sx: {
              mt: 3,
              backgroundColor: (theme) => theme.palette.primary.darker,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            },
          },
        }}
        type="submit"
        isLoading={isPending}
        title={t("register_form.reset_form.reset_password_button")}
      />
    </Box>
  );
}

export default ResetPasswordFormDoctor;
