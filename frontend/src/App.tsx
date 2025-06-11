import { useEffect } from "react";
import { LocalizationProvider } from "./locales";
import { CssBaseline } from "@mui/material";
import { themeConfig, ThemeProvider } from "./theme";
import { defaultSettings, SettingsProvider } from "./components/settings";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./app-routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Lazy load pages

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key?.startsWith("oidc.")) {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  return (
    <SettingsProvider defaultSettings={defaultSettings}>
      <LocalizationProvider>
        <CssBaseline />
        <ToastContainer
          autoClose={1000}
          hideProgressBar
          position="top-center"
          theme="dark"
        />
        <ThemeProvider
          noSsr
          defaultMode={themeConfig.defaultMode}
          modeStorageKey={themeConfig.modeStorageKey}
        >
          <AppRoutes />
        </ThemeProvider>
      </LocalizationProvider>
    </SettingsProvider>
  );
}

export default App;
