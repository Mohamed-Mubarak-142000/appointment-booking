import { Box } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import DoctorInfo from "../doctor-details/doctor-info";
import TitleSection from "../title-section";
import { formatDateTimeByLang } from "../../locales";

interface PatientDetailsProps {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  createdAt: string;
  photo?: string;
}
const PatientDetails = ({ patient }: { patient: PatientDetailsProps }) => {
  return (
    <>
      <TitleSection
        title="Patient Details"
        subTitle="Comprehensive overview of patient information"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: 3,
        }}
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: ".5rem", md: ".9rem", lg: "1.2rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
        }}
      />
      <Box
        component={"img"}
        src={assets.doc1}
        alt="Doctor"
        sx={{
          mx: "auto",
          width: 300,
          height: 300,
          borderRadius: 0.5,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      />
      <DoctorInfo
        slotProps={{
          root: {
            lg: 12,
          },
        }}
      >
        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Doctor Name:</DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.name}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Email:</DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.email}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Phone:</DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.phone}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Age:</DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.age}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Gender:</DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.gender}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Created At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(patient?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>
      </DoctorInfo>
    </>
  );
};

export default PatientDetails;
