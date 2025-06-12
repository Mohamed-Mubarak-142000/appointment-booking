import { useState } from "react";
import { useDoctorPatients } from "../../apis/use-case/patient/appointments";
import { useDoctorAuth } from "../../context/auth-context";
import DataTable from "../../components/overview/common/data-table";
import type { PatientColumn } from "../../components/doctor-pateints/columns";
import columns from "../../components/doctor-pateints/columns";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirm-dailog";
import ButtonAction from "../../components/button-action";

const DoctorPatientsList = () => {
  const { doctor } = useDoctorAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: patients = [],
    isPending,
    isError,
  } = useDoctorPatients(doctor?._id || "", searchTerm);

  const navigate = useNavigate();

  const handlePatientDetails = (patientId: string) => {
    navigate(`/doctor/patient-details/${patientId}`);
  };

  return (
    <DataTable<PatientColumn>
      title="قائمة المرضى"
      columns={columns}
      data={patients}
      loading={isPending}
      error={isError ? "فشل في تحميل البيانات" : null}
      renderDeleteButton={(row, handleMenuClose) => (
        <ConfirmationDialog
          title="حذف المريض"
          content="هل تريد حذف المريض؟"
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
      showSearch={true}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="ابحث عن مريض..."
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
            handlePatientDetails(row._id);
            handleMenuClose();
          }}
        />
      )}
    />
  );
};

export default DoctorPatientsList;
