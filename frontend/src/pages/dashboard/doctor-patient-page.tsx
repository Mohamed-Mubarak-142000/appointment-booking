import { useState } from "react";
import { useDoctorPatients } from "../../apis/use-case/patient/appointments";
import { useDoctorAuth } from "../../context/auth-context";
import DataTable from "../../components/overview/common/data-table";
import type { PatientColumn } from "../../components/doctor-pateints/columns";
import columns from "../../components/doctor-pateints/columns";
import { useNavigate } from "react-router-dom";

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
      onDelete={(row) => console.log("Delete", row)}
      showSearch={true}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="ابحث عن مريض..."
      onView={(row) => handlePatientDetails(row._id)}
    />
  );
};

export default DoctorPatientsList;
