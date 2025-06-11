import { Alert } from "@mui/material";
import { usePatientAuth } from "../../context/auth-context";

const AlertNotLogin = () => {
  const { patient } = usePatientAuth();
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
        You must be logged in to add a review.
      </Alert>
    )
  );
};

export default AlertNotLogin;
