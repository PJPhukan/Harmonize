import { z } from 'zod'

//sign up schema
export const SignUpSchema = z.object({
    username: z.string()
        .min(3, "Username must be atleast 2 characters")
        .max(15, "Username must be no more than 15 character")
        .regex(/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters")
    ,
    fullname: z.string()
        .min(3, "Fullname must be atleast 3 characters")
        .max(50, "Fullname must be no more than 50 characters")
    ,
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid email"),

    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/[a-z]+/, { message: "Password should be contain atleast one lower case" })
        .regex(/[A-Z]+/, { message: "Password should be contain atleast one upper case" })
        .regex(/[0-9]+/, { message: "Password should be contain atleast one number" })
        .regex(/[^a-zA-Z0-9]+/, { message: "Password should be contain atleast one speacial character" })
    ,
    confirmPassword: z.string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/[a-z]+/, { message: "Password should be contain atleast one lower case" })
        .regex(/[A-Z]+/, { message: "Password should be contain atleast one upper case" })
        .regex(/[0-9]+/, { message: "Password should be contain atleast one number" })
        .regex(/[^a-zA-Z0-9]+/, { message: "Password should be contain atleast one speacial character" })
    ,
    adharId: z.string()
        .min(12, "Adhar ID must be 12 digits")
        .max(12, "Adhar ID must be 12 digits")
        .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
        .transform((val) => Number(val))
    ,
    phoneNumber: z.string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
        .transform((val) => Number(val)),

})

//sign in schema
export const SignInSchema = z.object({
    username: z
        .string(),

    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/[a-z]+/, { message: "Password should be contain atleast one lower case" })
        .regex(/[A-Z]+/, { message: "Password should be contain atleast one upper case" })
        .regex(/[0-9]+/, { message: "Password should be contain atleast one number" })
        .regex(/[^a-zA-Z0-9]+/, { message: "Password should be contain atleast one speacial character" })
    ,
})


//verify code 
export const verifySchema = z.object({
    code: z.string()
        .min(6, "Verification code must be 6 digits")
        .max(6, "Verification code must be 6 digits")
})