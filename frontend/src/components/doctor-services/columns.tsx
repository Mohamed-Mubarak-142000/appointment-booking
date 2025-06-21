import { Button } from "@mui/material";
import type {
  AvailableSlot,
  Column,
  SlotType,
} from "../../apis/use-case/types";
import ConfirmationDialog from "../confirm-dailog";
import { useUpdateIsAvailabilitySlot } from "../../apis/use-case/doctor/dashboard";
import { tFn, useTranslate } from "../../locales";

const daysOfWeek = [
  { value: "monday", label: tFn("overview:days.monday") },
  { value: "tuesday", label: tFn("overview:days.tuesday") },
  { value: "wednesday", label: tFn("overview:days.wednesday") },
  { value: "thursday", label: tFn("overview:days.thursday") },
  { value: "friday", label: tFn("overview:days.friday") },
  { value: "saturday", label: tFn("overview:days.saturday") },
  { value: "sunday", label: tFn("overview:days.sunday") },
];

const slotTypes: { value: SlotType; label: string }[] = [
  { value: "consultation", label: tFn("overview:slotTypes.consultation") },
  { value: "procedure", label: tFn("overview:slotTypes.procedure") },
  { value: "test", label: tFn("overview:slotTypes.test") },
  { value: "medication", label: tFn("overview:slotTypes.medication") },
];
const columns: Column<AvailableSlot>[] = [
  {
    id: "day",
    label: tFn("overview:columns.day"),
    format: (value) =>
      daysOfWeek.find(
        (day) => typeof value === "string" && day.value === value.toLowerCase()
      )?.label || value,
    sortable: true,
  },
  {
    id: "type",
    label: tFn("overview:columns.type"),
    format: (value: SlotType) =>
      slotTypes.find((type) => type.value === value)?.label || value,
    sortable: true,
  },
  {
    id: "isAvailable",
    label: tFn("overview:columns.status"),
    format: (value: boolean, row) => (
      <ToggleIsAvailable id={row?._id || ""} value={value} />
    ),
  },
  {
    id: "startTime",
    label: tFn("overview:columns.startTime"),
    sortable: true,
  },
  { id: "endTime", label: tFn("overview:columns.endTime"), sortable: true },
  {
    id: "slotDuration",
    label: tFn("overview:columns.duration"),
    sortable: true,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
const ToggleIsAvailable = ({ id, value }: { id: string; value: boolean }) => {
  const updateAvailableSlot = useUpdateIsAvailabilitySlot();
  const { t } = useTranslate("overview");
  const handleStatusChange = (_id: string) => {
    updateAvailableSlot.mutate(_id);
  };

  return (
    <ConfirmationDialog
      isLoading={updateAvailableSlot.isPending}
      title={t("statusChange.title")}
      content={t("statusChange.confirmation")}
      status={value ? "success" : "error"}
      confirmButtonLabel={t("statusChange.confirm")}
      cancelButtonLabel={t("statusChange.cancel")}
      onConfirm={() => handleStatusChange(id || "")}
      clickAction={({ openDialog }) => (
        <Button
          variant="contained"
          sx={{
            borderRadius: 0.5,
            backgroundColor: value ? "success.light" : "error.light",
            "&:hover": {
              backgroundColor: value ? "success.dark" : "error.dark",
              color: "common.white",
            },
            color: value ? "success.dark" : "error.dark",
          }}
          onClick={openDialog}
        >
          {value ? t("statusChange.available") : t("statusChange.booked")}
        </Button>
      )}
    />
  );
};

export { columns, daysOfWeek, slotTypes };
