import { Box, CircularProgress, Grid } from "@mui/material";
import { assets } from "../assets/assets_frontend/assets";
import DoctorInfo from "../components/doctor-details/doctor-info";
import { useParams } from "react-router-dom";
import { useGetDoctor } from "../apis/use-case/doctor/get-doctor";
import { EmptyStateContent } from "../components/empty-state-content";
import AvailableSlotsDoctor from "../components/doctor-details/available-slots";
import ShowVideoAndAppointmentBooking from "../components/doctor-details/show-video-appointment-booking";
import { PatientsComments } from "../components/doctor-details/comments";
import TitleSection from "../components/title-section";
import { useGetAvailableSlotsForPatient } from "../apis/use-case/doctor/get-available-slots";

const DoctorDetailsPage = () => {
  const { id } = useParams();

  const { data, isPending } = useGetDoctor(id || "", {
    enabled: !!id,
  });

  const { data: availableSlots, isPending: isPendingAvailableSlots } =
    useGetAvailableSlotsForPatient({
      id: id || "",
      showAll: false,
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

      <TitleSection
        title="Available Slots"
        subTitle="Select a slot to book an appointment with the doctor for your convenience."
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
          subTitle: {
            variant: "body1",
            sx: {
              fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />

      <AvailableSlotsDoctor
        data={availableSlots?.slots || []}
        isPending={isPendingAvailableSlots}
      />

      <ShowVideoAndAppointmentBooking doctorId={id} data={availableSlots!} />

      <PatientsComments doctorId={id} />
    </>
  );
};

export default DoctorDetailsPage;
