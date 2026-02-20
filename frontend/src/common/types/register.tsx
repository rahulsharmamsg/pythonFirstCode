import * as z from "zod"

export const registerSchema  = z.object({
  userName: z.string().min(1, "Username is required"),
  emailId: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  gender: z.enum(["male", "female", "other"], "Select a gender"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
// End User Register validation schema 
export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>

// Login Schema 
export type LoginFormData = {
  userName: string;
  password: string;
};