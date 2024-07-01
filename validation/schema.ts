
import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    termsAndConditions: z.boolean().refine((value) => value === true, {
        message: "You must accept the terms and conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export const signInSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export const profileSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    image: z.string().optional(),
})


export const changePasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, { message: "New Password must be at least 8 characters." }),
    confirmPassword: z
        .string()
        .min(8, { message: "Confirm Password must be at least 8 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})