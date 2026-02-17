import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../helpers/errors.js';

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    throw new AppError(
      'MissingApiKey',
      HttpCode.Unauthorized,
      'API key is required',
      true
    );
  }

  // Check against environment variable
  if (apiKey !== process.env.API_KEY) {
    throw new AppError(
      'InvalidApiKey',
      HttpCode.Unauthorized,
      'Invalid API key',
      true
    );
  }

  next();
}