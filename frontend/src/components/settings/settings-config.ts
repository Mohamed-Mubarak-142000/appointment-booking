import { themeConfig } from "../../theme";
import type { SettingsState } from "./types";

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY: string = "app-settings";

export const defaultSettings: SettingsState = {
  colorScheme: themeConfig.defaultMode,
  direction: themeConfig.direction,
  contrast: "default",
  navLayout: "vertical",
  primaryColor: "default",
  navColor: "integrate",
  compactLayout: true,
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.getFont(themeConfig.direction).primary,
};
