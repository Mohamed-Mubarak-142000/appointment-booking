import { Box } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import DoctorInfo from "../doctor-details/doctor-info";
import TitleSection from "../title-section";
import { formatDateTimeByLang, useTranslate } from "../../locales";

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
  const { t } = useTranslate("overview");

  return (
    <>
      <TitleSection
        title={t("appointments_page.patientDetails.title")}
        subTitle={t("appointments_page.patientDetails.subTitle")}
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
        src={patient?.photo || assets.doc1}
        alt={t("appointments_page.patientDetails.imageAlt")}
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
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.name")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.name}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.email")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.email}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.phone")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.phone}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.age")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.age}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.gender")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{patient?.gender}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.patientDetails.createdAt")}:
            </DoctorInfo.Label>
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
