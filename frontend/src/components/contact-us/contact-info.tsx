import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslate } from "../../locales";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

const ContactInfo = () => {
  const { t } = useTranslate("contact-us");
  return (
    <Grid item xs={12} md={5} sx={{ mb: { xs: 4, md: 0 } }}>
      <StyledPaper>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          {t("contact_info.title")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ContactMailIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
          <Box>
            <Typography variant="subtitle1">
              {t("contact_info.email")}
            </Typography>
            <Typography variant="body2">
              {t("contact_info.email_value")}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <PhoneIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
          <Box>
            <Typography variant="subtitle1">
              {t("contact_info.phone")}
            </Typography>
            <Typography variant="body2">
              {t("contact_info.phone_value")}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
          <Box>
            <Typography variant="subtitle1">
              {t("contact_info.address")}
            </Typography>
            <Typography variant="body2">
              {t("contact_info.address_value")}
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </Grid>
  );
};

export default ContactInfo;
