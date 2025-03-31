import { z } from 'zod'

//sign up schema
export const SignUpSchema = z.object({

    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be at most 50 characters" }),
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must include at least one number" })
        .regex(/[\W_]/, { message: "Password must include at least one special character" }),
    day: z
        .string(),
    month: z
        .string(),
    year: z
        .string()
        .refine((year) => {
            const currentYear = new Date().getFullYear();
            return +year > currentYear - 100 && +year <= currentYear;
        }, { message: "Invalid year range" }),
    // dob: z.date()



})

//sign in schema
export const SignInSchema = z.object({
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
})


//verify code 
export const verifySchema = z.object({
    code: z.string()
        .min(6, "Verification code must be 6 digits")
        .max(6, "Verification code must be 6 digits")
})

//setup user profile 
export const setupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    location: z.string().optional(),
    bio: z.string().min(10, "Bio must be at least 10 characters")
        .max(500, "Bio must be at most 500 characters"),
    // profilePic: z.string().optional(),
    genres: z.array(z.string()).min(1, "At least one genre must be selected"),
    skills: z.array(z.string()).min(1, "At least one skill must be selected"),
    avatar: z.array(z.instanceof(File))
        .refine((files) => files.length > 0, { message: "avatar must be selected" }),
    avatarURL: z.string().optional(),

    website: z.string().optional(),
    youtube: z.string().optional(),
    spotify: z.string().optional(),
    instragram: z.string().optional(),
    twitter: z.string().optional(),
    linkdin: z.string().optional(),
    discord: z.string().optional(),

})


export const UpdateAvatarSchema = z.object({
    avatar: z.array(z.instanceof(File))
        .refine((files) => files.length > 0, { message: "avatar must be selected" }),
    avatarURL: z.string().optional(),
})


export const UpdateProfileInfoSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    location: z.string().optional(),
    bio: z.string().min(10, "Bio must be at least 10 characters")
        .max(500, "Bio must be at most 500 characters"),

    day: z
        .string(),
    month: z
        .string(),
    year: z
        .string()
        .refine((year) => {
            const currentYear = new Date().getFullYear();
            return +year > currentYear - 100 && +year <= currentYear;
        }, { message: "Invalid year range" }),
})

export const UpdatePasswordSchema = z
.object({
    currentPassword: z.string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/[a-z]+/, { message: "Password should be contain atleast one lower case" })
        .regex(/[A-Z]+/, { message: "Password should be contain atleast one upper case" })
        .regex(/[0-9]+/, { message: "Password should be contain atleast one number" })
        .regex(/[^a-zA-Z0-9]+/, { message: "Password should be contain atleast one speacial character" })
    ,
    newPassword: z.string()
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
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

