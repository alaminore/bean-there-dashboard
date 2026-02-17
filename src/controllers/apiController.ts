import { Request, Response, NextFunction } from 'express';
import { getTodaysSales, getLowStockProducts, getRecentOrders, getWeeklySummary } from '../services/analytics.js';
import { getAllProducts } from '../services/inventory.js';

export async function getAnalyticsData(req: Request, res: Response, next: NextFunction) {
  try {
    const [todaysSales, recentOrders] = await Promise.all([
      getTodaysSales(),
      getRecentOrders(5)
    ]);

    res.json({
      todaysSales,
      recentOrders
    });
  } catch (error) {
    next(error);
  }
}

export async function getInventoryData(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await getAllProducts();
    res.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function getLowStockData(req: Request, res: Response, next: NextFunction) {
  try {
    const lowStock = await getLowStockProducts();
    res.json({ lowStock });
  } catch (error) {
    next(error);
  }
}

export async function getWeeklySummaryData(req: Request, res: Response, next: NextFunction) {
  try {
    const summary = await getWeeklySummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}