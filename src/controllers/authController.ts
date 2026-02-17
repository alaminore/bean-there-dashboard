import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError, HttpCode } from '../helpers/errors.js';

export function renderLogin(req: Request, res: Response) {
  res.render('login', { error: null });
}

export function handleLogin(req: Request, res: Response, next: NextFunction) {

  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(new AppError(
        'AuthenticationError',
        HttpCode.InternalServerError,
        'Authentication failed',
        true
      ));
    }

    if (!user) {
      return res.render('login', { 
        error: info?.message || 'Invalid credentials' 
      });
    }

    // Manually establish session
    req.logIn(user, (loginErr: any) => {
      if (loginErr) {
        return next(new AppError(
          'SessionError',
          HttpCode.InternalServerError,
          'Failed to create session',
          true
        ));
      }
      res.redirect('/dashboard');
    });
  })(req, res, next);
}

export function handleLogout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) {
      return next(new AppError(
        'LogoutError',
        HttpCode.InternalServerError,
        'Failed to logout',
        true
      ));
    }
    res.redirect('/auth/login');
  });
}