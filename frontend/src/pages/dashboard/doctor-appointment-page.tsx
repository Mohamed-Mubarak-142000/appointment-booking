import {
  useGetDoctorAppointments,
  type AppointmentRaw,
} from "../../apis/use-case/patient/appointments";
import { useDoctorAuth } from "../../context/auth-context";
import DataTable from "../../components/overview/common/data-table";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirm-dailog";
import ButtonAction from "../../components/button-action";
import { columns } from "../../components/doctor-appointment/columns";

const DoctorAppointmentPage = () => {
  const { doctor } = useDoctorAuth();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    error,
  } = useGetDoctorAppointments(doctor?._id || "");

  const tableData: AppointmentRaw[] =
    response?.data.map((appointment: AppointmentRaw) => ({
      ...appointment,
      patientName: appointment.patient.name || "غير معروف",
    })) || [];

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
            title="عرض"
            onClick={() => {
              handleAppointmentDetails(row._id);
              handleMenuClose();
            }}
          />
        )}
        renderDeleteButton={(row, handleMenuClose) => (
          <ConfirmationDialog
            title="حذف هذا الموعد"
            content="هل تريد حذف هذا الموعد؟"
            confirmButtonLabel="حذف"
            cancelButtonLabel="الغاء"
            isLoading={false}
            status="error"
            onConfirm={() => {
              console.log("Delete row:", row);
              handleMenuClose();
            }}
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
                // isLoading={deleteSlotMutation.isPending}
              />
            )}
          />
        )}
      />
    </>
  );
};

export default DoctorAppointmentPage;
