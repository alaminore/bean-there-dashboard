import { Router } from 'express';
import { triggerLowStockAlert } from '../controllers/webhookController.js';

const router = Router();

router.post('/low-stock', triggerLowStockAlert);

export default router;