import React from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";

const DoctorInfo = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} lg={8} sx={{ mt: 4 }}>
    <Stack spacing={2} sx={{ padding: 2, borderRadius: 1 }}>
      {children}
    </Stack>
  </Grid>
);

DoctorInfo.Row = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>{children}</Box>
);

DoctorInfo.Item = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ flex: 1, minWidth: "250px" }}>{children}</Box>
);

DoctorInfo.Label = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="h3"
    sx={{
      color: (theme) => theme.palette.text.secondary,
      fontSize: { xs: ".5rem", sm: ".8", md: "1rem" },
    }}
  >
    {children}
  </Typography>
);

DoctorInfo.Value = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="h3"
    sx={{
      color: (theme) => theme.palette.text.primary,
      fontSize: { xs: ".8rem", sm: ".9", md: "1.1rem" },
    }}
  >
    {children}
  </Typography>
);

export default DoctorInfo;
