import { Box, Typography, Stack } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";

export const FormHeader = () => (
  <Stack spacing={2} sx={{ alignItems: "center" }}>
    <Box
      component={"img"}
      src={assets.logo}
      alt={"logo"}
      sx={{
        width: 100,
        height: "auto",
        objectFit: "contain",
      }}
    />
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        mb: 3,
        fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
      }}
      gutterBottom
    >
      welcome to our tabeebak app
    </Typography>
  </Stack>
);
