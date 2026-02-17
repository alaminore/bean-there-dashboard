// Built in codes
export enum HttpCode {
    OK = 200,
    Created = 201,
    NoContent = 204,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    TooManyRequests = 429,

    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,

    MovedPermanently = 301,
    Found = 302,
};

// Built in other errors
export const commonErrors = {
    resourceNotFound: 'ResourceNotFoundError',
    validationFailed: 'ValidationError',
    unauthorizedAccess: 'UnauthorizedAccessError',
    forbiddenAccess: 'ForbiddenAccessError',
    conflict: 'ConflictError',
    serverError: 'InternalServerError',
    badRequest: 'BadRequestError',
    tooManyRequests: 'TooManyRequestsError',
    tokenExpired: 'TokenExpiredError',
    passwordMismatch: 'PasswordMismatchError',
}

// Custom error object to handle errors
export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean;
    public readonly redirectTo?: string;
    public readonly renderView?: string;
    public readonly context?: Record<string, any>;

    constructor (
        name: string, 
        httpCode: HttpCode, 
        description: string, 
        isOperational: boolean,
        options?: {
            redirectTo?: string;
            renderView?: string;
            context?: Record<string, any>;
        }
    ) {
        super (description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.redirectTo = options?.redirectTo;
        this.renderView = options?.renderView;
        this.context = options?.context;
        
        Error.captureStackTrace(this);
    };
};