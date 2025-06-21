import { useState } from "react";
import { Box, Card, useTheme } from "@mui/material";
import { Available } from "./available";
import DoctorInfo from "./doctor-info";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles"; // Use MUI's styled instead
import type { DoctorData } from "../../apis/use-case/types";
import { assets } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

// Define proper theme type
interface CustomTheme {
  palette: {
    primary: {
      main: string;
      dark: string;
    };
    grey: {
      100: string;
    };
    common: {
      white: string;
    };
    background: {
      paper: string;
    };
  };
}

const StyledMotionCard = styled(motion(Card))(
  ({ theme }: { theme: CustomTheme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "none",
    border: `solid 1px ${theme.palette.grey[100]}`,
    borderRadius: 0,
    overflow: "hidden",
    cursor: "pointer",
  })
);

const ImageContainer = styled(Box)(({ theme }: { theme: CustomTheme }) => ({
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  transition: "background-color 0.4s ease",
}));

const DoctorItem = ({ doctor }: { doctor: DoctorData }) => {
  console.log("dddddddddddddd", doctor);
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion hover animation config
  const whileHoverCard = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transition: { duration: 0.4 },
  };

  return (
    <Box
      component={Link}
      to={`/doctor-details/${doctor._id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        width: "100%",
      }}
    >
      <StyledMotionCard
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={whileHoverCard}
      >
        <ImageContainer
          sx={{
            backgroundColor: isHovered
              ? theme.palette.primary.dark
              : theme.palette.background.paper,
          }}
        >
          <motion.img
            src={doctor.photo || assets.doc1}
            alt={doctor.name}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </ImageContainer>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <Available />
          <DoctorInfo doctor={doctor} />
        </Box>
      </StyledMotionCard>
    </Box>
  );
};

export default DoctorItem;
