import { Box, Typography } from "@mui/material";

export const Available = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          backgroundColor: "success.main",
          borderRadius: "50%",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
        }}
      >
        Available
      </Typography>
    </Box>
  );
};
