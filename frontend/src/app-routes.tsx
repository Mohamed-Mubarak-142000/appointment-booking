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
const DoctorSettingPage = lazy(
  () => import("./pages/dashboard/doctor-setting-page")
);

// Add new doctor auth pages
const DoctorLoginPage = lazy(() => import("./pages/dashboard/doctor-login"));

const DoctorRegisterPage = lazy(
  () => import("./pages/dashboard/doctor-register")
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/doctors", element: <DoctorsPage /> },
      { path: "/doctors/:specialty", element: <DoctorsPage /> },
      { path: "/contact", element: <ContactUsPage /> },
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
              { path: "settings", element: <DoctorSettingPage /> },
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
