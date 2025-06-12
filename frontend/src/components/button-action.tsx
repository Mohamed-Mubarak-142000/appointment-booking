import {
  Button,
  CircularProgress,
  Typography,
  type ButtonProps,
  type SxProps,
  type Theme,
  type TypographyProps,
} from "@mui/material";
import { Iconify } from "./iconify";

const ButtonAction = ({
  title,
  icon,
  slotProps,
  onClick,
  isLoading = false,
  type = "button",
}: {
  title: string;
  icon?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit";
  slotProps?: {
    title?: TypographyProps;
    button?: ButtonProps;
    icon?: SxProps<Theme>;
  };
}) => {
  return (
    <Button
      type={type}
      fullWidth={slotProps?.button?.fullWidth}
      variant={slotProps?.button?.variant || "contained"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 0.5,
        fontSize: { xs: ".5rem", md: ".8rem", lg: "1rem" },
        ...slotProps?.button?.sx,
      }}
      onClick={onClick}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <Iconify
            icon={icon ?? ""}
            sx={{
              width: 20,
              height: 20,
              color: "text.disabled",
              ...slotProps?.icon,
            }}
          />
          <Typography
            variant={slotProps?.title?.variant ?? "body1"}
            sx={{
              fontSize: { xs: ".5rem", md: ".8rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
              ...slotProps?.title?.sx,
            }}
          >
            {title}
          </Typography>
        </>
      )}
    </Button>
  );
};

export default ButtonAction;
