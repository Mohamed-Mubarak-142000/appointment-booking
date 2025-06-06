import { useEffect, useCallback } from "react";
import { hasKeys, varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";

import { BaseOption } from "./base-option";
import { SmallBlock, LargeBlock } from "./styles";
import { FullScreenButton } from "./fullscreen-button";
import { FontSizeOptions, FontFamilyOptions } from "./font-options";
import { useSettingsContext } from "../context/use-settings-context";

import type { SettingsDrawerProps } from "../types";
import { themeConfig, type ThemeColorScheme } from "../../../theme";
import { Iconify } from "../../iconify";

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }: SettingsDrawerProps) {
  const settings = useSettingsContext();

  const { mode, setMode, systemMode } = useColorScheme();

  useEffect(() => {
    if (mode === "system" && systemMode) {
      settings.setState({ colorScheme: systemMode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, systemMode]);

  // Visible options by default settings
  const isFontFamilyVisible = hasKeys(defaultSettings, ["fontFamily"]);
  const isCompactLayoutVisible = hasKeys(defaultSettings, ["compactLayout"]);
  const isDirectionVisible = hasKeys(defaultSettings, ["direction"]);
  const isColorSchemeVisible = hasKeys(defaultSettings, ["colorScheme"]);
  const isContrastVisible = hasKeys(defaultSettings, ["contrast"]);
  const isFontSizeVisible = hasKeys(defaultSettings, ["fontSize"]);

  const handleReset = useCallback(() => {
    settings.onReset();
    setMode(defaultSettings.colorScheme as ThemeColorScheme);
  }, [defaultSettings.colorScheme, setMode, settings]);

  const renderHead = () => (
    <Box
      sx={{
        py: 2,
        pr: 1,
        pl: 2.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <FullScreenButton />

      <Tooltip title="Reset all">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = () => (
    <BaseOption
      label="Dark mode"
      icon="moon"
      selected={settings.state.colorScheme === "dark"}
      onChangeOption={() => {
        setMode(mode === "light" ? "dark" : "light");
        settings.setState({ colorScheme: mode === "light" ? "dark" : "light" });
      }}
    />
  );

  const renderContrast = () => (
    <BaseOption
      label="Contrast"
      icon="contrast"
      selected={settings.state.contrast === "hight"}
      onChangeOption={() =>
        settings.setState({
          contrast: settings.state.contrast === "default" ? "hight" : "default",
        })
      }
    />
  );

  const renderRtl = () => (
    <BaseOption
      label="Right to left"
      icon="align-right"
      selected={settings.state.direction === "rtl"}
      onChangeOption={() =>
        settings.setState({
          direction: settings.state.direction === "ltr" ? "rtl" : "ltr",
        })
      }
    />
  );

  const renderCompact = () => (
    <BaseOption
      tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
      label="Compact"
      icon="autofit-width"
      selected={!!settings.state.compactLayout}
      onChangeOption={() =>
        settings.setState({ compactLayout: !settings.state.compactLayout })
      }
    />
  );

  const renderFont = () => (
    <LargeBlock title="Font" sx={{ gap: 2.5 }}>
      {isFontFamilyVisible && (
        <SmallBlock
          label="Family"
          canReset={settings.state.fontFamily !== defaultSettings.fontFamily}
          onReset={() =>
            settings.setState({ fontFamily: defaultSettings.fontFamily })
          }
        >
          <FontFamilyOptions
            options={[
              themeConfig.fontFamily.primary,
              "Inter Variable",
              "DM Sans Variable",
              "Nunito Sans Variable",
            ]}
            value={settings.state.fontFamily}
            onChangeOption={(newOption) =>
              settings.setState({ fontFamily: newOption })
            }
          />
        </SmallBlock>
      )}
      {isFontSizeVisible && (
        <SmallBlock
          label="Size"
          canReset={settings.state.fontSize !== defaultSettings.fontSize}
          onReset={() =>
            settings.setState({ fontSize: defaultSettings.fontSize })
          }
          sx={{ gap: 5 }}
        >
          <FontSizeOptions
            options={[12, 20]}
            value={settings.state.fontSize}
            onChangeOption={(newOption) =>
              settings.setState({ fontSize: newOption })
            }
          />
        </SmallBlock>
      )}
    </LargeBlock>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{
        sx: [
          (theme) => ({
            ...theme.mixins.paperStyles(theme, {
              color: varAlpha(
                theme.vars.palette.background.defaultChannel,
                0.9
              ),
            }),
            width: 360,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ],
      }}
    >
      {renderHead()}

      <Box
        sx={{
          pb: 5,
          gap: 6,
          px: 2.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {isColorSchemeVisible && renderMode()}
          {isContrastVisible && renderContrast()}
          {isDirectionVisible && renderRtl()}
          {isCompactLayoutVisible && renderCompact()}
        </Box>

        {(isFontFamilyVisible || isFontSizeVisible) && renderFont()}
      </Box>
    </Drawer>
  );
}
