import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RouteLoading } from "./components/route-loading";
import { DoctorRoute, PatientRoute } from "./layouts/protected-routes";
import PublicDoctorLayout from "./layouts/admin/public-doctor-layout";

const HomePage = lazy(() => import("./pages/home-page"));
// const LoginPage = lazy(() => import("./pages/login-page"));
// const RegisterPage = lazy(() => import("./pages/register-page"));
const AboutPage = lazy(() => import("./pages/about-page"));
const DoctorsPage = lazy(() => import("./pages/doctors-page"));
const ContactUsPage = lazy(() => import("./pages/contact-us-page"));
const PatientProfilePage = lazy(() => import("./pages/patient-profile-page"));
const DoctorProfilePage = lazy(
  () => import("./pages/dashboard/doctor-profile-page")
);
const NotFoundPage = lazy(() => import("./pages/not-found-page"));
const AppointmentsPage = lazy(() => import("./pages/appointments-page"));
const AppointmentPage = lazy(() => import("./pages/appointment-page"));
const PublicLayout = lazy(() => import("./layouts/patient/public-layout"));
const PrivateLayout = lazy(() => import("./layouts/patient/private-layout"));
const DashboardLayout = lazy(() => import("./layouts/admin/dashboard-layout"));
const DoctorDashboardPage = lazy(
  () => import("./pages/dashboard/doctor-dashboard-page")
);
const DoctorPatientPage = lazy(
  () => import("./pages/dashboard/doctor-patient-page")
);
const DoctorAppointmentPage = lazy(
  () => import("./pages/dashboard/doctor-appointment-page")
);
const DoctorServicesPage = lazy(
  () => import("./pages/dashboard/doctor-services-page")
);

const DoctorArchive = lazy(() => import("./pages/dashboard/doctor-archive"));
// Add new doctor auth pages
const DoctorLoginPage = lazy(() => import("./pages/dashboard/doctor-login"));

const DoctorRegisterPage = lazy(
  () => import("./pages/dashboard/doctor-register")
);

const PatientDetailsPage = lazy(
  () => import("./pages/dashboard/patient-details")
);

const AppointmentDetailsPage = lazy(
  () => import("./pages/dashboard/appointment-details")
);

const ArchiveAppointmentDetails = lazy(
  () => import("./pages/dashboard/doctor-archive-appointment")
);

const DoctorChats = lazy(() => import("./pages/dashboard/doctor-chats-page"));

const ForgetPasswordDoctor = lazy(
  () => import("./pages/dashboard/forget-password-page")
);

const ResetPasswordDoctor = lazy(
  () => import("./pages/dashboard/reset-password-page")
);

const FilterDoctorsPage = lazy(() => import("./pages/filter-doctors-page"));
const DoctorDetailsPage = lazy(() => import("./pages/doctor-details-page"));

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/doctors", element: <DoctorsPage /> },
      { path: "/doctor-details/:id", element: <DoctorDetailsPage /> },
      { path: "/contact", element: <ContactUsPage /> },
      {
        path: "/filter",
        element: <FilterDoctorsPage />,
      },
    ],
  },

  {
    path: "/patient",
    element: <PatientRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: "profile", element: <PatientProfilePage /> },
          { path: "appointments", element: <AppointmentsPage /> },
          { path: "appointment/:docId", element: <AppointmentPage /> },
        ],
      },
    ],
  },
  {
    path: "/doctor",
    children: [
      {
        element: <PublicDoctorLayout />,
        children: [
          { path: "login", element: <DoctorLoginPage /> },
          { path: "register", element: <DoctorRegisterPage /> },
          {
            path: "forget-password",
            element: <ForgetPasswordDoctor />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordDoctor />,
          },
        ],
      },

      {
        element: <DoctorRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "profile", element: <DoctorProfilePage /> },
              { path: "dashboard", element: <DoctorDashboardPage /> },
              { path: "patients", element: <DoctorPatientPage /> },
              { path: "appointments", element: <DoctorAppointmentPage /> },
              { path: "services", element: <DoctorServicesPage /> },
              { path: "archive", element: <DoctorArchive /> },
              { path: "chats", element: <DoctorChats /> },

              {
                path: "archive-details/:archiveId",
                element: <ArchiveAppointmentDetails />,
              },
              {
                path: "patient-details/:patientId",
                element: <PatientDetailsPage />,
              },
              {
                path: "appointment-details/:appointmentId",
                element: <AppointmentDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
