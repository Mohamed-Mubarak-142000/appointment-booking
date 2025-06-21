import type { CommonColors } from "@mui/material/styles/createPalette";

import type { PaletteColorNoChannels } from "./core/palette";
import type {
  ThemeDirection,
  ThemeColorScheme,
  ThemeCssVariables,
} from "./types";

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: ThemeDirection;
  defaultMode: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: {
    primary: string;
    secondary: string;
    getFont: (direction: ThemeDirection) => {
      primary: string;
      secondary: string;
    };
  };
  palette: Record<
    "primary" | "secondary" | "info" | "success" | "warning" | "error",
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, "black" | "white">;
    grey: Record<
      | "50"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900"
      | "surface_subtle"
      | "surface_default"
      | "surface_background"
      | "surface_disabled"
      | "border_default"
      | "border_disabled"
      | "border_darker"
      | "text_title"
      | "text_body"
      | "text_subtitle"
      | "text_caption"
      | "text_negative"
      | "text_disabled",
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  direction: "ltr",
  defaultMode: "light",
  modeStorageKey: "theme-mode",
  classesPrefix: "minimal",
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: "Roboto",
    secondary: "Noto Kufi Arabic",
    getFont: (direction: ThemeDirection) => {
      if (direction === "rtl") {
        return {
          primary: "Noto Kufi Arabic",
          secondary: "Roboto",
        };
      }
      return {
        primary: "Roboto",
        secondary: "Noto Kufi Arabic",
      };
    },
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: "#F3ECE3", // --primary-50
      light: "#D8C1A1", // --primary-300
      main: "#bf9e66", // --primary-600
      dark: "#836C4C", // --primary-800
      darker: "#6B4615", // --primary-900
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#f8e8e8", // --secondary-50
      light: "#d27474", // --secondary-300
      main: "#973131", // --secondary-500
      dark: "#5c1e1e", // --secondary-700
      darker: "#1f0a0a", // --secondary-900
      contrastText: "#FFFFFF",
    },
    info: {
      lighter: "#fffcf5", // --third-50
      light: "#fbe5b6", // --third-300
      main: "#f5bc42", // --third-600
      dark: "#926607", // --third-800
      darker: "#493304", // --third-900
      contrastText: "#1C252E",
    },
    success: {
      lighter: "#eefcf1", // --success-50
      light: "#a2ecb1", // --success-300
      main: "#62DF7B", // --success-600
      dark: "#21A13A", // --success-800
      darker: "#0b3714", // --success-900
      contrastText: "#ffffff",
    },
    warning: {
      lighter: "#fff5eb", // --warning-50
      light: "#fec48a", // --warning-300
      main: "#FE9C3B", // --warning-600
      dark: "#BC5E01", // --warning-800
      darker: "#3d1f00", // --warning-900
      contrastText: "#1C252E",
    },
    error: {
      lighter: "#ffebeb", // --error-50
      light: "#fe8a8a", // --error-300
      main: "#FE3B3B", // --error-600
      dark: "#7f0101", // --error-800
      darker: "#BC0101", // --error-900
      contrastText: "#FFFFFF",
    },
    grey: {
      "50": "#fefefe", // --grey-50
      "100": "#efeef1", // --grey-100
      "200": "#dddae2", // --grey-200
      "300": "#cdc9d4", // --grey-300
      "400": "#bbb5c4", // --grey-400
      "500": "#aba4b7", // --grey-500
      "600": "#867c97", // --grey-600
      "700": "#655c75", // --grey-700
      "800": "#433d4d", // --grey-800
      "900": "#232028", // --grey-900
      surface_subtle: "#FEFEFE", // --surface-subtle
      surface_background: "#FFFCF7", // --surface-background
      surface_default: "#EFEEF1", // --surface-default
      surface_disabled: "#CDC9D4", // --surface-disabled
      border_default: "#BBB5C4", // --border-default
      border_disabled: "#CDC9D4", // --border-disabled
      border_darker: "#655C75", // --border-darker
      text_title: "#232028", // --text-title
      text_body: "#433D4D", // --text-body
      text_subtitle: "#867C97", // --text-subtitle
      text_caption: "#ABA4B7", // --text-caption
      text_negative: "#FEFEFE", // --text-negative
      text_disabled: "#DDDAE2", // --text-disabled
    },
    common: { black: "#111014", white: "#FFFFFF" },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: "",
    colorSchemeSelector: "data-color-scheme",
  },
};
