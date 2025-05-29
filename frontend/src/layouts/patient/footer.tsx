import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../../components/logo";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { t } from "i18next";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.darker",
        color: "primary.contrastText",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3} sx={{ mb: 4 }}>
            <Logo />
            <Typography variant="body2" sx={{ mb: 2, mt: 2, paddingX: 1 }}>
              {t("footer.about.description")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <LocalHospitalIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                {t("footer.about.tagline")}
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CalendarMonthIcon sx={{ mr: 1, fontSize: "1rem" }} />
              {t("footer.services.title")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
                {t("footer.services.links.book_appointment")}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
                {t("footer.services.links.find_doctors")}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ mb: 1 }}>
                {t("footer.services.links.specialties")}
              </Link>
              <Link href="#" color="inherit" underline="hover">
                {t("footer.services.links.clinics")}
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ContactEmergencyIcon sx={{ mr: 1, fontSize: "1rem" }} />
              {t("footer.contact.title")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("footer.contact.address")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("footer.contact.email")}{" "}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("footer.contact.phone")}{" "}
            </Typography>
            <Typography variant="body2">
              {t("footer.contact.emergency")}
            </Typography>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t("footer.social.title")}
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>

            {/* Emergency Contact */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "error.dark",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {t("footer.social.emergency_section.title")}
              </Typography>
              <Typography variant="h6">
                {t("footer.social.emergency_section.number")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ pt: 4, mt: 4, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} {t("footer.copyright.main")}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            align="center"
            sx={{ mt: 1 }}
          >
            {t("footer.copyright.subtext")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
