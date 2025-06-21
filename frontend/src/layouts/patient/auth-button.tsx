// components/navbar/AuthButtons.tsx
import { Box, Button, Typography } from "@mui/material";
import { useTranslate } from "../../locales";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets";
import { useAuth } from "../../context/auth-context";
import { useGetPatientProfile } from "../../apis/use-case/patient/profile";

interface AuthButtonsProps {
  onLogin: () => void;
}

export const AuthButtons = ({ onLogin }: AuthButtonsProps) => {
  const { data } = useGetPatientProfile();
  const { t } = useTranslate("common");
  const { patient: user } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);
  console.log("data", data);
  // const photo = data?.photo || assets.Avatar;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mx: 2 }}>
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: 2.5,
            },
          }}
          onClick={() => navigate("/patient/profile")}
        >
          <Box
            component={"img"}
            sx={{ width: 40, height: 40, borderRadius: "50%" }}
            src={data?.photo || assets.Avatar}
            alt="profile_image"
          />
          <Typography variant="body1" sx={{ textWrap: "nowrap", mx: 0.5 }}>
            {data?.name}
          </Typography>
        </Box>
      ) : (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: (theme) => theme.palette.info.dark,
            color: (theme) => theme.palette.common.white,
            borderColor: (theme) => theme.palette.info.dark,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.info.darker,
              borderColor: (theme) => theme.palette.info.darker,
            },
          }}
          onClick={onLogin}
        >
          {t("navbar.login")}
        </Button>
      )}
    </Box>
  );
};
