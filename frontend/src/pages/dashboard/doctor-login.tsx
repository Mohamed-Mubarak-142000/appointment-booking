import { Box, Button, Typography } from "@mui/material";
import { useDoctorAuth } from "../../context/auth-context";
import { Link, Navigate } from "react-router-dom";
import { DoctorLoginForm } from "../../components/auth/doctor/doctor-form";
import { useTranslate } from "../../locales";
import { AnimatedTitle } from "../../components/animate-title";

const DoctorLogin = () => {
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
        width: { xs: "100%" },
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "start",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
          }}
        >
          {t("login_form.login_doctor.title")}{" "}
        </Typography>

        <AnimatedTitle
          sx={{
            color: "primary.darker",
            fontSize: { xs: ".5rem", md: "1rem", lg: "1.5rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
            lineHeight: 1.2,
          }}
          text={t("login_form.login_doctor.description")}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <DoctorLoginForm />

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("login_form.login_doctor.don't_have_account")}
          </Typography>
          <Button variant="outlined" component={Link} to="/doctor/register">
            {t("login_form.login_doctor.register_as_doctor")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default DoctorLogin;
