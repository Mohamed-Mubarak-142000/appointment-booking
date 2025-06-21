import {
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoctorRegister } from "../../../apis/use-case/doctor/auth";
import { useTranslate } from "../../../locales";
import { GovernorateSelector } from "../../select-governoment";
import { SpecialtySelector } from "../../select-specialiste";
import {
  doctorRegisterSchema,
  type DoctorRegisterFormData,
} from "../../../schemas/doctor-schema";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapSelector from "../../map/map-selector";

export const DoctorRegisterForm = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const { mutate: registerMutation, isPending } = useDoctorRegister();
  const { t } = useTranslate("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<DoctorRegisterFormData>({
    resolver: zodResolver(doctorRegisterSchema),
  });

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setValue("address", location.address);
    setValue("location", { lat: location.lat, lng: location.lng });
    setSelectedLocation(location);
    setShowMap(false);
  };

  const onSubmit = (data: DoctorRegisterFormData) => {
    registerMutation(data);
  };

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
      <Grid container spacing={1}>
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
            error={!!errors.specialty}
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
            error={!!errors.address}
            helperText={errors.address?.message}
            value={selectedLocation?.address || ""}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowMap(true)}>
                    <LocationOnIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            error={!!errors.experience}
            helperText={errors.experience?.message}
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

      <MapSelector
        open={showMap}
        onSelect={handleLocationSelect}
        onClose={() => setShowMap(false)}
        initialLocation={selectedLocation || undefined}
      />

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
        {isPending ? (
          <CircularProgress size={24} />
        ) : (
          t("register_form.register_button")
        )}
      </Button>
    </Box>
  );
};
