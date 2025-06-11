import { TextField, Grid, MenuItem, InputAdornment } from "@mui/material";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../apis/use-case/types";

interface FormFieldProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
}

export const BasicInfoFields = ({ register, errors }: FormFieldProps) => (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </Grid>
  </>
);

export const PasswordFields = ({ register, errors }: FormFieldProps) => (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
    </Grid>
  </>
);

export const ContactInfoFields = ({ register, errors }: FormFieldProps) => (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        InputProps={{
          startAdornment: <InputAdornment position="start">+20</InputAdornment>,
        }}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Age"
        type="number"
        {...register("age", { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age?.message}
        InputProps={{
          inputProps: { min: 1, max: 120 },
        }}
      />
    </Grid>
  </>
);

export const GenderField = ({ register, errors }: FormFieldProps) => (
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      select
      label="Gender"
      defaultValue="male"
      {...register("gender")}
      error={!!errors.gender}
      helperText={errors.gender?.message}
    >
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
    </TextField>
  </Grid>
);

export const DoctorFields = ({ register, errors }: FormFieldProps) => (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Specialty"
        {...register("specialty")}
        error={!!errors.specialty}
        helperText={errors.specialty?.message}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Governorate"
        {...register("governorate")}
        error={!!errors.governorate}
        helperText={errors.governorate?.message}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Address"
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Experience (years)"
        type="number"
        {...register("experience")}
        error={!!errors.experience}
        helperText={errors.experience?.message}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Bio"
        multiline
        rows={3}
        {...register("bio")}
        error={!!errors.bio}
        helperText={errors.bio?.message}
      />
    </Grid>
  </>
);
