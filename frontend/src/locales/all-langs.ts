// core (MUI)
import { arSA as arSACore } from "@mui/material/locale";
// date pickers (MUI)
import { enUS as enUSDate } from "@mui/x-date-pickers/locales";
// data grid (MUI)
import {
  enUS as enUSDataGrid,
  arSD as arSDDataGrid,
} from "@mui/x-data-grid/locales";

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: "en",
    label: "English",
    countryCode: "GB",
    dir: "ltr",
    adapterLocale: "en",
    numberFormat: { code: "en-US", currency: "AED" },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: "ar",
    label: "العربية",
    countryCode: "SA",
    dir: "rtl",
    adapterLocale: "ar-sa",
    numberFormat: { code: "ar", currency: "AED" },
    systemValue: {
      components: { ...arSACore.components, ...arSDDataGrid.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
