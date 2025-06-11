// src/components/dashboard/StatsCard.tsx
import {
  Typography,
  Stack,
  Box,
  type TypographyProps,
  type StackProps,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  slotsProps?: {
    sxCard?: StackProps;
    title?: TypographyProps;
    value?: TypographyProps;
    change?: TypographyProps;
  };
}

const StatsCard = ({ title, value, change, slotsProps }: StatsCardProps) => {
  const isPositive = change >= 0;

  return (
    <Stack
      spacing={2}
      sx={{ padding: 2, borderRadius: 1, ...slotsProps?.sxCard?.sx }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: ".8rem", sm: ".9", md: "1.2rem" },
          ...slotsProps?.title?.sx,
        }}
        color="text.secondary"
        variant={slotsProps?.title?.variant ?? "h3"}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant={slotsProps?.value?.variant ?? "h3"}
          sx={{
            ...slotsProps?.value?.sx,
            fontSize: { xs: ".8rem", sm: ".9", md: "1.2rem" },
          }}
        >
          {value}
        </Typography>

        <Typography
          variant={slotsProps?.change?.variant ?? "h3"}
          color={isPositive ? "success.main" : "error.main"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: ".8rem", sm: ".9", md: "1.2rem" },
            ...slotsProps?.change?.sx,
          }}
        >
          {isPositive ? <TrendingUp /> : <TrendingDown />}
          {Math.abs(change)}%
        </Typography>
      </Box>
    </Stack>
  );
};

export default StatsCard;
