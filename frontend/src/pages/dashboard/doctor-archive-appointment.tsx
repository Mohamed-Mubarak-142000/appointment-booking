import { useNavigate, useParams } from "react-router-dom";
import { useGetArchivedAppointmentDetails } from "../../apis/use-case/patient/appointments";
import TitleSection from "../../components/title-section";
import DoctorInfo from "../../components/doctor-details/doctor-info";
import { Box } from "@mui/material";
import { formatDateTimeByLang, useTranslate } from "../../locales";

const ArchiveAppointmentDetails = () => {
  const { t } = useTranslate("overview");
  const { archiveId } = useParams();
  const { data } = useGetArchivedAppointmentDetails(archiveId || "");
  const navigate = useNavigate();

  const handlePatientDetails = () => {
    navigate(`/doctor/patient-details/${data?.data?.patient}`);
  };

  return (
    <>
      <TitleSection
        title={t("archiveDetails.title")}
        sx={{ mb: 4 }}
        subTitle={t("archiveDetails.subTitle")}
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: ".9rem", md: "1rem", lg: "2rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
        }}
      />
      <DoctorInfo>
        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.doctorName")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.doctorName}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.status")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.day}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.completedAt")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.completedAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.createdAt")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.endTime")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.endDate")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.reason")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.reason}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.patientName")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>
              <Box
                sx={{
                  cursor: "pointer",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                  width: "fit-content",
                  px: 2,
                  borderRadius: 0.5,
                }}
                onClick={handlePatientDetails}
              >
                {data?.data?.patientName}
              </Box>
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.type")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.type}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.patientPhone")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.patientPhone}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("archiveDetails.price")}:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.price}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.startTime")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.startTime}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.lastUpdated")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.updatedAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("archiveDetails.appointmentId")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?._id}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>
      </DoctorInfo>
    </>
  );
};

export default ArchiveAppointmentDetails;
