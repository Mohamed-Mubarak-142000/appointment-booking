import { Box, Typography } from "@mui/material";
import type { Speciality } from "../../types";

const ItemSpecial = ({ item }: { item: Speciality }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component={"img"} src={item.image} alt={item.image} />

      <Typography
        variant="body2"
        sx={{
          textWrap: "nowrap",
          mt: 1,
          color: "text.primary",
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
        }}
      >
        {item.speciality}
      </Typography>
    </Box>
  );
};

export default ItemSpecial;
