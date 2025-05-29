// src/layouts/PrivateLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { Stack } from "@mui/material";
import { useAuth } from "../../context/auth-context";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Stack
        sx={{
          minHeight: "100vh",
          mt: 10,
          maxWidth: "xl",
          mx: "auto",
        }}
      >
        <Outlet />
      </Stack>
      <Footer />
    </>
  );
};

export default PrivateLayout;
