// src/components/dashboard/Sidebar.tsx
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  People as PatientsIcon,
  CalendarToday as AppointmentsIcon,
  MedicalServices as ServicesIcon,
  Logout as LogoutIcon,
  Archive as ArchiveIcon,
} from "@mui/icons-material";
import Logo from "../../components/logo";
import { useDoctorLogout } from "../../apis/use-case/doctor/auth";

interface SidebarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerClose: () => void;
  handleNavigation: (path: string) => void;
}

const Sidebar = ({
  open,
  drawerWidth,
  handleDrawerClose,
  handleNavigation,
}: SidebarProps) => {
  const theme = useTheme();
  const { mutate } = useDoctorLogout();

  const handleLogout = () => {
    mutate(undefined);
    handleNavigation("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/doctor/dashboard" },
    { text: "Patients", icon: <PatientsIcon />, path: "/doctor/patients" },
    {
      text: "Appointments",
      icon: <AppointmentsIcon />,
      path: "/doctor/appointments",
    },
    { text: "Services", icon: <ServicesIcon />, path: "/doctor/services" },
    { text: "Archive", icon: <ArchiveIcon />, path: "/doctor/archive" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: (theme) => theme.palette.primary.darker,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: (theme) => theme.spacing(1),
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon
                sx={{ color: (theme) => theme.palette.common.white }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ color: (theme) => theme.palette.common.white }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List sx={{ marginTop: "auto", paddingBottom: 0 }}>
        {/* logout button  */}
        <ListItem sx={{ backgroundColor: (theme) => theme.palette.error.dark }}>
          <ListItemButton onClick={() => handleLogout()}>
            <ListItemIcon sx={{ color: (theme) => theme.palette.common.white }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ color: (theme) => theme.palette.common.white }}
              primary="Logout"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
