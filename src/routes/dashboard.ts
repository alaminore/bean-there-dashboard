import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { renderDashboard } from '../controllers/dashboardController.js'

const router = Router();

// All dashboard routes require authentication
router.use(requireAuth);

router.get('/', renderDashboard);

export default router;