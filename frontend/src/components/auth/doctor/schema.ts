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
    specialty: z.string().min(3, "Specialty must be at least 3 characters"),
    phone: z.string().min(10, "Phone must be at least 10 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type DoctorRegisterFormData = z.infer<typeof doctorRegisterSchema>;
