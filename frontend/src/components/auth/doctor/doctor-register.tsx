import { Box, TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorRegisterSchema, type DoctorRegisterFormData } from "./schema";
import { useDoctorRegister } from "../../../apis/use-case/doctor/auth";
import { useTranslate } from "../../../locales";
import { GovernorateSelector } from "../../select-governoment";
import { SpecialtySelector } from "../../select-specialiste";

export const DoctorRegisterForm = () => {
  const { mutate: registerMutation, isPending } = useDoctorRegister();
  const { t } = useTranslate("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<DoctorRegisterFormData>({
    resolver: zodResolver(doctorRegisterSchema),
  });

  const onSubmit = (data: DoctorRegisterFormData) => {
    registerMutation(data);
  };

  console.log("errors", errors);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t("register_form.doctor_register.name_placeholder")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t("register_form.doctor_register.email_placeholder")}
            {...register("email")}
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t(
              "register_form.doctor_register.password_placeholder"
            )}
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="password"
            placeholder={t(
              "register_form.doctor_register.confirm_password_placeholder"
            )}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SpecialtySelector
            name="specialty"
            control={control}
            error={!!errors}
            helperText={errors.specialty?.message}
            placeholder={t(
              "register_form.doctor_register.specialty_placeholder"
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t("register_form.doctor_register.phone_placeholder")}
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t("register_form.doctor_register.address_placeholder")}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GovernorateSelector
            control={control}
            name="governorate"
            error={!!errors.governorate}
            helperText={errors.governorate?.message}
            placeholder={t(
              "register_form.doctor_register.government_placeholder"
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            placeholder={t("register_form.doctor_register.age_placeholder")}
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            placeholder={t(
              "register_form.doctor_register.experience_placeholder"
            )}
            {...register("experience", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder={t("register_form.doctor_register.bio_placeholder")}
            {...register("bio")}
            multiline
            rows={4}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{
          mt: 8,
          backgroundColor: (theme) => theme.palette.primary.darker,
          "&:hover": { backgroundColor: (theme) => theme.palette.primary.dark },
        }}
        disabled={isPending}
      >
        {isPending ? <CircularProgress size={24} /> : "Register"}
      </Button>
    </Box>
  );
};
