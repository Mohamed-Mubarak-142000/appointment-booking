import type { Theme } from "@mui/material/styles";
import type { MRT_Theme } from "material-react-table";

export const MRT_Custom_Theme:
  | ((theme: Theme) => Partial<MRT_Theme>)
  | Partial<MRT_Theme>
  | undefined = (theme) => ({
  menuBackgroundColor: "transparent",
  matchHighlightColor: theme.palette.primary.lighter,
}); //add custom theme here
