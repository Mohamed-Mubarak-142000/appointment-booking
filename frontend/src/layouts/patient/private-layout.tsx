// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { Stack } from "@mui/material";
import { useGetPatientProfile } from "../../apis/use-case/patient/profile";

const PrivateLayout = () => {
  const { data } = useGetPatientProfile();

  if (!data) {
    return null; // or a loading spinner
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
