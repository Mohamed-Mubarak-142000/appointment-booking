// components/auth/forgot-password-form.tsx
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  DialogActions,
} from "@mui/material";
import {
  useRequestPatientPasswordReset,
  useResetPatientPasswordWithOTP,
} from "../../apis/use-case/patient/auth";
import ButtonAction from "../button-action";

interface PatientForgotPasswordFormProps {
  onClose: () => void;
  onBackToAuth: () => void;
}

export const PatientForgotPasswordForm = ({
  onClose,
  onBackToAuth,
}: PatientForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
  const [emailSent, setEmailSent] = useState("");

  const requestReset = useRequestPatientPasswordReset();
  const resetPassword = useResetPatientPasswordWithOTP();

  const handleRequestReset = () => {
    requestReset.mutate(
      { email },
      {
        onSuccess: () => {
          setEmailSent(email);
          setStep("reset");
        },
      }
    );
  };

  const handleVerifyAndReset = () => {
    resetPassword.mutate(
      { email: emailSent, otp, newPassword },
      {
        onSuccess: () => {
          setStep("request");
          onClose();
        },
      }
    );
  };

  return (
    <Box
      sx={{
        mt: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {step === "request" && (
        <>
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              أدخل بريدك الإلكتروني المسجل لإرسال رمز التحقق
            </Typography>
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
          <DialogActions>
            <ButtonAction
              onClick={handleRequestReset}
              isLoading={requestReset.isPending}
              title="إرسال رمز التحقق"
              type="submit"
              slotProps={{
                button: {
                  fullWidth: true,
                  variant: "contained",
                  color: "primary",
                  sx: {
                    backgroundColor: "primary.dark",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.darker",
                      color: "primary.contrastText",
                    },
                  },
                },
              }}
            />

            <ButtonAction
              onClick={onBackToAuth}
              //   isLoading={requestReset.isPending}
              title="رجوع"
              slotProps={{
                button: {
                  fullWidth: true,
                  variant: "outlined",
                  color: "secondary",
                  sx: {
                    backgroundColor: "error.dark",
                    color: "secondary.contrastText",
                    "&:hover": {
                      backgroundColor: "error.darker",
                      color: "secondary.contrastText",
                    },
                  },
                },
              }}
            />
          </DialogActions>
        </>
      )}

      {step === "reset" && (
        <>
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              تم إرسال رمز التحقق إلى {emailSent}
            </Typography>
            <TextField
              fullWidth
              label="رمز التحقق"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="كلمة السر الجديدة"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setStep("request")}
              sx={{ mb: 2 }}
            >
              تغيير البريد الإلكتروني
            </Button>
          </Box>
          <DialogActions>
            <ButtonAction
              onClick={handleVerifyAndReset}
              isLoading={resetPassword.isPending}
              title="تأكيد الرمز"
              type="submit"
              slotProps={{
                button: {
                  fullWidth: true,
                  variant: "contained",
                  color: "primary",
                  sx: {
                    pointerEvents: otp.length < 4 ? "none" : "auto",
                    backgroundColor: "primary.dark",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.darker",
                      color: "primary.contrastText",
                    },
                  },
                },
              }}
            />
          </DialogActions>
        </>
      )}

      {/* {step === "reset" && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            أدخل كلمة السر الجديدة
          </Typography>
          <TextField
            fullWidth
            label="كلمة السر الجديدة"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="تأكيد كلمة السر"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setStep("verify")}
            >
              رجوع
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyAndReset}
              disabled={
                resetPassword.isPending ||
                newPassword !== confirmPassword ||
                newPassword.length < 6
              }
            >
              {resetPassword.isPending ? "جاري التحديث..." : "تغيير كلمة السر"}
            </Button>
          </Stack>
        </>
      )} */}
    </Box>
  );
};
