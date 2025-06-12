import { useNavigate, useParams } from "react-router-dom";
import { useGetArchivedAppointmentDetails } from "../../apis/use-case/patient/appointments";
import TitleSection from "../../components/title-section";
import DoctorInfo from "../../components/doctor-details/doctor-info";
import { Box } from "@mui/material";
import { formatDateTimeByLang } from "../../locales";

const ArchiveAppointmentDetails = () => {
  const { archiveId } = useParams();
  const { data } = useGetArchivedAppointmentDetails(archiveId || "");
  const navigate = useNavigate();

  const handlePatientDetails = () => {
    navigate(`/doctor/patient-details/${data?.data?.patient}`);
  };
  console.log("data", data?.data?.patient);
  return (
    <>
      <TitleSection
        title="Archive Appointment"
        sx={{ mb: 4 }}
        subTitle="Archive Appointment Details Page"
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
            <DoctorInfo.Label>Doctor Name:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.doctorName}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Status Appointment:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.day}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Completed At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.completedAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Created At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>End Time:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>End Date:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Reason:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.reason}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Patient Name:</DoctorInfo.Label>
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
            <DoctorInfo.Label>Type:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.type}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Patient Phone:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.patientPhone}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Price:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.price}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Start Time:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?.startTime}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Last Updated:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.data?.updatedAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Appointment ID:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.data?._id}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>
      </DoctorInfo>
    </>
  );
};

export default ArchiveAppointmentDetails;
