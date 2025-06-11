import {
  Stack,
  Typography,
  type SxProps,
  type TypographyProps,
} from "@mui/material";
import type { Theme } from "@mui/system";

interface TitleSectionProps {
  title?: string;
  subTitle?: string;
  sx?: SxProps<Theme>;
  slotProps?: {
    title?: TypographyProps;
    subTitle?: TypographyProps;
  };
}

const TitleSection = ({
  title,
  subTitle,
  sx,
  slotProps,
}: TitleSectionProps) => {
  return (
    <Stack
      spacing={{ xs: 1 }}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {title && (
        <Typography
          variant={slotProps?.title?.variant ?? "h5"}
          color="primary.darker"
          sx={{
            fontSize: (theme) => theme.typography.pxToRem(24),
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textAlign: "center",
            ...slotProps?.title?.sx,
          }}
          {...slotProps?.title}
        >
          {title}
        </Typography>
      )}

      {subTitle && (
        <Typography
          variant={slotProps?.subTitle?.variant ?? "subtitle1"}
          sx={{
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
            fontWeight: (theme) => theme.typography.fontWeightRegular,
            ...slotProps?.subTitle?.sx,
          }}
          {...slotProps?.subTitle}
        >
          {subTitle}
        </Typography>
      )}
    </Stack>
  );
};

export default TitleSection;
