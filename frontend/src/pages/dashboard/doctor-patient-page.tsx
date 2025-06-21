import { useState } from "react";
import { useDoctorPatients } from "../../apis/use-case/patient/appointments";
import { useDoctorAuth } from "../../context/auth-context";
import DataTable from "../../components/overview/common/data-table";
import type { PatientColumn } from "../../components/doctor-pateints/columns";
import columns from "../../components/doctor-pateints/columns";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirm-dailog";
import ButtonAction from "../../components/button-action";
import { useTranslate } from "../../locales";

const DoctorPatientsList = () => {
  const { doctor } = useDoctorAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: patients = [],
    isPending,
    isError,
  } = useDoctorPatients(doctor?._id || "", searchTerm);

  const navigate = useNavigate();
  const { t } = useTranslate("overview");
  const handlePatientDetails = (patientId: string) => {
    navigate(`/doctor/patient-details/${patientId}`);
  };

  return (
    <DataTable<PatientColumn>
      title={t("patient_page.title")}
      columns={columns}
      data={patients}
      loading={isPending}
      error={isError ? "فشل في تحميل البيانات" : null}
      renderDeleteButton={(row, handleMenuClose) => (
        <ConfirmationDialog
          title={t("patient_page.columns.delete_dialog.title")}
          content={t("patient_page.columns.delete_dialog.message")}
          confirmButtonLabel={t("patient_page.columns.delete_dialog.delete")}
          cancelButtonLabel={t("patient_page.columns.delete_dialog.cancel")}
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
              title={t("patient_page.columns.delete_dialog.delete")}
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
          title={t("patient_page.columns.view")}
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
