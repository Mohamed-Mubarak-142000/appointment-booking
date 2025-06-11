/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  useAddAvailableSlot,
  useAvailableSlots,
  useDeleteAvailableSlot,
  useUpdateAvailableSlot,
  useUpdateIsAvailabilitySlot,
} from "../../apis/use-case/doctor/dashboard";
import { toast } from "react-toastify";
import { useDoctorAuth } from "../../context/auth-context";
import type { AvailableSlot, Column } from "../../apis/use-case/types";
import DataTable from "../../components/overview/common/data-table";

const daysOfWeek = [
  { value: "monday", label: "الإثنين" },
  { value: "tuesday", label: "الثلاثاء" },
  { value: "wednesday", label: "الأربعاء" },
  { value: "thursday", label: "الخميس" },
  { value: "friday", label: "الجمعة" },
  { value: "saturday", label: "السبت" },
  { value: "sunday", label: "الأحد" },
];

const DoctorServicesPage = () => {
  const [openConfimationDialog, setOpenConfirmationDialog] = useState(false);
  const updateAvailableSlot = useUpdateIsAvailabilitySlot();

  const columns: Column<AvailableSlot>[] = [
    {
      id: "day",
      label: "اليوم",
      format: (value) =>
        daysOfWeek.find(
          (day) =>
            typeof value === "string" && day.value === value.toLowerCase()
        )?.label || value,
      sortable: true,
    },
    {
      id: "isAvailable",
      label: "الحالة",
      format: (value: boolean, row) => {
        return (
          <>
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
              onClick={() => setOpenConfirmationDialog(true)}
            >
              {value ? "مفعل" : "معطل"}
            </Button>

            <Dialog
              open={openConfimationDialog}
              onClose={() => setOpenConfirmationDialog(false)}
            >
              <DialogTitle>تأكيد تغيير الحالة</DialogTitle>
              <DialogContent>
                <Typography>
                  هل أنت متأكد من أنك تريد {value ? "تعطيل" : "تفعيل"} هذا
                  الموعد؟
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmationDialog(false)}>
                  إلغاء
                </Button>
                <Button
                  onClick={() => {
                    updateAvailableSlot.mutate(row?._id || "");
                    setOpenConfirmationDialog(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  تأكيد
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
    },
    { id: "startTime", label: "وقت البدء", sortable: true },
    { id: "endTime", label: "وقت الانتهاء", sortable: true },
    { id: "slotDuration", label: "مدة الموعد (دقيقة)", sortable: true },
  ];
  const { doctor } = useDoctorAuth();

  const { data, isPending, error } = useAvailableSlots(doctor?._id || "");
  console.log("data", data);

  const addSlotMutation = useAddAvailableSlot();
  const updateSlotMutation = useUpdateAvailableSlot();
  const deleteSlotMutation = useDeleteAvailableSlot();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentSlot, setCurrentSlot] = useState<AvailableSlot | null>(null);

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
  });

  const handleOpenAddDialog = () => {
    setCurrentSlot(null);
    setFormData({
      day: "",
      startTime: "",
      endTime: "",
      slotDuration: 30,
    });
    setOpenDialog(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEditDialog = (slot: any) => {
    setCurrentSlot(slot);
    setFormData({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      slotDuration: slot.slotDuration || 30,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (currentSlot) {
        await updateSlotMutation.mutateAsync({
          slotId: currentSlot._id,
          data: formData,
        });
        toast.success("تم تحديث الموعد بنجاح");
      } else {
        await addSlotMutation.mutateAsync(formData);
        toast.success("تم إضافة الموعد بنجاح");
      }
      setOpenDialog(false);
    } catch {
      toast.error("حدث خطأ أثناء حفظ البيانات");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenDeleteDialog = (slot: any) => {
    setCurrentSlot(slot);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!currentSlot) {
      toast.error("لا يوجد موعد محدد للحذف");
      return;
    }
    try {
      await deleteSlotMutation.mutateAsync(currentSlot._id);
      toast.success("تم حذف الموعد بنجاح");
      setOpenDeleteDialog(false);
    } catch {
      toast.error("حدث خطأ أثناء حذف الموعد");
    }
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">فشل في تحميل البيانات</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <DataTable<AvailableSlot>
        title="إدارة المواعيد المتاحة"
        columns={columns}
        data={data?.slots || []}
        loading={isPending}
        error={error ? "فشل في تحميل البيانات" : null}
        onAdd={handleOpenAddDialog}
        addButtonText="إضافة موعد جديد"
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />
      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          {currentSlot ? "تعديل الموعد" : "إضافة موعد جديد"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              label="اليوم"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {daysOfWeek.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="وقت البدء"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 دقائق
              }}
            />

            <TextField
              label="وقت الانتهاء"
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 دقائق
              }}
            />

            <TextField
              label="مدة الموعد (دقيقة)"
              type="number"
              name="slotDuration"
              value={formData.slotDuration}
              onChange={handleInputChange}
              fullWidth
              inputProps={{
                min: 10,
                max: 120,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={addSlotMutation.isPending || updateSlotMutation.isPending}
          >
            {addSlotMutation.isPending || updateSlotMutation.isPending ? (
              <CircularProgress size={24} />
            ) : currentSlot ? (
              "حفظ التعديلات"
            ) : (
              "إضافة"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>هل أنت متأكد من رغبتك في حذف هذا الموعد؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>إلغاء</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteSlotMutation.isPending}
          >
            {deleteSlotMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "حذف"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorServicesPage;
