import z from "zod";

  export const userZodSchema = z.object({
     name: z
         .string().nonempty({ message: "Name is required" })
         .min(3, { message: "Name must be at least 3 characters long" })
         .max(50, "Name cannot exceed 50 characters."),
 
     email: z
         .email({ message: "Invalid email address format." })
         .min(5, { message: "email must be at least characters long" })
         .max(100, { message: "Email cannot exceed 100 characters." }),
     password: z
         .string({ error: "Password must be string" })
         .min(8, { message: "Password must be at least 8 characters long." })
         .regex(/^(?=.*[A-Z])/, {
             message: "Password must contain at least 1 uppercase letter.",
         })
         .regex(/^(?=.*[!@#$%^&*])/, {
             message: "Password must contain at least 1 special character.",
         })
         .regex(/^(?=.*\d)/, {
             message: "Password must contain at least 1 number.",
         }),
     phone: z
         .string({ error: "Phone number must be string" })
         .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX" })
         .optional(),
     address: z
         .string({ error: "Address must be string" })
         .max(200, { message: "Address cannot exceed 200 characters." })
         .optional()
 
 })
 