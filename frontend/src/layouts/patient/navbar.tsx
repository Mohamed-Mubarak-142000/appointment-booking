// components/navbar/Navbar.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { CustomerLanguagePopover } from "../../components/lang-switch";
import { PatientAuthDialog } from "../../components/auth/auth-dialog";
import { NavLink } from "react-router-dom";
import Logo from "../../components/logo";
import { NavItems } from "./nav-item";
import { AuthButtons } from "./auth-button";
import { MobileMenu } from "./mobile-menu";
import { navItems } from "./nav-links";
import type { AuthTab } from "../../types";

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: "1rem",
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<AuthTab>("login");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAuthDialogOpen = (tab: AuthTab) => {
    setAuthDialogTab(tab);
    setAuthDialogOpen(true);
  };

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
    setAuthDialogTab("login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.primary.darker,
          boxShadow: theme.shadows[3],
          py: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "xl",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Logo />

          <NavItems items={navItems} />

          {!isMobile ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <AuthButtons onLogin={() => handleAuthDialogOpen("login")} />
              <CustomerLanguagePopover />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomerLanguagePopover />
              </Box>
              <MobileMenu
                mobileOpen={mobileOpen}
                items={navItems}
                onToggle={handleDrawerToggle}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <PatientAuthDialog
        open={authDialogOpen}
        onClose={handleAuthDialogClose}
        initialTab={authDialogTab}
      />
    </>
  );
};

export default Navbar;
