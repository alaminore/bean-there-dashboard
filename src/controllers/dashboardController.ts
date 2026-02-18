import { Request, Response, NextFunction } from 'express';
import { getTodaysSales, getLowStockProducts, getTopCustomers, getRecentOrders } from '../services/analytics.js';
import { getN8nWorkflows, getWorkflowById } from '../services/n8n.js';

export async function renderDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as any;
    
    // Fetch all data
    const [todaysSales, lowStock, topCustomers, recentOrders, workflows] = await Promise.all([
      getTodaysSales(),
      getLowStockProducts(),
      getTopCustomers(),
      getRecentOrders(),
      getN8nWorkflows().catch(()=> [])
    ]);
    
    res.render('dashboard', { 
      user,
      todaysSales,
      lowStock,
      topCustomers,
      recentOrders,
      workflows
    });
  } catch (error) {
    next(error);
  }
}

export async function renderWorkflowDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as any;
    const workflowId = req.params.id as string;
    
    const workflow = await getWorkflowById(workflowId);
    
    res.render('workflow-detail', { user, workflow });
  } catch (error) {
    next(error);
  }
}