// components/navbar/MobileMenu.tsx
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslate } from "../../locales";
import Logo from "../../components/logo";
import type { AuthTab, NavItem } from "../../types";
import { useState } from "react";
import { PatientAuthDialog } from "../../components/auth/auth-dialog";

interface MobileMenuProps {
  mobileOpen: boolean;
  items: NavItem[];
  onToggle: () => void;
}

export const MobileMenu = ({
  mobileOpen,
  items,
  onToggle,
}: MobileMenuProps) => {
  const theme = useTheme();
  const { t } = useTranslate("common");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<AuthTab>("login");

  const handleAuthDialogOpen = (tab: AuthTab) => {
    setAuthDialogTab(tab);
    setAuthDialogOpen(true);
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
  };
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onToggle}
        sx={{ color: theme.palette.text.primary }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            backgroundColor: theme.palette.primary.darker,
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: theme.palette.primary.darker,
            height: "100%",
            color: theme.palette.text.primary,
          }}
          role="presentation"
          onClick={onToggle}
        >
          <Box sx={{ p: 2 }}>
            <Logo />
          </Box>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: theme.palette.common.white,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
            <Box
              onClick={() => handleAuthDialogOpen("login")}
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.common.white,
                marginTop: 2,
                width: "90%",
                padding: 1,
                mx: "auto",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <ListItemText
                primary={t("navbar.login")}
                sx={{ textAlign: "center" }}
              />
            </Box>
          </List>
        </Box>
      </Drawer>

      <PatientAuthDialog
        open={authDialogOpen}
        onClose={handleAuthDialogClose}
        initialTab={authDialogTab}
      />
    </>
  );
};
