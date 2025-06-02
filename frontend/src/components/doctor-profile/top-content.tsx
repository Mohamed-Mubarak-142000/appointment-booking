import { Avatar, Stack, Typography } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";
import type { DoctorData } from "../../apis/use-case/types";

const TopContent = ({ user }: { user: DoctorData }) => {
  return (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Avatar
        src={assets.Avatar}
        alt={user?.name || "User Photo"}
        sx={{
          width: 200,
          height: 200,
          border: "3px solid",
          borderColor: "primary.main",
        }}
      />
      <Typography variant="h5" textAlign="center">
        {user?.name}
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        fontWeight={700}
      >
        {user?.specialty}
      </Typography>

      {/* <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: (theme) => theme.palette.error.dark,
            color: (theme) => theme.palette.common.white,
            borderRadius: 0.5,
            py: 1,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.error.darker,
            },
          }}
          onClick={() => logout(undefined)}
        >
          {t("profile.logout")}
        </Button> */}
    </Stack>
  );
};

export default TopContent;
