import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { useRequestDoctorPasswordReset } from "../../../apis/use-case/doctor/auth";
import { useTranslate } from "../../../locales";

import ButtonAction from "../../button-action";
import { forgetPasswordSchema, type ForgetPasswordFormData } from "./schema";

function ForgetPasswordDoctorForm() {
  const { t } = useTranslate("common");
  const { mutate, isPending } = useRequestDoctorPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (data: ForgetPasswordFormData) => {
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
        placeholder={t("register_form.reset_form.email_placeholder")}
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />

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
        title={t("register_form.reset_form.get_code")}
      />
    </Box>
  );
}

export default ForgetPasswordDoctorForm;
