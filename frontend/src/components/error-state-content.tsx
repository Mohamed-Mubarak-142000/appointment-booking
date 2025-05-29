import {
  Box,
  Typography,
  type SxProps,
  type Theme,
  type TypographyProps,
} from "@mui/material";
import { Iconify } from "./iconify";

interface ErrorStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  actionsContent?: React.ReactElement;
  sx?: SxProps<Theme>;
  slotProps?: {
    title?: TypographyProps;
    subtitle?: TypographyProps;
  };
}

export const ErrorStateContent = ({
  icon = "material-symbols:error-outline-rounded",
  title,
  subtitle,
  actionsContent,
  slotProps,
  sx,
}: ErrorStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
        mt: 5,
        ...sx,
      }}
      role="alert"
    >
      <Iconify
        icon={icon}
        sx={{
          width: 80,
          height: 80,
          color: "error.main",
          mb: 2,
        }}
      />

      {title && (
        <Typography
          variant={slotProps?.title?.variant ?? "h5"}
          {...slotProps?.title}
          sx={{
            color: (theme) => theme.palette.error.main,
            fontSize: (theme) => theme.typography.pxToRem(24),
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textAlign: "center",
            mb: 1,
            ...slotProps?.title?.sx,
          }}
        >
          {title ?? "Something went wrong"}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant={slotProps?.subtitle?.variant ?? "body1"}
          {...slotProps?.subtitle}
          sx={{
            color: "text.secondary",
            maxWidth: 400,
            mb: 3,
            ...slotProps?.subtitle?.sx,
          }}
        >
          {subtitle ?? "We encountered an unexpected error. Please try again."}
        </Typography>
      )}

      {actionsContent}
    </Box>
  );
};
