import {
  Button,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { contactSchema, type ContactFormData } from "../../schemas/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslate } from "../../locales";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

const ContactForm = () => {
  const { t } = useTranslate("contact-us");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    alert("تم إرسال رسالتك بنجاح!");
    reset();
  };

  return (
    <Grid item xs={12} md={7}>
      <StyledPaper>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          {t("contact_form.title")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={{ xs: 0, lg: 3 }}>
            <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={t("contact_form.name")}
                placeholder={t("contact_form.name_placeholder")}
                variant="outlined"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message as string}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={t("contact_form.email")}
                placeholder={t("contact_form.email_placeholder")}
                variant="outlined"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message as string}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={t("contact_form.phone")}
                placeholder={t("contact_form.phone_placeholder")}
                variant="outlined"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message as string}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label={t("contact_form.message")}
                placeholder={t("contact_form.message_placeholder")}
                variant="outlined"
                multiline
                rows={4}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message as string}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                {t("contact_form.submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default ContactForm;
