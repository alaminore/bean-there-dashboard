import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { 
  getAnalyticsData, 
  getInventoryData,
  getLowStockData,
  getWeeklySummaryData
} from '../controllers/apiController.js';

const router = Router();

// Analytics endpoints
router.get('/analytics/today', getAnalyticsData);
router.get('/inventory', getInventoryData);
router.get('/inventory/low-stock', getLowStockData);
router.get('/analytics/weekly', getWeeklySummaryData);

export default router;