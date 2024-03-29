import * as z from "zod"

export const SigupValidation = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters'}),
    username: z.string().min(2, { message: 'Username must be at least 2 characters'}),
    email: z.string().min(2, { message: 'Email must be at least 2 characters'}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'}),
})

export const SigninValidation = z.object({
    email: z.string().min(2, { message: 'Email must be at least 2 characters'}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'}),
})

export const ForgotPasswordValidation = z.object({
    email: z.string().min(2, { message: 'Email must be at least 2 characters'}),
})