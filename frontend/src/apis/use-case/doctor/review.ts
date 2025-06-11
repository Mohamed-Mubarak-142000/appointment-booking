// في ملف review-api.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doctorApiClient, patientApiClient } from "../../api-client";
import type { Review } from "../types";
import type { AxiosError } from "axios";

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
  averageRating: number;
  count: number;
}

export interface AddReviewRequest {
  rating: number;
  comment: string;
}

export const reviewApi = {
  getReviews: (doctorId: string) => {
    return doctorApiClient.get<ReviewsResponse>(`/doctors/${doctorId}/reviews`);
  },
  addReview: (doctorId: string, reviewData: AddReviewRequest) => {
    return patientApiClient.post(`/doctors/${doctorId}/reviews`, reviewData);
  },
  deleteReview: (reviewId: string) => {
    return patientApiClient.delete(`/doctors/reviews/${reviewId}`);
  },
};

export function useReviews(doctorId: string) {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery<ReviewsResponse, AxiosError>({
    queryKey: ["reviews", doctorId],
    queryFn: () => reviewApi.getReviews(doctorId).then((res) => res.data),
    enabled: !!doctorId,
  });

  const addReviewMutation = useMutation({
    mutationFn: (data: AddReviewRequest) =>
      reviewApi.addReview(doctorId, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", doctorId] });
      queryClient.invalidateQueries({ queryKey: ["doctor", doctorId] });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) =>
      reviewApi.deleteReview(reviewId).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", doctorId] });
      queryClient.invalidateQueries({ queryKey: ["doctor", doctorId] });
    },
  });

  return {
    reviewsQuery,
    addReviewMutation,
    deleteReviewMutation,
  };
}
