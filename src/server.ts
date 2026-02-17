import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from './config/passport.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import apiRoutes from './routes/api.js';
import webhookRoutes from './routes/webhook.js';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimiter.js';
import { requireApiKey } from './middleware/apiAuth.js';
import helmet from 'helmet';
import csurf from 'csurf';

const app = express();

// Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('src/public'));

// Session setup
app.use (
    session({
        secret: process.env.SESSION_SECRET || '',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        }
    })
)

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // For inline scripts
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

// CSRF protection
const csrfProtection = csurf({ cookie: false });
app.use(csrfProtection);

// Pass CSRF token to views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routes
app.use ('/auth', authRoutes);
app.use ('/dashboard', dashboardRoutes);

// API routes
app.use('/api', cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5678', // n8n default
  credentials: true
}));
app.use('/api', apiLimiter);
app.use('/api', requireApiKey);
app.use ('/api', apiRoutes);
app.use('/webhooks', webhookRoutes);

app.get('/', (req,res)=> {
    res.redirect('/auth/login');
})


// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Dashboard running on port ${PORT}`));