// src/layouts/AuthLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../../context/auth-context";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
