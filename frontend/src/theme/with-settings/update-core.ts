import type { ColorSystem } from "@mui/material/styles";

import { hexToRgbChannel, createPaletteChannel } from "minimal-shared/utils";

import { themeConfig } from "../theme-config";
import { primaryColorPresets } from "./color-presets";
import { createShadowColor } from "../core/custom-shadows";

import type { ThemeOptions, ThemeColorScheme } from "../types";
import type { SettingsState } from "../../components/settings";

// ----------------------------------------------------------------------

/**
 * Update the core theme with the settings state.
 * @contrast
 * @primaryColor
 */

export function updateCoreWithSettings(
  theme: ThemeOptions,
  settingsState?: SettingsState
): ThemeOptions {
  const {
    direction,
    fontFamily,
    contrast = "default",
    primaryColor = "default",
  } = settingsState ?? {};

  const isDefaultContrast = contrast === "default";
  const isDefaultPrimaryColor = primaryColor === "default";

  const lightPalette = theme.colorSchemes?.light
    .palette as ColorSystem["palette"];

  const updatedPrimaryColor = createPaletteChannel(
    primaryColorPresets[primaryColor]
  );
  // const updatedSecondaryColor = createPaletteChannel(SECONDARY_COLORS[primaryColor!]);

  const updateColorScheme = (scheme: ThemeColorScheme) => {
    const colorSchemes = theme.colorSchemes?.[scheme];

    const updatedPalette = {
      ...colorSchemes?.palette,
      ...(!isDefaultPrimaryColor && {
        primary: updatedPrimaryColor,
        // secondary: updatedSecondaryColor,
      }),
      ...(scheme === "light" && {
        background: {
          ...lightPalette?.background,
          ...(!isDefaultContrast && {
            default: lightPalette.grey[200],
            defaultChannel: hexToRgbChannel(lightPalette.grey[200]),
          }),
        },
      }),
    };

    const updatedCustomShadows = {
      ...colorSchemes?.customShadows,
      ...(!isDefaultPrimaryColor && {
        primary: createShadowColor(updatedPrimaryColor.mainChannel),
        // secondary: createShadowColor(updatedSecondaryColor.mainChannel),
      }),
    };

    return {
      ...colorSchemes,
      palette: updatedPalette,
      customShadows: updatedCustomShadows,
    };
  };

  // Get the current direction, either from settingsState or fallback to default
  const currentDirection = direction || theme.direction || "ltr";

  // Get the appropriate fonts based on the direction
  const fontConfig = themeConfig.fontFamily.getFont(currentDirection);

  return {
    ...theme,
    direction: currentDirection,
    colorSchemes: {
      light: updateColorScheme("light"),
      dark: updateColorScheme("dark"),
    },
    typography: {
      ...theme.typography,
      fontFamily,
      fontSecondaryFamily: fontConfig.secondary,
    },
  };
}
