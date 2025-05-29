// components/auth/auth-dialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { AuthTab } from "../../types";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import AuthTabsToggle from "./auth-tabs";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  initialTab?: AuthTab;
}

const HEIGHT_DIALOG = 600;

export const AuthDialog = ({
  open,
  onClose,
  initialTab = "login",
}: AuthDialogProps) => {
  const [currentTab, setCurrentTab] = useState<AuthTab>(initialTab);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" sx={{ p: 2 }} fullWidth>
      <DialogTitle>
        <AuthTabsToggle currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: HEIGHT_DIALOG,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 2,
        }}
      >
        {currentTab === "login" ? (
          <LoginForm onclose={onClose} />
        ) : (
          <RegisterForm onclose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
