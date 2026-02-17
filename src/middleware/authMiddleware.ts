import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../helpers/errors.js';
import { UserRole } from '@prisma/client';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    throw new AppError(
      'UnauthorizedAccess',
      HttpCode.Unauthorized,
      'Please login to access this page',
      true,
      { redirectTo: '/auth/login' }
    );
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    throw new AppError(
      'UnauthorizedAccess',
      HttpCode.Unauthorized,
      'Please login to access this page',
      true,
      { redirectTo: '/auth/login' }
    );
  }

  const user = req.user as any;
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(
      'ForbiddenAccess',
      HttpCode.Forbidden,
      'Admin access required',
      true,
      { redirectTo: '/dashboard' }
    );
  }
  
  next();
}