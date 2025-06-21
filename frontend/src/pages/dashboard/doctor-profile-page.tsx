import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { useGetDoctorProfile } from "../../apis/use-case/doctor/profile";
// import TopContent from "../../components/doctor-profile/top-content";
import ProfileForm from "../../components/doctor-profile/profile-form";

const DoctorProfilePage = () => {
  const { data: user, isPending, isError, error } = useGetDoctorProfile();

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
          {/* <TopContent user={user} /> */}
          <ProfileForm user={user} />
        </Stack>
      )}
    </Box>
  );
};

export default DoctorProfilePage;
