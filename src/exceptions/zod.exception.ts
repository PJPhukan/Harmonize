// import { ErrorCodes, HttpException } from "./root.ts"

class ZodValidationError extends Error {
    constructor(errors: any, message: string) {
        const formattedErrors: object = errors.errors.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        super("Validation error", formattedErrors);
    }
}

export { ZodValidationError };
