import { Box, Rating, Stack, Typography } from "@mui/material";
import { useReviews } from "../../apis/use-case/doctor/review";
import { useTranslate } from "../../locales";

const TitleRatingComments = ({ doctorId }: { doctorId: string }) => {
  const { reviewsQuery } = useReviews(doctorId);
  const { t } = useTranslate("appointment");
  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        {t("comments.patient_review")}
      </Typography>

      {reviewsQuery.data && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating
            value={reviewsQuery.data.averageRating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {reviewsQuery.data.averageRating.toFixed(1)} (
            {reviewsQuery.data.count}) {t("comments.review")}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default TitleRatingComments;
