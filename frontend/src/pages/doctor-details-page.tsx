import { Box, CircularProgress, Grid } from "@mui/material";
import { assets } from "../assets/assets_frontend/assets";
import DoctorInfo from "../components/doctor-details/doctor-info";
import { useParams } from "react-router-dom";
import { useGetDoctor } from "../apis/use-case/doctor/get-doctor";
import { EmptyStateContent } from "../components/empty-state-content";
import AvailableSlotsDoctor from "../components/doctor-details/available-slots";
import ShowVideoAndAppointmentBooking from "../components/doctor-details/show-video-appointment-booking";
import { PatientsComments } from "../components/doctor-details/comments";

const DoctorDetailsPage = () => {
  const { id } = useParams();

  const { data, isPending } = useGetDoctor(id || "", {
    enabled: !!id,
  });

  console.log("data", data);

  if (!id) {
    return (
      <EmptyStateContent
        title="Doctor Not Found"
        subtitle="The doctor you are looking for does not exist or has been removed."
      />
    );
  }

  if (isPending) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={30} sx={{ color: "primary.darker" }} />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            component={"img"}
            src={assets.doc1}
            alt="Doctor"
            sx={{ width: "100%", height: "auto", borderRadius: 1 }}
          />
        </Grid>

        <DoctorInfo>
          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>Doctor Name:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.name}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>Specialization:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.specialty}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>Experience:</DoctorInfo.Label>
              <DoctorInfo.Value>{`${data?.data?.experience} years`}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>Contact:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.phone}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>Location:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.address}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>governorate:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.governorate}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Row>
            <DoctorInfo.Item>
              <DoctorInfo.Label>Age:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.age}</DoctorInfo.Value>
            </DoctorInfo.Item>

            <DoctorInfo.Item>
              <DoctorInfo.Label>Joined At:</DoctorInfo.Label>
              <DoctorInfo.Value>{data?.data?.createdAt}</DoctorInfo.Value>
            </DoctorInfo.Item>
          </DoctorInfo.Row>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Biography:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {data?.data?.bio || "No biography available."}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo>
      </Grid>

      <AvailableSlotsDoctor
        data={data?.data?.availableSlots || []}
        isPending={isPending}
      />

      {data?.data && <ShowVideoAndAppointmentBooking doctor={data.data} />}

      <PatientsComments doctorId={id} />
    </>
  );
};

export default DoctorDetailsPage;
