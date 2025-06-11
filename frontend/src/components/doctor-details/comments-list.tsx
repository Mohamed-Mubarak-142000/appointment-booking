import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import type { Review } from "../../apis/use-case/types";
import { usePatientAuth } from "../../context/auth-context";
import { useReviews } from "../../apis/use-case/doctor/review";

const CommentList = ({
  reviews,
  doctorId,
  isPending,
  isError,
}: {
  reviews: Review[];
  doctorId: string;
  isPending: boolean;
  isError: boolean;
}) => {
  const { user } = usePatientAuth();
  const { deleteReviewMutation } = useReviews(doctorId);

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress sx={{ color: "primary.darker" }} size={24} />
      </Box>
    );
  }

  if (isError || !reviews.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">
          No reviews yet. Be the first to review!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {reviews.map((review) => (
        <Box
          key={review._id}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={review.patient.photo}
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                  backgroundColor: "primary.darker",
                  textTransform: "uppercase",
                }}
              >
                {`${review.patient.name
                  .split(" ")[0]
                  .charAt(0)}${review.patient.name.split(" ")[1].charAt(0)}`}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ textTransform: "capitalize" }}
                >
                  {review.patient.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(review.createdAt), "MMMM dd, yyyy")}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Rating value={review.rating} precision={0.5} readOnly />
              {user?._id === review.patient._id && (
                <IconButton
                  onClick={() => handleDeleteReview(review._id)}
                  disabled={deleteReviewMutation.isPending}
                >
                  <Delete color="error" />
                </IconButton>
              )}
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {review.comment}
          </Typography>

          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
