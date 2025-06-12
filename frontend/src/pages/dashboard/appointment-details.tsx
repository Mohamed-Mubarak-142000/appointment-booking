import { useParams } from "react-router-dom";
import { useGetAppointmentDetails } from "../../apis/use-case/patient/appointments";
import PatientDetails from "../../components/doctor-appointment/patient-details";
import { Divider, Grid } from "@mui/material";
import AppointmentBookingDetails from "../../components/doctor-appointment/appointment-details";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const { data } = useGetAppointmentDetails(appointmentId || "");

  console.log("data", data);
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {data?.data?.patient && (
        <>
          <Grid item xs={12} md={5}>
            <PatientDetails patient={data.data.patient} />
          </Grid>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ mx: 2, backgroundColor: "primary.light" }}
          />

          <Grid item xs={12} md={6}>
            <AppointmentBookingDetails data={data?.data} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AppointmentDetails;
