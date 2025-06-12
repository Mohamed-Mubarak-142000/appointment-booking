import { Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPatientDetails } from "../../apis/use-case/patient/get-patient";
import { assets } from "../../assets/assets_frontend/assets";
import DoctorInfo from "../../components/doctor-details/doctor-info";
import TitleSection from "../../components/title-section";
import { formatDateTimeByLang } from "../../locales";

const PatientDetails = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientDetails(patientId || "");

  if (!data) return <div>Loading...</div>;

  return (
    <Grid container spacing={3}>
      <TitleSection
        sx={{ my: 3 }}
        title="Patient Details"
        subTitle="Comprehensive overview of patient information"
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: ".6rem", md: "1rem", lg: "1.3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
        }}
      />

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
            <DoctorInfo.Label>Full Name:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.name}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Email:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.email}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Age:</DoctorInfo.Label>
            <DoctorInfo.Value>{`${data?.data?.age} years`}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Phone:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.phone}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Gender:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.gender}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Created At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>
      </DoctorInfo>
    </Grid>
  );
};

export default PatientDetails;
