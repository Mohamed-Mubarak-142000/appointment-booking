import i18next from "i18next";

import { allLangs } from "../all-langs";
import { fallbackLng } from "../locales-config";
import dayjs from "dayjs";

// ----------------------------------------------------------------------

export function formatNumberLocale() {
  const lng = i18next.resolvedLanguage ?? fallbackLng;

  const currentLang = allLangs.find((lang) => lang.value === lng);

  return {
    code: currentLang?.numberFormat.code,
    currency: currentLang?.numberFormat.currency,
  };
}

export function formatDateByLang(
  date: dayjs.ConfigType,
  lang: string = "en",
  format: string = "DD MMMM YYYY"
): string {
  dayjs.locale(lang);
  return dayjs(date).format(format);
}

export function formatDateTimeByLang(
  date: dayjs.ConfigType,
  lang: string = "en",
  format?: string
): string {
  dayjs.locale(lang);

  return format
    ? dayjs(date).format(format)
    : dayjs(date).format(
        lang === "ar" ? "DD MMMM YYYY - hh:mm A" : "MMMM D, YYYY - h:mm A"
      );
}
