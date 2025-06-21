import { Box, CircularProgress } from "@mui/material";
import { useGetDoctorProfile } from "../apis/use-case/doctor/profile";
import { useEffect } from "react";
import DoctorMapView from "./overview/charts/doctor-map-view";
import { ErrorStateContent } from "./error-state-content";

const ShowLocation = () => {
  const { data: doctor, isLoading, isError } = useGetDoctorProfile();

  useEffect(() => {
    if (doctor?.location) {
      console.log("Doctor location data:", doctor.location);
    }
  }, [doctor]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <ErrorStateContent
        icon="material-symbols:error-outline-rounded"
        title="خطأ"
        subtitle="حدث خطأ أثناء تحميل الموقع"
      />
    );
  }

  const lat = doctor?.location?.lat;
  const lng = doctor?.location?.lng;

  if (typeof lat !== "number" || typeof lng !== "number") {
    return (
      <ErrorStateContent
        icon="material-symbols:error-outline-rounded"
        title="خطأ"
        subtitle="حدث خطأ أثناء تحميل الموقع"
      />
    );
  }

  const markerLocation = { lat, lng };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 1,
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <DoctorMapView markerLocation={markerLocation} />
    </Box>
  );
};

export default ShowLocation;
