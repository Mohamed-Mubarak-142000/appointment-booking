import { useParams } from "react-router-dom";
import { useGetAppointmentDetails } from "../../apis/use-case/patient/appointments";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const { data } = useGetAppointmentDetails(appointmentId || "");

  console.log("data", data);
  return <div>AppointmentDetails</div>;
};

export default AppointmentDetails;
