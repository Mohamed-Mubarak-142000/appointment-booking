import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoctorLogin } from "../../../apis/use-case/doctor/auth";
import { doctorLoginSchema, type DoctorLoginFormData } from "./schema";

export const DoctorLoginForm = () => {
  const { mutate: login, isPending } = useDoctorLogin();

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />

      <TextField
        fullWidth
        label="Password"
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
        sx={{ mt: 3 }}
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        <a href="/doctor/forgot-password">Forgot password?</a>
      </Typography>
    </Box>
  );
};
