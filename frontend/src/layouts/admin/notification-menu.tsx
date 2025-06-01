// src/components/dashboard/NotificationsMenu.tsx
import { Box, Menu, MenuItem, Typography } from "@mui/material";

interface Notification {
  id: number;
  text: string;
  time: string;
}

interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  notifications: Notification[];
}

const NotificationsMenu = ({
  anchorEl,
  handleClose,
  notifications,
}: NotificationsMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {notifications.map((notification) => (
        <MenuItem key={notification.id} onClick={handleClose}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2">{notification.text}</Typography>
            <Typography variant="caption" color="text.secondary">
              {notification.time}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationsMenu;
