import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useTranslate } from "../locales";

const Logo = ({ sx, image }: { sx?: SxProps<Theme>; image?: string }) => {
  const { t } = useTranslate("common");
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        textDecoration: "none",
        ...sx,
      }}
    >
      <img
        src={image || assets.logo}
        alt="Dokto logo"
        style={{
          width: 50,
          height: 50,
          objectFit: "contain",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "white",
          fontFamily: "'Poppins', sans-serif",
          whiteSpace: "nowrap", // يمنع الانتقال للسطر الجديد
          "& span": {
            color: "success.dark",
            marginLeft: "0 !important", // يزيل أي مسافة على اليسار
          },
        }}
      >
        {t("logo.part1_title")}
        <span>{t("logo.part2_title")}</span>
      </Typography>
    </Box>
  );
};

export default Logo;
