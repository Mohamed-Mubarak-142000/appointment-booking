import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslate } from "../../locales";
import { AnimatedTitle } from "../../components/animate-title";
import ResetPasswordFormDoctor from "../../components/auth/doctor/reset-password-form";

const ResetPasswordDoctor = () => {
  const { t } = useTranslate("common");
  const location = useLocation();

  if (!location.state?.email) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("register_form.reset_form.reset_title")}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/doctor/forget-password"
        >
          {t("reset_password_form.go_to_forget_password")}
        </Button>
      </Box>
    );
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
          {t("register_form.reset_form.reset_title")}
        </Typography>

        <AnimatedTitle
          sx={{
            color: "primary.darker",
            fontSize: { xs: ".5rem", md: "1rem", lg: "1.5rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
            lineHeight: 1.2,
          }}
          text={t("register_form.reset_form.reset_description")}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <ResetPasswordFormDoctor />

        <Box sx={{ mt: 3, textAlign: "center" }}>
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

export default ResetPasswordDoctor;
