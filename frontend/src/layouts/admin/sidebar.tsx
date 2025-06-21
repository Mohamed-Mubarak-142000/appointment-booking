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
  Chat,
} from "@mui/icons-material";
import Logo from "../../components/logo";
import { useDoctorLogout } from "../../apis/use-case/doctor/auth";
import { CustomerLanguagePopover } from "../../components/lang-switch";
import { useTranslate } from "../../locales";

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
  const { t } = useTranslate("overview");
  const handleLogout = () => {
    mutate(undefined);
    handleNavigation("/");
  };

  const menuItems = [
    {
      text: t("sidebar.dashboard"),
      icon: <DashboardIcon />,
      path: "/doctor/dashboard",
    },
    {
      text: t("sidebar.patients"),
      icon: <PatientsIcon />,
      path: "/doctor/patients",
    },
    {
      text: t("sidebar.appointments"),
      icon: <AppointmentsIcon />,
      path: "/doctor/appointments",
    },
    {
      text: t("sidebar.slots"),
      icon: <ServicesIcon />,
      path: "/doctor/services",
    },
    {
      text: t("sidebar.archives"),
      icon: <ArchiveIcon />,
      path: "/doctor/archive",
    },
    {
      text: t("sidebar.chats"),
      icon: <Chat />,
      path: "/doctor/chats",
    },
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
          my: 2,
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
          <ListItem key={item.text}>
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

      <List sx={{ marginTop: "auto", paddingBottom: 0 }}>
        {/* logout button  */}

        <ListItem sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CustomerLanguagePopover />
        </ListItem>

        <ListItem sx={{ backgroundColor: (theme) => theme.palette.error.dark }}>
          <ListItemButton onClick={() => handleLogout()}>
            <ListItemIcon sx={{ color: (theme) => theme.palette.common.white }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ color: (theme) => theme.palette.common.white }}
              primary={t("sidebar.logout")}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
