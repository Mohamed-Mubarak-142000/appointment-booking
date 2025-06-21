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
    </Stack>
  );
};

export default TopContent;
