import {
  Box,
  Stack,
  Typography,
  type SxProps,
  type Theme,
  type TypographyProps,
} from "@mui/material";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets_frontend/assets";
import { AnimatedTitle } from "../animate-title";

export const FormHeader = ({
  title = "Welcome to Our Platform",
  subtitle,
  slotProps,
  widthImage = 100,
  sx,
}: {
  title?: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
  widthImage?: number;
  slotProps?: {
    title: TypographyProps;
    subtitle: TypographyProps;
  };
}) => {
  return (
    <Stack spacing={1} sx={{ alignItems: "center", ...sx }}>
      {/* Logo with continuous rotation and scale animation */}
      <Box
        component={motion.div}
        initial={{ rotateZ: 0, scale: 1 }}
        animate={{
          rotateZ: 360,
          scale: [1, 1.1, 1], // Scale animation sequence
        }}
        transition={{
          rotateZ: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        sx={{
          width: `${widthImage}px`,
          height: "auto",
        }}
      >
        <Box
          component="img"
          src={assets.logo}
          alt="logo"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Using the new AnimatedTitle component */}
      <AnimatedTitle
        text={title}
        fontWeight="bold"
        mb={3}
        textAlign="center"
        fontSize={{ xs: ".6rem", md: ".9rem", lg: "1.2rem" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          ...slotProps?.title?.sx,
        }}
      />
      {subtitle && (
        <Typography
          variant={slotProps?.subtitle?.variant ?? "subtitle1"}
          color="text.secondary"
          {...slotProps?.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
