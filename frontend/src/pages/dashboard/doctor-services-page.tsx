import { Box, Alert, CircularProgress } from "@mui/material";
import {
  useAvailableSlots,
  useDeleteAvailableSlot,
} from "../../apis/use-case/doctor/dashboard";
import { useDoctorAuth } from "../../context/auth-context";
import type { AvailableSlot } from "../../apis/use-case/types";
import DataTable from "../../components/overview/common/data-table";
import { columns } from "../../components/doctor-services/columns";
import CreateSlot from "../../components/doctor-services/create-slot";
import UpdateSlotDialog from "../../components/doctor-services/update-slot";
import ConfirmationDialog from "../../components/confirm-dailog";
import ButtonAction from "../../components/button-action";

const DoctorServicesPage = () => {
  const { doctor } = useDoctorAuth();
  const { data, isPending, error } = useAvailableSlots({
    id: doctor?._id || "",
    showAll: true,
  });

  const deleteSlotMutation = useDeleteAvailableSlot();

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
        renderAddButton={<CreateSlot />}
        addButtonText="إضافة موعد جديد"
        renderEditButton={(row, handleMenuClose) => (
          <UpdateSlotDialog
            handleMenuClose={handleMenuClose}
            key={row._id}
            row={row}
          />
        )}
        renderDeleteButton={(row, handleMenuClose) => (
          <ConfirmationDialog
            title="حذف الموعد"
            content="هل انت متاكد من حذف الموعد؟"
            cancelButtonLabel="اغلاق"
            confirmButtonLabel="حذف"
            status="warning"
            onCancel={handleMenuClose}
            onConfirm={() => {
              deleteSlotMutation.mutate(row._id);
              handleMenuClose();
            }}
            isLoading={deleteSlotMutation.isPending}
            clickAction={({ openDialog }) => (
              <ButtonAction
                slotProps={{
                  icon: { color: "error.main" },
                  button: {
                    fullWidth: true,
                    variant: "text",
                    sx: {
                      color: "error.main",
                      justifyContent: "space-between",
                    },
                  },
                }}
                title="حذف"
                icon="icon-park-outline:delete"
                onClick={openDialog}
                isLoading={deleteSlotMutation.isPending}
              />
            )}
            key={row._id}
          />
        )}
      />
    </Box>
  );
};

export default DoctorServicesPage;
