import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { allLangs } from "./all-langs";
import { fallbackLng, changeLangMessages as messages } from "./locales-config";

import type { LanguageValue } from "./locales-config";

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find(
    (lang) => lang.value === i18n.resolvedLanguage
  );

  const onChangeLang = useCallback(
    (newLang: LanguageValue) => {
      try {
        if (i18n.resolvedLanguage === newLang) {
          return;
        }
        i18n.changeLanguage(newLang);
        window.location.reload();
      } catch (error) {
        console.error(error);
        const errorMessages = messages[newLang] || messages.en;
        console.log("errorMessages", errorMessages);
      }
    },
    [i18n]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
    dir: currentLang?.dir,
  };
}
