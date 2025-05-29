import { Box } from "@mui/material";
import HeroInfo from "./hero-info";
import HeroImage from "./hero-image";
const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.darker",
        width: "100%",
        mx: "auto",
        mt: { xs: 7, lg: 3 },
        borderRadius: 2,
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        },
        gap: 2,
        overflow: "hidden",
      }}
    >
      <HeroImage />
      <HeroInfo />
    </Box>
  );
};

export default Hero;
