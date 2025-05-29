import { Tab, Tabs } from "@mui/material";
import { useTranslate } from "../../locales";
import type { AuthTab } from "../../types";

const AuthTabsToggle = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: AuthTab;
  setCurrentTab: (tab: AuthTab) => void;
}) => {
  const { t } = useTranslate("common");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: AuthTab) => {
    setCurrentTab(newValue);
  };
  return (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      variant="fullWidth"
      sx={{
        mb: 2,
        "& .MuiTabs-flexContainer": {
          backgroundColor: (theme) => theme.palette.primary.lighter,
          justifyContent: "start",
          borderRadius: 1,
          width: "100%",
          gap: 2,
        },
        "& .MuiTabs-indicator": {
          display: "none",
          backgroundColor: (theme) => theme.palette.primary.main,
        },
      }}
    >
      <Tab
        sx={{
          color: (theme) => theme.palette.text.primary,
          fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          paddingX: 2,
          borderRadius: "inherit",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.text.primary,
          },
          "&.Mui-selected": {
            color: (theme) => theme.palette.common.white,
            backgroundColor: (theme) => theme.palette.primary.darker,
          },
        }}
        label={t("navbar.login")}
        value={"login"}
      />
      <Tab
        sx={{
          color: (theme) => theme.palette.text.primary,
          fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          paddingX: 2,
          borderRadius: "inherit",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.text.primary,
          },
          "&.Mui-selected": {
            color: (theme) => theme.palette.common.white,
            backgroundColor: (theme) => theme.palette.primary.darker,
          },
        }}
        label={t("navbar.register")}
        value={"register"}
      />
    </Tabs>
  );
};

export default AuthTabsToggle;
