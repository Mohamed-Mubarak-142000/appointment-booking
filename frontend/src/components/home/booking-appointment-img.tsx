import { Box } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";

const BookingAppointmentImage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
        width: {
          xs: 300,
          md: 400,
          lg: "100%",
        },
        height: {
          xs: 300,
          md: 400,
          lg: "100%",
        },
      }}
    >
      <img src={assets.appointment_img} alt="Hero Image" />
    </Box>
  );
};

export default BookingAppointmentImage;
