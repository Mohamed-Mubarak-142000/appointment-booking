import { Box, Button, Typography } from "@mui/material";
import BookingAppointmentImage from "./booking-appointment-img";
import { useTranslate } from "../../locales";

const BookingAppointment = () => {
  const { t } = useTranslate("home");
  return (
    <Box
      sx={{
        maxHeight: 500,
        backgroundColor: "primary.darker",
        width: "100%",
        mx: "auto",
        mt: 5,
        p: 2,
        borderRadius: 2,
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        },
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          gap: { xs: 1, md: 2, lg: 3 },
          flexDirection: "column",
          width: "100%",
          height: "100%",
          p: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "common.white",
            fontSize: { xs: "1.5rem", md: "2rem", lg: "4rem" },
            fontWeight: (theme) => theme.typography.fontWeightBold,
            lineHeight: 1.2,
          }}
        >
          {t("booking_appointment.title")}
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            width: "fit-content",
            fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            backgroundColor: "primary.main",
            color: "common.white",
            borderRadius: 5,
            textTransform: "capitalize",
            p: 2,
            "&:hover": {
              backgroundColor: "primary.dark",
              color: "common.white",
              boxShadow: "none",
            },
          }}
        >
          {t("booking_appointment.contact_us")}
        </Button>
      </Box>
      <BookingAppointmentImage />
    </Box>
  );
};

export default BookingAppointment;
