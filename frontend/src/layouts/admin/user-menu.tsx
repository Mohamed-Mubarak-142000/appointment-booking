// src/components/dashboard/UserMenu.tsx
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
}

const UserMenu = ({
  anchorEl,
  handleClose,
  handleNavigation,
  handleLogout,
}: UserMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={() => handleNavigation("/doctor/profile")}>
        <ListItemIcon>
          <AccountIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/doctor/settings")}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
