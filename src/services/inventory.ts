import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      stockLevel: true
    },
    orderBy: {
      category: 'asc'
    }
  });
}