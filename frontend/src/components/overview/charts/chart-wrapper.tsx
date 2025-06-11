// src/components/dashboard/ChartWrapper.tsx
import { Typography, Paper, Box } from "@mui/material";
import type { ReactNode } from "react";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
  height?: number;
}

const ChartWrapper = ({ title, children }: ChartWrapperProps) => {
  return (
    <Paper sx={{ py: 5 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.darker",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        {title}
      </Typography>
      <Box sx={{ height: 500 }}>{children}</Box>
    </Paper>
  );
};

export default ChartWrapper;
