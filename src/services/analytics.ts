import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTodaysSales() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const orders = await prisma.order.findMany({
    where: {
      orderDate: { gte: today },
      status: OrderStatus.COMPLETED
    }
  });

  const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  return { count: orders.length, total };
}

export async function getLowStockProducts() {
  return await prisma.product.findMany({
    where: {
      stockLevel: { lte: 20 } // 20 or fewer items
    },
    select: {
      name: true,
      stockLevel: true,
      category: true
    },
    orderBy: {
      stockLevel: 'asc'
    }
  });
}

export async function getTopCustomers(limit: number = 5) {
  return await prisma.customer.findMany({
    where: {
      totalSpent: { gt: 0 }
    },
    select: {
      name: true,
      totalSpent: true,
      email: true
    },
    orderBy: {
      totalSpent: 'desc'
    },
    take: limit
  });
}

export async function getRecentOrders(limit: number = 10) {
  return await prisma.order.findMany({
    include: {
      customer: {
        select: { name: true }
      }
    },
    orderBy: {
      orderDate: 'desc'
    },
    take: limit
  });
}

export async function getWeeklySummary() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const orders = await prisma.order.findMany({
    where: {
      orderDate: { gte: weekAgo },
      status: OrderStatus.COMPLETED
    },
    include: {
      customer: { select: { name: true } },
      orderItems: {
        include: { product: { select: { name: true } } }
      }
    }
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  return {
    totalRevenue,
    orderCount: orders.length,
    orders
  };
}