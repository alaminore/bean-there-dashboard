import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../helpers/errors";

export function errorHandler (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // If it's an AppError
    if (err instanceof AppError) {
        // Log the message
        console.error(`[${err.name}] ${err.message}`, err.context);

        // If a redirect is provided, redirect
        if (err.redirectTo) {
            return res.redirect(err.redirectTo);
        }

        // If an error page is to be rendered, render it
        if (err.renderView) {
            return res.status(err.httpCode).render(err.renderView, {
                error: err.message,
                ...err.context
            });
        }

        // JSON response
        return res.status(err.httpCode).json({
            error: err.name,
            message: err.message,
            ...(process.env.NODE_ENV !== 'production' && { context: err.context })
        });
    }

    // Other errors
    console.error('Unexpected error:', err);
    res.status(HttpCode.InternalServerError).json({
        error: 'InternalServerError',
        message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
    });
}

export function notFoundHandler(req: Request, res: Response) {
    throw new AppError (
        'NotFoundError',
        HttpCode.NotFound,
        'Route not found',
        true
    );
}