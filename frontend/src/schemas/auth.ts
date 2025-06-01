import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form schema
export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    age: z.number().min(1, "Age must be at least 1").max(120, "Invalid age"),
    gender: z.enum(["male", "female"]),
    role: z.enum(["doctor", "patient"]).optional(),
    specialty: z.string().optional(),
    governorate: z.string().optional(),
    address: z.string().optional(),
    experience: z.coerce.number().optional(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  age: z
    .number()
    .int("Age must be an integer")
    .min(0, "Age must be a positive number")
    .max(120, "Age must be less than 120"),
  gender: z.enum(["male", "female", "other"]),
  photo: z.string().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
