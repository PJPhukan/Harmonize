import { z } from "zod";

export const uploadSchema = z.object({
    post: z.array(z.instanceof(File))
        .refine((files) => files.length > 0, { message: "post must be selected" }),
    postURL: z.string().optional(),
    description: z.string().min(8, "Description must be at least 8 character"),
    tag: z.string().optional(),
    name: z.string(),
    type: z.string()

})