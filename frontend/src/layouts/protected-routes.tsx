import { Navigate, Outlet } from "react-router-dom";
import { usePatientAuth, useDoctorAuth } from "../context/auth-context";

interface RoleProtectedRouteProps {
  role: "doctor" | "patient";
  redirectTo?: string;
}

export const RoleProtectedRoute = ({
  role,
  redirectTo = "/",
}: RoleProtectedRouteProps) => {
  const patientAuth = usePatientAuth();
  const doctorAuth = useDoctorAuth();

  const auth = role === "doctor" ? doctorAuth : patientAuth;
  const user = auth.user;

  if (
    !auth.isAuthenticated() ||
    user?.role !== (role === "doctor" ? "Doctor" : "Patient")
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export const DoctorRoute = () => (
  <RoleProtectedRoute role="doctor" redirectTo="/doctor/login" />
);

export const PatientRoute = () => (
  <RoleProtectedRoute role="patient" redirectTo="/" />
);
