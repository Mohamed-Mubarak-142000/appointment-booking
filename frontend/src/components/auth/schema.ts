import { z } from "zod";

// Patient Login Schema
export const patientLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type PatientLoginFormData = z.infer<typeof patientLoginSchema>;

// Patient Register Schema
export const patientRegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    age: z.coerce
      .number() // Converts strings to numbers
      .min(1, "Age must be at least 1")
      .max(120, "Invalid age"),
    gender: z.enum(["male", "female", "other"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PatientRegisterFormData = z.infer<typeof patientRegisterSchema>;
