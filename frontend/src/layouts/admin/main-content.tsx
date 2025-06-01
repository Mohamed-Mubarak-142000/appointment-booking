// src/components/dashboard/MainContent.tsx
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface MainContentProps {
  open: boolean;
  drawerWidth: number;
  children?: React.ReactNode;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MainContent = ({ open, drawerWidth, children }: MainContentProps) => {
  return (
    <Main open={open} drawerWidth={drawerWidth}>
      <div style={{ height: "64px" }} />
      <Box sx={{ minHeight: "calc(100vh - 128px)", p: 3 }}>
        {children || <Outlet />}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: (theme) => theme.palette.primary.lighter,
        }}
      >
        <Typography variant="body2" color="text.primary" align="center">
          © {new Date().getFullYear()} MedCare Healthcare System
        </Typography>
      </Box>
    </Main>
  );
};

export default MainContent;
