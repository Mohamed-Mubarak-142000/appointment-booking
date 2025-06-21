import { Box, Typography, Button } from "@mui/material";
import { useDoctorAuth } from "../../context/auth-context";
import { Link, Navigate } from "react-router-dom";
import { DoctorRegisterForm } from "../../components/auth/doctor/doctor-register";
import { useTranslate } from "../../locales";
import { AnimatedTitle } from "../../components/animate-title";

const DoctorRegister = () => {
  const { isAuthenticated } = useDoctorAuth();
  const { t } = useTranslate("common");
  if (isAuthenticated()) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "start",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
          }}
        >
          {t("register_form.doctor_register.title")}{" "}
        </Typography>

        <AnimatedTitle
          sx={{
            color: "primary.darker",
            fontSize: { xs: ".5rem", md: "1rem", lg: "1.5rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
            lineHeight: 1.2,
          }}
          text={t("register_form.doctor_register.description")}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <DoctorRegisterForm />

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("register_form.doctor_register.already_have_account")}
          </Typography>
          <Button variant="outlined" component={Link} to="/doctor/login">
            {t("register_form.doctor_register.login_as_doctor")}{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default DoctorRegister;
