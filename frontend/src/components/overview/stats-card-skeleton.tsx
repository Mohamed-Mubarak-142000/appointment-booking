import { Box, Skeleton, Stack } from "@mui/material";

const StatsCardSkeleton = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: 2,
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[4],
      }}
    >
      <Skeleton variant="text" width="60%" height={30} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="rectangular" width={50} height={30} />
      </Box>
    </Stack>
  );
};

export default StatsCardSkeleton;
