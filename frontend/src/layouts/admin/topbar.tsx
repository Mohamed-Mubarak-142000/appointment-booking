// src/components/dashboard/TopBar.tsx
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useGetDoctorProfile } from "../../apis/use-case/doctor/profile";

interface TopBarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleNotificationsOpen: (event: React.MouseEvent<HTMLElement>) => void;
  userInitial: string;
  notificationsCount: number;
  image?: string;
  isLoading: boolean;
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({
  open,
  drawerWidth,
  handleDrawerOpen,
  handleMenuOpen,
  handleNotificationsOpen,
  // userInitial,
  isLoading,
  notificationsCount,
  image,
}: TopBarProps) => {
  const { data: currentUser } = useGetDoctorProfile();

  return (
    <AppBarStyled
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
      sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, textTransform: "capitalize" }}
        >
          {isLoading ? (
            <Skeleton animation="wave" width={200} height={20} />
          ) : currentUser?.name ? (
            `Dr. ${currentUser.name}`
          ) : (
            "Doctor Dashboard"
          )}
        </Typography>

        <IconButton color="inherit" onClick={handleNotificationsOpen}>
          <Badge badgeContent={notificationsCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={handleMenuOpen}>
          {isLoading ? (
            <Skeleton animation="wave" width={32} height={32} />
          ) : (
            <Avatar
              src={image || "/default-avatar.png"}
              sx={{
                width: 32,
                height: 32,
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            />
          )}
        </IconButton>
      </Toolbar>
    </AppBarStyled>
  );
};

export default TopBar;
