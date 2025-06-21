import { Box, CircularProgress, Alert, Stack } from "@mui/material";
// import LeftSide from "../components/patient-profile/left-side";
import ProfileForm from "../components/patient-profile/profile-form";
import BookedDoctors from "../components/patient-profile/booked-doctors";
import { useGetPatientProfile } from "../apis/use-case/patient/profile";

const ProfilePage = () => {
  const { data: user, isPending, isError, error } = useGetPatientProfile();

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error?.message || "Failed to load profile data"}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {user && (
        <Stack spacing={2} sx={{ flex: 1 }}>
          <ProfileForm user={user} />
          <BookedDoctors user={user} />
        </Stack>
      )}
    </Box>
  );
};

export default ProfilePage;
