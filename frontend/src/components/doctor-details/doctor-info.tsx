import React from "react";
import { Grid, Box, Typography, Stack, type GridProps } from "@mui/material";

const DoctorInfo = ({
  children,
  slotProps,
}: {
  children: React.ReactNode;
  slotProps?: {
    root?: GridProps;
  };
}) => {
  const rootProps = {
    item: true,
    xs: 12,
    md: 6,
    lg: 8,
    ...slotProps?.root,
    sx: {
      mt: 4,
      ...(slotProps?.root?.sx || {}),
    },
  };

  return (
    <Grid {...rootProps}>
      <Stack spacing={2} sx={{ padding: 2, borderRadius: 1 }}>
        {children}
      </Stack>
    </Grid>
  );
};

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
      fontSize: { xs: ".8rem", sm: ".9", md: "1rem" },
    }}
  >
    {children}
  </Typography>
);

export default DoctorInfo;
