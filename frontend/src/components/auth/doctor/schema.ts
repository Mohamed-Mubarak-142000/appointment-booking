import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, "OTP must be 6 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
