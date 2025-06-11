/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetDoctorAppointments,
  useUpdateAppointmentStatus,
  type AppointmentRaw,
  type UpdateStatusData,
} from "../../apis/use-case/patient/appointments";
import { useDoctorAuth } from "../../context/auth-context";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { Column } from "../../apis/use-case/types";
import DataTable from "../../components/overview/common/data-table";
import { useNavigate } from "react-router-dom";

const DoctorAppointmentPage = () => {
  const { doctor } = useDoctorAuth();
  const navigate = useNavigate();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateAppointmentStatus();
  const {
    data: response,
    isLoading,
    error,
  } = useGetDoctorAppointments(doctor?._id || "");

  const [selectedRow, setSelectedRow] = useState<AppointmentRaw | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<UpdateStatusData | "">(
    ""
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "مؤكد";
      case "cancelled":
        return "ملغي";
      case "completed":
        return "مكتمل";
      default:
        return "قيد الانتظار";
    }
  };

  // Removed unused getStatusColor

  const handleStatusChange = (
    row: AppointmentRaw,
    newStatus: UpdateStatusData
  ) => {
    setSelectedRow(row);
    setSelectedStatus(newStatus);
    setConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    if (selectedRow && selectedStatus) {
      updateStatus({
        appointmentId: selectedRow._id,
        status: selectedStatus,
      });
    }
    setConfirmOpen(false);
    setSelectedRow(null);
    setSelectedStatus("");
  };

  const columns: Column<AppointmentRaw>[] = [
    {
      id: "patient",
      label: "اسم المريض",
      align: "left",
      format: (_value, row) => row?.patient?.name || "غير معروف",
    },
    {
      id: "type",
      label: "نوع الموعد",
      align: "center",
    },
    {
      id: "day",
      label: "اليوم",
      align: "center",
    },
    {
      id: "startTime",
      label: "من الساعة",
      align: "center",
    },
    {
      id: "endTime",
      label: "إلى الساعة",
      align: "center",
    },
    {
      id: "status",
      label: "الحالة",
      align: "center",
      format: (value: string, row?: AppointmentRaw) => {
        if (!row) return null;
        return (
          <FormControl size="small" fullWidth>
            <InputLabel id={`status-label-${row._id}`}>الحالة</InputLabel>
            <Select
              labelId={`status-label-${row._id}`}
              value={row.status}
              label="الحالة"
              onChange={(e) =>
                handleStatusChange(
                  row,
                  e.target.value as unknown as UpdateStatusData
                )
              }
            >
              <MenuItem value="confirmed">مؤكد</MenuItem>
              <MenuItem value="cancelled">ملغي</MenuItem>
              <MenuItem value="completed">مكتمل</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  const tableData: AppointmentRaw[] =
    response?.data.map((appointment: AppointmentRaw) => ({
      ...appointment,
      patientName: appointment.patient.name || "غير معروف",
    })) || [];

  const handleDelete = (row: AppointmentRaw) => {
    console.log("Delete row:", row);
  };

  const handleAdd = () => {
    console.log("Add new appointment");
  };

  const handleAppointmentDetails = (appointmentId: string) => {
    navigate(`/doctor/appointment-details/${appointmentId}`);
  };

  return (
    <>
      <DataTable<AppointmentRaw>
        title="مواعيدي"
        columns={columns}
        data={tableData}
        loading={isLoading}
        error={error?.message || null}
        emptyMessage="لا توجد مواعيد حالياً"
        // onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addButtonText="إضافة موعد جديد"
        onView={(row) => handleAppointmentDetails(row._id)}
      />

      {/* نافذة التأكيد */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>تأكيد تغيير الحالة</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد تغيير حالة الموعد إلى{" "}
          <strong>{getStatusLabel(selectedStatus as string)}</strong>؟
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>إلغاء</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmStatusChange}
            disabled={isUpdating}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoctorAppointmentPage;
