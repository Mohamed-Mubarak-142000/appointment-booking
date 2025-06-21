// components/auth/patient-auth-dialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import type { AuthTab } from "../../types";
import AuthTabsToggle from "./auth-tabs";
import { PatientLoginForm } from "./login-form";
import { PatientRegisterForm } from "./register-form";
import { PatientForgotPasswordForm } from "./forgot-password-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleBackToAuth = () => {
    setShowForgotPassword(false);
  };

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
      <DialogTitle sx={{ textAlign: "center", py: 3, position: "relative" }}>
        {showForgotPassword && (
          <IconButton
            onClick={handleBackToAuth}
            sx={{ position: "absolute", left: 24, top: 16 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {!showForgotPassword ? (
          <AuthTabsToggle
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        ) : (
          "استعادة كلمة السر"
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          height: HEIGHT_DIALOG,
          display: "flex",
          flexDirection: "column",
          py: 0,
        }}
      >
        {showForgotPassword ? (
          <PatientForgotPasswordForm
            onClose={onClose}
            onBackToAuth={handleBackToAuth}
          />
        ) : currentTab === "login" ? (
          <PatientLoginForm
            onClose={onClose}
            onForgotPassword={() => setShowForgotPassword(true)}
          />
        ) : (
          <PatientRegisterForm
            onClose={onClose}
            setCurrentTab={setCurrentTab}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
