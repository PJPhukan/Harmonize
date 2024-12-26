class HttpException extends Error {
    constructor(statusCode: number, errorCode: number, message: string, errors: string) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

const ErrorCodes = {
    USER_NOT_FOUND: 1001,
    USER_ALREADY_EXISTS: 1002,
    INCORRECT_PASSWORD: 1003,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
    TOKEN_BLACKLISTED: 497,
    TOKEN_EXPIRED: 498,
    INVALID_TOKEN: 499,
};

/**
 * @param {HttpException} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
//   const errorHandler = (error:Error, req, res, next) => {
//     const { statusCode, errorCode, message, errors } = error;
//     res.status(statusCode ?? 500).json({
//       error: {
//         code: errorCode,
//         message,
//         errors,
//       },
//     });
//   };

export { HttpException, ErrorCodes };
