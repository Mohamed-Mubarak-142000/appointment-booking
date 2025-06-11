import { Box, Typography } from "@mui/material";
import type { Specialty } from "../../apis/use-case/get-all-specialiste";
import { getCurrentLang } from "../../locales";
import { assets } from "../../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const ItemSpecial = ({ item, image }: { item: Specialty; image: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/filter?specialty=${encodeURIComponent(item.value)}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        height: 250,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Box
        component={"img"}
        src={image || assets.General_physician}
        alt={item.value}
        sx={{ maxWidth: "100%" }}
      />
      <Typography
        variant="body2"
        sx={{
          textWrap: "wrap",
          mt: 1,
          textAlign: "center",
          color: "text.primary",
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
        }}
      >
        {getCurrentLang() === "ar" ? item.label.ar : item.label.en}
      </Typography>
    </Box>
  );
};

export default ItemSpecial;
