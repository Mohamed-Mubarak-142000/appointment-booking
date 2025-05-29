import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  DialogActions,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { assets } from "../../assets/assets_frontend/assets";
import { registerSchema, type RegisterFormData } from "../../schemas/auth";
import { useTranslate } from "../../locales";

const RegisterForm = ({ onclose }: { onclose: () => void }) => {
  const { t } = useTranslate("");

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegisterSubmit(onRegisterSubmit)}
      sx={{
        mt: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
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
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
          }}
          gutterBottom
        >
          welcome to our tabeebak app
        </Typography>

        {/* Full Name Field */}
        <TextField
          fullWidth
          label="Full Name"
          {...registerRegister("fullName")}
          error={!!registerErrors.fullName}
          helperText={registerErrors.fullName?.message}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...registerRegister("email")}
          error={!!registerErrors.email}
          helperText={registerErrors.email?.message}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...registerRegister("password")}
          error={!!registerErrors.password}
          helperText={registerErrors.password?.message}
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          {...registerRegister("confirmPassword")}
          error={!!registerErrors.confirmPassword}
          helperText={registerErrors.confirmPassword?.message}
        />
      </Stack>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onclose}>{t("common.cancel")}</Button>
        <Button variant="contained" color="primary" type="submit">
          {t("navbar.register")}
        </Button>
      </DialogActions>
    </Box>
  );
};

export default RegisterForm;
