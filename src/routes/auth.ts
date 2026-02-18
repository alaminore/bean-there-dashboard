import { Router } from 'express';
import csurf from 'csurf';
import { renderLogin, handleLogin, handleLogout } from '../controllers/authController.js';

const router = Router();
const csrfProtection = csurf({ cookie: false });

// Login page - generates token
router.get('/login', csrfProtection, (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}, renderLogin);

// Login POST - validates token
router.post('/login', csrfProtection, handleLogin);

// Logout - no CSRF needed
router.get('/logout', handleLogout);

export default router;