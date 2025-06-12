import { Button } from "@mui/material";
import type {
  AvailableSlot,
  Column,
  SlotType,
} from "../../apis/use-case/types";
import ConfirmationDialog from "../confirm-dailog";
import { useUpdateIsAvailabilitySlot } from "../../apis/use-case/doctor/dashboard";

const daysOfWeek = [
  { value: "monday", label: "الإثنين" },
  { value: "tuesday", label: "الثلاثاء" },
  { value: "wednesday", label: "الأربعاء" },
  { value: "thursday", label: "الخميس" },
  { value: "friday", label: "الجمعة" },
  { value: "saturday", label: "السبت" },
  { value: "sunday", label: "الأحد" },
];

const slotTypes: { value: SlotType; label: string }[] = [
  { value: "consultation", label: "استشارة" },
  { value: "procedure", label: "إجراء طبي" },
  { value: "test", label: "فحص" },
  { value: "medication", label: "دواء" },
];

const columns: Column<AvailableSlot>[] = [
  {
    id: "day",
    label: "اليوم",
    format: (value) =>
      daysOfWeek.find(
        (day) => typeof value === "string" && day.value === value.toLowerCase()
      )?.label || value,
    sortable: true,
  },
  {
    id: "type",
    label: "نوع الموعد",
    format: (value: SlotType) =>
      slotTypes.find((type) => type.value === value)?.label || value,
    sortable: true,
  },
  {
    id: "isAvailable",
    label: "الحالة",
    format: (value: boolean, row) => (
      <ToggleIsAvailable id={row?._id || ""} value={value} />
    ),
  },
  { id: "startTime", label: "وقت البدء", sortable: true },
  { id: "endTime", label: "وقت الانتهاء", sortable: true },
  { id: "slotDuration", label: "مدة الموعد (دقيقة)", sortable: true },
];

// eslint-disable-next-line react-refresh/only-export-components
const ToggleIsAvailable = ({ id, value }: { id: string; value: boolean }) => {
  const updateAvailableSlot = useUpdateIsAvailabilitySlot();

  const handleStatusChange = (_id: string) => {
    updateAvailableSlot.mutate(_id);
  };

  return (
    <ConfirmationDialog
      isLoading={updateAvailableSlot.isPending}
      title="تغيير الحالة"
      content="هل أنت متأكد من تغيير حالة هذا العنصر؟"
      status={value ? "success" : "error"}
      confirmButtonLabel="تأكيد"
      cancelButtonLabel="إلغاء"
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
          {value ? "غير محجوز" : "محجوز"}
        </Button>
      )}
    />
  );
};

export { columns, daysOfWeek, slotTypes };
