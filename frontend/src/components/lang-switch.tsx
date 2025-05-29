import type { IconButtonProps } from "@mui/material/IconButton";

import { m } from "framer-motion";
import { useCallback } from "react";
import { usePopover } from "minimal-shared/hooks";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useSettingsContext } from "./settings";
import { allLangs, useTranslate, type LanguageValue } from "../locales";
import { CustomPopover } from "./custom-popover";
import { themeConfig } from "../theme";

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
  data?: {
    value: string;
    label: string;
    countryCode: string;
  }[];
};

export function CustomerLanguagePopover({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data = [],
  sx,
  ...other
}: LanguagePopoverProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const { onChangeLang, currentLang } = useTranslate();
  const { setField } = useSettingsContext();

  const handleChangeLang = useCallback(
    (newLang: LanguageValue) => {
      onChangeLang(newLang);
      setField("direction", newLang === "ar" ? "rtl" : "ltr");
      setField(
        "fontFamily",
        themeConfig.fontFamily.getFont(newLang === "ar" ? "rtl" : "ltr").primary
      );
      onClose();
    },
    [onChangeLang, onClose, setField]
  );

  const renderMenuList = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuList
        sx={{
          width: 160,
          minHeight: 72,
          color: (theme) => theme.palette.primary.dark,
        }}
      >
        {allLangs?.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang?.value}
            onClick={() => handleChangeLang(option.value)}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            {/* <FlagIcon code={option.countryCode} /> */}
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <IconButton
        component={m.button}
        aria-label="Languages button"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            mr: 5,
            width: 60,
            height: 60,
            ...(open && { bgcolor: theme.vars.palette.action.selected }),

            "&:hover": { bgcolor: "transparent" },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            cursor: "pointer",
            gap: 0.5,
            color: (theme) => theme.palette.primary.dark,
          }}
        >
          <img
            src={`https://flagcdn.com/w20/${currentLang?.countryCode.toLowerCase()}.png`}
            alt={currentLang?.label}
            style={{ width: 20, height: 15, objectFit: "cover" }}
          />
          <Typography variant="body1">{currentLang?.label}</Typography>
        </Box>
      </IconButton>

      {renderMenuList()}
    </>
  );
}
