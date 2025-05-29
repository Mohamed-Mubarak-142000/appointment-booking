import { Box } from "@mui/material";
import { assets } from "../../assets/assets_frontend/assets";

const HeroImage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
        width: {
          xs: 300,
          md: 400,
          lg: "100%",
        },

        height: {
          xs: 300,
          md: 400,
          lg: "100%",
        },
      }}
    >
      <img src={assets.header_img} alt="Hero Image" />
    </Box>
  );
};

export default HeroImage;
