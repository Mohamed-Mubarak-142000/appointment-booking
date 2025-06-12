/* eslint-disable react-refresh/only-export-components */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  useUpdateAppointmentStatus,
  type AppointmentRaw,
  type UpdateStatusData,
} from "../../apis/use-case/patient/appointments";
import type { Column } from "../../apis/use-case/types";
import ConfirmationDialog, {
  type ConfirmationDialogRef,
} from "../confirm-dailog";
import { useRef, useState } from "react";

export const columns: Column<AppointmentRaw>[] = [
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
      return <ChangeStatusAppointment row={row} />;
    },
  },
];

const ChangeStatusAppointment = ({ row }: { row: AppointmentRaw }) => {
  const [selectedRow, setSelectedRow] = useState<AppointmentRaw | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<UpdateStatusData | "">(
    ""
  );

  const dialogRef = useRef<ConfirmationDialogRef>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "info";
      case "cancelled":
        return "error";
      case "completed":
        return "success";
      default:
        return "info";
    }
  };

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateAppointmentStatus();

  const confirmStatusChange = () => {
    if (selectedRow && selectedStatus) {
      updateStatus({
        appointmentId: selectedRow._id,
        status: selectedStatus,
      });
    }
    setSelectedRow(null);
    setSelectedStatus("");
  };

  const handleStatusChange = (
    row: AppointmentRaw,
    newStatus: UpdateStatusData
  ) => {
    setSelectedRow(row);
    setSelectedStatus(newStatus);
    dialogRef.current?.openDialog();
  };

  return (
    <>
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

      <ConfirmationDialog
        ref={dialogRef}
        title="تغيير حالة الموعد"
        content={
          "هل تريد تغيير حالة الموعد؟" +
          ` ${getStatusLabel(selectedStatus as string)}`
        }
        confirmButtonLabel="تغيير"
        cancelButtonLabel="الغاء"
        isLoading={isUpdating}
        status={getStatusColor(selectedStatus as string)}
        onConfirm={confirmStatusChange}
        clickAction={() => <></>}
      />
    </>
  );
};
