// في ملف review-schema.ts
import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
