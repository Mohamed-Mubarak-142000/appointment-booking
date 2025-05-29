// schemas/contact-us.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" })
    .max(50, { message: "يجب أن لا يتجاوز الاسم 50 حرف" }),
  email: z.string().email({ message: "بريد إلكتروني غير صالح" }),
  phone: z
    .string()
    .min(10, { message: "يجب أن يكون رقم الهاتف 10 أرقام على الأقل" })
    .max(15, { message: "يجب أن لا يتجاوز رقم الهاتف 15 رقما" })
    .regex(/^[0-9]+$/, { message: "يجب أن يحتوي على أرقام فقط" }),
  message: z
    .string()
    .min(10, { message: "يجب أن تكون الرسالة 10 أحرف على الأقل" })
    .max(500, { message: "يجب أن لا تتجاوز الرسالة 500 حرف" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
