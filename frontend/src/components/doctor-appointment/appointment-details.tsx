import type { Appointment } from "../../apis/use-case/patient/appointments";
import { formatDateTimeByLang } from "../../locales";
import DoctorInfo from "../doctor-details/doctor-info";
import TitleSection from "../title-section";

const AppointmentBookingDetails = ({
  data,
}: {
  data: Omit<Appointment, "patient">;
}) => {
  return (
    <>
      <TitleSection
        title="Appointment Details"
        subTitle="Check your appointment details"
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
            <DoctorInfo.Value>{data?.doctor}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Status Appointment:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.status}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Created At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Day Booking:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.day}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>End Time:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>ID Appointment:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.id}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Price Appointment:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.price}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Reason Booking:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.reason}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>ID Slot:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.slot}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>Type Appointment:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.type}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>Start Time:</DoctorInfo.Label>
            <DoctorInfo.Value>{data?.startTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label> Last Updated At:</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.updatedAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>
      </DoctorInfo>
    </>
  );
};

export default AppointmentBookingDetails;
