import { useState } from "react";
import {
  useGetCompletedAppointments,
  type ArchivedAppointmentRaw,
} from "../../apis/use-case/patient/appointments";
import type { Column } from "../../apis/use-case/types";
import DataTable from "../../components/overview/common/data-table";
import { useDoctorAuth } from "../../context/auth-context";
import ButtonAction from "../../components/button-action";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../locales";

const DoctorArchive = () => {
  const { t } = useTranslate("overview");
  const { doctor } = useDoctorAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, error } = useGetCompletedAppointments({
    patientName: searchTerm,
    doctorId: doctor?._id || "",
  });

  const columns: Column<ArchivedAppointmentRaw>[] = [
    {
      id: "patientName",
      label: t("doctorArchive.patientName"),
      align: "left",
      format: (_value, row) => row?.patientName || t("doctorArchive.unknown"),
    },
    {
      id: "doctorName",
      label: t("doctorArchive.doctorName"),
      align: "left",
      format: (_value, row) => row?.doctorName || t("doctorArchive.unknown"),
    },
    {
      id: "day",
      label: t("doctorArchive.day"),
      align: "left",
      format: (_value, row) => row?.day || t("doctorArchive.unknown"),
    },
    {
      id: "startTime",
      label: t("doctorArchive.startTime"),
      align: "left",
      format: (_value, row) => row?.startTime || t("doctorArchive.unknown"),
    },
    {
      id: "endTime",
      label: t("doctorArchive.endTime"),
      align: "left",
      format: (_value, row) => row?.endTime || t("doctorArchive.unknown"),
    },
    {
      id: "reason",
      label: t("doctorArchive.reason"),
      align: "left",
      format: (_value, row) => row?.reason || t("doctorArchive.unknown"),
    },
  ];

  const tableData: ArchivedAppointmentRaw[] =
    data?.data.map((appointment: ArchivedAppointmentRaw) => ({
      ...appointment,
      patientName: appointment.patient?.name || t("doctorArchive.unknown"),
      doctorName: appointment.doctor?.name || t("doctorArchive.unknown"),
    })) || [];

  const navigate = useNavigate();
  const handleAppointmentDetails = (archiveId: string) => {
    navigate(`/doctor/archive-details/${archiveId}`);
  };

  return (
    <DataTable<ArchivedAppointmentRaw>
      title={t("doctorArchive.title")}
      columns={columns}
      data={tableData}
      loading={isPending}
      error={error?.message || null}
      emptyMessage={t("doctorArchive.noAppointments")}
      addButtonText={t("doctorArchive.addAppointment")}
      showSearch
      searchPlaceholder={t("doctorArchive.searchPlaceholder")}
      onSearchChange={setSearchTerm}
      searchTerm={searchTerm}
      renderViewButton={(row, handleMenuClose) => (
        <ButtonAction
          icon="lets-icons:view"
          slotProps={{
            icon: { color: "success.darker" },
            button: {
              fullWidth: true,
              variant: "text",
              sx: {
                justifyContent: "space-between",
              },
            },
          }}
          title={t("doctorArchive.view")}
          onClick={() => {
            handleAppointmentDetails(row._id);
            handleMenuClose();
          }}
        />
      )}
    />
  );
};

export default DoctorArchive;
