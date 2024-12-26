import { ZodValidationError } from "@/exceptions/zod.exception";

export interface ApiResponse {
    success: boolean;
    message: string | object;
    statusCode: number;
    data?: object;
}