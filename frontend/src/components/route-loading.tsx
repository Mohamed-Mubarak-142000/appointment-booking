// src/components/loading/route-loading.tsx
import { Box, CircularProgress, Fade } from "@mui/material";
import { useEffect, useState } from "react";

export function RouteLoading() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={showLoading} timeout={500}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "background.paper",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    </Fade>
  );
}
