import { Box } from "@mui/material";
import { videos } from "../../assets/videos";
import AppointmentBooking from "./appointment-booking";
import type { DoctorData } from "../../apis/use-case/types";
import ShowVideo from "../show-video";

const ShowVideoAndAppointmentBooking = ({ doctor }: { doctor: DoctorData }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        },
        gap: 3,
      }}
    >
      <ShowVideo video={videos.intro} />
      <AppointmentBooking doctor={doctor} />
    </Box>
  );
};

export default ShowVideoAndAppointmentBooking;
