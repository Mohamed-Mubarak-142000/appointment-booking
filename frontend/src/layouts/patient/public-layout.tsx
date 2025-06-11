// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { Stack } from "@mui/material";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Stack
        spacing={{ xs: 5, md: 10 }}
        sx={{
          minHeight: "100vh",
          py: { xs: 5, md: 10 },
          px: { xs: 2, md: 5 },
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

export default PublicLayout;
