import type { Appointment } from "../../apis/use-case/patient/appointments";
import { formatDateTimeByLang, useTranslate } from "../../locales";
import DoctorInfo from "../doctor-details/doctor-info";
import TitleSection from "../title-section";

const AppointmentBookingDetails = ({
  data,
}: {
  data: Omit<Appointment, "patient">;
}) => {
  const { t } = useTranslate("overview");

  return (
    <>
      <TitleSection
        title={t("appointments_page.appointmentDetails.title")}
        subTitle={t("appointments_page.appointmentDetails.subTitle")}
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
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.doctorName")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.doctor}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.status")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.status}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.createdAt")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data?.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.dayBooking")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.day}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.endTime")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.endTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.id")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.id}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.price")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.price}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.reason")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.reason}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.slotId")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.slot}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.type")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.type}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.startTime")}:
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data?.startTime}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("appointments_page.appointmentDetails.updatedAt")}:
            </DoctorInfo.Label>
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
