import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";

import DescriptionContactPage from "../components/contact-us/description-contact-us";
import ContactInfo from "../components/contact-us/contact-info";
import ContactForm from "../components/contact-us/contact-form";

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <DescriptionContactPage isMobile={isMobile} />
        <Grid container spacing={{ xs: 0, md: 4 }} sx={{ mt: 4 }}>
          <ContactInfo />
          <ContactForm />
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
