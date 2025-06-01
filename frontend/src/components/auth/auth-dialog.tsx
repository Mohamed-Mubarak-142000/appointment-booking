// components/auth/patient-auth-dialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { AuthTab } from "../../types";
import AuthTabsToggle from "./auth-tabs";
import { PatientLoginForm } from "./login-form";
import { PatientRegisterForm } from "./register-form";

interface PatientAuthDialogProps {
  open: boolean;
  onClose: () => void;
  initialTab?: AuthTab;
}

const HEIGHT_DIALOG = 600;

export const PatientAuthDialog = ({
  open,
  onClose,
  initialTab = "login",
}: PatientAuthDialogProps) => {
  const [currentTab, setCurrentTab] = useState<AuthTab>(initialTab);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        p: 2,
        "& .MuiDialog-paper": {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", py: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Patient Portal
        </Typography>
        <AuthTabsToggle currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </DialogTitle>

      <DialogContent
        sx={{
          height: HEIGHT_DIALOG,
          display: "flex",
          flexDirection: "column",
          py: 0,
        }}
      >
        {currentTab === "login" ? (
          <PatientLoginForm onClose={onClose} />
        ) : (
          <PatientRegisterForm onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
