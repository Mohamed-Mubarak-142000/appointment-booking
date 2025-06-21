import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useReviews } from "../../apis/use-case/doctor/review";
import TitleRatingComments from "./title-rating-comments";
import AlertNotLogin from "./alert-not-login";
import AddCommentForm from "./add-comment-form";
import CommentList from "./comments-list";

interface PatientsCommentsProps {
  doctorId: string;
}

export const PatientsComments = ({ doctorId }: PatientsCommentsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { reviewsQuery } = useReviews(doctorId);

  return (
    <Box sx={{ mt: 4, p: isMobile ? 1 : 3 }}>
      <TitleRatingComments doctorId={doctorId} />
      <AlertNotLogin />
      <AddCommentForm doctorId={doctorId} />
      <CommentList
        isPending={reviewsQuery.isLoading}
        isError={reviewsQuery.isError}
        doctorId={doctorId}
        reviews={reviewsQuery?.data?.data || []}
      />
    </Box>
  );
};
