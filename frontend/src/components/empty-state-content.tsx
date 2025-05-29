import {
  Box,
  Typography,
  type SxProps,
  type Theme,
  type TypographyProps,
} from "@mui/material";
import { Iconify } from "./iconify";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  actionsContent?: React.ReactElement;
  sx?: SxProps<Theme>;
  slotProps?: {
    title: TypographyProps;
    subtitle: TypographyProps;
  };
}

export const EmptyStateContent = ({
  icon = "material-symbols:folder-off-outline",
  title,
  subtitle,
  actionsContent,
  slotProps,
  sx,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mt: 5,
        p: 4,
        ...sx,
      }}
    >
      <Iconify
        icon={icon}
        sx={{
          width: 80,
          height: 80,
          color: "text.disabled",
          mb: 2,
        }}
      />

      {title && (
        <Typography
          variant={slotProps?.title?.variant ?? "h5"}
          {...slotProps?.title}
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontSize: (theme) => theme.typography.pxToRem(24),
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textAlign: "center",
            ...slotProps?.title.sx,
          }}
        >
          {title ?? "No Data Available"}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant={slotProps?.subtitle.variant ?? "subtitle1"}
          {...slotProps?.subtitle}
          color="text.secondary"
          sx={{ maxWidth: 400, mb: 3, ...slotProps?.subtitle.sx }}
        >
          {subtitle ?? "No data available for the selected criteria."}
        </Typography>
      )}

      {actionsContent}
    </Box>
  );
};
