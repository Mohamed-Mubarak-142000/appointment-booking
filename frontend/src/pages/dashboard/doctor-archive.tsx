import { useState } from "react";
import {
  useGetCompletedAppointments,
  type ArchivedAppointmentRaw,
} from "../../apis/use-case/patient/appointments";
import type { Column } from "../../apis/use-case/types";
import DataTable from "../../components/overview/common/data-table";
import { useDoctorAuth } from "../../context/auth-context";

const DoctorArchive = () => {
  const { doctor } = useDoctorAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, error } = useGetCompletedAppointments({
    patientName: searchTerm,
    doctorId: doctor?._id || "",
  });
  console.log("data", data);

  const columns: Column<ArchivedAppointmentRaw>[] = [
    {
      id: "patientName",
      label: "اسم المريض",
      align: "left",
      format: (_value, row) => row?.patientName || "غير معروف",
    },
    {
      id: "doctorName",
      label: "اسم الطبيب",
      align: "left",
      format: (_value, row) => row?.doctorName || "غير معروف",
    },
    {
      id: "day",
      label: "اليوم",
      align: "left",
      format: (_value, row) => row?.day || "غير معروف",
    },
    {
      id: "startTime",
      label: "وقت البدء",
      align: "left",
      format: (_value, row) => row?.startTime || "غير معروف",
    },
    {
      id: "endTime",
      label: "وقت الانتهاء",
      align: "left",
      format: (_value, row) => row?.endTime || "غير معروف",
    },
    {
      id: "reason",
      label: "السبب",
      align: "left",
      format: (_value, row) => row?.reason || "غير معروف",
    },
  ];

  const tableData: ArchivedAppointmentRaw[] =
    data?.data.map((appointment: ArchivedAppointmentRaw) => ({
      ...appointment,
      patientName: appointment.patient?.name || "غير معروف",
      doctorName: appointment.doctor?.name || "غير معروف",
    })) || [];

  return (
    <DataTable<ArchivedAppointmentRaw>
      title="مواعيدي"
      columns={columns}
      data={tableData}
      loading={isPending}
      error={error?.message || null}
      emptyMessage="لا توجد مواعيد حالياً"
      addButtonText="إضافة موعد جديد"
      showSearch
      searchPlaceholder="ابحث عن مريض..."
      onSearchChange={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
};

export default DoctorArchive;
