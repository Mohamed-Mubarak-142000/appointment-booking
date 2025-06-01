import { Box, Container, Typography, Button } from "@mui/material";
import { useDoctorAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets";
import { DoctorLoginForm } from "../../components/auth/doctor/doctor-form";

const DoctorLogin = () => {
  const { isAuthenticated } = useDoctorAuth();

  if (isAuthenticated()) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Box
          component="img"
          src={assets.logo}
          alt="Logo"
          sx={{ width: 150, mb: 4 }}
        />

        <Typography variant="h4" component="h1" gutterBottom>
          Doctor Login
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Access your doctor dashboard
        </Typography>

        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <DoctorLoginForm />

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?
            </Typography>
            <Button variant="outlined" href="/doctor/register" fullWidth>
              Register as Doctor
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default DoctorLogin;
