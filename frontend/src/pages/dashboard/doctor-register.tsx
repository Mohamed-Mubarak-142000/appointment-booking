import { Box, Container, Typography, Button } from "@mui/material";
import { useDoctorAuth } from "../../context/auth-context";
import { Navigate } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets";
import { DoctorRegisterForm } from "../../components/auth/doctor/doctor-register";

const DoctorRegister = () => {
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
          Doctor Registration
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Create your doctor account
        </Typography>

        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <DoctorRegisterForm />

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Already have an account?
            </Typography>
            <Button variant="outlined" href="/doctor/login" fullWidth>
              Login as Doctor
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default DoctorRegister;
