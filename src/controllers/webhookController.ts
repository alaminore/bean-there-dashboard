import { Request, Response, NextFunction } from 'express';
import { getLowStockProducts } from '../services/analytics.js';
import { AppError, HttpCode } from '../helpers/errors.js';

export async function triggerLowStockAlert(req: Request, res: Response, next: NextFunction) {
  try {
    // Auth check in controller
    if (!req.isAuthenticated()) {
      throw new AppError(
        'UnauthorizedAccess',
        HttpCode.Unauthorized,
        'Authentication required',
        true
      );
    }

    const lowStock = await getLowStockProducts();
    
    if (lowStock.length === 0) {
      return res.json({ message: 'No low stock items', triggered: false });
    }

    // Send to n8n webhook
    const n8nWebhook = process.env.N8N_LOW_STOCK_WEBHOOK;
    
    if (!n8nWebhook) {
      throw new AppError(
        'ConfigurationError',
        HttpCode.InternalServerError,
        'N8N webhook URL not configured',
        true
      );
    }
    
    await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lowStock })
    });

    res.json({ message: 'Alert sent', triggered: true, itemCount: lowStock.length });
  } catch (error) {
    next(error);
  }
}