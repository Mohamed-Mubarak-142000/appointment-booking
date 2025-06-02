import {
  Stack,
  Tabs,
  Tab,
  type TabsProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import React from "react";
import type { TabProps } from "../types";

interface CustomTabsProps {
  tabs: TabProps[];
  children?: React.ReactNode;
  tabIndex?: number;
  onTabChange?: (index: number) => void;
  spacing?: number;
  sxTab?: SxProps<Theme>;
  slotsProps?: {
    tab?: TabProps;
    tabs?: TabsProps;
  };
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  children,
  tabIndex: controlledTabIndex,
  onTabChange,
  slotsProps,
  sxTab,
  spacing = 5,
}) => {
  const [internalTabIndex, setInternalTabIndex] = React.useState(0);
  const isControlled = controlledTabIndex !== undefined && onTabChange;

  const tabIndex = isControlled ? controlledTabIndex : internalTabIndex;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (isControlled) {
      onTabChange?.(newValue);
    } else {
      setInternalTabIndex(newValue);
    }
  };

  return (
    <Stack spacing={spacing}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Custom Tabs"
        sx={{
          borderRadius: 1,
          backgroundColor: (theme) => theme.palette.primary.lighter,
          "& .MuiTabs-flexContainer": {
            justifyContent: "start",
            borderRadius: 1,
            gap: 0.5,
          },
          "& .MuiTabs-indicator": {
            display: "none",
            backgroundColor: (theme) => theme.palette.primary.main,
          },
          ...slotsProps?.tabs?.sx,
        }}
        {...slotsProps?.tabs}
      >
        {tabs.map((item, index) => (
          <Tab
            label={item.label}
            key={item.value}
            value={index}
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontSize: { xs: ".5rem", md: ".75rem", lg: ".9rem" },
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
              ...sxTab,
            }}
            {...slotsProps?.tab}
          />
        ))}
      </Tabs>
      {children}
    </Stack>
  );
};

export default CustomTabs;
