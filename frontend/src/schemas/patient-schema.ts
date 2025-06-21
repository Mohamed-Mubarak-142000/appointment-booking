import { z } from "zod";
// Patient Login Schema
export const patientLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type PatientLoginFormData = z.infer<typeof patientLoginSchema>;

export const patientRegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "الاسم يجب أن يحتوي على حرفين على الأقل")
      .max(50, "الاسم طويل جدًا"),

    email: z
      .string()
      .email("البريد الألكتروني غير صالح")
      .refine(
        (val) => {
          const invalidEndings = [".ocm", ".con", ".cmo", ".xom"];
          return !invalidEndings.some((ending) => val.endsWith(ending));
        },
        {
          message: "ربما تقصد .com وليس .ocm؟ تأكد من صحة الإيميل",
        }
      ),

    password: z
      .string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .max(20, "كلمة المرور لا يجب أن تتجاوز 20 حرفًا"),

    confirmPassword: z.string(),

    phone: z
      .string()
      .regex(/^\d{10,15}$/, "رقم الهاتف يجب أن يحتوي على 10 إلى 15 رقمًا فقط"),

    age: z.coerce
      .number()
      .min(1, "العمر يجب أن يكون على الأقل 1")
      .max(120, "العمر غير صالح"),

    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "اختر النوع من القيم المتاحة" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمتا المرور غير متطابقتين",
  });
export type PatientRegisterFormData = z.infer<typeof patientRegisterSchema>;

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يحتوي على حرفين على الأقل")
    .max(50, "الاسم طويل جدًا"),

  email: z
    .string()
    .email("البريد الألكتروني غير صالح")
    .refine(
      (val) => {
        const invalidEndings = [".ocm", ".con", ".cmo", ".xom"];
        return !invalidEndings.some((ending) => val.endsWith(ending));
      },
      {
        message: "ربما تقصد .com وليس .ocm؟ تأكد من صحة الإيميل",
      }
    ),

  photo: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be <5MB")
      .refine((file) => file.type.startsWith("image/"), "Must be an image"),
    z.string().url().optional(),
  ]),

  age: z.coerce
    .number()
    .min(1, "العمر يجب أن يكون على الأقل 1")
    .max(120, "العمر غير صالح"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "اختر النوع من القيم المتاحة" }),
  }),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
