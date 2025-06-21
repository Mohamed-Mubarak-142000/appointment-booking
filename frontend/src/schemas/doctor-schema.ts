import { z } from "zod";

// Doctor Login Schema
export const doctorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type DoctorLoginFormData = z.infer<typeof doctorLoginSchema>;

// Doctor Register Schema

export const doctorRegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    specialty: z.string({
      required_error: "Specialty is required",
      invalid_type_error: "Specialty must be a string",
    }),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),

    governorate: z.string({
      required_error: "Governorate is required",
      invalid_type_error: "Governorate must be a string",
    }),
    address: z.string().min(5, "Address must be at least 5 characters"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    age: z.coerce
      .number() // Converts strings to numbers
      .min(1, "Age must be at least 1")
      .max(120, "Invalid age"),
    bio: z.string().min(20, "Bio must be at least 20 characters").optional(),
    experience: z.coerce.number().min(0, "Experience cannot be negative"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type DoctorRegisterFormData = z.infer<typeof doctorRegisterSchema>;

// Doctor Profile Update Schema
export const doctorUpdateSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    specialty: z
      .string()
      .min(3, "Specialty must be at least 3 characters")
      .optional(),
    governorate: z.string().min(1, "Governorate is required").optional(),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .optional(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone must contain only numbers")
      .optional(),
    age: z.coerce
      .number()
      .min(1, "Age must be at least 1")
      .max(120, "Invalid age")
      .optional(),
    bio: z.string().min(20, "Bio must be at least 20 characters").optional(),
    experience: z.coerce
      .number()
      .min(0, "Experience cannot be negative")
      .optional(),
    photo: z.union([
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "File size must be <5MB"
        )
        .refine((file) => file.type.startsWith("image/"), "Must be an image"),
      z.string().url().optional(),
    ]),
    gender: z.enum(["male", "female", "other"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
    path: ["root"],
  });

export type DoctorUpdateFormData = z.infer<typeof doctorUpdateSchema>;
