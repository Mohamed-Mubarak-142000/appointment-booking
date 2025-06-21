// src/layouts/dashboard/DashboardLayout.tsx
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "./topbar";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import NotificationsMenu from "./notification-menu";
import UserMenu from "./user-menu";
import { useAuth } from "../../context/auth-context";
import { useGetDoctorProfile } from "../../apis/use-case/doctor/profile";

const drawerWidth = 240;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: user, isPending } = useGetDoctorProfile();

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) =>
    setNotificationsAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    logout("doctor");
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const notifications = [
    { id: 1, text: "New appointment request", time: "10 mins ago" },
    { id: 2, text: "Patient rescheduled", time: "2 hours ago" },
    { id: 3, text: "New test results", time: "1 day ago" },
  ];

  console.log("user", user);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopBar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        handleMenuOpen={handleMenuOpen}
        handleNotificationsOpen={handleNotificationsOpen}
        userInitial={user?.name?.charAt(0) || ""}
        image={user?.photo}
        isLoading={isPending}
        notificationsCount={notifications.length}
      />

      <Sidebar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        handleNavigation={handleNavigation}
      />

      <MainContent open={open} drawerWidth={drawerWidth}>
        <Outlet />
      </MainContent>

      <NotificationsMenu
        anchorEl={notificationsAnchorEl}
        handleClose={handleClose}
        notifications={notifications}
      />

      <UserMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
      />
    </Box>
  );
};

export default DashboardLayout;
