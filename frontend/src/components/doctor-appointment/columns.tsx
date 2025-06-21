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
import { tFn, useTranslate } from "../../locales";

export const columns: Column<AppointmentRaw>[] = [
  {
    id: "patient",
    label: tFn("overview:appointments_page.columns.name"),
    align: "left",
    format: (_value, row) => row?.patient?.name || "غير معروف",
  },
  {
    id: "type",
    label: tFn("overview:appointments_page.columns.type_slot"),
    align: "center",
  },
  {
    id: "day",
    label: tFn("overview:appointments_page.columns.day"),
    align: "center",
  },
  {
    id: "startTime",
    label: tFn("overview:appointments_page.columns.start_time"),
    align: "center",
  },
  {
    id: "endTime",
    label: tFn("overview:appointments_page.columns.end_time"),
    align: "center",
  },
  {
    id: "status",
    label: tFn("overview:appointments_page.columns.status"),
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
  const { t } = useTranslate("overview");
  const dialogRef = useRef<ConfirmationDialogRef>(null);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return t("appointments_page.columns.status_pending");
      case "cancelled":
        return t("appointments_page.columns.status_cancelled");
      case "completed":
        return t("appointments_page.columns.status_completed");
      default:
        return t("appointments_page.columns.status_pending");
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
        <InputLabel id={`status-label-${row._id}`}>
          {t("appointments_page.columns.status")}
        </InputLabel>
        <Select
          labelId={`status-label-${row._id}`}
          value={row.status}
          label={t("appointments_page.columns.status")}
          onChange={(e) =>
            handleStatusChange(
              row,
              e.target.value as unknown as UpdateStatusData
            )
          }
        >
          <MenuItem value="confirmed">
            {t("appointments_page.columns.status_pending")}
          </MenuItem>
          <MenuItem value="cancelled">
            {t("appointments_page.columns.status_cancelled")}
          </MenuItem>
          <MenuItem value="completed">
            {t("appointments_page.columns.status_completed")}
          </MenuItem>
        </Select>
      </FormControl>

      <ConfirmationDialog
        ref={dialogRef}
        title={t("appointments_page.columns.change_status_dialog.title")}
        content={
          t("appointments_page.columns.change_status_dialog.message") +
          ` ${getStatusLabel(selectedStatus as string)}`
        }
        confirmButtonLabel={t(
          "appointments_page.columns.change_status_dialog.change"
        )}
        cancelButtonLabel={t(
          "appointments_page.columns.change_status_dialog.cancel"
        )}
        isLoading={isUpdating}
        status={getStatusColor(selectedStatus as string)}
        onConfirm={confirmStatusChange}
        clickAction={() => <></>}
      />
    </>
  );
};
