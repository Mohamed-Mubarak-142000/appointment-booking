import { Controller, useForm } from "react-hook-form";
import { reviewFormSchema, type ReviewFormValues } from "../../schemas/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReviews } from "../../apis/use-case/doctor/review";
import { usePatientAuth } from "../../context/auth-context";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../locales";

const AddCommentForm = ({ doctorId }: { doctorId: string }) => {
  const { reviewsQuery, addReviewMutation } = useReviews(doctorId);
  const { patient: user } = usePatientAuth();
  const { t } = useTranslate("appointment");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    addReviewMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const hasReviewed = reviewsQuery.data?.data.some(
    (review) => review.patient._id === user?._id
  );

  return (
    user?.role === "Patient" &&
    !hasReviewed && (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[1],
        }}
      >
        <Typography variant="h6" gutterBottom>
          {t("comments.add_review")}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography component="legend">{t("comments.rating")}</Typography>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating
                {...field}
                value={field.value}
                onChange={(_, value) => field.onChange(value)}
                precision={1}
                size="large"
              />
            )}
          />
          {errors.rating && (
            <Typography color="error" variant="body2">
              {errors.rating.message}
            </Typography>
          )}
        </Box>
        <TextField
          {...register("comment")}
          label={t("add_review_label")}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          error={!!errors.comment}
          helperText={errors.comment?.message}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "primary.darker",
            borderRadius: 0.5,
            "&:hover": { backgroundColor: "primary.dark" },
          }}
          disabled={addReviewMutation.isPending}
        >
          {addReviewMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            t("comments.send_comment")
          )}
        </Button>
      </Box>
    )
  );
};

export default AddCommentForm;
