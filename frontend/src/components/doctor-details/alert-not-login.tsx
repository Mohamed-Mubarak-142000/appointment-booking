import { Alert } from "@mui/material";
import { usePatientAuth } from "../../context/auth-context";
import { useTranslate } from "../../locales";

const AlertNotLogin = () => {
  const { patient } = usePatientAuth();
  const { t } = useTranslate("appointment");
  return (
    !patient && (
      <Alert
        severity="info"
        sx={{
          fontSize: { xs: ".8rem", sm: ".9", md: "1.1rem" },
          my: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {t("comments.alert_login")}
      </Alert>
    )
  );
};

export default AlertNotLogin;
