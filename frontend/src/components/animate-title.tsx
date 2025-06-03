// components/AnimatedTitle.tsx
import { Box, Typography, type TypographyProps } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedTitleProps extends TypographyProps {
  text: string;
  delay?: number;
  charDelay?: number;
}

export const AnimatedTitle = ({
  text = "",
  delay = 0.5,
  charDelay = 0.05,
  ...typographyProps
}: AnimatedTitleProps) => {
  const typingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * charDelay,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const isArabic = (text: string) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  };

  const segments = useMemo(() => {
    if (isArabic(text)) {
      const wordsWithSpaces = text
        .split(/([\u0600-\u06FF]+|\s+)/)
        .filter(Boolean);
      return wordsWithSpaces;
    }
    // للغات الأخرى: تقسيم كل حرف على حدة
    return text.split("");
  }, [text]);

  return (
    <Typography
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: charDelay,
            delayChildren: delay,
          },
        },
      }}
      {...typographyProps}
      sx={{
        ...typographyProps.sx,
        lineHeight: 1.5,
      }}
    >
      {segments.map((segment, index) => (
        <Box
          component={motion.span}
          key={index}
          variants={typingVariants}
          custom={index}
          sx={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {segment === " " ? "\u00A0" : segment}
        </Box>
      ))}
    </Typography>
  );
};
